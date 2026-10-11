export type LpVariant = "A" | "B";

/** JSTの暦日を UTC 正午基準の Date として取り出す（DST非対応地域なので固定+9hでよい） */
function toJstCalendarDate(now: Date): Date {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return new Date(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()));
}

/**
 * ISO 8601 の週番号と ISO週年を返す。
 * 週は月曜始まり。その週の木曜日が属する年を ISO週年とする（ISO 8601 の定義）。
 */
export function getIsoWeek(date: Date): { isoYear: number; isoWeek: number } {
  const d = toJstCalendarDate(date);
  // 月曜=1 ... 日曜=7
  const dayOfWeek = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
  // その週の木曜日へ移動
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
  const isoYear = d.getUTCFullYear();
  const jan1 = Date.UTC(isoYear, 0, 1);
  const isoWeek = Math.ceil(((d.getTime() - jan1) / 86_400_000 + 1) / 7);
  return { isoYear, isoWeek };
}

/** シート記録用のキー。例: "2026-W41" */
export function formatIsoWeekKey(date: Date = new Date()): string {
  const { isoYear, isoWeek } = getIsoWeek(date);
  return `${isoYear}-W${String(isoWeek).padStart(2, "0")}`;
}

/** 奇数週=A / 偶数週=B */
export function getWeeklyVariant(date: Date = new Date()): LpVariant {
  return getIsoWeek(date).isoWeek % 2 === 1 ? "A" : "B";
}
