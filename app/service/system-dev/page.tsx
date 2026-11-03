import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import SectionHeading from "../../components/sub/SectionHeading";
import CtaBand from "../../components/sub/CtaBand";
import s from "../../components/sub/sub.module.css";

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
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サービス", href: "/#services" },
          { label: "システム開発" },
        ]}
        en={["System", "Development."]}
        title="システム開発"
        lead={<>課題を深く理解した設計と、全工程自社完結の開発力で、低コスト・短納期・高品質なシステムを提供します。</>}
        actions={
          <a href={CONTACT_URL} className={s.btn}>
            無料相談を予約する
          </a>
        }
      />

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading lead="以下に記載されていないものも、お気軽にご相談ください。">幅広い開発ニーズに対応します</SectionHeading>
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
        heading="開発のご相談、まずはお気軽に。"
        body="要件が固まっていなくても大丈夫です。一緒に整理するところからサポートします。"
        href={CONTACT_URL}
        label="無料相談を予約する"
      />
    </SubPage>
  );
}
