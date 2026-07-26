import Nav from "../components/Nav";
import Footer from "../components/Footer";
import s from "../page.module.css";
import ps from "./privacy.module.css";

const policies: {
  heading: string;
  body?: string;
  subItems?: { label?: string; text: string }[];
}[] = [
  {
    heading: "個人情報の定義",
    body: "「個人情報」とは、個人情報保護法における「個人情報」を意味し、生存する個人に関する情報であって、次のいずれかに該当するものをいう。",
    subItems: [
      {
        text: "当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することができ、それによって特定の個人を識別することができることとなるものを含む。）",
      },
      { text: "個人識別符号が含まれるものをいう。" },
    ],
  },
  {
    heading: "法令、国が定める指針その他の規範の遵守について",
    body: "個人情報の取扱いについて、個人情報保護に関する法令、国が定める指針、その他行政機関（およびこれに準じる機関）が定める規範、ガイドラインを遵守します。",
  },
  {
    heading: "個人情報の取得・利用について",
    subItems: [
      {
        label: "個人情報の取得",
        text: "弊社は、業務の円滑な遂行のため、必要に応じて、ご本人の氏名、生年月日、電話番号、メールアドレス、住所等の個人情報を取得させていただきます。",
      },
      {
        label: "個人情報の利用",
        text: "弊社が取得するご本人の個人情報は、利用目的を明確にした上で、目的の範囲内において利用させていただきます。",
      },
      {
        label: "法令等の遵守",
        text: "弊社が保有する個人情報に関して適用される法令、規範を遵守します。",
      },
      {
        label: "個人情報の取扱いの改善と見直し",
        text: "弊社は、個人情報保護に関する管理の体制と仕組みについて継続的改善を実施します。",
      },
    ],
  },
  {
    heading: "利用目的",
    body: "弊社が取得した個人情報の利用目的は、下記の通りとします。",
    subItems: [
      { text: "お問い合わせに対する回答・ご相談の予約" },
      { text: "ご相談をお受けするにあたっての利益相反等の確認" },
      { text: "各種資料やご案内の送付" },
      { text: "サービス及び業務の改善等" },
      { text: "サービスの保守・管理業者への個人情報を特定しない方法による問い合わせ状況の報告" },
      { text: "個人情報を特定しない統計的な情報として集約し公表すること" },
      { text: "電子メールの配信" },
    ],
  },
  {
    heading: "個人情報の第三者への開示",
    body: "弊社は、取得させていただいた個人情報は、ご本人の事前の同意なく第三者に対して開示することはありません。ただし、次の場合には、ご本人の事前の同意なく、取得した個人情報を開示できるものとします。",
    subItems: [
      { text: "法令に基づき開示を求められた場合" },
      { text: "弊社、他のご本人またはその他の第三者の権利、利益、名誉、信用等を保護するために必要であると判断した場合" },
      { text: "ご本人が自分の個人情報の開示を事前に承諾した場合" },
    ],
  },
  {
    heading: "個人情報の管理について",
    body: "弊社は、ご提供いただいた個人情報の漏えい、滅失、毀損、不正アクセス等がないよう、合理的な安全対策を講じます。また、万が一、問題が発生した場合は、速やかに是正措置を講じます。\n弊社は、個人情報に関して、ご本人様から当該個人情報の開示、訂正、削除、利用または提供について何らかの要請を受けた場合、誠実に対応いたします。",
  },
  {
    heading: "変更及び通知について",
    body: "弊社は、このプライバシーポリシーの内容を、事前の予告なく変更することがあります。ご本人へその都度ご連絡はいたしかねますので、ご利用の際には本ページの最新の内容をご参照ください。",
  },
  {
    heading: "事業者の情報",
    body: "名称：GOWS合同会社\n代表者：小山 望海",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />

      {/* Page Hero */}
      <section className={s.pageHero}>
        <div className={`container ${ps.pageHeroInner}`}>
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li><a href="/">ホーム</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><span aria-current="page">プライバシーポリシー</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>プライバシーポリシー</h1>
        </div>
      </section>

      {/* Policy Content */}
      <section className={s.section}>
        <div className="container">
          <div className={ps.contentWrap}>
            <p className={ps.meta}>
              2024年4月8日制定<br />
              2026年3月22日最終改訂<br />
              GOWS合同会社<br />
              代表　小山 望海
            </p>

            <hr className={ps.divider} />

            <p className={ps.lead}>
              GOWS合同会社（以下、弊社といいます。）は、個人情報の保護は弊社が事業活動を行うにあたっての基礎であるとともに、弊社の社会的責任であると認識しております。<br />
              弊社は、弊社の製品やサービスに関する情報をはじめ、お客様からご提供いただいた個人情報等、多種多様な情報を取り扱っております。<br />
              弊社は個人情報保護について、関連規程の制定及び管理体制の確立を図るとともに、以下のとおりプライバシーポリシー（以下、本ポリシーといいます。）を定め、弊社役員及び従業員に周知徹底し、本ポリシーに従って個人情報を適切に利用、管理及び保護することといたします。
            </p>

            <ol className={ps.policyList}>
              {policies.map((p) => (
                <li key={p.heading} className={ps.policyItem}>
                  <h2 className={ps.policyHeading}>{p.heading}</h2>
                  {p.body && (
                    <p className={ps.policyBody} style={{ whiteSpace: "pre-line" }}>
                      {p.body}
                    </p>
                  )}
                  {p.subItems && (
                    <ol className={ps.subList}>
                      {p.subItems.map((sub, idx) => (
                        <li key={idx} className={ps.subItem}>
                          {sub.label && <strong>{sub.label}</strong>}
                          {sub.text}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
