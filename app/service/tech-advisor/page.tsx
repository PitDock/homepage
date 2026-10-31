import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import SectionHeading from "../../components/sub/SectionHeading";
import CtaBand from "../../components/sub/CtaBand";
import s from "../../components/sub/sub.module.css";
import ta from "./tech-advisor.module.css";

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
    body: "CTOを正社員で採用する場合、年収800万円以上が相場です。PitDockの技術顧問サービスは月額2万円から始められます。最短3ヶ月契約なので、まず試してから継続を判断できます。",
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
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サービス", href: "/#services" },
          { label: "技術顧問" },
        ]}
        en={["Technical", "Advisory."]}
        title="技術顧問"
        lead={
          <>
            採用コストゼロ、雇用リスクゼロ。{"\n"}経営と技術の両方がわかるコンサルタントが、あなたの会社の意思決定を支えます。
          </>
        }
        actions={
          <a href={CONTACT_URL} className={s.btn}>
            まずは無料で相談する
          </a>
        }
      />

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading>技術顧問サービスとは</SectionHeading>
          <p className={s.body}>
            「技術のことは、社内に判断できる人間がいない」——その状況で、技術的な意思決定を迫られ続けていませんか。<br />
            PitDockの技術顧問サービスは、月額2万円からの固定費で、経営目線と技術目線を兼ね備えたコンサルタントがサポートします。<br />
            CTOを正社員で採用するコストと時間をかけずに、技術判断・開発会社との折衝・アーキテクチャ設計など、本来CTOが担う役割を必要な分だけ手に入れられます。<br />
            まずは3ヶ月から、試してみてください。
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading lead="ご要望に合わせて、必要な支援を組み合わせてご提供します。">主な提供サービス</SectionHeading>
          <ul className={s.grid3} role="list">
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

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading lead="まずは3ヶ月から、お気軽にお試しいただけます。">料金・契約について</SectionHeading>
          <table className={s.dataTable}>
            <tbody>
              {pricingRows.map((row) => (
                <tr key={row.label} className={s.dataRow}>
                  <th scope="row" className={s.dataLabel}>
                    {row.label}
                  </th>
                  <td className={s.dataValue}>
                    {row.isHighlight ? (
                      <span className={ta.priceWrap}>
                        <span className={ta.priceHighlight}>{row.value}</span>
                        {row.note && <span className={ta.priceNote}>（{row.note}）</span>}
                      </span>
                    ) : (
                      row.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.body}>
            CTOを正社員で採用する場合の年収相場は800万円以上。PitDockの技術顧問サービスは月額2万円から、最短3ヶ月からお試しいただけます。
          </p>
        </div>
      </section>

      <CtaBand
        heading="まずは無料で相談する"
        body="技術的な悩みを、気軽に相談してみてください。"
        href={CONTACT_URL}
        label="無料相談を予約する"
      />
    </SubPage>
  );
}
