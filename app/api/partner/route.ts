import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    email,
    tel,
    roles,
    status,
    availDays,
    skills,
    message,
  } = body as {
    name: string;
    email: string;
    tel?: string;
    roles: string[];
    status: string;
    availDays: string;
    skills?: string;
    message?: string;
  };

  if (!name || !email || !roles || roles.length === 0 || !status || !availDays) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
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
        { type: "mrkdwn", text: `*稼働日数*\n${availDays}` },
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
