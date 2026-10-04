const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type AutoReplyInput = {
  name: string;
  email: string;
  categories: string[];
  company?: string;
  content?: string;
  preferredDate?: string;
};

/**
 * 無料相談の申込者へ自動返信メールを送る。
 *
 * - このメールは送信専用。reply_to は付けない（返信は受け付けない方針）。
 * - RESEND_API_KEY / MAIL_FROM が未設定の環境では何もせずに返る。
 * - 失敗しても例外を投げない。Slack通知が成功していれば申込自体は失われないため、
 *   メール送信の失敗でフォーム送信をエラーにしてはいけない（二重送信の原因になる）。
 */
export async function sendAutoReply(input: AutoReplyInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;

  if (!apiKey || !from) return;

  const lines = [
    `${input.name} 様`,
    "",
    "この度は、PitDock株式会社の無料相談にお申し込みいただきありがとうございます。",
    "以下の内容で承りました。",
    "",
    "担当者より、翌営業日（土日祝を除く）中にご連絡し、日程を確定させていただきます。",
    "当日までにご準備いただくものはありません。",
    "",
    "────────────────────────────",
    `お名前: ${input.name}`,
    `メールアドレス: ${input.email}`,
    ...(input.company ? [`会社名・屋号: ${input.company}`] : []),
    `ご相談のテーマ: ${input.categories.join(" / ")}`,
    ...(input.content ? ["", "ご相談内容:", input.content] : []),
    ...(input.preferredDate ? ["", "ご希望の日時:", input.preferredDate] : []),
    "────────────────────────────",
    "",
    "※このメールは送信専用のアドレスから配信しているため、ご返信いただけません。",
    "　ご予定の変更やご質問は、担当者からお送りするご連絡メールにご返信ください。",
    "",
    "当日お話できるのを楽しみにしております。",
    "",
    "PitDock株式会社",
    "https://www.pit-dock.com",
  ];

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.email],
      subject: "【PitDock株式会社】無料相談のお申し込みを受け付けました",
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[resend] auto-reply failed:", res.status, await res.text());
  }
}
