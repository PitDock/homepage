"use client";

import { useEffect, useRef } from "react";
import s from "../../home.module.css";

// ユーザー操作（タップ等）とみなされ、自動再生が拒否された後でも play() が許可されるイベント
const GESTURE_EVENTS = ["touchend", "pointerdown", "click", "keydown"] as const;

// FV のロゴ動画。読み込み中・再生できない環境ではポスター画像が表示される
export default function FvVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React は muted 属性を SSR の HTML に出力しないため、自動再生がブロックされないよう明示的に設定する
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      if (!video.paused) return;
      video.play().catch(() => {
        // 自動再生が拒否された環境（iOS の低電力モード等）ではポスター表示のままにする
      });
    };

    // 最初のユーザー操作で再生を試みる（低電力モード・データセーバー等で自動再生が拒否された場合の救済）
    const onGesture = () => {
      tryPlay();
      removeGestureListeners();
    };
    const removeGestureListeners = () => {
      GESTURE_EVENTS.forEach((e) => document.removeEventListener(e, onGesture));
    };
    GESTURE_EVENTS.forEach((e) =>
      document.addEventListener(e, onGesture, { passive: true }),
    );

    // タブ復帰時（バックグラウンドで止められた場合）にも再開する
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    // 再生が始まったらジェスチャー待ちは不要
    video.addEventListener("playing", removeGestureListeners, { once: true });

    tryPlay();
    // 読み込み前に play() が拒否されるブラウザ向けに、再生可能になった時点でも再試行する
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      removeGestureListeners();
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("playing", removeGestureListeners);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={s.fvVideo}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      poster="/video/fv-poster.webp"
      aria-label="PitDockのロゴアニメーション"
    >
      <source src="/video/logo_loop.webm" type="video/webm" />
      <source src="/video/logo_loop.mp4" type="video/mp4" />
    </video>
  );
}
