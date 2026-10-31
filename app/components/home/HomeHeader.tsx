"use client";

import { useEffect, useState } from "react";
import s from "../../home.module.css";
import { CONSULT_URL, INQUIRY_URL, homeNavItems } from "./links";

export default function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    // メニューを開いている間は背面のページをスクロールさせない
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <a href="/" className={s.headerLogo} aria-label="PitDock株式会社 トップへ">
          <img src="/brand/logo.svg" alt="PitDock" width={202} height={32} />
        </a>

        <nav className={s.headerNav} aria-label="メインナビゲーション">
          <ul role="list">
            {homeNavItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a href={INQUIRY_URL} target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
            お問い合わせ
          </a>
        </nav>

        <button
          type="button"
          className={s.hamburger}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          aria-controls="home-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        id="home-menu"
        className={s.menu}
        data-open={menuOpen ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        hidden={!menuOpen}
      >
        <div className={s.menuTop}>
          <a href="/" className={s.headerLogo} aria-label="PitDock株式会社 トップへ" onClick={close}>
            <img src="/brand/logo.svg" alt="PitDock" width={202} height={32} />
          </a>
          <button type="button" className={s.menuClose} onClick={close}>
            <span className={s.closeIcon} aria-hidden="true" />
            <span className={s.menuCloseLabel}>閉じる</span>
          </button>
        </div>
        <nav aria-label="メニュー内ナビゲーション">
          <ul role="list" className={s.menuNav}>
            {homeNavItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.menuCtas}>
          <a href={CONSULT_URL} className={s.menuCtaPrimary} onClick={close}>
            無料相談を予約する
          </a>
          <a
            href={INQUIRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={s.menuCtaSecondary}
            onClick={close}
          >
            お問い合わせ
          </a>
          <button type="button" className={s.menuCloseBottom} onClick={close}>
            <span className={s.closeIcon} aria-hidden="true" />
            閉じる
          </button>
        </div>
      </div>
    </header>
  );
}
