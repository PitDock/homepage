"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import s from "./not-found.module.css";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COUNT = 40;
    const MAX_DIST = 120;

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,142,247,${0.22 * (1 - d / MAX_DIST)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(79,142,247,0.65)";
        ctx.arc(pts[i].x, pts[i].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={s.particleCanvas} aria-hidden="true" />;
}

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Nav />
      <main className={s.main}>
        <ParticleCanvas />
        <div className={s.glow} aria-hidden="true" />
        <div className={s.content}>
          <span className={s.badge}>404 NOT FOUND</span>
          <div className={s.number} aria-hidden="true">404</div>
          <div className={s.divider} aria-hidden="true" />
          <h1 className={s.heading}>ページが見つかりません</h1>
          <p className={s.sub}>
            お探しのページは存在しないか、移動・削除された可能性があります。<br />
            URLをご確認いただくか、ホームページからお探しください。
          </p>
          <div className={s.buttons}>
            <a href="/" className={s.btnPrimary}>ホームへ戻る</a>
            <button
              type="button"
              className={s.btnSecondary}
              onClick={() => router.back()}
            >
              ← 前のページに戻る
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
