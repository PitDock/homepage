import SiteHeader from "./components/site/SiteHeader";
import SiteFooter from "./components/site/SiteFooter";
import FvVideo from "./components/home/FvVideo";
import Ribbon from "./components/home/Ribbon";
import { CONSULT_URL } from "./components/site/links";
import { brandFontVariables } from "./fonts";
import s from "./home.module.css";
// ニュースデータは lib/data/news.ts で一元管理。/news ページでも同データを参照している。
import { news } from "../lib/data/news";
import { NOTE_URL, fetchLatestNoteArticles } from "../lib/data/note";

// note の RSS を定期的に取り直す（Next.js の制約で値はリテラルで書く。lib/data/note.ts の NOTE_REVALIDATE_SECONDS と揃える）
export const revalidate = 3600;

const problems = [
  {
    icon: "/icons/icon-concept-tool.svg",
    heading: (
      <>
        ツールは入れた。<br className={s.spOnly} />
        でも、現場は動いていない。
      </>
    ),
    body: "研修もした。それでも業務は変わらず、「やらされ感」だけが残っている。",
  },
  {
    icon: "/icons/icon-concept-start.svg",
    heading: (
      <>
        AIを使いたい。<br className={s.spOnly} />
        でも、何から始めれば良いか<br className={s.spOnly} />
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
    body: "システムも導入した。外部の支援も受けた。それでも目に見える変化がない。",
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
    heading: "戦略構築から実行まで一気通貫。",
    body: "戦略を立てたチームが、そのままツール導入やシステム開発、現場への定着、公開の検証まで担当します。多重下請けによる不要な\"伝言ゲーム\"や無駄なマージンが発生しません。",
  },
  {
    heading: "経営・業務と技術、両方の目線で考える。",
    body: "コンサルタントが技術を熟知した上で、課題の本質を改善する戦略を立てます。流行りのツールを当てはめるのではなく、「何を実現したいか」から逆算して設計します。",
  },
  {
    heading: "小さく始めて、走りながら広げる。",
    body: "まず一部の業務や機能から試し、効果を確かめてから広げます。ご予算に合わせて進め方を調整します。補助金の申請もサポートいたします。",
  },
];

const services = [
  {
    name: "DXコンサルティング",
    desc: "事業・サービスの変革から業務フローの見直し、ツール選定、現場への定着まで伴走します。",
    tags: ["DX推進支援", "業務改善", "ツール導入"],
    illust: "/illustrations/illustration-dx.webp",
    href: "/service/dx-ax",
  },
  {
    name: "AXコンサルティング",
    desc: "どこにAIが効くかの見極めから、活用方針づくり、導入・定着まで支援します。",
    tags: ["AI導入", "生成AI", "AI駆動開発"],
    illust: "/illustrations/illustration-ax.webp",
    href: "/service/dx-ax",
  },
  {
    name: "システム開発",
    desc: "要件整理から開発・保守運用まで、自社で一貫して対応します。下請けへの丸投げはしません。",
    tags: ["Webアプリ", "スマホアプリ", "AI機能"],
    illust: "/illustrations/illustration-dev.webp",
    href: "/service/system-dev",
  },
  {
    name: "技術顧問",
    desc: "開発会社の見積の妥当性やIT投資の判断を、経営と技術の両方の目線でサポートします。月額2万円〜。",
    tags: ["外部CTO"],
    illust: "/illustrations/illustration-advisor.webp",
    href: "/service/tech-advisor",
  },
];

const companyInfo = [
  { label: "社名", value: ["PitDock株式会社"] },
  { label: "代表者", value: ["小山 望海"] },
  { label: "事業内容", value: ["DX・AXコンサルティング", "システム開発", "技術顧問", "自社プロダクトの開発・運営"] },
  { label: "所在地", value: ["〒150-0045", "東京都渋谷区神泉町10-15-301"] },
  { label: "設立", value: ["2024年4月8日"] },
];

// 日付の新しい順に最新5件（全件は /news ページで確認できる）
const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 5);

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
    <div className={`${s.page} ${brandFontVariables}`}>
      <SiteHeader />
      <Ribbon />

      <main className={s.main}>
        {/* FV */}
        <section className={s.fv} data-ribbon-anchor="0" aria-labelledby="fv-heading">
          <div className={`${s.inner} ${s.fvInner}`}>
            <h1 id="fv-heading" className={s.fvCatch}>
              テクノロジーを味方に
              <br className={s.spOnly} />
              走り続ける
            </h1>
            <p className={s.fvLead}>
              PitDockは、DX・AXコンサルティングやシステム開発を通じて、
              <br className={s.pcOnly} />
              お客様が成長し続けるための変革を共に進めるパートナーです。
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
                  ただのシステム化やAI化のような<br className={s.spOnly} />小手先ではない、<br className={s.pcOnly} />真の変革を支援します。
                </h2>
                <p className={s.body}>
                  システムやAIを導入するだけでは、会社は変わりません。事業・業務を見直し、課題の根本を解決する。そして、変わり続けられる会社になる。それが、私たちの考えるトランスフォーメーションです。
                </p>
              </div>
            </div>

            <div className={s.block}>
              <div className={s.secHead}>
                <SectionHeading>
                  PitDockが
                  <br className={s.spOnly} />
                  大切にしていること
                </SectionHeading>
                <p className={s.body}>ゴールはシステムやツールの導入ではなく、IT投資に見合った成果が出ること</p>
              </div>
              <ul className={s.reasonGrid} role="list">
                {reasons.map((r) => (
                  <li key={r.heading} className={s.reasonCard}>
                    <h3 className={s.reasonHeading}>
                      <span className={s.reasonCheck} aria-hidden="true">
                        ✓
                      </span>
                      <span>{r.heading}</span>
                    </h3>
                    <p className={s.body}>{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.block}>
              <div className={s.secHead}>
                <SectionHeading>
                  こんなところで
                  <br className={s.spOnly} />
                  立ち止まっていませんか。
                </SectionHeading>
              </div>
              <ul className={s.problemGrid} role="list">
                {problems.map((p) => (
                  <li key={p.icon} className={s.problem}>
                    <div className={s.problemHead}>
                      <img src={p.icon} alt="" className={s.problemIcon} width={60} height={60} />
                      <h3 className={s.problemHeading}>{p.heading}</h3>
                    </div>
                    <p className={s.body}>{p.body}</p>
                  </li>
                ))}
              </ul>
              {/* 各項目ごとではなく、一覧の最後にまとめて 1 つ置く */}
              <div>
                <a href={CONSULT_URL} className={s.btn}>
                  詳しく相談する
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className={s.section} data-ribbon-anchor="2" aria-labelledby="services-heading">
          <div className={`${s.inner} ${s.block}`}>
            <div className={s.secHead}>
              <SectionHeading id="services-heading">
                サービス
              </SectionHeading>
              <p className={s.body}>
                戦略構築から開発、技術判断のサポートまで。目指す姿やフェーズとご予算に応じて柔軟に対応します。
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

        {/* Column */}
        <section id="column" className={s.section} data-ribbon-anchor="3" aria-labelledby="note-heading">
          <div className={`${s.inner} ${s.noteInner}`}>
            <div className={s.secHead}>
              <SectionHeading id="note-heading">
                コラム
              </SectionHeading>
              <p className={s.body}>
                DX・AIを経営・業務の目線で、進め方のポイントや、発注する側が知っておきたいことをnoteで発信しています。
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
                すべての企業が、
                <br className={s.spOnly} />
                テクノロジーを味方にできる社会へ。
              </h2>
              <div className={s.profileText}>
                <p className={s.body}>
                  DXやAXは、ツールを入れて終わりではありません。課題の深掘り、分析、業務の再設計、技術の選定、組織の変化、現場への定着など、いくつもの壁を越えて初めて成果になります。
                  <br className={s.pcOnly} />
                  私は大学院でAIを研究したあと、ITコンサルタントとして多くのプロジェクトに携わってきました。そこで感じたのは、せっかくのIT投資が投資額に見合った成果に結びついていないケースが多いということ、多くの中小企業が予算や人員不足が原因で遅れをとっていることです。
                  <br className={s.pcOnly} />
                  PitDockは、ただシステム化したり流行りのツールを当てはめるのではなく、「何が本当の課題なのか」「何をするべきなのか」を徹底的に掘り下げます。やるべきではないIT投資は率直にお伝えします。会社の規模にかかわらず、すべての企業がテクノロジーを味方に走り続けられるよう、共に歩むパートナーであり続けます。
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
                    {/* タグが複数あるときは 1 行に 1 つずつ並べる */}
                    <span className={s.newsCategory}>
                      {n.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
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

      <SiteFooter ribbonAnchor="7" />
    </div>
  );
}
