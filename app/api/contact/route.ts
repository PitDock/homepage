import { NextRequest, NextResponse } from "next/server";

/** ご相談のテーマの許可値（app/contact/page.tsx の THEME_OPTIONS と一致させる） */
const ALLOWED_CATEGORIES = [
  "DX推進・業務改善",
  "AI・生成AIの活用（AX）",
  "システム・アプリ開発",
  "技術顧問（外部CTO）",
  "まだ決まっていない・まとめて相談したい",
  "その他",
] as const;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { company, name, email, content, categories, preferredDate, privacy } = body as {
    company?: string;
    name?: string;
    email?: string;
    content?: string;
    categories?: unknown;
    preferredDate?: string;
    privacy?: boolean;
  };

  // ユーザー入力をそのまま埋め込まないよう、テーマは許可値リストと照合する
  const safeCategories = Array.isArray(categories)
    ? (categories.filter(
        (c): c is (typeof ALLOWED_CATEGORIES)[number] =>
          typeof c === "string" &&
          (ALLOWED_CATEGORIES as readonly string[]).includes(c)
      ) as string[])
    : [];

  if (!name || !email || safeCategories.length === 0 || privacy !== true) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
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

  return NextResponse.json({ ok: true });
}
