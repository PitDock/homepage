/**
 * フォームのbot対策（サーバ側判定）。
 *
 * - ハニーポット: 人には見えない入力欄。値が入っていればbotとみなす
 * - 送信時間: フォーム表示から送信までが短すぎればbotとみなす
 *
 * クライアント側の対応実装は app/components/FormGuard.tsx。
 * APIを直接叩くbotは guard 自体を送ってこないため、欠落も不合格として扱う。
 */

/** ハニーポット欄の name 属性（botが埋めたくなる名前にしている） */
export const HONEYPOT_FIELD = "website";

/** フォーム表示から送信までの最短時間（ミリ秒） */
export const MIN_ELAPSED_MS = 3000;

export type FormGuardPayload = {
  /** ハニーポット欄の値。人間なら常に空文字 */
  hp?: unknown;
  /** フォーム表示から送信までの経過ミリ秒 */
  elapsedMs?: unknown;
};

export function isLikelyBot(guard: unknown): boolean {
  if (!guard || typeof guard !== "object") return true;
  const { hp, elapsedMs } = guard as FormGuardPayload;

  if (typeof hp !== "string" || hp !== "") return true;
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs)) return true;
  if (elapsedMs < MIN_ELAPSED_MS) return true;

  return false;
}
