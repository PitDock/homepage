"use client";

import { useEffect } from "react";
import s from "../page.module.css";

/**
 * フェードインの起動役（設計仕様書 §3-14）。
 *
 * 既定は「見える」。JS がここで初めて .fadeInReady を付けて隠すため、
 * JS 失敗時・クローラ環境でもコンテンツが消えない。
 * prefers-reduced-motion なら .fadeInReady を付けずに何もしない。
 */
export default function FadeIn() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(`.${s.fadeIn}`));
    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add(s.fadeInReady));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
