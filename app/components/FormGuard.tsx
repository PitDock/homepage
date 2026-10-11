"use client";
import { useEffect, useRef } from "react";
import { HONEYPOT_FIELD, type FormGuardPayload } from "../../lib/spam/form-guard";

/**
 * フォームのbot対策（クライアント側）。
 * <form> 内に <HoneypotField /> を置き、送信時に getGuard() の結果を body の guard に入れる。
 * サーバ側の判定は lib/spam/form-guard.ts。
 */
export function useFormGuard() {
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const mountedAtRef = useRef<number | null>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const getGuard = (): FormGuardPayload => ({
    hp: honeypotRef.current?.value ?? "",
    elapsedMs: mountedAtRef.current === null ? 0 : Date.now() - mountedAtRef.current,
  });

  return { honeypotRef, getGuard };
}

/** 人には見えないハニーポット欄。display:none だと無視するbotがいるため画面外に配置する */
export function HoneypotField({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label htmlFor={`hp-${HONEYPOT_FIELD}`}>このフィールドは入力しないでください</label>
      <input
        ref={inputRef}
        id={`hp-${HONEYPOT_FIELD}`}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
