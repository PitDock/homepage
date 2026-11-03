import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import SectionHeading from "../../components/sub/SectionHeading";
import CtaBand from "../../components/sub/CtaBand";
import s from "../../components/sub/sub.module.css";

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
    title: "全員がエンジニア兼コンサルタント",
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
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サービス", href: "/#services" },
          { label: "DX・AXコンサルティング" },
        ]}
        en={["DX / AX", "Consulting."]}
        title="DX・AXコンサルティング"
        lead={<>AIとデジタルの力で、事業の変革を加速する。{"\n"}お客様と一体になって課題に寄り添い、最新テクノロジーを駆使して根本から解決します。</>}
        actions={
          <a href={CONTACT_URL} className={s.btn}>
            無料相談を予約する
          </a>
        }
      />

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading lead="お客様の課題に合わせて最適なご支援を提供します。">支援内容</SectionHeading>
          <ul className={s.grid4} role="list">
            {menus.map((m, i) => (
              <li key={m.name} className={s.card}>
                <div className={s.cardNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={s.cardTitle}>{m.name}</h3>
                <p className={s.body}>{m.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading>PitDockが選ばれる理由</SectionHeading>
          <ul className={s.rowList} role="list">
            {features.map((f) => (
              <li key={f.num} className={s.rowItem}>
                <span className={s.rowNum} aria-hidden="true">
                  {f.num}
                </span>
                <div className={s.rowContent}>
                  <h3 className={s.rowTitle}>{f.title}</h3>
                  <p className={s.body}>{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="まずは、お気軽にご相談ください。"
        body="DX推進・AI活用など、どんな段階でもお声がけください。初回相談は無料です。"
        href={CONTACT_URL}
        label="無料相談を予約する"
      />
    </SubPage>
  );
}
