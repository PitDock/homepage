import { Icon } from "../Icon";
import s from "../../page.module.css";

const AXIS = ["0", "6", "12", "18", "24"];

/**
 * D2 常時共有 vs 1日1回 比較図（A2 / B2）。
 * 図は A/B 完全同一。キャプションのみ A/B で異なる。
 * 上段は彩度を落としたグレー（「常時共有＝悪」と断じる赤系は使わない）。
 */
export default function D2Timeline({ caption }: { caption: string }) {
  return (
    <figure className={s.figure}>
      <div className={s.d2}>
        <div className={s.d2Track}>
          <p className={s.d2TrackLabel}>常に見せ合う位置共有</p>
          <div className={`${s.d2Rail} ${s.d2RailDense}`} />
          <p className={s.d2Note}>ずっと見えている</p>
          <div className={`${s.d2Axis} ${s.d2AxisMobileOnly}`} aria-hidden="true">
            {AXIS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className={s.d2Track}>
          <p className={s.d2TrackLabel}>Gentle Diary</p>
          <div className={s.d2Rail}>
            <div className={s.d2RailSingle} />
            <span className={s.d2Diary}>
              <Icon name="note" className={s.d2DiaryIcon} />
            </span>
          </div>
          <p className={s.d2Note}>夜にまとめて1通</p>
          <div className={`${s.d2Axis} ${s.d2AxisMobileOnly}`} aria-hidden="true">
            {AXIS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* デスクトップでは2トラックの下に目盛りを1本だけ出す */}
        <div className={`${s.d2Axis} ${s.d2AxisDesktopOnly}`} aria-hidden="true">
          {AXIS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  );
}
