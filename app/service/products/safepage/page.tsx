import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "../../../components/JsonLd";
import { LpProductFooter } from "../../../components/LpProductFooter";
import { createPageMetadata } from "../../../../lib/seo/metadata";
import { webApplicationJsonLd, webPageJsonLd } from "../../../../lib/seo/json-ld";
import s from "./page.module.css";

const PAGE_PATH = "/service/products/safepage";
const PAGE_TITLE = "SafePage - クリックする前に、確認しよう";
const PAGE_DESCRIPTION =
  "SafePageは、訪問するURLのリスクレベルを瞬時にチェック。怪しいサイトの警告サインを表示し、安全な判断をサポートするChrome拡張機能です。";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    absoluteTitle: true,
    image: "/images/products/SafePage/safepage_logo.png",
    imageAlt: "SafePage ロゴ",
    keywords: [
      "セキュリティ",
      "Chrome拡張機能",
      "URLチェック",
      "フィッシング対策",
      "詐欺サイト",
      "SafePage",
    ],
  }),
  icons: {
    icon: "/images/products/SafePage/safepage_logo.png",
  },
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/SafePage/nlgabfonclkebffadhdlofkdefpacopi?hl=ja";
const CONTACT_FORM_URL = "https://forms.gle/32WZHAzSMVp4EXis8";
const TERMS_PATH = "/service/products/safepage/terms_of_use";
const LOGO_SRC = "/images/products/SafePage/safepage_logo.png";

function IconChrome({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function IconTriangleAlert({ className }: { className?: string }) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function IconCircleCheck({ className }: { className?: string }) {
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
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
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
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconZap({ className }: { className?: string }) {
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const problemCards = [
  {
    key: "trust",
    title: "「このサイト、本当に安全？」",
    body: "知らないURLをクリックするとき、詐欺サイトではないか心配になります。",
  },
  {
    key: "offer",
    title: "「この特典、怪しくない？」",
    body: "お得すぎるオファーや投資話を見ると、不安が募ります。",
  },
  {
    key: "check",
    title: "毎回の確認が面倒",
    body: "URLを調べたり口コミを探したりするのは時間の無駄です。",
  },
] as const;

const featureCards = [
  {
    key: "score",
    icon: IconEye,
    title: "リスクスコア可視化",
    body: "🟢 低リスク / 🟡 注意 / 🔴 高リスク で一目でわかる",
  },
  {
    key: "warn",
    icon: IconTriangleAlert,
    title: "警告サインの説明",
    body: "なぜ注意が必要なのか、わかりやすく説明します",
  },
  {
    key: "zap",
    icon: IconZap,
    title: "アカウント不要",
    body: "基本機能は登録なしですぐに使える",
  },
  {
    key: "lock",
    icon: IconLock,
    title: "プライバシー重視",
    body: "個人情報は収集しません。ローカルで動作します",
  },
] as const;

const trustCards = [
  {
    key: "noblock",
    icon: IconShield,
    title: "ブロックしない",
    body: "サイトへのアクセスを妨げることはありません",
  },
  {
    key: "noprivacy",
    icon: IconLock,
    title: "個人情報を収集しない",
    body: "あなたのプライバシーを最優先します",
  },
  {
    key: "assist",
    icon: IconCircleCheck,
    title: "補助ツールとして設計",
    body: "判断するのはあなた。私たちはサポートします",
  },
] as const;

const warnItems = ["ドメイン登録が直近", "類似の詐欺サイトを検知", "不審なリダイレクトあり"] as const;

function ExtensionMockup() {
  return (
    <div className={s.extWrap} aria-hidden>
      <div className={`${s.extFloat} ${s.extFloatSafe}`}>
        <IconCircleCheck className={s.extFloatCheckIcon} />
        <span>安全なサイト</span>
      </div>

      <div className={s.extPopup}>
        <div className={s.extPopupHeader}>
          <div className={s.extPopupBrand}>
            <Image
              src={LOGO_SRC}
              alt=""
              width={18}
              height={18}
              className={s.extPopupLogo}
            />
            <span className={s.extPopupBrandName}>SafePage</span>
          </div>
          <span className={s.extPopupSub}>リスクチェック</span>
        </div>

        <div className={s.extPopupBody}>
          <div className={s.extUrlRow}>
            <IconLock className={s.extUrlIcon} />
            <span className={s.extUrlText}>suspicious-deal.xyz</span>
          </div>

          <div className={s.extRiskBlock}>
            <div className={s.extRiskTop}>
              <span className={s.extRiskMuted}>リスクレベル</span>
              <span className={s.extRiskHigh}>高リスク</span>
            </div>
            <div className={s.extRiskTrack}>
              <div className={s.extRiskFillHigh} />
            </div>
          </div>

          <div className={s.extWarnings}>
            <p className={s.extWarnTitle}>警告サイン（{warnItems.length}件）</p>
            {warnItems.map((w) => (
              <div key={w} className={s.extWarnRow}>
                <span className={s.extWarnDot} />
                <span className={s.extWarnText}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${s.extFloat} ${s.extFloatWarn}`}>
        <IconTriangleAlert className={s.extFloatWarnIcon} />
        <span>注意が必要です</span>
      </div>
    </div>
  );
}

export default function SafepageProductPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: PAGE_TITLE, description: PAGE_DESCRIPTION, path: PAGE_PATH }),
          webApplicationJsonLd({
            name: "SafePage",
            description: PAGE_DESCRIPTION,
            path: PAGE_PATH,
            downloadUrl: CHROME_STORE_URL,
            image: "/images/products/SafePage/safepage_logo.png",
            browserRequirements: "Google Chrome ブラウザが必要です",
          }),
        ]}
      />
      <div className={s.root}>
      {/* ---- Header ---- */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.headerRow}>
            <div className={s.brandRow}>
              <Image
                src={LOGO_SRC}
                alt="SafePage"
                width={32}
                height={32}
                className={s.headerLogoImg}
                sizes="32px"
                priority
              />
              <span className={s.brandTitle}>SafePage</span>
            </div>
            <div className={s.headerCtas}>
              <a
                className={`${s.btnChrome} ${s.bgSafePrimary} ${s.bgSafePrimaryHover}`}
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconChrome className={s.chromeIconSm} />
                <span className={s.chromeLabelFull}>Chromeに追加</span>
                <span className={s.chromeLabelShort}>追加</span>
              </a>
              <a
                className={s.btnOutlineHeader}
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={s.contactLabelLong}>ご意見・お問い合わせ</span>
                <span className={s.contactLabelShort}>お問い合わせ</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className={s.mainPad}>
        {/* ---- Hero ---- */}
        <section className={s.heroSection}>
          <div className={s.heroInner}>
            <div className={s.heroGrid}>
              <div className={s.heroTextCol}>
                <div className={s.badgeChrome}>
                  <span className={s.pingDot}>
                    <span className={s.pingOuter} />
                    <span className={s.pingInner} />
                  </span>
                  Chrome拡張機能 • 無料で利用可能
                </div>
                <h1 className={s.heroH1}>
                  クリックする前に、
                  <br />
                  <span className={s.safePrimary}>確認しよう。</span>
                </h1>
                <p className={s.heroLead}>
                  SafePageは、訪問するURLのリスクレベルを瞬時にチェック。
                  怪しいサイトの警告サインを表示し、あなたの安全な判断をサポートします。
                </p>
                <div className={s.heroCtas}>
                  <a
                    className={`${s.btnChromeLg} ${s.bgSafePrimary} ${s.bgSafePrimaryHover}`}
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconChrome className={s.chromeIconMd} />
                    Chromeに追加
                  </a>
                  <p className={s.heroCta2nd}>無料 • アカウント不要</p>
                </div>
              </div>

              <div className={s.heroVisualCol}>
                <ExtensionMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Stats band ---- */}
        <section className={s.statsBand}>
          <div className={s.statsInner}>
            <div className={s.statsRow}>
              <div className={s.statItem}>
                <span className={s.statIconWrap}>
                  <IconShield className={s.statSvg} />
                </span>
                <span className={s.statValue}>3ステップ</span>
                <span className={s.statLabel}>で即座にチェック</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statItem}>
                <span className={s.statIconWrap}>
                  <IconLock className={s.statSvg} />
                </span>
                <span className={s.statValue}>個人情報ゼロ</span>
                <span className={s.statLabel}>収集しない</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statItem}>
                <span className={s.statIconWrap}>
                  <IconZap className={s.statSvg} />
                </span>
                <span className={s.statValue}>登録不要</span>
                <span className={s.statLabel}>すぐに使い始められる</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Problems ---- */}
        <section className={s.sectionPad}>
          <div className={s.containerXl}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionH2}>こんな不安、ありませんか？</h2>
              <p className={s.sectionLead}>インターネットには、あなたを狙うリスクが潜んでいます。</p>
            </div>
            <div className={s.grid3}>
              {problemCards.map(({ key, title, body }) => (
                <div key={key} className={s.cardProblem}>
                  <div className={s.problemIconWrap}>
                    <IconTriangleAlert className={s.problemIcon} />
                  </div>
                  <h3 className={s.cardH3}>{title}</h3>
                  <p className={s.cardP}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Solution ---- */}
        <section className={`${s.sectionPad} ${s.sectionAlt}`}>
          <div className={s.containerXl}>
            <div className={s.solutionBlock}>
              <div className={s.solutionIconWrap}>
                <IconShield className={s.solutionIcon} />
              </div>
              <h2 className={s.sectionH2}>SafePageが優しくサポート</h2>
              <p className={s.supportLead}>
                SafePageは、サイトを判断したりブロックしたりはしません。
                <br />
                リスクのサインを表示して、
                <strong>あなたの判断をお手伝い</strong>
                します。
              </p>
              <div className={s.checkRow3}>
                {(["判断するのはあなた", "情報を提供するだけ", "ブロックはしない"] as const).map(
                  (item) => (
                    <div key={item} className={s.checkItem}>
                      <IconCircleCheck className={s.checkItemIcon} />
                      <span className={s.checkItemText}>{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section className={s.sectionPad}>
          <div className={s.containerXl}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionH2}>使い方はシンプル</h2>
              <p className={s.sectionLead}>3ステップで、すぐにリスクチェック</p>
            </div>
            <div className={s.stepsGrid}>
              {(
                [
                  { num: "1", title: "任意のページを開く", body: "通常通りウェブサイトを閲覧します" },
                  {
                    num: "2",
                    title: "アイコンをクリック",
                    body: "ツールバーのSafePageアイコンをクリック",
                  },
                  {
                    num: "3",
                    title: "リスクサインを確認",
                    body: "瞬時に警告サインが表示されます",
                  },
                ] as const
              ).map(({ num, title, body }) => (
                <div key={num} className={s.stepCard}>
                  <div className={s.stepNumCircle}>{num}</div>
                  <div className={s.stepContent}>
                    <h3 className={s.cardH3}>{title}</h3>
                    <p className={s.cardP}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Features ---- */}
        <section className={`${s.sectionPad} ${s.sectionAlt}`}>
          <div className={s.containerXl}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionH2}>主な機能</h2>
              <p className={s.sectionLead}>シンプルで強力な安全チェック機能</p>
            </div>
            <div className={s.featuresGrid}>
              {featureCards.map(({ key, icon: Icon, title, body }) => (
                <div key={key} className={s.featureCard}>
                  <div className={s.featureIconWrap}>
                    <Icon className={s.featureIconSvg} />
                  </div>
                  <h3 className={s.featureH3}>{title}</h3>
                  <p className={s.cardP}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section className={s.sectionPad}>
          <div className={s.containerXl}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionH2}>シンプルな料金プラン</h2>
              <p className={s.sectionLead}>まずは無料でお試しください</p>
            </div>
            <div className={s.pricingCenter}>
              <div className={s.pricingCard}>
                <div className={s.pricingTop}>
                  <h3 className={s.priceTitle}>無料プラン</h3>
                  <div>
                    <span className={s.priceYen}>¥0</span>
                    <span className={s.priceUnit}> / 月</span>
                  </div>
                </div>
                <ul className={s.priceFeatures}>
                  {(
                    [
                      "基本的なリスク指標",
                      "リスクレベル表示",
                      "シンプルな警告サイン",
                      "アカウント不要",
                    ] as const
                  ).map((f) => (
                    <li key={f} className={s.priceFeatureItem}>
                      <IconCircleCheck className={s.priceCheckIcon} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className={`${s.priceCta} ${s.bgSafePrimary} ${s.bgSafePrimaryHover}`}
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconChrome className={s.chromeIconMd} />
                  今すぐ始める
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Trust ---- */}
        <section className={`${s.sectionPad} ${s.sectionAlt}`}>
          <div className={s.containerXl}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionH2}>信頼と安全性</h2>
              <p className={s.sectionLead}>SafePageは、あなたの判断を尊重します</p>
            </div>
            <div className={s.trustGrid}>
              {trustCards.map(({ key, icon: Icon, title, body }) => (
                <div key={key} className={s.trustCard}>
                  <div className={s.trustIconWrap}>
                    <Icon className={s.trustIconSvg} />
                  </div>
                  <h3 className={s.trustH3}>{title}</h3>
                  <p className={s.cardP}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA band ---- */}
        <section className={s.ctaBand}>
          <div className={s.ctaBandInner}>
            <h2 className={s.ctaBandH2}>安心してウェブを楽しもう</h2>
            <p className={s.ctaBandLead}>SafePageで、クリック前の不安を解消</p>
            <a
              className={s.ctaBandBtn}
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconChrome className={s.ctaBtnIcon} />
              SafePageをChromeに追加
            </a>
            <p className={s.ctaBandSub}>無料で今すぐ始められます</p>
          </div>
        </section>

        <LpProductFooter
          variant="safepage"
          iconSrc={LOGO_SRC}
          iconAlt="SafePage"
          productName="SafePage"
          tagline="クリックする前に、確認しよう。"
          footerNote="SafePageは、ウェブサイトの安全性を保証するものではありません。情報提供を目的としたツールです。"
          links={[
            { href: "/company-info", label: "会社概要" },
            { href: "/privacy", label: "プライバシーポリシー" },
            { href: TERMS_PATH, label: "利用規約" },
            { href: CONTACT_FORM_URL, label: "ご意見・お問い合わせ" },
          ]}
          chromeWebStoreUrl={CHROME_STORE_URL}
        />
      </div>
    </div>
    </>
  );
}
