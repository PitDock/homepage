"use client";

export type LpEvent = {
  isoWeek: string;
  variant: "A" | "B";
  type: "impression" | "click";
  store?: "appstore" | "googleplay";
};

const ENDPOINT = "/api/lp-event";

export function sendLpEvent(event: LpEvent): void {
  if (typeof window === "undefined") return;

  // 社内QA・E2E・クローラの混入を避ける
  if (navigator.webdriver) return;
  if (new URLSearchParams(window.location.search).has("nolog")) return;
  try {
    if (window.localStorage.getItem("lp_event_optout") === "1") return;
  } catch {
    /* プライベートモード等で localStorage が使えない場合は続行 */
  }

  const payload = JSON.stringify({
    ...event,
    store: event.store ?? null,
    path: window.location.pathname,
    referrer: document.referrer || "",
    device: /Mobi|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
  });

  // プリフライトを避けるため text/plain で送る（APIルート側で req.text() → JSON.parse）
  const blob = new Blob([payload], { type: "text/plain;charset=UTF-8" });

  // クリック時の画面遷移でイベントが欠落しないよう sendBeacon を優先
  if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(ENDPOINT, blob)) {
    return;
  }

  void fetch(ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    keepalive: true,
  }).catch(() => {
    /* 計測失敗はユーザー体験に影響させない */
  });
}
