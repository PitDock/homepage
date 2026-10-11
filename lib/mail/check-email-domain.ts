import { Resolver } from "node:dns/promises";

/**
 * メールアドレスのドメインがメールを受け取れるか（MXレコードがあるか）をDNSで確認する。
 *
 * - `gmial.com` のような打ち間違いや存在しないドメインを、送信前に弾くためのもの
 * - DNSのタイムアウト等「確認できなかった」場合は true を返す。
 *   こちら側の不調で本物の申込を取りこぼさないため、判定できたときだけ弾く
 */
export async function hasMailDomain(email: string): Promise<boolean> {
  const domain = email.split("@").pop()?.trim().toLowerCase();
  if (!domain) return false;

  const resolver = new Resolver({ timeout: 3000, tries: 1 });
  try {
    const records = await resolver.resolveMx(domain);
    // Null MX（RFC 7505: exchange が空 = メールを受け付けないと宣言しているドメイン）
    return records.some((r) => r.exchange !== "" && r.exchange !== ".");
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    // ENOTFOUND: ドメインが存在しない / ENODATA: MXレコードが無い
    if (code === "ENOTFOUND" || code === "ENODATA") return false;
    console.error("[dns] MX lookup failed:", code, domain);
    return true;
  }
}
