import { checkBotId } from "botid/server";
import { NextRequest, NextResponse } from "next/server";
import { hasMailDomain } from "../../../lib/mail/check-email-domain";
import { sendAutoReply } from "../../../lib/mail/send-auto-reply";
import { isLikelyBot } from "../../../lib/spam/form-guard";

/** ご相談のテーマの許可値（app/contact/page.tsx の THEME_OPTIONS と一致させる） */
const ALLOWED_CATEGORIES = [
  "DX推進・業務改善",
  "AI・生成AIの活用（AX）",
  "システム・アプリ開発",
  "技術顧問（外部CTO）",
  "まだ決まっていない・まとめて相談したい",
  "その他",
] as const;

/** PitDockを知ったきっかけの許可値（app/contact/page.tsx の REFERRAL_OPTIONS と一致させる） */
const ALLOWED_REFERRALS = ["検索", "AIツール", "SNS", "紹介", "セミナー・イベント", "その他"] as const;

/** きっかけの補足（SNS名・その他の内容）。選択されている場合のみ採用し、長さを制限する */
function referralDetail(selected: string[], value: string, detail: unknown): string {
  if (!selected.includes(value) || typeof detail !== "string") return "";
  return detail.trim().slice(0, 100);
}

export async function POST(req: NextRequest) {
  // Vercel BotID（クライアント側の登録は instrumentation-client.ts）。ローカル開発では常に人間と判定される
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: "Rejected" }, { status: 403 });
  }

  const body = await req.json();
  const {
    company,
    name,
    email,
    content,
    categories,
    preferredDate,
    referrals,
    referralSns,
    referralOther,
    privacy,
  } = body as {
    company?: string;
    name?: string;
    email?: string;
    content?: string;
    categories?: unknown;
    preferredDate?: string;
    referrals?: unknown;
    referralSns?: unknown;
    referralOther?: unknown;
    privacy?: boolean;
  };

  // bot対策（ハニーポット・送信時間）。不合格なら Slack 通知・メール送信を行わずエラーにする
  if (isLikelyBot((body as { guard?: unknown }).guard)) {
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }

  // ユーザー入力をそのまま埋め込まないよう、テーマは許可値リストと照合する
  const safeCategories = Array.isArray(categories)
    ? (categories.filter(
        (c): c is (typeof ALLOWED_CATEGORIES)[number] =>
          typeof c === "string" &&
          (ALLOWED_CATEGORIES as readonly string[]).includes(c)
      ) as string[])
    : [];

  const safeReferrals = Array.isArray(referrals)
    ? referrals.filter(
        (r): r is string =>
          typeof r === "string" && (ALLOWED_REFERRALS as readonly string[]).includes(r)
      )
    : [];
  const referralDetails: Record<string, string> = {
    SNS: referralDetail(safeReferrals, "SNS", referralSns),
    その他: referralDetail(safeReferrals, "その他", referralOther),
  };
  const referralText = safeReferrals
    .map((r) => (referralDetails[r] ? `${r}（${referralDetails[r]}）` : r))
    .join(" / ");

  if (!name || !email || safeCategories.length === 0 || privacy !== true) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  // 自動返信メールの送信先になるため、サーバ側でも形式を検証する
  // （フロントのバリデーションはAPIを直接叩かれると素通りする）
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // ドメインがメールを受け取れない（打ち間違い・存在しないドメイン）場合は、通知・送信せずに入力を見直してもらう
  if (!(await hasMailDomain(email))) {
    return NextResponse.json({ error: "email_undeliverable" }, { status: 422 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const blocks: object[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "無料相談のお申し込みが届きました", emoji: true },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*お名前*\n${name}` },
        { type: "mrkdwn", text: `*メールアドレス*\n${email}` },
        { type: "mrkdwn", text: `*会社名・屋号*\n${company || "（未記入）"}` },
      ],
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*ご相談のテーマ*\n${safeCategories.join(" / ")}` },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*ご相談内容*\n${content || "（記載なし）"}` },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*PitDockを知ったきっかけ*\n${referralText || "（未回答）"}`,
      },
    },
  ];

  if (preferredDate) {
    blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*ご希望の日時*\n${preferredDate}` },
    });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Slack notification failed" }, { status: 500 });
  }

  // 申込者への自動返信メール。
  // 失敗しても申込は成立しているため 500 にはしない（ユーザーに再送信させないため）。
  try {
    await sendAutoReply({
      name,
      email,
      categories: safeCategories,
      company,
      content,
      preferredDate,
    });
  } catch (e) {
    console.error("[resend] auto-reply threw:", e);
  }

  return NextResponse.json({ ok: true });
}
