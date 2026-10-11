import { NextRequest, NextResponse } from "next/server";
import { isLikelyBot } from "../../../lib/spam/form-guard";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    email,
    tel,
    roles,
    status,
    availHours,
    skills,
    message,
  } = body as {
    name: string;
    email: string;
    tel?: string;
    roles: string[];
    status: string;
    availHours: string;
    skills?: string;
    message?: string;
  };

  // bot対策（ハニーポット・送信時間）。不合格なら Slack 通知・メール送信を行わずエラーにする
  if (isLikelyBot((body as { guard?: unknown }).guard)) {
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }

  if (!name || !email || !roles || roles.length === 0 || !status || !availHours) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  // フロントのバリデーションはAPIを直接叩かれると素通りするため、サーバ側でも形式を検証する
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const blocks: object[] = [
    {
      type: "header",
      text: { type: "plain_text", text: "パートナー参画エントリーが届きました", emoji: true },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*氏名*\n${name}` },
        { type: "mrkdwn", text: `*メール*\n${email}` },
        { type: "mrkdwn", text: `*電話*\n${tel || "未入力"}` },
        { type: "mrkdwn", text: `*職種*\n${roles.join(", ")}` },
        { type: "mrkdwn", text: `*稼働状況*\n${status}` },
        { type: "mrkdwn", text: `*稼働可能時間*\n${availHours}` },
      ],
    },
  ];

  if (skills) {
    blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*スキル・経験*\n${skills}` },
    });
  }

  if (message) {
    if (!skills) blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*メッセージ*\n${message}` },
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
