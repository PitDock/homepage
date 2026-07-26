"use client";

import { useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import s from "../../page.module.css";

const CONTACT_URL = "/contact";

const menus = [
  {
    name: "技術的意思決定のレビュー・助言",
    desc: "技術的な判断を下す際に、経営目線と技術目線の両方から客観的なレビューと助言を行います。",
  },
  {
    name: "技術選定・アーキテクチャ設計の相談",
    desc: "採用する技術スタックやシステム構成について、事業フェーズとコストのバランスを踏まえてご提案します。",
  },
  {
    name: "ベンダー・開発会社との折衝同席",
    desc: "外部の開発会社やベンダーとの打ち合わせに同席し、技術的な視点から適切な条件交渉をサポートします。",
  },
  {
    name: "定期ヒアリング・MTG",
    desc: "頻度・形式はご要望に合わせて柔軟に設定。月1回から複数回まで、オンライン・対面どちらも対応します。",
  },
  {
    name: "開発チームのコードレビュー・品質管理への助言",
    desc: "既存の開発チームのコードレビュー体制を整え、品質管理の仕組みづくりをサポートします。",
  },
  {
    name: "エンジニア採用・技術組織づくりへの助言",
    desc: "エンジニアの採用基準の策定から、技術組織のカルチャー・評価制度づくりまで幅広くご支援します。",
  },
];

const features = [
  {
    num: "01",
    title: "「経営×技術」の両目線",
    body: "エンジニア経験もあり、技術に精通したコンサルタントが担当。「技術は詳しいが経営はわからない」「経営はわかるが技術は外注任せ」という状態を解消します。",
  },
  {
    num: "02",
    title: "「実際に作れる」外部CTO",
    body: "提案するだけでなく、自分たちで実装できるチームが顧問を担当します。技術的に実現可能かどうかを、現場の感覚で判断できます。",
  },
  {
    num: "03",
    title: "月額2万円からのスモールスタート",
    body: "CTOを正社員で採用する場合、年収800万円〜以上が相場です。GOWSの技術顧問サービスは月額2万円から始められます。最短3ヶ月契約なので、まず試してから継続を判断できます。",
  },
];

const pricingRows = [
  {
    label: "月額費用",
    value: "2万円〜",
    isHighlight: true,
    note: "支援内容・頻度に応じてご提案",
  },
  {
    label: "最短契約期間",
    value: "3ヶ月",
    isHighlight: false,
    note: null,
  },
  {
    label: "MTGの頻度・形式",
    value: "月1回〜複数回、オンライン・対面どちらも対応",
    isHighlight: false,
    note: null,
  },
];

export default function TechAdvisorPage() {
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
              <li><span aria-current="page">技術顧問</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>
            技術顧問
          </h1>
          <p className={s.pageSubCopy}>
            採用コストゼロ、雇用リスクゼロ。{"\n"}経営と技術の両方がわかるコンサルタントが、あなたの会社の意思決定を支えます。
          </p>
          <a href={CONTACT_URL} className={s.btnPrimary}>
            まずは無料で相談する →
          </a>
        </div>
      </section>

      {/* Service Description */}
      <section className={s.section}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>技術顧問サービスとは</h2>
          <p className={`${s.advisorLead} ${s.reveal}`}>
            「技術のことは、社内に判断できる人間がいない」——その状況で、技術的な意思決定を迫られ続けていませんか。GOWSの技術顧問サービスは、月額2万円からの固定費で、経営目線と技術目線を兼ね備えたコンサルタントがサポートします。CTOを正社員で採用するコストと時間をかけずに、技術判断・開発会社との折衝・アーキテクチャ設計など、本来CTOが担う役割を必要な分だけ手に入れられます。まずは3ヶ月から、試してみてください。
          </p>
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>提供サービス</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>ご要望に合わせて、必要な支援を組み合わせてご提供します。</p>
          <ul className={s.menuGrid} role="list">
            {menus.map((m, i) => (
              <li key={m.name} className={`${s.menuCard} ${s.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.menuNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
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

      {/* Pricing */}
      <section className={s.serviceSection}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>料金・契約について</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>まずは3ヶ月から、お気軽にお試しいただけます。</p>
          <div className={`${s.advisorPricingWrap} ${s.reveal}`}>
            <table className={s.advisorTable}>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      {row.isHighlight ? (
                        <>
                          <span className={s.advisorPriceHighlight}>{row.value}</span>
                          {row.note && (
                            <span className={s.advisorPriceNote}>（{row.note}）</span>
                          )}
                        </>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${s.advisorCompareNote} ${s.reveal}`}>
            CTOを正社員で採用する場合の年収相場は800万円〜以上。GOWSの技術顧問サービスは月額2万円から、最短3ヶ月からお試しいただけます。
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={s.footerCta}>
        <div className="container">
          <h2 className={s.footerCtaH2}>まずは無料で相談する</h2>
          <p className={s.footerCtaSub}>
            技術的な悩みを、気軽に相談してみてください。
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
