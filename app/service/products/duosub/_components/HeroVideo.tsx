"use client";

import { useEffect, useRef, useState } from "react";
import s from "../page.module.css";

const HERO_SRC = "/images/products/Duosub/hero-loop.mp4";
export const HERO_POSTER = "/images/products/Duosub/hero-poster.webp";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // 初回描画（ポスター＝LCP）を動画のダウンロードで遅らせないため、src はマウント後に入れる
  useEffect(() => {
    setSrc(HERO_SRC);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    video.play().catch(() => {
      // 自動再生がブロックされた場合はポスターのまま。ボタンで再生できる
    });
  }, [src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div className={s.phone}>
      <video
        ref={videoRef}
        className={s.phoneMedia}
        src={src ?? undefined}
        poster={HERO_POSTER}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Duosubで動画を再生中の画面。英語字幕の下に日本語字幕が同時に表示されている"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={s.videoToggle}
        onClick={toggle}
        aria-label={playing ? "動画を一時停止" : "動画を再生"}
      >
        {playing ? (
          <span className={s.iconPause} aria-hidden="true">
            <span />
            <span />
          </span>
        ) : (
          <span className={s.iconPlay} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
