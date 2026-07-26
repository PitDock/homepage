"use client";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`} aria-label="メインナビゲーション">
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} aria-label="GOWS合同会社 トップへ">GOWS</a>
        <ul className={styles.links} role="list">
          <li><a href="/service/dx-ax">DX・AXコンサルティング</a></li>
          <li><a href="/service/system-dev">システム開発</a></li>
          <li><a href="/service/tech-advisor">技術顧問</a></li>
          <li><a href="/service/products">自社プロダクト</a></li>
          <li><a href="/company-info">会社概要</a></li>
          <li><a href="/partner">パートナー募集</a></li>
        </ul>
        <div className={styles.ctaGroup}>
          <a
            href="https://forms.gle/BGJ5MAuT8nHxxkXK9"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
          >
            お問い合わせ
          </a>
          <a href="/contact" className={styles.cta}>
            無料相談を予約する
          </a>
        </div>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className={`${styles.menuIconLine} ${mobileMenuOpen ? styles.menuIconLineOpenTop : ""}`} />
          <span className={`${styles.menuIconLine} ${mobileMenuOpen ? styles.menuIconLineOpenMiddle : ""}`} />
          <span className={`${styles.menuIconLine} ${mobileMenuOpen ? styles.menuIconLineOpenBottom : ""}`} />
        </button>
      </div>
      <div
        id="mobile-navigation-menu"
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <ul className={styles.mobileLinks} role="list">
          <li><a href="/service/dx-ax" onClick={closeMobileMenu}>DX・AXコンサルティング</a></li>
          <li><a href="/service/system-dev" onClick={closeMobileMenu}>システム開発</a></li>
          <li><a href="/service/tech-advisor" onClick={closeMobileMenu}>技術顧問</a></li>
          <li><a href="/service/products" onClick={closeMobileMenu}>自社プロダクト</a></li>
          <li><a href="/company-info" onClick={closeMobileMenu}>会社概要</a></li>
          <li><a href="/partner" onClick={closeMobileMenu}>パートナー募集</a></li>
          <li><a href="/#news" onClick={closeMobileMenu}>お知らせ</a></li>
          <li>
            <a
              href="https://forms.gle/BGJ5MAuT8nHxxkXK9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              お問い合わせ
            </a>
          </li>
        </ul>
        <div className={styles.mobileCta}>
          <a
            href="/contact"
            className={styles.mobileCtaPrimary}
            onClick={closeMobileMenu}
          >
            無料相談を予約する
          </a>
        </div>
      </div>
    </nav>
  );
}
