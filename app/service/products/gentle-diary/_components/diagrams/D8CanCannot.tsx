import { Icon } from "../Icon";
import s from "../../page.module.css";

const CAN = [
  "1日の日記が、翌朝に届きます",
  "「7:00頃 自宅付近」「15:40頃 〇〇駅周辺」のように、その日の節目がわかります",
  "自宅の住所を登録しておけば、自宅から約1km以内は「自宅付近」とだけ表示されます",
  "共有は承認制で、一方向ごとに設定できます。いつでも解除できます",
];

const CANNOT = [
  "今どこにいるかを、リアルタイムに確認することはできません",
  "地図の上で居場所を見ることはできません",
  "「指定の場所に着いたら知らせる」といった通知機能はありません",
  "SOSボタンや緊急時の通報など、防犯・緊急対応のための機能はありません",
  "相手に知られずに見ることはできません（共有には相手の承認が必要です）",
];

/**
 * D8 できること／できないこと 対比図（B5 のみ）。
 * D1 とは視覚的に明確に別デザイン（白サーフェス＋1.5px枠・上端バーなし・見出しはピル型チップ）。
 * 「できないこと」側を縮小・折りたたみ・エラー色にしない（原則2・設計書 §2-3-4）。
 * 締めの文（.compareFoot）は削らない。
 */
export default function D8CanCannot() {
  return (
    <div>
      <div className={`${s.compare} ${s.compareD8}`}>
        <div className={`${s.compareCol} ${s.compareColBrand}`}>
          <p className={s.compareHead}>
            <span className={s.compareHeadChip}>
              <Icon name="check" className={s.compareHeadIcon} />
              できること
            </span>
          </p>
          <ul className={s.compareList}>
            {CAN.map((item) => (
              <li key={item} className={s.compareItem}>
                <Icon name="circleCheck" className={s.compareItemIcon} />
                <span>{item}</span>
              </li>
            ))}
            <li className={s.compareItem}>
              <Icon name="circleCheck" className={s.compareItemIcon} />
              <span>
                相手がスマホの設定に慣れていない場合は、あなたが代理で設定できます
                <br />
                <a className={s.anchorLink} href="#proxy-setup">
                  設定のしかた
                  <Icon name="arrowRight" className={s.anchorLinkIcon} />
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className={`${s.compareCol} ${s.compareColNeutral}`}>
          <p className={s.compareHead}>
            <span className={s.compareHeadChip}>
              <Icon name="minus" className={s.compareHeadIcon} />
              できないこと
            </span>
          </p>
          <ul className={s.compareList}>
            {CANNOT.map((item) => (
              <li key={item} className={s.compareItem}>
                <Icon name="circleMinus" className={s.compareItemIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={`${s.compareFoot} ${s.compareFootStart}`}>
        そのため、<strong>「今すぐ無事を確認したい」「緊急のときに知らせてほしい」という目的には向いていません。</strong>
        Gentle Diary
        は、毎日の「変わりなかった」を、おたがいに無理のない形で知るためのアプリです。急を要する場面では、電話や自治体・事業者の緊急通報サービスをご利用ください。
      </p>
    </div>
  );
}
