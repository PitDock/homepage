import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "../../../components/JsonLd";
import { LpProductFooter } from "../../../components/LpProductFooter";
import { createPageMetadata } from "../../../../lib/seo/metadata";
import { softwareApplicationJsonLd, webPageJsonLd } from "../../../../lib/seo/json-ld";
import s from "./page.module.css";

const PAGE_PATH = "/service/products/duosub";
const PAGE_TITLE = "Duosub | 映画・ドラマで楽しくネイティブの英語を習得";
const PAGE_DESCRIPTION =
  "映画・ドラマで楽しくスマホ留学。英語・日本語の字幕を同時表示してネイティブの英語を学べるアプリ。全機能無料。";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    absoluteTitle: true,
    image: "/images/products/Duosub_logo.png",
    imageAlt: "Duosub ロゴ",
    keywords: [
      "Duosub",
      "英語学習",
      "映画",
      "ドラマ",
      "YouTube",
      "2ヶ国語字幕",
      "英語アプリ",
    ],
  }),
  icons: {
    icon: "/images/products/Duosub/duosub-icon.webp",
  },
};

/** base/duosub_LP.html と同一のリンク（App Store URL のエンコード含む） */
const APP_STORE_URL =
  "https://apps.apple.com/au/app/duosub-%E6%98%A0%E7%94%BB-%E3%83%89%E3%83%A9%E3%83%9E%E3%81%A7%E8%8B%B1%E8%AA%9E%E5%AD%B8%E7%BF%92/id6507464076";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gows.duosub&hl=ja";
const CONTACT_URL = "https://forms.gle/SZQG3Hra9YyfNSh16";
const OFFICIAL_X_URL = "https://x.com/duosub_app";
const OFFICIAL_INSTAGRAM_URL = "https://www.instagram.com/duosub_gows/";
const OFFICIAL_YOUTUBE_URL =
  "https://www.youtube.com/channel/UCEOc0Q8Z6fUpJ1ah_txyY4A";
const VIDEO_POSTER = "/images/products/Duosub使い方_映画・ドラマ_サムネ.jpg";
const VIDEO_SRC = "/images/products/Duosub使い方_映画・ドラマ.mp4";
const FOOTER_ICON_URL = "/images/products/duosub-icon.webp";

const LOGO_PATH = "/images/products/Duosub_logo.png";
const SCREENSHOT_PATH = "/images/products/app-screenshot.png";

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBookOpen({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function IconSmartphone({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

const problemCards = [
  {
    key: "fun",
    icon: IconHeart,
    iconWrap: s.problemIconRed,
    label: "英語を勉強したいけど楽しくない",
  },
  {
    key: "desk",
    icon: IconClock,
    iconWrap: s.problemIconOrange,
    label: "机で英語を勉強していても聞き取ったり喋れるようにならない",
  },
  {
    key: "abroad",
    icon: IconUsers,
    iconWrap: s.problemIconBlue,
    label: "留学したいけど時間やお金がない",
  },
  {
    key: "video",
    icon: IconPlay,
    iconWrap: s.problemIconPurple,
    label: "海外の動画をオリジナルの音声で見たいけど内容が理解できない",
  },
] as const;

const contentTags = ["アベンジャーズ", "フレンズ", "ハリー・ポッター", "+数百万作品"] as const;

export default function DuosubPage() {
  return (
    <>
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
            image: "/images/products/Duosub_logo.png",
            offers: { price: "0", description: "基本機能は無料。プレミアムプランは月額300円。" },
          }),
        ]}
      />
      <div className={s.root}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.headerLogo}>
            <Image
              src={LOGO_PATH}
              alt="Duosub"
              width={200}
              height={60}
              className={s.headerLogoImg}
              priority
            />
          </div>
          <div className={s.headerRight}>
            <div className={s.headerCopy}>
              <p className={s.headerCopyMain}>今すぐ無料でダウンロード！</p>
              <p className={s.headerCopySub}>全機能無料 • 広告なしは月額300円</p>
            </div>
            <div className={s.headerStoreRow}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={s.headerStoreLink}
              >
                <span className={s.headerStoreBtn}>
                  <IconDownload className={s.iconSm} />
                  App Store
                </span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={s.headerStoreLink}
              >
                <span className={s.headerStoreBtn}>
                  <IconDownload className={s.iconSm} />
                  Google Play
                </span>
              </a>
            </div>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={s.headerContactBtn}
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </header>

      <section className={s.heroSection}>
        <div className={s.heroGrid}>
          <div className={s.heroCol}>
            <div className={s.heroIntro}>
              <h1 className={s.heroH1}>
                海外コンテンツで学ぶ
                <br />
                <span className={s.textGreen600}>本物の英語</span>
              </h1>
              <p className={s.heroLead}>
                海外動画で
                <br />
                <span className={s.heroLeadStrong}>楽しくネイティブの英語を習得</span>
              </p>
            </div>
            <div className={s.heroCtaRow}>
              <a href="#download-section" className={s.heroCta}>
                <IconDownload className={s.iconMd} />
                無料で今すぐ始める
              </a>
            </div>
            <div className={s.heroTagsBlock}>
              <p className={s.mutedLabel}>人気コンテンツ</p>
              <div className={s.tagRow}>
                {contentTags.map((t) => (
                  <span key={t} className={s.pill}>
                    {t}
                  </span>
                ))}
              </div>
              <p className={s.mutedLabel}>YouTubeの全動画も視聴可能</p>
            </div>
          </div>

          <div className={s.heroVisualCol}>
            <div className={s.heroPosterGrid} aria-hidden>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={s.heroPosterCell}>
                  <IconPlay className={s.heroPosterPlay} />
                </div>
              ))}
            </div>
            <div className={s.heroPhoneWrap}>
              <Image
                src={SCREENSHOT_PATH}
                alt="Duosub アプリのスクリーンショット - 映画/ドラマの英語字幕と日本語字幕が同時表示"
                width={400}
                height={800}
                className={s.heroPhoneImg}
                priority
              />
            </div>
            <div className={`${s.floatingCard} ${s.floatingBounce}`}>
              <span className={s.floatingDot} />
              <span className={s.floatingText}>日英同時字幕</span>
            </div>
            <div className={`${s.floatingCard} ${s.floatingPulse} ${s.floatingBottom}`}>
              <IconSearch className={s.iconSearchBlue} />
              <span className={s.floatingText}>辞書機能で即座に確認</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statsSection}>
        <div className={s.statsInner}>
          <p className={s.statsIntro}>多くの方に選ばれています</p>
          <div className={s.statsGrid}>
            <div className={s.statCell}>
              <div className={s.statValue}>数百万作品</div>
              <div className={s.statSub}>映画・ドラマ</div>
            </div>
            <div className={s.statCell}>
              <div className={s.statValue}>YouTubeにも対応</div>
              <div className={s.statSub} />
            </div>
            <div className={s.statCell}>
              <div className={s.statValue}>30日</div>
              <div className={s.statSub}>で効果実感</div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sectionPad}>
        <h2 className={s.h2Center}>こんなお悩みありませんか？</h2>
        <div className={s.problemGrid}>
          {problemCards.map(({ key, icon: Icon, iconWrap, label }) => (
            <div key={key} className={s.problemCard}>
              <div className={s.problemCardInner}>
                <div className={`${s.problemIconCircle} ${iconWrap}`}>
                  <Icon className={s.problemIcon} />
                </div>
                <p className={s.problemText}>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={s.solutionBand}>
        <div className={s.solutionInner}>
          <h2 className={s.h2CenterDark}>
            そのお悩み、<span className={s.textGreen600}>Duosub</span>で解決できます！
          </h2>
          <div className={s.solutionGrid}>
            <div className={s.solutionStack}>
              <div className={s.solutionCard}>
                <div className={s.solutionCardHead}>
                  <div className={`${s.solutionIconCircle} ${s.solutionIconGreen}`}>
                    <IconPlay className={s.solutionIconSvg} />
                  </div>
                  <h3 className={s.solutionCardTitle}>リアルな英会話</h3>
                </div>
                <p className={s.solutionCardBody}>
                  吹替ではないオリジナルの音声を聞きながら
                  <br />
                  ネイティブのリアルな英会話で楽しく英語学習ができる！
                </p>
              </div>
              <div className={s.solutionCard}>
                <div className={s.solutionCardHead}>
                  <div className={`${s.solutionIconCircle} ${s.solutionIconBlue}`}>
                    <IconBookOpen className={s.solutionIconSvg} />
                  </div>
                  <h3 className={s.solutionCardTitle}>日英同時字幕</h3>
                </div>
                <p className={s.solutionCardBody}>
                  英語の字幕と日本語の字幕が同時に見えるから
                  <br />
                  英語初心者でも安心！
                </p>
              </div>
            </div>
            <div className={s.solutionImgCol}>
              <Image
                src={SCREENSHOT_PATH}
                alt="Duosub アプリの機能紹介"
                width={300}
                height={600}
                className={s.solutionImg}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={s.sectionPad}>
        <h2 className={s.h2Center}>Duosubの特徴</h2>
        <div className={s.featureGrid}>
          <div className={s.featureCell}>
            <div className={`${s.featureIconCircle} ${s.featureIconGreen}`}>
              <IconSmartphone className={s.featureIconSvg} />
            </div>
            <h3 className={s.featureTitle}>いつでもどこでも学習</h3>
            <p className={s.featureBody}>
              スマートフォンがあれば、通勤時間や休憩時間など、いつでもどこでも英語学習が可能です。
            </p>
          </div>
          <div className={s.featureCell}>
            <div className={`${s.featureIconCircle} ${s.featureIconBlue}`}>
              <IconStar className={s.featureIconSvg} />
            </div>
            <h3 className={s.featureTitle}>豊富なコンテンツライブラリ</h3>
            <p className={s.featureBody}>
              不朽の名作から最新作まで幅広いジャンルの映画・ドラマをご用意。お気に入りの作品で楽しく学習できます。
            </p>
          </div>
          <div className={s.featureCell}>
            <div className={`${s.featureIconCircle} ${s.featureIconPurple}`}>
              <IconSearch className={s.featureIconSvg} />
            </div>
            <h3 className={s.featureTitle}>内蔵辞書機能</h3>
            <p className={s.featureBody}>
              単語の意味もその場で確認。学習の流れを止めることなくボキャブラリーを増やせます。
            </p>
          </div>
        </div>
      </section>

      <section className={s.sectionPad}>
        <h2 className={s.h2Center}>シンプルな料金プラン</h2>
        <div className={s.planGrid}>
          <div className={s.planCard}>
            <div className={s.planCardPad}>
              <h3 className={s.planName}>無料プラン</h3>
              <div className={s.planPrice}>
                ¥0<span className={s.planPeriod}>/月</span>
              </div>
              <ul className={s.planList}>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  全ての映画・ドラマ・YouTubeの字幕が利用可能
                </li>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  日英同時字幕機能
                </li>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  内蔵辞書機能
                </li>
                <li className={`${s.planRow} ${s.planRowMuted}`}>
                  <span className={s.planCheckNg}>×</span>
                  広告表示が必要
                </li>
              </ul>
              <a href="#download-section" className={s.planBtnGray}>
                無料でダウンロード
              </a>
            </div>
          </div>
          <div className={`${s.planCard} ${s.planCardPremium}`}>
            <div className={s.planBadge}>おすすめ</div>
            <div className={s.planCardPad}>
              <h3 className={s.planName}>プレミアムプラン</h3>
              <div className={`${s.planPrice} ${s.planPriceGreen}`}>
                ¥300<span className={s.planPeriod}>/月</span>
              </div>
              <ul className={s.planList}>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  全ての映画・ドラマ・YouTubeの字幕が利用可能
                </li>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  日英同時字幕機能
                </li>
                <li className={s.planRow}>
                  <span className={s.planCheckOk}>✓</span>
                  内蔵辞書機能
                </li>
                <li className={`${s.planRow} ${s.planRowGreenBold}`}>
                  <span className={s.planCheckOk}>✓</span>
                  広告なしで快適学習
                </li>
              </ul>
              <a href="#download-section" className={s.planBtnGreen}>
                1ヶ月無料で試す
              </a>
            </div>
          </div>
        </div>
        <p className={s.planFootnote}>※プレミアムプランはいつでもキャンセル可能です</p>
      </section>

      <section className={s.sectionPad}>
        <h2 className={s.h2Center}>使い方はとても簡単！</h2>
        <div className={s.videoWrap}>
          <div className={s.videoFrame}>
            <video controls className={s.video} poster={VIDEO_POSTER} preload="metadata">
              <source src={VIDEO_SRC} type="video/mp4" />
              お使いのブラウザは動画の再生に対応していません。
            </video>
          </div>
        </div>
      </section>

      <section id="download-section" className={s.downloadBand}>
        <div className={s.downloadInner}>
          <h2 className={s.downloadTitle}>今すぐDuosubで英語学習を始めよう！</h2>
          <p className={s.downloadSub}>
            無料で全機能が使える！まずはダウンロードして体験してみましょう
          </p>
          <div className={s.downloadBtns}>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={s.downloadBtn}>
              <IconDownload className={s.iconMd} />
              App Store
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={s.downloadBtn}
            >
              <IconDownload className={s.iconMd} />
              Google Play
            </a>
          </div>
        </div>
      </section>

      <LpProductFooter
        iconSrc={FOOTER_ICON_URL}
        iconAlt="Duosub Icon"
        productName="Duosub"
        tagline="映画・ドラマで楽しく英語学習"
        links={[
          { href: "/company-info", label: "会社概要" },
          { href: "/privacy", label: "プライバシーポリシー" },
          {
            href: "/service/products/duosub/terms",
            label: "利用規約",
          },
        ]}
        appStoreUrl={APP_STORE_URL}
        googlePlayUrl={GOOGLE_PLAY_URL}
        socialNavLabel="Duosub公式SNS"
        social={[
          { href: OFFICIAL_X_URL, ariaLabel: "Duosub公式X", icon: "x" },
          { href: OFFICIAL_INSTAGRAM_URL, ariaLabel: "Duosub公式Instagram", icon: "instagram" },
          { href: OFFICIAL_YOUTUBE_URL, ariaLabel: "Duosub公式YouTube", icon: "youtube" },
        ]}
      />
    </div>
    </>
  );
}
