"use client";

import { useEffect, useRef } from "react";
import { sendLpEvent } from "../../../../../lib/ab/lp-event";

let sentInThisDocument = false; // StrictMode の二重 effect / 同一ドキュメント内の再マウント対策

export default function LpImpression({
  isoWeek,
  variant,
}: {
  isoWeek: string;
  variant: "A" | "B";
}) {
  const localSent = useRef(false);

  useEffect(() => {
    if (localSent.current || sentInThisDocument) return;

    const key = `lp_imp:${isoWeek}:${variant}`;
    try {
      if (window.sessionStorage.getItem(key) === "1") {
        sentInThisDocument = true;
        return;
      }
    } catch {
      /* sessionStorage 不可でもモジュールフラグで二重送信は防げる */
    }

    const fire = () => {
      if (localSent.current || sentInThisDocument) return;
      localSent.current = true;
      sentInThisDocument = true;
      try {
        window.sessionStorage.setItem(key, "1");
      } catch {
        /* noop */
      }
      sendLpEvent({ isoWeek, variant, type: "impression" });
    };

    if (document.visibilityState === "visible") {
      fire();
      return;
    }
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVisible);
        fire();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [isoWeek, variant]);

  return null;
}
