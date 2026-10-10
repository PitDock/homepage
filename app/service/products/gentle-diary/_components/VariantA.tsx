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
import {
  A_CTA_NOTE,
  CTA_HEADING,
  STEP1_SUPPLEMENT_LINES,
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
  MICRO_NOTE_FULL_LINES,
} from "./copy";
import s from "../page.module.css";

/** A2 共感カード（設計書 §2-3-1）。既存イラストは3枚とも不使用＝テキストのみ */
const EMPATHY_CARDS = [
  {
    title: "「今どこ？」って、本当は聞きたくない",
    body: "心配だから聞くのに、聞いた側も、聞かれた側も、少し気まずくなる。確認が増えるほど、信じていないみたいに見えてしまう。",
  },
  {
    title: "見られていると、寄り道ひとつに理由がいる",
    body: "本屋に15分寄っただけ。それだけのことに説明が必要になると、どこへ行くのも少し窮屈になる。",
  },
  {
    title: "かといって、何も分からないのは落ち着かない",
    body: "連絡がない日は、やっぱり気になる。全部見たいわけじゃない。ただ「無事だった」と分かりたいだけ。",
  },
];

/** A6 誰のため（設計書 §2-3-2） */
const FOR_WHO = [
  {
    icon: "relation" as const,
    title: "カップル・夫婦の位置共有に",
    body: "常に見せ合わなくても、1日の終わりに「ここに行ったよ」が伝わる。確認のための連絡が減って、話したいことを話せるようになります。",
  },
  {
    icon: "switchDirection" as const,
    title: "今まで使っていた位置共有の代わりに",
    body: "常時共有が前提のアプリをやめたい、でも何もない状態には戻りたくない。そんなときの、ちょうど中間にある選択肢です。",
  },
  {
    icon: "distance" as const,
    title: "単身赴任・遠距離で離れている人と",
    body: "時間帯が合わなくて話せない日も、翌朝に1日の日記が届きます。報告しなくても、ちゃんと伝わります。",
  },
];

type Props = { isoWeek: string; variant: "A" | "B" };

export default function VariantA({ isoWeek, variant }: Props) {
  return (
    <div className={s.root}>
      <LpHeader isoWeek={isoWeek} variant={variant} />

      <main>
        {/* ===== A1 ヒーロー ===== */}
        <section className={`${s.hero} ${s.bgBase}`}>
          <div className={`${s.container} ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              <h1 className={s.h1}>
                <span className={s.h1Line}>現在地は、見せ合わない。</span>
                <span className={s.h1Line}>伝わるのは、1日の日記だけ。</span>
              </h1>
              {/* 文ごとに改行する（長い文は各行の中でさらに折り返す） */}
              <p className={s.lead}>
                <span className={s.leadLine}>現在位置を常に見せ合うのはしんどい。</span>
                <span className={s.leadLine}>でも、何も分からないのも落ち着かない。</span>
                <span className={s.leadLine}>
                  Gentle Diary はリアルタイムの位置を共有せず、1日の日記だけを届けます。
                  常時共有の代わりを探している恋人・夫婦に。
                </span>
              </p>
              <StoreCta
                className={s.heroCta}
                isoWeek={isoWeek}
                variant={variant}
                size="hero"
                heading={CTA_HEADING}
                note={A_CTA_NOTE}
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

        {/* ===== A2 共感（痛みの言語化） ===== */}
        <section className={`${s.section} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>「今どこ？」を見せ合うのに、疲れていませんか</h2>
              <p className={s.lead}>位置を見せ合うのは、安心のためだったはずなのに。</p>
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

        {/* ===== A3 解決提示 ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>リアルタイム追跡をしない、位置情報共有アプリです</h2>
            </div>
            <p className={`${s.statement} ${s.fadeIn}`}>
              「今どこにいる」はやめて、「今日どこにいた」だけにした。
            </p>

            <div className={`${s.blockGap} ${s.fadeIn}`}>
              <h3 className={`${s.h3} ${s.h3Center}`}>{H2_GRANULARITY}</h3>
              <div className={s.blockGapSm}>
                <Shot id="S2" frame="plain" className={s.shotS2} sizes="(max-width: 767px) 90vw, 520px" />
                {/* 「日記」の補足文 配置箇所②（全文版） */}
                <p className={`${s.microNote} ${s.microNoteCenter}`}>
                  {MICRO_NOTE_FULL_LINES.map((line) => (
                    <span key={line} className={s.microNoteLine}>
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <ul className={s.grainList}>
                {[GRAIN_TIME, GRAIN_PLACE].map((item) => (
                  <li key={item} className={s.grainItem}>
                    <Icon name="check" className={s.grainIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <StoreCta
              className={s.blockGap}
              isoWeek={isoWeek}
              variant={variant}
              size="inline"
            />
          </div>
        </section>

        {/* ===== A4 相手に何が見える？ ===== */}
        <section className={`${s.section} ${s.bgSoft}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_VISIBILITY}</h2>
              <p className={s.lead}>「自分が何を見られるのか」を先にお伝えします。</p>
            </div>
            <div className={s.fadeIn}>
              <D1Visibility />
            </div>
          </div>
        </section>

        {/* ===== A5 使い方3ステップ ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
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
            {/* STEP 1 の補足（注意ではないのでアンバーにしない・A/B共通） */}
            <p className={`${s.supplement} ${s.fadeIn}`}>
              STEP 1 の補足:
              {STEP1_SUPPLEMENT_LINES.map((line) => (
                <span key={line} className={s.supplementLine}>
                  {line}
                </span>
              ))}
            </p>
            <StoreCta
              className={s.blockGap}
              isoWeek={isoWeek}
              variant={variant}
              size="block"
              heading={CTA_HEADING}
              note={A_CTA_NOTE}
            />
          </div>
        </section>

        {/* ===== A6 誰のため ===== */}
        <section className={`${s.sectionCompact} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_FOR_WHO}</h2>
              <p className={s.lead}>近い関係だからこそ、ちょうどいい距離で。</p>
            </div>
            <div className={`${s.grid3} ${s.fadeIn}`}>
              {FOR_WHO.map((c) => (
                <div key={c.title} className={s.forWhoCard}>
                  <h3 className={s.cardH3}>{c.title}</h3>
                  <p className={s.cardBody}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== A7 社会的証明（数字を使わない） ===== */}
        <section className={`${s.section} ${s.bgBase}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={`${s.h2} ${s.h2OneLine}`}>{H2_PRIVACY}</h2>
              <PrivacyLead />
            </div>
            <div className={s.fadeIn}>
              <TrustBadges />
            </div>
            <div className={`${s.blockGapLg} ${s.fadeIn}`}>
              <D5Approval />
            </div>
            <div className={`${s.shotPair} ${s.fadeIn}`}>
              <div className={s.shotPairItem}>
                <Shot id="S3" frame="plain" sizes="260px" />
                <p className={s.caption}>閲覧権限画面</p>
              </div>
            </div>
            <div className={s.fadeIn}>
              <PolicyBlock />
            </div>
          </div>
        </section>

        {/* ===== A8 FAQ ===== */}
        <section className={`${s.section} ${s.bgAlt}`}>
          <div className={s.container}>
            <div className={`${s.sectionHead} ${s.fadeIn}`}>
              <h2 className={s.h2}>{H2_FAQ}</h2>
            </div>
            <div className={s.fadeIn}>
              <FaqList />
            </div>
          </div>
        </section>

        {/* ===== A9 最終CTA ===== */}
        <section className={s.ctaBand}>
          <div className={s.container}>
            <Image
              src={ICON_SRC}
              alt={ICON_ALT}
              width={64}
              height={64}
              className={s.ctaAppIcon}
            />
            <h2 className={s.h2}>「今どこ？」を聞かない日常を、今日から</h2>
            <StoreCta
              className={s.blockGapSm}
              isoWeek={isoWeek}
              variant={variant}
              size="final"
              heading={CTA_HEADING}
              note={A_CTA_NOTE}
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
