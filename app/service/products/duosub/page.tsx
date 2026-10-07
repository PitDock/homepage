import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { JsonLd } from "../../../components/JsonLd";
import { LpProductFooter } from "../../../components/LpProductFooter";
import { createPageMetadata } from "../../../../lib/seo/metadata";
import {
  faqPageJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "../../../../lib/seo/json-ld";
import { DUOSUB_FAQS } from "../../../../lib/seo/duosub-faqs";
import { APP_STORE_URL, GOOGLE_PLAY_URL, StoreBadges } from "./_components/StoreBadges";
import { HERO_POSTER, HeroVideo } from "./_components/HeroVideo";
import { HowToTabs } from "./_components/HowToTabs";
import { PipDiagram } from "./_components/PipDiagram";
import { StickyStoreBar } from "./_components/StickyStoreBar";
import s from "./page.module.css";

const PAGE_PATH = "/service/products/duosub";
const PAGE_TITLE = "Duosub｜海外ドラマ・YouTubeを日英字幕で観る英語学習アプリ";
const PAGE_DESCRIPTION =
  "Duosubは、映画や海外ドラマ、YouTubeを日英字幕（英語字幕と日本語字幕）で同時に観られる英語学習アプリ。いつもの見方のまま、リスニングと英語耳づくりができるながら学習向け。iPhone・Android対応、無料で始められます。";
const OG_TITLE = "映画もドラマもYouTubeも、英語と日本語の字幕で。｜Duosub";
const OG_DESCRIPTION =
  "英語字幕と日本語字幕を同時に表示する英語学習アプリ。海外ドラマや映画を観ながら、リスニングと英語耳づくり。iPhone・Android対応。";
const OG_IMAGE = "/images/products/Duosub/ogp.png";
const OG_IMAGE_ALT = "英語字幕と日本語字幕が同時に表示されたDuosubのアプリ画面";

const baseMetadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  absoluteTitle: true,
  image: OG_IMAGE,
  imageAlt: OG_IMAGE_ALT,
  keywords: [
    "Duosub",
    "英語学習",
    "海外ドラマ",
    "英語字幕",
    "日英字幕",
    "2か国語字幕",
    "リスニング",
    "英語耳",
    "ながら学習",
    "YouTube",
    "英語アプリ",
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title: OG_TITLE, description: OG_DESCRIPTION },
  twitter: { ...baseMetadata.twitter, title: OG_TITLE, description: OG_DESCRIPTION },
  icons: {
    icon: "/images/products/Duosub/duosub-icon.webp",
  },
};

// 下部固定バーの env(safe-area-inset-bottom) を有効にするため（このページだけ）
export const viewport: Viewport = {
  viewportFit: "cover",
};

const CONTACT_URL = "https://forms.gle/SZQG3Hra9YyfNSh16";
const OFFICIAL_X_URL = "https://x.com/duosub_app";
const OFFICIAL_INSTAGRAM_URL = "https://www.instagram.com/duosub_app/";
const OFFICIAL_TIKTOK_URL = "https://www.tiktok.com/@duosub1";

const ICON_PATH = "/images/products/Duosub/duosub-icon.webp";
const LOGO_PATH = "/images/products/Duosub/duosub-logo.png";
const SCREENSHOT_PATH = "/images/products/Duosub/app-screenshot.png";
const SCREENSHOT_YOUTUBE_PATH = "/images/products/Duosub/app-screenshot-youtube.png";
const HOWTO_VIDEO_SRC = "/images/products/Duosub使い方_映画・ドラマ.mp4#t=4.5";
const HOWTO_POSTER = "/images/products/Duosub/howto-poster.webp";

const ANNOTATIONS = [
  { n: 1, text: "英語の字幕", x: 6, y: 40.2, side: "left" },
  { n: 2, text: "日本語の字幕（機械翻訳）", x: 6, y: 45.2, side: "left" },
  { n: 3, text: "いま流れているセリフ。動画に合わせて進む", x: 94, y: 52.4, side: "right" },
  { n: 4, text: "タップでAIの和訳と、単語ごとの意味", x: 94, y: 61.6, side: "right" },
] as const;

type Step = { title: string; body: string };

const MOVIE_STEPS: Step[] = [
  {
    title: "字幕を取得する",
    body: "Duosubで作品名を検索。日本語のタイトルでも探せます。ドラマは話数を選んで、字幕モードを決めて取得します。",
  },
  {
    title: "動画をPiPにして重ねる",
    body: "いつもの動画アプリで作品を再生し、ピクチャーインピクチャーに。Duosubの画面上部の点線の枠に、動画の小窓を重ねます。",
  },
  {
    title: "セリフに合う行をタップ",
    body: "今のセリフに合う字幕の行をタップすると、その行から字幕が流れはじめます。ずれたら、また合う行をタップするだけです。",
  },
];

const YOUTUBE_STEPS: Step[] = [
  {
    title: "動画を探す",
    body: "Duosubの中で、YouTubeの動画をタイトルやチャンネル名で検索します。",
  },
  {
    title: "そのまま再生",
    body: "字幕は自動で同期します。手で合わせる必要はありません。",
  },
  {
    title: "聞き逃したら、行をタップ",
    body: "字幕の行をタップすると、動画がそのシーンに戻ります。",
  },
];

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className={`${s.ruleList} ${s.steps}`}>
      {steps.map((step, i) => (
        <li key={step.title} className={i === steps.length - 1 ? s.stepActive : undefined}>
          <p className={s.stepLabel}>STEP {i + 1}</p>
          <h4 className={s.stepTitle}>{step.title}</h4>
          <p className={s.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

const moviePanel = (
  <div>
    <div className={s.panelIntro}>
      <h3 className={s.h3}>
        <span className={s.nb}>動画アプリを小窓にして、</span>
        <span className={s.nb}>字幕の上に重ねる。</span>
      </h3>
      <p className={`${s.body} ${s.panelLead}`}>
        ピクチャーインピクチャー（PiP）は、動画を小さな窓にして、ほかのアプリの上に重ねて再生する機能です。Duosubの画面上部にある枠に動画を重ね、その下に字幕が流れます。
      </p>
      <div className={s.pipWrap}>
        <PipDiagram />
      </div>
    </div>
    <div className={`${s.panelGrid} ${s.panelGridMovie}`}>
      <div>
        <Steps steps={MOVIE_STEPS} />
        <p className={`${s.note} ${s.stepsNoteFirst}`}>
          スマホを横にすると、動画を左、字幕を右に並べて見られます。
        </p>
        <p className={`${s.note} ${s.stepsNoteNext}`}>
          PiPに対応した動画アプリと一緒に使えます。Duosubは特定の動画配信サービスと提携しているわけではありません。
        </p>
      </div>
      <div className={s.howtoVideoBlock}>
        <p className={s.howtoVideoTitle}>実際の操作を見る（約1分45秒）</p>
        <div className={s.howtoVideoFrame}>
          <video
            className={s.howtoVideo}
            src={HOWTO_VIDEO_SRC}
            poster={HOWTO_POSTER}
            controls
            preload="metadata"
            playsInline
            width={720}
            height={1280}
          />
        </div>
      </div>
    </div>
  </div>
);

const youtubePanel = (
  <div>
    <div className={s.panelIntro}>
      <h3 className={s.h3}>
        <span className={s.nb}>Duosubの中で、</span>
        <span className={s.nb}>そのまま再生。</span>
      </h3>
      <p className={`${s.body} ${s.panelLead}`}>
        隙間時間に、好きな海外YouTuberの動画を。字幕は動画に合わせて自動で流れます。
      </p>
    </div>
    <div className={`${s.panelGrid} ${s.panelGridYoutube}`}>
      <div className={s.ytShot}>
        <Image
          src={SCREENSHOT_YOUTUBE_PATH}
          alt="DuosubでYouTubeを再生中の画面。動画の中の字幕と、下の再生中の行が同じセリフになっている"
          width={1378}
          height={1960}
          quality={85}
          sizes="(min-width: 1024px) 320px, min(80vw, 320px)"
          className={s.shotImg}
        />
      </div>
      <div className={s.ytSteps}>
        <Steps steps={YOUTUBE_STEPS} />
        <p className={`${s.note} ${s.stepsNoteFirst}`}>
          英語字幕（自動生成を含む）が付いている動画で使えます。
        </p>
      </div>
    </div>
  </div>
);

export default function DuosubPage() {
  return (
    <>
      {/* ヒーロー動画のポスターを LCP として先読みする（React が head へ移す） */}
      <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
      <JsonLd
        data={[
          webPageJsonLd({ name: PAGE_TITLE, description: PAGE_DESCRIPTION, path: PAGE_PATH }),
          softwareApplicationJsonLd({
            name: "Duosub",
            description: PAGE_DESCRIPTION,
            path: PAGE_PATH,
            operatingSystem: "iOS, Android",
            applicationCategory: "EducationalApplication",
            downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
            image: ICON_PATH,
            offers: {
              price: "0",
              description:
                "無料（チケット制）。チケット無制限プランは月額300円（税込）、初回登録の方は最初の1か月無料。",
            },
          }),
          faqPageJsonLd(DUOSUB_FAQS),
        ]}
      />
      <div className={s.root}>
        <header className={s.header}>
          <div className={`${s.container} ${s.headerInner}`}>
            <div className={s.headerLogo}>
              <Image
                src={LOGO_PATH}
                alt="Duosub"
                width={901}
                height={250}
                sizes="101px"
                className={s.headerLogoImg}
                priority
              />
            </div>
            <StoreBadges size={40} className={s.headerBadges} />
          </div>
        </header>

        <main>
          {/* ===== 1. ファーストビュー ===== */}
          <section className={s.hero}>
            <div className={`${s.container} ${s.heroGrid}`}>
              <div className={s.heroCopy}>
                <h1 className={s.h1}>
                  <span className={s.nb}>映画もドラマも</span>
                  <span className={s.nb}>YouTubeも、</span>
                  <br />
                  <span className={s.nb}>
                    <em className={s.em}>英語と日本語の字幕</em>で。
                  </span>
                </h1>
                <p className={`${s.lead} ${s.heroLead}`}>
                  <span className={s.nb}>2か国語の字幕を同時に表示。</span>
                </p>
                <p className={s.heroSupport}>
                  iPhone・Android
                </p>
                <StoreBadges align="hero" className={s.heroBadges} />
                <p className={s.heroFree}>
                  <span className={s.markAccent}>無料で始められます</span>
                </p>
              </div>
              <div className={s.heroVisual}>
                <HeroVideo />
              </div>
            </div>
          </section>

          {/* ===== 2. 画面の見方 ===== */}
          <section className={`${s.section} ${s.bgAlt}`} aria-labelledby="ds-screen">
            <div className={s.container}>
              <div className={s.sectionHead}>
                <h2 id="ds-screen" className={s.h2}>
                  <span className={s.nb}>上に英語、</span>
                  <span className={s.nb}>下に日本語。</span>
                </h2>
                <p className={`${s.lead} ${s.sectionLead}`}>
                  英語を聞きながら、意味は下の行で確認。
                  <br />
                  内容も英語も、置いていかない。
                </p>
              </div>

              <div className={s.shotArea}>
                <div className={s.shotWrap}>
                  <div className={s.shotImgBox}>
                    <Image
                      src={SCREENSHOT_PATH}
                      alt="Duosubの字幕画面。上に動画、下に英語と日本語の字幕が行ごとに並び、再生中の行が緑の線で挟まれている"
                      width={1378}
                      height={2674}
                      quality={85}
                      sizes="(min-width: 1024px) 360px, min(80vw, 320px)"
                      className={s.shotImg}
                    />
                    {ANNOTATIONS.map((a) => (
                      <span
                        key={a.n}
                        className={`${s.marker} ${s.shotMarker}`}
                        style={{ "--x": `${a.x}%`, "--y": `${a.y}%` } as CSSProperties}
                        aria-hidden="true"
                      >
                        {a.n}
                      </span>
                    ))}
                  </div>
                  <ol className={s.annoList}>
                    {ANNOTATIONS.map((a) => (
                      <li
                        key={a.n}
                        data-side={a.side}
                        style={{ "--x": `${a.x}%`, "--y": `${a.y}%` } as CSSProperties}
                      >
                        <span className={s.annoDot} aria-hidden="true" />
                        <span className={s.annoLine} aria-hidden="true" />
                        <span className={s.annoLabel}>
                          <span className={s.annoNum} aria-hidden="true">
                            {a.n}
                          </span>
                          <span className={s.annoBody}>{a.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className={s.shotNote}>英語だけの字幕モードも選べます。</p>
              </div>
            </div>
          </section>

          {/* ===== 3. 使い方 ===== */}
          <section className={`${s.section} ${s.bgBase}`} aria-labelledby="ds-howto">
            <div className={s.container}>
              <div className={s.sectionHead}>
                <h2 id="ds-howto" className={s.h2}>
                  <span className={s.nb}>動画はいつものアプリで。</span>
                  <span className={s.nb}>字幕はDuosubで。</span>
                </h2>
                <p className={`${s.lead} ${s.sectionLead}`}>
                  <span className={s.nb}>映画・ドラマとYouTubeで、使い方が少し違います。</span>
                  <span className={s.nb}>iPhoneでもAndroidでも、手順は同じです。</span>
                </p>
              </div>
              <HowToTabs
                tabs={[
                  { key: "movie", label: "映画・ドラマ", content: moviePanel },
                  { key: "youtube", label: "YouTube", content: youtubePanel },
                ]}
              />
            </div>
          </section>

          {/* ===== 4. 料金 ===== */}
          <section className={`${s.section} ${s.bgAlt}`} aria-labelledby="ds-price">
            <div className={s.container}>
              <div className={s.sectionHead}>
                <h2 id="ds-price" className={s.h2}>
                  料金
                </h2>
                <p className={`${s.lead} ${s.sectionLead}`}>
                  <span className={s.nb}>字幕を取得するときに、チケットを使います。</span>
                  <span className={s.nb}>チケットは、動画広告を1本見るたびに1枚もらえます。</span>
                </p>
              </div>

              <div className={s.plans}>
                <article className={s.planCard}>
                  <h3 className={s.planName}>
                    <span className={s.markAccent}>無料</span>
                  </h3>
                  <p className={s.price}>
                    <span className={s.priceNum}>0</span>
                    <span className={s.priceUnit}>円</span>
                  </p>
                  <ul className={`${s.ruleList} ${s.planList}`}>
                    <li>最初にチケット3枚</li>
                    <li>
                      字幕1本の取得に使うチケット
                      <span className={s.ticketRow}>
                        <span className={s.ticketItem}>
                          <span className={s.ticketLabel}>英語のみ</span>
                          <span className={s.ticketNum}>1枚</span>
                        </span>
                        <span className={s.ticketItem}>
                          <span className={s.ticketLabel}>英語＋日本語</span>
                          <span className={s.ticketNum}>3枚</span>
                        </span>
                      </span>
                      <span className={`${s.note} ${s.ticketNote}`}>映画・ドラマもYouTubeも同じ</span>
                    </li>
                    <li>30〜60秒の動画広告を1本見ると、チケット1枚</li>
                    <li>取得した字幕を同じモードで見直すときは、チケット不要</li>
                    <li>行ごとのAI和訳は、チケットを使いません</li>
                  </ul>
                  <p className={`${s.note} ${s.planNote}`}>
                    最初の3枚で、英語＋日本語の字幕なら1本分です。
                    <span className={s.planNoteStrong}>無料でも、勝手に流れる広告はありません。</span>
                    広告は、チケットがほしいときに自分で選んで見るものだけです。
                  </p>
                </article>

                <article className={s.planCard}>
                  <h3 className={s.planName}>チケット無制限プラン</h3>
                  <p className={s.price}>
                    <span className={s.priceUnit}>月額</span>
                    <span className={s.priceNum}>300</span>
                    <span className={s.priceUnit}>円（税込）</span>
                  </p>
                  <p className={s.trialLabel}>
                    <span className={s.markAccent}>初回登録の方は、最初の1か月無料</span>
                  </p>
                  <ul className={`${s.ruleList} ${s.planList}`}>
                    <li>チケットなしで字幕を取得できる</li>
                    <li>チケットのために広告を見る必要がない</li>
                  </ul>
                  <p className={`${s.note} ${s.planNote}`}>
                    字幕モードを選ぶ画面から申し込めます。無料期間が終わると、月額300円（税込）で自動更新されます。解約はApp Store / Google Playのサブスクリプション設定からできます。
                  </p>
                </article>
              </div>

              <StoreBadges className={s.priceBadges} />
            </div>
          </section>

          {/* ===== 5. よくある質問 ===== */}
          <section className={`${s.section} ${s.bgBase}`} aria-labelledby="ds-faq">
            <div className={s.container}>
              <div className={s.sectionHead}>
                <h2 id="ds-faq" className={s.h2}>
                  よくある質問
                </h2>
                <p className={s.definition}>
                  Duosubは、映画・ドラマ・YouTubeの英語字幕と日本語字幕を同時に表示できる、iPhone・Android向けの英語学習アプリです。
                </p>
              </div>
              <div className={s.faqList}>
                {DUOSUB_FAQS.map((faq) => (
                  <details key={faq.q} className={s.faqItem}>
                    <summary className={s.faqQ}>
                      <h3 className={s.faqQText}>{faq.q}</h3>
                      <span className={s.faqMark} aria-hidden="true" />
                    </summary>
                    <p className={s.faqA}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 6. 最終CTA ===== */}
          <section className={s.finalCta} aria-labelledby="ds-cta">
            <div className={s.container}>
              <Image src={ICON_PATH} alt="" width={64} height={64} className={s.ctaIcon} />
              <h2 id="ds-cta" className={s.h2}>
                <span className={s.nb}>今夜の1本から、</span>
                <span className={s.nb}>字幕を2つに。</span>
              </h2>
              <p className={`${s.note} ${s.ctaSub}`}>
                累計ダウンロード数 約5,000（2026年10月時点・iOS／Android合計）。iPhone・Androidで使えます。
              </p>
              <StoreBadges className={s.ctaBadges} />
            </div>
          </section>
        </main>

        <LpProductFooter
          variant="duosub"
          iconSrc={ICON_PATH}
          iconAlt="Duosub Icon"
          productName="Duosub"
          tagline="海外の動画を、日英同時字幕で。"
          links={[
            { href: "/company-info", label: "会社概要" },
            { href: "/privacy", label: "プライバシーポリシー" },
            { href: "/service/products/duosub/terms", label: "利用規約" },
            { href: CONTACT_URL, label: "お問い合わせ" },
          ]}
          socialNavLabel="Duosub公式SNS"
          social={[
            { href: OFFICIAL_X_URL, ariaLabel: "Duosub公式X", icon: "x" },
            { href: OFFICIAL_INSTAGRAM_URL, ariaLabel: "Duosub公式Instagram", icon: "instagram" },
            { href: OFFICIAL_TIKTOK_URL, ariaLabel: "Duosub公式TikTok", icon: "tiktok" },
          ]}
          legalNote="Google Play および Google Play ロゴは Google LLC の商標です。"
        />

        <StickyStoreBar />
        <div className={s.barSpacer} aria-hidden="true" />
      </div>
    </>
  );
}
