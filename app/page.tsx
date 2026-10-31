import { Space_Grotesk, Zen_Kaku_Gothic_New } from "next/font/google";
import HomeHeader from "./components/home/HomeHeader";
import HomeFooter from "./components/home/HomeFooter";
import FvVideo from "./components/home/FvVideo";
import Ribbon from "./components/home/Ribbon";
import { CONSULT_URL } from "./components/home/links";
import s from "./home.module.css";
// ニュースデータは lib/data/news.ts で一元管理。/news ページでも同データを参照している。
import { news } from "../lib/data/news";
import { NOTE_URL, fetchLatestNoteArticles } from "../lib/data/note";

// note の RSS を定期的に取り直す（Next.js の制約で値はリテラルで書く。lib/data/note.ts の NOTE_REVALIDATE_SECONDS と揃える）
export const revalidate = 3600;

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  // 日本語フォントは容量が大きいため preload せず、表示時に必要な分だけ読み込ませる
  preload: false,
  variable: "--font-zen",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

const problems = [
  {
    icon: "/icons/icon-concept-tool.svg",
    heading: (
      <>
        ツールは入れた。<br className={s.spOnly} />
        でも、現場は動いていない。
      </>
    ),
    body: "研修もした。それでも業務は変わらず、「やらされ感」だけが残っている状態。",
  },
  {
    icon: "/icons/icon-concept-start.svg",
    heading: (
      <>
        AIを使いたい。<br className={s.spOnly} />
        でも、何から始めればいいか、<br className={s.spOnly} />
        わからない。
      </>
    ),
    body: "社員が個々にAIを触ってはいても、会社としての活用には至っていない。",
  },
  {
    icon: "/icons/icon-concept-invest.svg",
    heading: (
      <>
        投資はした。<br className={s.spOnly} />
        でも、何が変わったのか<br className={s.spOnly} />
        説明できない。
      </>
    ),
    body: "システムも導入した。コンサルも頼んだ。それでも数字として語れる変化がない。",
  },
  {
    icon: "/icons/icon-concept-consult.svg",
    heading: (
      <>
        技術の話ができる相談相手が、<br className={s.spOnly} />
        社内にいない。
      </>
    ),
    body: "CTOを雇う余裕はない。けれど、経営判断を技術抜きで下すには限界がある。",
  },
];

const reasons = [
  {
    heading: "現場に、本当に定着させる。",
    body: "単なるツールの選定・導入だけで終わらせず、業務フローを設計し、組織の動き方が変わるところまで伴走いたします。",
  },
  {
    heading: "AIを、原理から理解している。",
    body: "代表・小山は学生時代にAIを研究していました。流行りのツールを当てはめるのではなく、課題から逆算して設計します。",
  },
  {
    heading: "戦略から開発まで、ワンチームで。",
    body: "コンサルと開発会社の間で起きがちな「伝言ゲーム」。より合理的にプロジェクトが回るよう、構造的に整理します。",
  },
];

const services = [
  {
    name: "DXコンサルティング",
    desc: "紙やExcelの業務を、仕組みに。ツール選定から現場への定着まで伴走します。",
    tags: ["DX推進支援", "業務改善", "ツール導入"],
    illust: "/illustrations/illustration-dx.webp",
    href: "/service/dx-ax",
  },
  {
    name: "AXコンサルティング",
    desc: "AIを前提に、業務と事業を組み直す。戦略立案からAI導入、新規事業提案まで。",
    tags: ["AI導入", "生成AI活用", "新規事業"],
    illust: "/illustrations/illustration-ax.webp",
    href: "/service/dx-ax",
  },
  {
    name: "システム開発",
    desc: "要件定義から保守運用まで自社チームで一貫対応いたします。非効率な多重下請けもありません。",
    tags: ["Webアプリ", "業務システム"],
    illust: "/illustrations/illustration-dev.webp",
    href: "/service/system-dev",
  },
  {
    name: "技術顧問",
    desc: "CTOを採用する前に。月額2万円から経営＋技術目線で意思決定を支援いたします。",
    tags: ["外部CTO", "技術選定"],
    illust: "/illustrations/illustration-advisor.webp",
    href: "/service/tech-advisor",
  },
];

const companyInfo = [
  { label: "社名", value: ["PitDock株式会社"] },
  { label: "代表者", value: ["小山 望海"] },
  { label: "事業内容", value: ["DX・AXを中心としたITコンサルティング", "システム開発", "自社プロダクトの開発・運営"] },
  { label: "所在地／設立", value: ["〒150-0045", "東京都渋谷区神泉町10-15-301"] },
];

// 日付の新しい順に最新4件（全件は /news ページで確認できる）
const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 4);

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={s.secHeading}>
      <img src="/brand/p-mark.svg" alt="" className={s.pMark} width={36} height={30} />
      <span>{children}</span>
    </h2>
  );
}

export default async function Home() {
  const noteArticles = await fetchLatestNoteArticles(4);

  return (
    <div className={`${s.page} ${zenKaku.variable} ${spaceGrotesk.variable}`}>
      <HomeHeader />
      <Ribbon />

      <main className={s.main}>
        {/* FV */}
        <section className={s.fv} data-ribbon-anchor="0" aria-labelledby="fv-heading">
          <div className={`${s.inner} ${s.fvInner}`}>
            <h1 id="fv-heading" className={s.fvCatch}>
              課題を分解し、
              <br />
              噛み合わせ、また走り始める。
            </h1>
            <p className={s.fvLead}>
              DXも、AI活用も、正しい部品を正しい順番で組み上げなければ動き出しません。PitDock株式会社は、戦略の設計から実装、現場に根づくまでを一気通貫で伴走する、DX・AX（AIトランスフォーメーション）の専門チームです。
            </p>
            <div className={s.fvVideoWrap}>
              <FvVideo />
            </div>
          </div>
        </section>

        {/* Concept */}
        <section className={s.section} data-ribbon-anchor="1" aria-labelledby="concept-heading">
          <div className={`${s.inner} ${s.conceptInner}`}>
            <div className={s.conceptCatch}>
              <p className={s.bt} lang="en">
                <span className={s.btPit}>Business</span> <span className={s.btDock}>Transformation.</span>
              </p>
              <div className={s.conceptLead}>
                <h2 id="concept-heading" className={s.conceptHeading}>
                  ただのシステム化・<br className={s.spOnly} />
                  AI化ではなく、<br className={s.spOnly} />
                  根本から変えること。
                </h2>
                <p className={s.body}>
                  やみくもにAIツールを導入しただけでは、現場は変わりません。業務のやり方から事業のあり方まで、根本から見直して、現場に根づく形で変える。それが私たちのトランスフォーメーションです。
                </p>
              </div>
            </div>

            <ul className={s.problemGrid} role="list">
              {problems.map((p) => (
                <li key={p.icon} className={s.problem}>
                  <div className={s.problemHead}>
                    <img src={p.icon} alt="" className={s.problemIcon} width={60} height={60} />
                    <h3 className={s.problemHeading}>{p.heading}</h3>
                  </div>
                  <p className={s.body}>{p.body}</p>
                  <a href={CONSULT_URL} className={s.textLink}>
                    詳しく相談する
                  </a>
                </li>
              ))}
            </ul>

            <div className={s.block}>
              <div className={s.secHead}>
                <SectionHeading>
                  なぜ、PitDockが
                  <br className={s.spOnly} />
                  選ばれるのか。
                </SectionHeading>
                <p className={s.body}>私たちがいちばん、大切にしていること。責任を持って、お取り組みいたします。</p>
              </div>
              <ul className={s.reasonGrid} role="list">
                {reasons.map((r) => (
                  <li key={r.heading} className={s.reasonCard}>
                    <h3 className={s.reasonHeading}>✓ {r.heading}</h3>
                    <p className={s.body}>{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className={s.section} data-ribbon-anchor="2" aria-labelledby="services-heading">
          <div className={`${s.inner} ${s.block}`}>
            <div className={s.secHead}>
              <SectionHeading id="services-heading">
                クライアントの課題に
                <br className={s.spOnly} />
                合わせて、最適な形で
                <br className={s.spOnly} />
                関わります。
              </SectionHeading>
              <p className={s.body}>
                戦略づくりから開発、技術判断のサポートまで。フェーズや体制に合わせて、関わり方を選べます。
              </p>
            </div>
            <ul className={s.serviceGrid} role="list">
              {services.map((sv) => (
                <li key={sv.name} className={s.serviceCard}>
                  <h3 className={s.cardTitle}>{sv.name}</h3>
                  <p className={s.body}>{sv.desc}</p>
                  <ul className={s.tags} role="list" aria-label="対応内容">
                    {sv.tags.map((t) => (
                      <li key={t} className={s.tag}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className={s.serviceIllust}>
                    <img src={sv.illust} alt="" width={180} height={124} loading="lazy" />
                  </div>
                  <a href={sv.href} className={s.cardLink} aria-label={`${sv.name}の詳細を見る`}>
                    詳細を見る →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Note */}
        <section id="note" className={s.section} data-ribbon-anchor="3" aria-labelledby="note-heading">
          <div className={`${s.inner} ${s.noteInner}`}>
            <div className={s.secHead}>
              <SectionHeading id="note-heading">
                PitDockの考えや取り組みを、
                <br className={s.spOnly} />
                発信しています。
              </SectionHeading>
              <p className={s.body}>
                技術やAIの話から、プロジェクトで得た気づきまで。PitDockのいまを、noteで綴っています。
              </p>
            </div>
            {noteArticles.length > 0 ? (
              <ul className={s.noteGrid} role="list">
                {noteArticles.map((a) => (
                  <li key={a.url}>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className={s.noteCard}>
                      <div className={s.noteThumb}>
                        {a.thumbnail ? (
                          <img src={a.thumbnail} alt="" loading="lazy" />
                        ) : (
                          // サムネイル未設定の記事は、Tint の面に P マークを置いて代替する
                          <img src="/brand/p-mark.svg" alt="" className={s.noteThumbFallback} />
                        )}
                      </div>
                      <div className={s.noteBody}>
                        <p className={s.noteTitle}>{a.title}</p>
                        <time className={s.noteDate} dateTime={a.date.replace(/\./g, "-")}>
                          {a.date}
                        </time>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={s.body}>記事を読み込めませんでした。noteで最新の記事をご覧ください。</p>
            )}
            <div>
              <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className={s.btn}>
                noteで記事をもっと読む
              </a>
            </div>
          </div>
        </section>

        {/* Company */}
        <section id="company" className={s.section} data-ribbon-anchor="4" aria-labelledby="company-heading">
          <div className={`${s.inner} ${s.companyInner}`}>
            <div className={s.profile}>
              <img
                src="/images/photo-ceo.webp"
                alt="代表取締役 小山 望海"
                className={s.profilePhoto}
                width={244}
                height={225}
                loading="lazy"
              />
              <h2 id="company-heading" className={s.profileHeading}>
                「技術」を原理から
                <br className={s.spOnly} />
                理解しているから、
                <br className={s.spOnly} />
                「事業」の話ができる。
              </h2>
              <div className={s.profileText}>
                <p className={s.body}>
                  DXやAX（AIトランスフォーメーション）は、一朝一夕には成し遂げられません。技術の選定、業務プロセスの再設計、組織の変化、そして現場への定着――いくつもの壁を越えて、初めて成果になります。
                  <br className={s.pcOnly} />
                  私自身、学生時代にAIの研究をしていました。PitDockのメンバーも、AIの仕組みを原理から理解した上で、目の前の事業に何ができるかを具体的に設計します。流行りのツールを当てはめるのではなく、課題から逆算する。その姿勢を、これからも変えるつもりはありません。
                </p>
                <p className={s.profileName}>
                  <span>代表取締役 / CEO</span>
                  <span>小山 望海（KOYAMA Nozomi）</span>
                </p>
              </div>
            </div>
            <dl className={s.infoTable}>
              {companyInfo.map((row) => (
                <div key={row.label} className={s.infoItem}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.value.map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* News */}
        <section id="news" className={s.section} data-ribbon-anchor="5" aria-labelledby="news-heading">
          <div className={s.inner}>
            <SectionHeading id="news-heading">最新のお知らせ</SectionHeading>
            <ul className={s.newsList} role="list">
              {latestNews.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.url}
                    className={s.newsRow}
                    {...(isExternalUrl(n.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <time className={s.newsDate} dateTime={n.date.replace(/\./g, "-")}>
                      {n.date}
                    </time>
                    <span className={s.newsCategory}>{n.tags[0]}</span>
                    <span className={s.newsTitle}>{n.title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="/news" className={s.btn}>
              すべてのお知らせを見る
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={s.contact} data-ribbon-anchor="6" aria-labelledby="contact-heading">
          <div className={`${s.inner} ${s.contactInner}`}>
            <div className={s.contactText}>
              <h2 id="contact-heading" className={s.contactHeading}>
                「なにをするか」が
                <br className={s.spOnly} />
                決まっていなくても、
                <br className={s.spOnly} />
                ご相談ください。
              </h2>
              <p className={s.contactBody}>
                まずは、一緒に整理するところから始めましょう。ヒアリングから提案まで、初回のご相談は無料です。
              </p>
            </div>
            <div>
              <a href={CONSULT_URL} className={s.btnWhite}>
                無料相談を予約する
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
