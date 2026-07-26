import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "../../../components/JsonLd";
import { LpProductFooter } from "../../../components/LpProductFooter";
import { createPageMetadata } from "../../../../lib/seo/metadata";
import { softwareApplicationJsonLd, webPageJsonLd } from "../../../../lib/seo/json-ld";
import s from "./page.module.css";

const PAGE_PATH = "/service/products/dinder";
const PAGE_TITLE = "dinder - GOWS合同会社";
const PAGE_DESCRIPTION =
  "dinder - 位置情報をもとに近くの飲食店からアプリがお店を提案！ 提案されたお店が気に入れば右にスワイプするだけでお店までナビしてくれる！ 気に入らなければ左にスワイプすればアプリが次の候補を提案！ 事前に細かい条件を設定可能！";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    absoluteTitle: true,
    image: "/images/products/dinder_6x9.png",
    imageAlt: "dinder ロゴ",
    keywords: ["dinder", "飲食店", "レストラン", "提案", "スワイプ", "位置情報"],
  }),
  icons: {
    icon: "/images/products/dinder/dinder-favicon.png",
  },
};

const APP_STORE_URL =
  "https://apps.apple.com/jp/app/dinder-%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E6%A4%9C%E7%B4%A2%E3%82%A2%E3%83%97%E3%83%AA/id6478850884";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gowsktma.dinder&hl=ja";
const CONTACT_URL = "https://forms.gle/c9oNTac3has9FAsn8";

const ICON_SRC = "/images/products/dinder_6x9.png";
const IMG_HEADER = "/images/products/header-768x375.png";
const IMG_RIGHT_SWIPE = "/images/products/右スワイプ-721x1536.png";
const IMG_LEFT_SWIPE = "/images/products/左スワイプ-720x1536.png";
const BADGE_APP_STORE = "/images/products/AppStore.png";
const BADGE_GOOGLE_PLAY = "/images/products/GooglePlay.png";

function WpImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
}

function StoreBadges() {
  return (
    <div className={s.storeRow}>
      <a className={s.storeBadge} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Image
          src={BADGE_APP_STORE}
          alt="App Storeで入手"
          width={120}
          height={40}
          className={`${s.storeBadgeImg} ${s.storeBadgeImgApple}`}
        />
      </a>
      <a className={s.storeBadge} href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
        <Image
          src={BADGE_GOOGLE_PLAY}
          alt="Google Playで手に入れよう"
          width={163}
          height={50}
          className={`${s.storeBadgeImg} ${s.storeBadgeImgPlay}`}
        />
      </a>
    </div>
  );
}

export default function DinderPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: PAGE_TITLE, description: PAGE_DESCRIPTION, path: PAGE_PATH }),
          softwareApplicationJsonLd({
            name: "dinder",
            description: PAGE_DESCRIPTION,
            path: PAGE_PATH,
            operatingSystem: "iOS, Android",
            applicationCategory: "LifestyleApplication",
            downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
            image: "/images/products/dinder_6x9.png",
            offers: { price: "0" },
          }),
        ]}
      />
      <div className={s.page}>
      {/* ── Fixed Header ── */}
      <header className={s.lpHeader}>
        <div className={s.lpHeaderInner}>
          <div className={s.lpHeaderBrand}>
            <Image
              src={ICON_SRC}
              alt="dinder"
              width={374}
              height={249}
              className={s.lpHeaderLogo}
              priority
            />
          </div>
          {/* モバイル専用 CTA（折り返し防止） */}
          <a className={s.lpHeaderBtnDl} href="#download">今すぐDL</a>
          {/* デスクトップ nav */}
          <nav className={s.lpHeaderNav} aria-label="dinder ナビ">
            <a className={s.lpHeaderBtn} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              App Store
            </a>
            <a className={s.lpHeaderBtn} href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
            <a className={`${s.lpHeaderBtn} ${s.lpHeaderBtnGhost}`} href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

      <main className={s.main}>
        {/* ── Hero ── */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <h1 className={s.heroH1}>
                スワイプして、<br />お店を決めよう。
              </h1>
              <p className={s.heroSub}>近くの飲食店が、指先で見つかる。</p>
              <StoreBadges />
            </div>
            <div className={s.heroImgWrap}>
              <Image
                src={IMG_HEADER}
                alt="dinder アプリ画面"
                width={768}
                height={375}
                className={s.heroImg}
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Problems ── */}
        <section className={s.problemSection}>
          <div className={s.container}>
            <h2 className={s.sectionH2}>こんな悩み、ありませんか？</h2>
            <div className={s.problemGrid}>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/食事（1人）-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>近くにどんなお店があるかわからない</p>
              </div>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/悩む-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>選びすぎて1つに決められない</p>
              </div>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/喧嘩-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>みんなの意見が合わない</p>
              </div>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/飲み会-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>2次会のお店が決まってない</p>
              </div>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/夜-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>深夜でも使えるお店を知りたい</p>
              </div>
              <div className={s.problemCard}>
                <WpImg src="/images/products/dinder/複数人-150x150.png" alt="" className={s.problemIcon} />
                <p className={s.problemText}>みんな「どこでも良いよ〜」</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Steps ── */}
        <section className={s.stepSection}>
          <div className={s.container}>
            <p className={s.solutionLine}>
              そんなときは、サクッと<strong className={s.brandStrong}>dinder</strong>！
            </p>

            <div className={s.stepItem}>
              <div className={s.stepMeta}>
                <span className={s.stepLabel}>STEP 1</span>
                <h3 className={s.stepH3}>アプリが近くのお店を提案！</h3>
                <p className={s.stepDesc}>
                  位置情報をもとに近くの飲食店からアプリがお店を提案！
                </p>
              </div>
              <div className={s.stepImgWrap}>
                <Image
                  src={IMG_RIGHT_SWIPE}
                  alt="アプリ画面：お店提案"
                  width={721}
                  height={1536}
                  className={s.stepImg}
                />
              </div>
            </div>

            <div className={`${s.stepItem} ${s.stepItemReverse}`}>
              <div className={s.stepMeta}>
                <span className={s.stepLabel}>STEP 2</span>
                <h3 className={s.stepH3}>気に入ったら右スワイプ → ナビ開始</h3>
                <p className={s.stepDesc}>
                  提案されたお店が気に入れば右にスワイプするだけで地図アプリが起動し、お店までナビしてくれる！
                </p>
              </div>
              <div className={s.stepImgWrap}>
                <WpImg
                  src="/images/products/dinder/image-473x1024.png"
                  alt="アプリ画面：ナビ"
                  className={s.stepImg}
                />
              </div>
            </div>

            <div className={s.stepItem}>
              <div className={s.stepMeta}>
                <span className={s.stepLabel}>STEP 3</span>
                <h3 className={s.stepH3}>気に入らなければ左スワイプ → 次を提案</h3>
                <p className={s.stepDesc}>
                  気に入らなければ左にスワイプすればアプリが次の候補を提案！
                </p>
              </div>
              <div className={s.stepImgWrap}>
                <Image
                  src={IMG_LEFT_SWIPE}
                  alt="アプリ画面：左スワイプ"
                  width={720}
                  height={1536}
                  className={s.stepImg}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className={s.featureSection}>
          <div className={s.container}>
            <h2 className={s.sectionH2}>特徴</h2>
            <ul className={s.featureList}>
              <li className={s.featureItem}>
                <WpImg src="/images/products/dinder/設定-150x150.png" alt="" className={s.featureIcon} />
                <div className={s.featureBody}>
                  <p className={s.featureTitle}>細かい条件設定</p>
                  <p className={s.featureDesc}>ジャンル・距離・営業時間など事前に設定可能</p>
                </div>
              </li>
              <li className={s.featureItem}>
                <WpImg src="/images/products/dinder/スワイプ-150x150.png" alt="" className={s.featureIcon} />
                <div className={s.featureBody}>
                  <p className={s.featureTitle}>直感的な操作</p>
                  <p className={s.featureDesc}>スワイプだけのシンプルなUI</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* ── Download CTA ── */}
        <section className={s.downloadSection} id="download">
          <h2 className={s.downloadH2}>今すぐダウンロード</h2>
          <p className={s.downloadSub}>お店選びに時間はかけない</p>
          <div className={s.downloadBadges}>
            <a className={s.downloadBadgeLink} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src={BADGE_APP_STORE}
                alt="App Storeで入手"
                width={120}
                height={40}
                className={`${s.storeBadgeImg} ${s.storeBadgeImgApple}`}
              />
            </a>
            <a className={s.downloadBadgeLink} href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src={BADGE_GOOGLE_PLAY}
                alt="Google Playで手に入れよう"
                width={163}
                height={50}
                className={`${s.storeBadgeImg} ${s.storeBadgeImgPlay}`}
              />
            </a>
          </div>
          <p className={s.downloadSettings}>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={s.downloadContactLink}>
              お問い合わせはこちら
            </a>
          </p>
        </section>
      </main>

      <LpProductFooter
        variant="orange"
        iconSrc={ICON_SRC}
        iconAlt="dinder ロゴ"
        productName="dinder"
        tagline="お店選びに時間はかけない"
        links={[
          { href: "/company-info", label: "会社概要" },
          { href: "/privacy", label: "プライバシーポリシー" },
        ]}
        appStoreUrl={APP_STORE_URL}
        googlePlayUrl={GOOGLE_PLAY_URL}
      />
    </div>
    </>
  );
}
