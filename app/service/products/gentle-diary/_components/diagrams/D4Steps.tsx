import { type IconName } from "../Icon";
import { FigSlot } from "../Shot";
import type { ShotId } from "../shots";
import s from "../../page.module.css";

type Step = {
  icon: IconName;
  label: string;
  title: string;
  body: string;
  shot: ShotId;
};

/** 本文は設計書 §2-7 の3ステップ（A/B共通・一字一句同一） */
const STEPS: Step[] = [
  {
    icon: "phonePocket",
    label: "STEP 1",
    title: "いつも通り、過ごす",
    body: "特別な操作はありません。アプリを開いたままにする必要もなく、閉じていても大丈夫です。Gentle Diary はバックグラウンドで、1日のおおまかな行動だけを静かに記録します。",
    shot: "S7a",
  },
  {
    icon: "moonClock",
    label: "STEP 2",
    title: "夜のあいだに、1日が「日記」になる",
    body: "毎日深夜3時ごろ、直近24時間の記録が自動でまとめられます。できあがるのは「9:00頃／自宅付近」「12:20頃／〇〇駅周辺」のような、時刻と場所のリスト。時刻は20分単位のおおよその表記になり、場所は「〇〇周辺」という粒度までぼかされます。",
    shot: "S2",
  },
  {
    icon: "mailOpen",
    label: "STEP 3",
    title: "翌朝、やさしく届く",
    body: "できあがった日記は、承認した相手の画面に表示されます。相手が見られるのはこの日記だけ。現在地を見る画面も、地図もありません。",
    shot: "S1",
  },
];

/**
 * D4 3ステップ図（A5 / B7・完全同一）。
 * スクショは比率3種が混在するため .figSlot（3/4・contain）で統一し、枠を揃える。
 */
export default function D4Steps() {
  return (
    <div className={s.steps3}>
      {STEPS.map((step) => (
        <div key={step.label} className={s.step3Card}>
          <p className={s.step3Label}>{step.label}</p>
          <p className={s.step3Title}>{step.title}</p>
          <p className={s.step3Body}>{step.body}</p>
          <div className={s.step3Shot}>
            <FigSlot id={step.shot} />
          </div>
        </div>
      ))}
    </div>
  );
}
