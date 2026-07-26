"use client";

import { useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import s from "../../page.module.css";

const CONTACT_URL = "/contact";

const menus = [
  {
    name: "DX推進支援",
    desc: "業務フローの整理・データ分析から課題を明確にし、企業全体の持続的な成長を促進するDX戦略を策定・推進します。",
  },
  {
    name: "AI導入支援",
    desc: "生成AIを組み込んだシステム導入や既存AIツール活用、AI開発の内製化、社内AIリテラシー向上まで幅広くサポートします。",
  },
  {
    name: "ITサービス立ち上げ・運営支援",
    desc: "新規事業・スマートフォンアプリを企画立案からPoC・戦略構築・開発・運用まで一貫してサポートします。",
  },
  {
    name: "補助金・助成金コンサルティング",
    desc: "申請サポートで採択率を高め、IT投資コストを大幅に削減します。",
  },
];

const features = [
  {
    num: "01",
    title: "課題の本質を特定して解決",
    body: "経営状況・業務フロー・データ分析から課題を深掘りし、根本原因に対して最適で費用対効果の高いソリューションを提案します。",
  },
  {
    num: "02",
    title: "全員がエンジニアのコンサルタント",
    body: "コンサルタント全員がエンジニアとしても豊富な経験を持ち、経営・業務・システムの三方向から複合的な視点で課題解決にあたります。",
  },
  {
    num: "03",
    title: "中立的なビジネスパートナー",
    body: "特定製品・ベンダーに依存しない中立的な立場で、業務改善や新たなビジネス創造に貢献します。",
  },
  {
    num: "04",
    title: "一気通貫・ワンストップ対応",
    body: "コンサルティング・グランドデザインから要件定義・開発・保守・運用まで全フェーズを自社内で完結。下請けに丸投げしないため、コストとコミュニケーションロスを最小化します。",
  },
];

export default function DxAxPage() {
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
              <li><span aria-current="page">DX・AXコンサルティング</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>DX・AXコンサルティング</h1>
          <p className={s.pageSubCopy}>
            AIとデジタルの力で、事業の変革を加速する。{"\n"}お客様と一体になって課題に寄り添い、最新テクノロジーを駆使して根本から解決します。
          </p>
          <a href={CONTACT_URL} className={s.btnPrimary}>
            無料相談を予約する →
          </a>
        </div>
      </section>

      {/* Service Menus */}
      <section className={s.section}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>支援内容</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>お客様の課題に合わせて最適なご支援を提供します。</p>
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
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>GOWSが選ばれる理由</h2>
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
          <h2 className={s.footerCtaH2}>まずは、お気軽にご相談ください。</h2>
          <p className={s.footerCtaSub}>
            DX推進・AI活用など、どんな段階でもお声がけください。初回相談は無料です。
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
