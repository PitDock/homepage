"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import s from "../page.module.css";
import { news } from "../../lib/data/news";
import type { NewsEntry } from "../../lib/data/news";

const CONTACT_URL = "/contact";

function isExternalNewsUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

// 全件を id 降順（新しい順）で表示
const allNewsSorted = [...news].sort((a, b) => b.id - a.id);

function NewsCard({ n, i, external }: { n: NewsEntry; i: number; external: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasClampOverflow, setHasClampOverflow] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const measure = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (!mobile) {
        setExpanded(false);
        setHasClampOverflow(false);
        return;
      }
      if (expanded) return;
      const el = titleRef.current;
      if (!el) return;
      setHasClampOverflow(el.scrollHeight > el.clientHeight + 1);
    };

    measure();
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });
    const el = titleRef.current;
    if (el) ro.observe(el);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [expanded, n.title]);

  const showToggle = isMobile && (expanded || hasClampOverflow);

  return (
    <li
      className={`${s.newsCard} ${s.reveal}`}
      style={{ transitionDelay: `${i * 0.07}s` }}
      data-expanded={expanded ? "true" : "false"}
    >
      <a
        href={n.url}
        className={s.newsCardLink}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className={s.newsCardMeta}>
          <ul className={s.newsTagList} role="list" aria-label="カテゴリ">
            {n.tags.map((t, ti) => (
              <li key={`${n.title}-${ti}-${t}`} className={s.newsTag}>
                {t}
              </li>
            ))}
          </ul>
          <span className={s.newsDate}>{n.date}</span>
        </div>
        <span ref={titleRef} className={s.newsTitle}>
          {n.title}
        </span>
      </a>
      {showToggle && (
        <button
          type="button"
          className={s.newsMoreBtn}
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((v) => !v);
          }}
        >
          {expanded ? "閉じる" : "もっと見る"}
        </button>
      )}
    </li>
  );
}

export default function NewsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(`.${s.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />

      {/* Page Hero */}
      <section className={s.pageHero}>
        <div className="container">
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li><a href="/">ホーム</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><span aria-current="page">News</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>News</h1>
          <p className={s.pageSubCopy}>
            GOWSの最新情報・プレスリリースをお届けします。
          </p>
        </div>
      </section>

      {/* News 一覧 */}
      <section className={s.newsListSection} aria-label="ニュース一覧">
        <div className="container">
          <ul className={s.newsGridSingle} role="list">
            {allNewsSorted.map((n, i) => (
              <NewsCard key={n.id} n={n} i={i} external={isExternalNewsUrl(n.url)} />
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
