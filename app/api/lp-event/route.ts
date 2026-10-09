import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_VARIANTS = ["A", "B"] as const;
const ALLOWED_TYPES = ["impression", "click"] as const;
const ALLOWED_STORES = ["appstore", "googleplay"] as const;

export async function POST(req: NextRequest) {
  const endpoint = process.env.LP_EVENT_ENDPOINT_URL;
  const token = process.env.LP_EVENT_TOKEN;
  if (!endpoint || !token) {
    // 計測設定が無くてもユーザー体験を壊さないため 204 を返す
    console.warn("[lp-event] LP_EVENT_ENDPOINT_URL / LP_EVENT_TOKEN not configured");
    return new NextResponse(null, { status: 204 });
  }

  // sendBeacon は text/plain で送るため text() で読む
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 受け取った値はそのまま外部に流さず、許可値と照合する（contact/route.ts と同じ方針）
  const variant = String(body.variant ?? "");
  const type = String(body.type ?? "");
  const rawStore = body.store == null ? "" : String(body.store);

  if (!(ALLOWED_VARIANTS as readonly string[]).includes(variant)) {
    return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
  }
  if (!(ALLOWED_TYPES as readonly string[]).includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const store =
    type === "click" && (ALLOWED_STORES as readonly string[]).includes(rawStore) ? rawStore : "";
  if (type === "click" && !store) {
    return NextResponse.json({ error: "Invalid store" }, { status: 400 });
  }

  // ISO週キーは "YYYY-Www" のみ許可（任意文字列をシートに書かせない）
  const isoWeek = String(body.isoWeek ?? "");
  if (!/^\d{4}-W\d{2}$/.test(isoWeek)) {
    return NextResponse.json({ error: "Invalid isoWeek" }, { status: 400 });
  }

  const path = String(body.path ?? "").slice(0, 200);
  const referrer = String(body.referrer ?? "").slice(0, 300);
  const device = body.device === "mobile" ? "mobile" : "desktop";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Apps Script の /exec は 302 で googleusercontent に飛ぶため follow が必要
      redirect: "follow",
      body: JSON.stringify({
        token,
        event: { isoWeek, variant, type, store: store || "―", path, referrer, device },
      }),
    });
    if (!res.ok) {
      console.error("[lp-event] GAS responded", res.status);
    }
  } catch (e) {
    // 計測の失敗はユーザーに影響させない
    console.error("[lp-event] forward failed:", e);
  }

  return new NextResponse(null, { status: 204 });
}
