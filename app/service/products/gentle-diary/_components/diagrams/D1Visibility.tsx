import { Icon } from "../Icon";
import { THIRD_PARTY_STATEMENT } from "../copy";
import s from "../../page.module.css";

const HIDDEN = [
  "今いる場所（現在地）",
  "地図上の位置",
  "リアルタイムの移動",
  "正確な緯度・経度",
  "分単位の正確な時刻",
  "登録した自宅の住所",
  "メールアドレスの全文",
];

const VISIBLE = [
  "1日1回つくられる日記",
  "20分単位のおおよその時刻（「12:20頃」）",
  "「〇〇周辺」という粒度の場所",
  "閲覧できるのは直近2日分",
];

/**
 * D1 見える／見えない 対比図（A4 / B3）。
 * 原則2（Equal Weight）: padding・font-size・border幅・本文色は両カラム完全同一。
 * 否定側に赤・opacity・縮小・折りたたみを使わない。順序も変えない。
 */
export default function D1Visibility({ wide = false }: { wide?: boolean }) {
  return (
    <div>
      <div className={`${s.compare} ${wide ? s.compareWide : ""}`}>
        <div className={`${s.compareCol} ${s.compareColNeutral}`}>
          <p className={s.compareHead}>
            <Icon name="eyeOff" className={s.compareHeadIcon} />
            相手には見えません
          </p>
          <ul className={s.compareList}>
            {HIDDEN.map((item) => (
              <li key={item} className={s.compareItem}>
                <Icon name="circleMinus" className={s.compareItemIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${s.compareCol} ${s.compareColBrand}`}>
          <p className={s.compareHead}>
            <Icon name="note" className={s.compareHeadIcon} />
            相手に見えるのはこれだけ
          </p>
          <ul className={s.compareList}>
            {VISIBLE.map((item) => (
              <li key={item} className={s.compareItem}>
                <Icon name="circleCheck" className={s.compareItemIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 確定文言・言い換え禁止（FAQ Q3・社会的証明・D6 と同一文言） */}
      <p className={s.compareFoot}>{THIRD_PARTY_STATEMENT}</p>
    </div>
  );
}
