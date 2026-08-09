"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";
import s from "./page.module.css";
// ニュースデータは lib/data/news.ts で一元管理。/news ページでも同データを参照している。
import { news } from "../lib/data/news";
import type { NewsEntry } from "../lib/data/news";

const CONTACT_URL = "/contact";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COUNT = 80;
    const MAX_DIST = 120;

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,142,247,${0.22 * (1 - d / MAX_DIST)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(79,142,247,0.65)";
        ctx.arc(pts[i].x, pts[i].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={s.particleCanvas} aria-hidden="true" />;
}

// 課題カード
const cardAccents = ["#4F8EF7", "#8B5CF6", "#06B6D4", "#10B981"];

const problems = [
  {
    heading: "DXに取り組んでいるのに、現場が動いてくれない",
    body: "ツールは入れた。研修もした。でも業務は変わらない。ただIT化しただけ、「やらされ感」だけが漂っている。",
    tag: "DX戦略立案・ロードマップ設計",
  },
  {
    heading: "AIを使いたいが、どう使えばいいかがわからない",
    body: "社員が各々AIを使ったりはしているが、会社としてAIを有効活用しきれていない。社内の業務に当てはめると、どこに使えるのか、効果がちゃんと出るのか判断できない。",
    tag: "AX（AIトランスフォーメーション）支援",
  },
  {
    heading: "ITに投資したのに、何が変わったのかわからない",
    body: "システムを入れた。コンサルにも頼んだ。でも売上も業務効率も、正直あまり変わっていない。何にお金を使ったのか、説明できない。",
    tag: "DX・AX戦略設計",
  },
  {
    heading: "技術と経営を両立できる相談相手がいない",
    body: "CTOを雇う余裕はない。でも技術判断を経営者だけでするには限界がある。",
    tag: "技術顧問",
  },
];

// サービスカード
const serviceGlows = [
  "radial-gradient(ellipse at top left, rgba(79,142,247,0.18) 0%, transparent 65%)",
  "radial-gradient(ellipse at top left, rgba(139,92,246,0.18) 0%, transparent 65%)",
  "radial-gradient(ellipse at top left, rgba(6,182,212,0.15) 0%, transparent 65%)",
  "amber",
];

type Service = {
  name: string;
  desc: string;
  tags: string[];
  cta: string;
  href: string;
};

const services: Service[] = [
  {
    name: "DX・AXコンサルティング",
    desc: "ただの\"IT化\"で終わらせない。DX戦略の立案からAI導入・新規事業支援まで、技術にも精通した経験豊富なコンサルタントがビジネスパートナーとして伴走します。",
    tags: ["DX推進支援", "AI導入", "新規事業", "補助金申請"],
    cta: "詳細を見る",
    href: "/service/dx-ax",
  },
  {
    name: "システム開発",
    desc: "要件定義から保守・運用まで全フェーズを自社内で完結。多重下請け構造を排除し、低コスト・短納期・高品質なシステムを直接お届けします。",
    tags: ["Webアプリ", "業務システム", "モバイルアプリ", "API開発"],
    cta: "詳細を見る",
    href: "/service/system-dev",
  },
  {
    name: "技術顧問",
    desc: "採用しなくていい、CTOレンタル。月額2万円からの固定費で、経営目線と技術目線を兼ね備えたコンサルタントがあなたの技術判断を支えます。",
    tags: ["外部CTO", "技術選定", "ベンダー折衝"],
    cta: "詳細を見る",
    href: "/service/tech-advisor",
  },
  {
    name: "自社プロダクト",
    desc: "現場の知見と日常の課題から生まれたサービスを複数展開。PitDockの開発力は自社プロダクトで証明されています。延べ1,000名以上のユーザーに使われています。",
    tags: ["iOS", "Android", "自社開発"],
    cta: "プロダクトを見る",
    href: "/service/products",
  },
];

// 強みカードデータ
type StrengthCard = {
  accentColor: string;
  glowColor: string;
  heading: string;
  body: string;
  points: string[];
};

const strengthCards: StrengthCard[] = [
  {
    accentColor: "#06B6D4",
    glowColor: "rgba(6,182,212,0.08)",
    heading: "ツールを入れて終わりにしない。",
    body: "「システムを導入したのに、現場が使ってくれない」「デジタル化したのに、業務が変わらない、会社の成長に繋がらない」——これはツールの問題ではなく、変革の進め方の問題です。PitDockのDX支援は、ツールの選定・導入にとどまりません。現場の業務フロー・組織の動き方・人の意識まで変えることを前提に伴走します。",
    points: [
      "戦略・ロードマップ設計から着手し、現場定着まで伴走",
      "定着・活用状況をモニタリングしてPDCAを回す",
      "業務変革・組織変革の観点からも提言",
    ],
  },
  {
    accentColor: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.08)",
    heading: "AIで何ができるか、具体的に答えられる。",
    body: "代表の小山は学生時代、AIの研究をしていました。代表だけでなくPitDockのメンバーはAIの仕組みを原理から理解した上で、「あなたのビジネスに対してAIでどのような効果が出せるか」を具体的に設計します。流行のツールを当てはめるのではなく、課題から逆算してAIの活用方法を設計します。",
    points: [
      "ただ流行に乗るだけではないAI活用",
      "AI活用業務設計から具体的な実装まで担う",
      "多くのAI経験をもとにご提案",
    ],
  },
  {
    accentColor: "#10B981",
    glowColor: "rgba(16,185,129,0.08)",
    heading: "「何をつくるか」から、一緒に考えます。",
    body: "コンサルが出した戦略を開発会社が理解しきれない、開発の制約をコンサルが把握していなかった——この分断が、手戻り・追加費用の原因になります。PitDockは、戦略策定から要件定義・設計・開発・運用まで、すべてを自社内のチームが担当します。",
    points: [
      "戦略→要件定義→設計→開発→運用をワンチームで担当",
      "コンサルと開発の「伝言ゲーム」「認識のズレ」を構造的に排除",
      "何も決まっていない段階からでも一緒に考えていきます",
    ],
  },
];

// サブカードデータ
const strengthSubCards = [
  {
    icon: "🕐",
    heading: "お客様のペースに合わせて動きます。",
    body: "夜間・土日の打ち合わせにも対応します。全国どこでもリモートで対応可能です（必要に応じて現地対応も可）。平日昼間に時間を取りにくい経営者や、一般企業とは稼働時間が異なる業種、リソースが限られたスタートアップにも柔軟に対応します。",
  },
  {
    icon: "🏭",
    heading: "業界の商習慣・規制を理解した上で提案します。",
    body: "金融・小売・EC・教育・イベント・製造・エンタメ・飲食・人材など、多岐に渡る業種での支援実績があります。それぞれの業界特有の制約や商習慣を踏まえた上で、最適な提案が可能です。",
  },
];

function isExternalNewsUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

// トップページは最新6件のみ表示（全件は /news ページで確認できる）
const newsSortedByIdDesc = [...news].sort((a, b) => b.id - a.id).slice(0, 6);

function NewsHomeCard({ n, i, external }: { n: NewsEntry; i: number; external: boolean }) {
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
      style={{ transitionDelay: `${i * 0.1}s` }}
      data-expanded={expanded ? "true" : "false"}
    >
      <a
        href={n.url}
        className={s.newsCardLink}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <ul className={s.newsTagList} role="list" aria-label="カテゴリ">
          {n.tags.map((t, ti) => (
            <li key={`${n.title}-${ti}-${t}`} className={s.newsTag}>
              {t}
            </li>
          ))}
        </ul>
        <span className={s.newsDate}>{n.date}</span>
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

export default function Home() {
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

      {/* Hero */}
      <section className={s.hero}>
        <ParticleCanvas />
        <div className={s.heroOrb} aria-hidden="true" />
        <div className={`container ${s.heroBody}`}>
          <h1 className={s.heroH1}>
            テクノロジーの最前線で、<br />課題を解く。
          </h1>
          <p className={s.heroSub}>
            AIを『使う』時代から、AIで『事業を作り変える』時代へ。PitDockは、DX・AX（AI Transformation）の専門チームとして、戦略立案から実装・運用まであなたの変革に伴走します。
          </p>
          <div className={s.ctaRow}>
            <a href={CONTACT_URL} className={s.btnPrimary}>
              まずは相談してみる（無料）
            </a>
            <a href="#services" className={s.btnGhost}>サービスを見る</a>
          </div>
        </div>
        {/* スクロールプロンプト */}
        <div className={s.scrollPrompt} aria-hidden="true">↓</div>
      </section>

      {/* 課題セクション */}
      <section className={s.section} id="problems">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>こんなお悩み、ありませんか？</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>PitDockは、戦略立案から実装・運用まで一気通貫で伴走します。</p>
          <ul className={s.cardGridFour} role="list">
            {problems.map((p, i) => (
              <li
                key={p.heading}
                className={`${s.problemCard} ${s.reveal}`}
                style={
                  {
                    "--card-accent": cardAccents[i],
                    transitionDelay: `${i * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                <div className={s.cardNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={s.cardH3}>{p.heading}</h3>
                <p className={s.cardBody}>{p.body}</p>
                <span className={s.tag}>{p.tag}</span>
              </li>
            ))}
          </ul>
          <div className={`${s.midCta} ${s.reveal}`}>
            <a href={CONTACT_URL} className={s.btnPrimary}>
              あなたの課題を無料で相談する →
            </a>
          </div>
        </div>
      </section>

      {/* サービス詳細 */}
      <section className={s.serviceSection} id="services">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>事業内容</h2>
          <p className={`${s.sectionSub} ${s.reveal}`}>戦略立案からプロダクト運営まで、ITで事業成長を支援します。</p>
          <ul className={s.cardGridFour} role="list">
            {services.map((sv, i) => (
              <li
                key={sv.name}
                className={`${s.serviceCard} ${s.reveal}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-glow={serviceGlows[i]}
              >
                <div
                  className={s.serviceCardGlow}
                  style={{ background: serviceGlows[i] === "amber" ? "radial-gradient(ellipse at top left, rgba(245,158,11,0.13) 0%, transparent 65%)" : serviceGlows[i] }}
                  aria-hidden="true"
                />
                <h3 className={s.serviceH3}>{sv.name}</h3>
                <p className={s.serviceDesc}>{sv.desc}</p>
                <ul className={s.darkTagList} role="list" aria-label="対応内容">
                  {sv.tags.map((t) => (
                    <li key={t} className={s.darkTag}>
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={sv.href} className={s.btnGhostSm}>
                  {sv.cta} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PitDockの強みセクション */}
      <section className={s.strengthSection} id="why-pitdock">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>なぜPitDockが選ばれるのか</h2>
          <p className={`${s.sectionSub} ${s.reveal} ${s.strengthLead}`}>
            ただ流行っているからという理由でAIを導入する、あるいは、紙やExcelで行なっていた業務をただシステム化するだけでは十分な効果を得ることはできません。PitDockはせっかくのIT投資の効果を最大化するために、業務の本質を理解し、課題の根本を解決するDX・AI戦略を提案します。
          </p>

          {/* 主軸3カード */}
          <ul className={s.strengthGrid} role="list">
            {strengthCards.map((card, i) => (
              <li
                key={i}
                className={`${s.strengthCard} ${s.reveal}`}
                style={
                  {
                    "--strength-accent": card.accentColor,
                    "--strength-glow": card.glowColor,
                    transitionDelay: `${i * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={s.strengthCardGlow}
                  style={{
                    background: `radial-gradient(ellipse at top left, ${card.glowColor} 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />
                <h3 className={s.strengthH3}>{card.heading}</h3>
                <p className={s.strengthBody}>{card.body}</p>
                <ul className={s.strengthPoints} role="list">
                  {card.points.map((pt, j) => (
                    <li key={j} className={s.strengthPoint}>
                      <span className={s.strengthPointIcon} style={{ color: card.accentColor }} aria-hidden="true">
                        ✓
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* サブ2カード */}
          <ul className={s.strengthSubGrid} role="list">
            {strengthSubCards.map((card, i) => (
              <li key={i} className={`${s.strengthSubCard} ${s.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.strengthSubIcon} aria-hidden="true">{card.icon}</div>
                <div>
                  <h3 className={s.strengthSubH3}>{card.heading}</h3>
                  <p className={s.strengthSubBody}>{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 代表紹介セクション */}
      <section className={s.ceoSection} id="ceo">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>代表メッセージ</h2>
          <div className={`${s.ceoInner} ${s.reveal}`}>
            {/* 左カラム：写真エリア */}
            <div className={s.ceoPhotoCol}>
              <div className={s.ceoPhoto}>
                <img
                  src="/images/company/koyama-nozomi.png"
                  alt="代表取締役 小山望海"
                  loading="lazy"
                />
              </div>
              <span className={s.ceoRoleBadge}>代表取締役 / CEO・Founder</span>
            </div>

            {/* 右カラム：テキスト */}
            <div className={s.ceoContent}>
              <p className={s.ceoName}>小山 望海</p>
              <p className={s.ceoNameEn}>KOYAMA Nozomi</p>
              <p className={s.ceoBio}>
                DXやAX（AI Transformation）は、一朝一夕で成し遂げられるものではありません。技術の選定・業務プロセスの再設計・組織の変化・現場への定着まで、複数の壁を乗り越えて初めて成果になります。そしてその壁を越えるには、AI・DXを技術として深く理解していることと、現場で何が起きているかを見続けることの両方が必要です。PitDockは、その両方に向き合い続けるパートナーでありたいと思っています。
              </p>
              <blockquote className={s.ceoQuote}>
                PitDockは、戦略と実装の両方ができるチームとして、お客様の事業成長に本気で向き合います。
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className={s.newsSection} id="news">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>News</h2>
          <ul className={s.newsGrid} role="list">
            {newsSortedByIdDesc.map((n, i) => (
              <NewsHomeCard key={n.id} n={n} i={i} external={isExternalNewsUrl(n.url)} />
            ))}
          </ul>
          <div className={s.newsMore}>
            <a href="/news" className={s.btnGhost}>
              すべてのニュースを見る →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.section} id="faq">
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>よくあるご質問</h2>
          <div className={s.faqWrap}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={s.footerCta} id="contact">
        <div className="container">
          <h2 className={s.footerCtaH2}>「何をするか決まっていない」で大丈夫です。</h2>
          <p className={s.footerCtaSub}>
            一緒に整理するところから始めましょう。ヒアリングから提案まで、初回は無料です。
            <br />
            まずは話だけでも聞いてみてください。
          </p>
          <div className={`${s.ctaRow} ${s.ctaRowCenter}`}>
            <a href={CONTACT_URL} className={s.btnPrimary}>
              無料相談を予約する
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
