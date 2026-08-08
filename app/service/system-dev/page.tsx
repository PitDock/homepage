"use client";

import { useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import s from "../../page.module.css";

const CONTACT_URL = "/contact";

const menus = [
  {
    name: "Webアプリケーション",
    desc: "SaaS・社内ツール・ECサイト・CMSなど、ビジネス課題に合わせて設計・開発します。",
  },
  {
    name: "業務システム・API",
    desc: "既存業務の効率化・自動化・他システムとのAPI連携を実現します。",
  },
  {
    name: "モバイルアプリ",
    desc: "Flutter / React Native でAndroid・iOS両対応。全機種対応アプリを短納期で開発します。",
  },
  {
    name: "AI開発",
    desc: "生成AI活用や業務自動化、AIエージェント開発、AIを用いたプロダクト開発まで、構想段階から伴走します。",
  },
];

const features = [
  {
    num: "01",
    title: "一気通貫",
    body: "要件定義→設計→開発→テスト→保守・運用まで全フェーズを自社内で完結。多重下請け構造による余分なコストと品質低下を排除します。",
  },
  {
    num: "02",
    title: "柔軟な開発手法で低コスト・短納期・高品質",
    body: "アジャイル開発・AI駆動開発・ローコードツールをプロジェクトごとに最適に組み合わせ、効率的な開発を実現します。",
  },
  {
    num: "03",
    title: "夜間・土日も対応",
    body: "平日日中だけでなく夜間や土日も対応しており、お客様のスケジュールに柔軟に合わせます。",
  },
  {
    num: "04",
    title: "明朗会計",
    body: "各フェーズごとの期間と費用を詳細にわかりやすく提示。納得いただいたうえで着手します。",
  },
  {
    num: "05",
    title: "レベニューシェア・プロフィットシェア対応",
    body: "一定の条件を満たせば収益連動型での開発が可能。初期費用を大幅に抑えてプロジェクトをスタートできます。",
  },
];

export default function SystemDevPage() {
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
              <li><a href="/#services">サービス</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><span aria-current="page">システム開発</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>システム開発</h1>
          <p className={s.pageSubCopy}>
            課題を深く理解した設計と、全工程自社完結の開発力で、低コスト・短納期・高品質なシステムを提供します。
          </p>
          <a href={CONTACT_URL} className={s.btnPrimary}>
            無料相談を予約する →
          </a>
        </div>
      </section>

      {/* Service Menus */}
      <section className={s.section}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>幅広い開発ニーズに対応します</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>以下に記載されていないものも、お気軽にご相談ください。</p>
          <ul className={s.menuGrid} role="list">
            {menus.map((m, i) => (
              <li key={m.name} className={`${s.menuCard} ${s.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.menuNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <h3 className={s.menuH3}>{m.name}</h3>
                <p className={s.menuBody}>{m.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className={s.featuresSection}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>PitDockが選ばれる理由</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>&nbsp;</p>
          <ul className={s.featureList} role="list">
            {features.map((f, i) => (
              <li key={f.num} className={`${s.featureItem} ${s.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className={s.featureNum} aria-hidden="true">{f.num}</span>
                <div className={s.featureContent}>
                  <h3 className={s.featureH3}>{f.title}</h3>
                  <p className={s.featureBody}>{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={s.footerCta}>
        <div className="container">
          <h2 className={s.footerCtaH2}>開発のご相談、まずはお気軽に。</h2>
          <p className={s.footerCtaSub}>
            要件が固まっていなくても大丈夫です。一緒に整理するところからサポートします。
          </p>
          <div className={`${s.ctaRow} ${s.ctaRowCenter}`}>
            <a href={CONTACT_URL} className={s.btnPrimary}>
              無料相談を予約する →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
