"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import Shot from "./Shot";
import StoreCta from "./StoreCta";
import LpImpression from "./LpImpression";
import FadeIn from "./FadeIn";
import {
  FaqList,
  LpHeader,
  StickyBarSpacer,
  StickyStoreBar,
  PolicyBlock,
  PrivacyLead,
  ProductFooter,
  SetupList,
  TrustBadges,
} from "./shared";
import D1Visibility from "./diagrams/D1Visibility";
import D4Steps from "./diagrams/D4Steps";
import D5Approval from "./diagrams/D5Approval";
import D6Lifecycle from "./diagrams/D6Lifecycle";
import D8CanCannot from "./diagrams/D8CanCannot";
import D9ProxySetup from "./diagrams/D9ProxySetup";
import {
  B_CTA_NOTE,
  CTA_HEADING,
  GRAIN_PLACE,
  GRAIN_TIME,
  H2_FAQ,
  H2_FOR_WHO,
  H2_GRANULARITY,
  H2_HOWTO,
  H2_PRIVACY,
  H2_VISIBILITY,
  ICON_ALT,
  ICON_SRC,
  MICRO_NOTE_FULL,
} from "./copy";
import s from "../page.module.css";

/** B2 共感カード（設計書 §2-3-3）。既存イラストは3枚とも不使用＝テキストのみ */
const EMPATHY_CARDS = [
  {
    title: "心配だから、見られるようにしておきたい",
    body: "子どもが無事に帰ったか。離れて暮らす親が、今日も変わりなく過ごしたか。知っておきたい気持ちは、ごく自然なものです。",
  },
  {
    title: "でも、いつでも見られる状態は、やりすぎな気がする",
    body: "居場所がいつでも分かるようにしておくことは、相手の時間をこちらが持つことでもある。心配のつもりが、信じていないことになってしまう。",
  },
  {
    title: "見るたびに、少し後ろめたい",
    body: "開くたびに「見てしまった」と思う。その後ろめたさは、見守り方が自分に合っていないというサインかもしれません。",
  },
];

/** B1 ヒーローのミニチップ（アイコンは aria-hidden なので .srOnly で意味を補う） */
const CHIPS = [
  { icon: "eyeOff" as const, label: "現在地", sr: "は共有されません", on: false },
  { icon: "mapOff" as const, label: "地図", sr: "はありません", on: false },
  { icon: "noteCheck" as const, label: "1日1回の日記", sr: "が共有されます", on: true },
];

type Props = { isoWeek: string; variant: "A" | "B" };

export default function VariantB({ isoWeek, variant }: Props) {
  return (
    <div className={s.root}>
      <LpHeader isoWeek={isoWeek} variant={variant} />

      <main>
        {/* ===== B1 ヒーロー ===== */}
        <section className={`${s.hero} ${s.bgBase}`}>
          <div className={`${s.container} ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              {/* 必ず2行組み。1行目（肯定）と2行目（否定）の間に「ため」を作る */}
              <h1 className={s.h1}>
                <span className={s.h1Line}>見守りたい。</span>
                <span className={`${s.h1Line} ${s.h1Pause}`}>
                  <span className={s.h1Soft}>でも、</span>監視はしたくない。
                </span>
              </h1>
              {/* 文ごとに改行する（A と同じ扱い） */}
              <p className={s.lead}>
                <span className={s.leadLine}>子どもや離れて暮らす親のことは気になる。</span>
                <span className={s.leadLine}>
                  でも、いつでも居場所が見られる状態は、やりすぎな気がする。
                </span>
                <span className={s.leadLine}>
                  Gentle Diary は現在地をリアルタイムに共有せず、1日の日記だけを届けます。
                </span>
                <span className={s.leadLine}>やりすぎない家族の見守りに、恋人や夫婦にも。</span>
              </p>

              <div className={s.chipRow}>
                {CHIPS.map((c) => (
                  <span
                    key={c.label}
                    className={`${s.chip} ${c.on ? s.chipOn : s.chipOff}`}
                  >
                    <Icon name={c.icon} className={s.chipIcon} />
                    {c.label}
                    <span className={s.srOnly}>{c.sr}</span>
                  </span>
                ))}
              </div>

              <StoreCta
                className={s.heroCta}
                isoWeek={isoWeek}
                variant={variant}
                size="hero"
                heading={CTA_HEADING}
                note={B_CTA_NOTE}
              />
            </div>
            {/* LCP要素なので .fadeIn を付けず priority を付ける */}
            <Shot
              id="S1"
              frame="phone"
              className={s.heroShot}
              priority
              sizes="(max-width: 767px) 72vw, 300px"
            />
          </div>
        </section>

        {/* ===== B2 共感（見守る側の罪悪感） ===== */}
        <section className={`${s.section} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>見守りたい気持ちと、監視したくない気持ちのあいだで</h2>
              <p className={s.lead}>見守りたい気持ちと、監視したくない気持ちのあいだで。</p>
            </div>
            <div className={`${s.grid3} ${s.fadeIn}`}>
              {EMPATHY_CARDS.map((c) => (
                <div key={c.title} className={s.card}>
                  <h3 className={s.cardH3}>{c.title}</h3>
                  <p className={s.cardBody}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== B3 相手に何が見える？（前倒し・フルサイズ） ===== */}
        <section className={`${s.section} ${s.bgSoft}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_VISIBILITY}</h2>
              <p className={s.lead}>
                Gentle Diary が大事にしているのは、
                <strong>
                  見守る側が安心できることと、見守られる側が自由でいられることを、同じ仕組みで両立させること
                </strong>
                です。だから、相手の現在地は見られません。見えるのは、1日の日記だけ。相手から何を奪わないのかを、先にお伝えします。
              </p>
            </div>
            <div className={s.fadeIn}>
              <D1Visibility wide />
            </div>
            <StoreCta
              className={s.blockGap}
              isoWeek={isoWeek}
              variant={variant}
              size="block"
              heading={CTA_HEADING}
              note={B_CTA_NOTE}
            />
          </div>
        </section>

        {/* ===== B4 届くもの（日記の粒度） ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_GRANULARITY}</h2>
            </div>
            <div className={`${s.blockGap} ${s.fadeIn}`}>
              <Shot id="S2" frame="plain" className={s.shotS2} sizes="(max-width: 767px) 90vw, 520px" />
              {/* 「日記」の補足文 配置箇所②（全文版・A3 と同一文言・同一位置） */}
              <p className={`${s.microNote} ${s.microNoteCenter}`}>{MICRO_NOTE_FULL}</p>
              <ul className={s.grainList}>
                {[GRAIN_TIME, GRAIN_PLACE].map((item) => (
                  <li key={item} className={s.grainItem}>
                    <Icon name="check" className={s.grainIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== B5 できること／できないこと ===== */}
        <section className={`${s.section} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>Gentle Diary でできること、できないこと</h2>
              <p className={s.lead}>
                見守りに使うものだからこそ、できないこともはっきりお伝えします。
              </p>
            </div>
            <div className={s.fadeIn}>
              <D8CanCannot />
            </div>
          </div>
        </section>

        {/* ===== B6 プライバシー設計（<h2> が2つ。SEOキーワード帯＋本体） ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
          <div className={s.container}>
            <div className={`${s.kwBand} ${s.fadeIn}`}>
              <h2 className={s.kwBandH2}>{H2_FOR_WHO}</h2>
              <p className={s.kwBandBody}>
                ここまでの設計は、どなたが使っても同じです。家族の見守りでも、カップル・夫婦の位置共有でも、現在地は共有されず、届くのは1日の日記だけ。共有できる相手は、承認した人に限られます。見守る相手のプライバシーも、同じように守られます。
              </p>
            </div>

            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={`${s.h2} ${s.h2OneLine}`}>{H2_PRIVACY}</h2>
              <PrivacyLead />
            </div>
            <div className={s.fadeIn}>
              <TrustBadges />
            </div>
            <div className={`${s.blockGapLg} ${s.fadeIn}`}>
              <D5Approval showProxyNote />
            </div>
            <div className={`${s.shotPair} ${s.shotPairTriple} ${s.fadeIn}`}>
              <div className={s.shotPairItem}>
                <Shot id="S3" frame="plain" sizes="240px" />
                <p className={s.caption}>閲覧権限画面</p>
              </div>
              <div className={s.shotPairItem}>
                <Shot id="S8" frame="phone" sizes="240px" />
                <p className={s.caption}>タイムライン画面（空状態）</p>
              </div>
            </div>
            <div className={`${s.blockGap} ${s.fadeIn}`}>
              <D6Lifecycle />
            </div>
            <div className={s.fadeIn}>
              <PolicyBlock />
            </div>
            <StoreCta
              className={s.blockGap}
              isoWeek={isoWeek}
              variant={variant}
              size="inline"
            />
          </div>
        </section>

        {/* ===== B7 使い方3ステップ（CTAは置かない。総数4を守る） ===== */}
        <section className={`${s.section} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_HOWTO}</h2>
            </div>
            <div className={s.fadeIn}>
              <D4Steps />
            </div>
            <div className={`${s.blockGapLg} ${s.fadeIn}`}>
              <h3 className={`${s.h3} ${s.h3Center}`}>はじめにすることは、3つだけ</h3>
              <div className={s.blockGapSm}>
                <SetupList />
              </div>
            </div>

            {/* 代理設定ブロック（前向きな見出し＋同ブロック内の囲みで注意） */}
            <div className={`${s.blockGapLg} ${s.fadeIn}`}>
              <div className={s.proxyBlock} id="proxy-setup">
                <h3 className={s.proxyBlockH3}>
                  相手がスマホに詳しくなくても、あなたが代理で設定できます
                </h3>
                <p className={s.proxyBlockBody}>
                  Gentle Diary
                  の日記は、それぞれの端末で記録された位置情報から作られます。そのため、お子さまや親御さんの日記を見るには、
                  <strong>相手の端末にも Gentle Diary が必要</strong>
                  です。相手が自分で設定するのが難しい場合は、
                  <strong>あなたが代理で設定していただけます。</strong>
                  手順は4つです。
                </p>
                <div className={s.blockGapSm}>
                  <D9ProxySetup />
                </div>
                <p className={s.proxyBlockBody}>
                  設定が終われば、あとは自動です。相手の端末で何か操作してもらう必要はありません。
                </p>
              </div>
            </div>

            {/* STEP 1 の補足（注意ではないのでアンバーにしない） */}
            <p className={`${s.supplement} ${s.fadeIn}`}>
              STEP 1 の補足:
              位置情報は、高精度のGPSを常にオンにする方式ではなく、一定の距離を移動したときだけ記録する方式です。
            </p>
          </div>
        </section>

        {/* ===== B8 FAQ（A8 と完全に同一・背景面のみ異なる） ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_FAQ}</h2>
            </div>
            <div className={s.fadeIn}>
              <FaqList />
            </div>
          </div>
        </section>

        {/* ===== B9 最終CTA ===== */}
        <section className={s.ctaBand}>
          <div className={s.container}>
            <Image
              src={ICON_SRC}
              alt={ICON_ALT}
              width={64}
              height={64}
              className={s.ctaAppIcon}
            />
            <h2 className={s.h2}>やりすぎない見守りを、今日から</h2>
            <StoreCta
              className={s.blockGapSm}
              isoWeek={isoWeek}
              variant={variant}
              size="final"
              heading={CTA_HEADING}
              note={B_CTA_NOTE}
            />
          </div>
        </section>
      </main>

      <StickyBarSpacer />
      <ProductFooter />
      <StickyStoreBar isoWeek={isoWeek} variant={variant} />

      <LpImpression isoWeek={isoWeek} variant={variant} />
      <FadeIn />
    </div>
  );
}
