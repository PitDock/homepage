"use client";

import { useEffect } from "react";
import Image from "next/image";
import { LpProductFooter } from "../../../components/LpProductFooter";
import s from "./page.module.css";

const APP_STORE_URL =
  "https://apps.apple.com/jp/app/gentle-diary-%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E5%85%B1%E6%9C%89%E3%81%97%E3%81%AA%E3%81%84%E4%BD%8D%E7%BD%AE%E6%83%85%E5%A0%B1%E6%97%A5%E8%A8%98/id6758263521";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gentlediary&hl=ja";
const CONTACT_URL = "https://forms.gle/1LeyyeeJqdACPJXf9";

const ICON_SRC = "/images/products/GentleDiary.png";
const IMG_HERO = "/images/products/0.png";
const IMG_1 = "/images/products/1.png";
const IMG_2 = "/images/products/2.png";
const IMG_DIARY = "/images/products/日記.png";
const IMG_NO_RT = "/images/products/リアルタイム位置情報共有なし.png";
const BADGE_APP_STORE = "/images/products/AppStore.png";
/** LP の CTA_PlayStore.png に相当（未配置時は Google Play バッジで代替） */
const BADGE_GOOGLE_PLAY = "/images/products/GooglePlay.png";

export default function GentleDiaryPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(`.${s.fadeIn}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.page}>
      <div className={s.topbar}>
        <div className={`${s.container} ${s.topbarInner}`}>
          <div className={s.topbarLeft}>
            <Image
              src={ICON_SRC}
              alt="Gentle Diary ロゴ"
              width={42}
              height={42}
              className={s.topbarLogoImg}
              priority
            />
            <span>Gentle Diary</span>
          </div>
          <div className={s.topbarRight}>
            <div className={s.topbarCta}>
              <a
                className={s.storeBtn}
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={BADGE_APP_STORE}
                  alt="App Storeで入手（近日公開）"
                />
              </a>
              <a
                className={s.storeBtn}
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={BADGE_GOOGLE_PLAY}
                  alt="Google Playで手に入れよう（近日公開）"
                />
              </a>
              <a
                className={`${s.contactBtn} ${s.topbarContactBtn}`}
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className={s.hero}>
        <div className={`${s.container} ${s.heroGrid}`}>
          <div className={s.fadeIn}>
            <h1>
              安心を共有しながら、<br />
              プライバシーは守る。
            </h1>
            <p className={s.heroLead}>
              リアルタイムな位置情報の共有はしない。
              <br />
              1日の行動をやさしく要約して届ける、家族や大切な人のための見守りアプリ。
            </p>
            <div className={s.ctaRow}>
              <div className={s.storeCta}>
                <a className={s.storeBtn} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <img src={BADGE_APP_STORE} alt="App Storeで入手（近日公開）" />
                </a>
                <a className={s.storeBtn} href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
                  <img src={BADGE_GOOGLE_PLAY} alt="Google Playで手に入れよう（近日公開）" />
                </a>
                <a className={s.contactBtn} href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
                  お問い合わせ
                </a>
              </div>
            </div>
          </div>
          <div className={`${s.heroCard} ${s.fadeIn}`}>
            <Image
              src={IMG_HERO}
              alt="Gentle Diaryのイメージ"
              width={800}
              height={800}
              className={s.heroIllus}
              priority
            />
            <div className={s.stats}>
              <div className={s.stat}>
                <strong>プライバシーに配慮</strong>
                <div>許可した人だけに公開</div>
              </div>
              <div className={s.stat}>
                <strong>ほどよい距離感</strong>
                <div>リアルタイム共有はしない</div>
              </div>
              <div className={s.stat}>
                <strong>シンプル</strong>
                <div>毎日の負担ゼロ</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={`${s.section} ${s.fadeIn}`}>
        <div className={`${s.sectionTitle} ${s.fadeIn}`}>
          <h2>こんなお悩みありませんか？</h2>
        </div>
        <div className={`${s.container} ${s.gridTwo}`}>
          <div className={s.card}>
            <h3>常時共有は、気が休まらない。</h3>
            <p>常に位置を追跡されると、監視されているようなストレスを感じてしまうことも。</p>
            <Image
              src={IMG_1}
              alt="常時共有は、気が休まらない。"
              width={800}
              height={600}
              className={s.cardMedia}
            />
          </div>
          <div className={s.card}>
            <h3>でも、無事は知りたい。</h3>
            <p>家族や恋人が今日どんな一日だったのか、ざっくりでも伝わるだけで安心できる。</p>
            <Image
              src={IMG_2}
              alt="でも、無事は知りたい。"
              width={800}
              height={600}
              className={s.cardMedia}
            />
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.fadeIn}`}>
        <div className={`${s.sectionTitle} ${s.fadeIn}`}>
          <h2>
            Gentle Diaryは、リアルタイム追跡の代わりに
            <br />
            1日の行動を要約して共有します
          </h2>
        </div>
        <div className={`${s.container} ${s.gridTwo}`}>
          <div className={s.card}>
            <h3>行動を自動でやさしく要約</h3>
            <p>1日の移動履歴をゆるくまとめて共有します。</p>
            <Image
              src={IMG_DIARY}
              alt="行動を自動でやさしく要約"
              width={800}
              height={600}
              className={s.cardMedia}
            />
          </div>
          <div className={s.card}>
            <h3>リアルタイム共有はしない</h3>
            <p>今いる場所は見えないからこそ、安心感とプライバシーが両立できます。</p>
            <Image
              src={IMG_NO_RT}
              alt="リアルタイム共有はしない"
              width={800}
              height={600}
              className={s.cardMedia}
            />
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.featureSection} ${s.fadeIn}`} id="features">
        <div className={s.container}>
          <div className={`${s.sectionTitle} ${s.fadeIn}`}>
            <h2>Gentle Diaryが選ばれる理由</h2>
          </div>
          <div className={s.featureList}>
            <div className={s.feature}>
              <span>プライバシー重視</span>
              <p>見られすぎないから、距離感がちょうどいい。</p>
            </div>
            <div className={s.feature}>
              <span>自動要約</span>
              <p>1日の動きを自動でまとめて、わかりやすく共有。</p>
            </div>
            <div className={s.feature}>
              <span>家族・恋人向け</span>
              <p>「無事に過ごしたよ」をやさしく伝える。</p>
            </div>
            <div className={s.feature}>
              <span>シンプル操作</span>
              <p>必要なのは初期設定だけ。あとは自動で完結。</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.fadeIn}`}>
        <div className={s.container}>
          <div className={s.cta}>
            <h2>毎日の安心を、やさしく共有しよう。</h2>
            <p>リアルタイムをやめたら、もっとやさしくつながれる。</p>
            <div className={s.ctaButtonsWrap}>
              <div className={s.storeButtons}>
                <a className={s.storeBtn} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <img src={BADGE_APP_STORE} alt="App Storeで入手" />
                </a>
                <a className={s.storeBtn} href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
                  <img src={BADGE_GOOGLE_PLAY} alt="Google Playで手に入れよう" />
                </a>
              </div>
              <a className={s.contactBtn} href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={s.footerSlot}>
      <LpProductFooter
        variant="teal"
        iconSrc={ICON_SRC}
        iconAlt="Gentle Diary ロゴ"
        productName="Gentle Diary"
        tagline="リアルタイム共有しない位置情報日記"
        links={[
          { href: "/company-info", label: "会社概要" },
          {
            href: "/service/products/gentle-diary/privacy",
            label: "プライバシーポリシー",
          },
          {
            href: "/service/products/gentle-diary/terms",
            label: "利用規約",
          },
        ]}
        appStoreUrl={APP_STORE_URL}
        googlePlayUrl={GOOGLE_PLAY_URL}
      />
      </div>
    </div>
  );
}
