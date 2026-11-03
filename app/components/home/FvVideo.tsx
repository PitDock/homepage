"use client";

import { useEffect, useRef } from "react";
import s from "../../home.module.css";

// FV のロゴ動画。読み込み中・再生できない環境ではポスター画像が表示される
export default function FvVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React は muted 属性を SSR の HTML に出力しないため、自動再生がブロックされないよう明示的に設定する
    video.muted = true;
    video.play().catch(() => {
      // 自動再生が拒否された環境ではポスター表示のままにする
    });
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
      poster="/video/fv-poster.webp"
      aria-label="PitDockのロゴアニメーション"
    >
      <source src="/video/logo_loop.webm" type="video/webm" />
      <source src="/video/logo_loop.mp4" type="video/mp4" />
    </video>
  );
}
