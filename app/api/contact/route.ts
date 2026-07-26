import { NextRequest, NextResponse } from "next/server";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${y}/${m}/${d}`;
}

function formatSlot(date: string, start: string, end: string): string {
  if (!date && !start) return "未記入";
  const datePart = formatDate(date);
  const timePart = start || end ? `${start || "?"}〜${end || "?"}` : "";
  return [datePart, timePart].filter(Boolean).join(" ");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    company, name, email, content,
    date1Date, date1Start, date1End,
    date2Date, date2Start, date2End,
    date3Date, date3Start, date3End,
    date4Date, date4Start, date4End,
    date5Date, date5Start, date5End,
  } = body;

  if (!company || !name || !email || !content) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const slots = [
    { label: "第1希望", date: date1Date, start: date1Start, end: date1End },
    { label: "第2希望", date: date2Date, start: date2Start, end: date2End },
    { label: "第3希望", date: date3Date, start: date3Start, end: date3End },
    { label: "第4希望", date: date4Date, start: date4Start, end: date4End },
    { label: "第5希望", date: date5Date, start: date5Start, end: date5End },
  ]
    .filter((slot) => slot.date || slot.start || slot.end)
    .map((slot) => ({
      label: slot.label,
      value: formatSlot(slot.date, slot.start, slot.end),
    }));

  const dateLines = slots.length > 0
    ? slots.map((sl) => `${sl.label}: ${sl.value}`).join("\n")
    : "（ご希望日時の記入なし）";

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "無料相談のご予約が届きました", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*会社名 / 部署・役職名*\n${company}` },
          { type: "mrkdwn", text: `*お名前*\n${name}` },
          { type: "mrkdwn", text: `*メールアドレス*\n${email}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*ご相談内容*\n${content}` },
      },
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*ご希望日時*\n${dateLines}` },
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Slack notification failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
