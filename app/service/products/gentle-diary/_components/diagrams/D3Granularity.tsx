import { Icon } from "../Icon";
import s from "../../page.module.css";

/**
 * D3 粒度のぼかし変換図（A4 / B4・完全同一）。
 * ①②はグレー（内部処理）、③だけティール枠で「相手に届くのはこれだけ」を明示。
 * 座標の例示値はダミー（特定個人の居所ではない）。
 */
export default function D3Granularity() {
  return (
    <figure className={s.figure}>
      <div className={s.flow}>
        <div className={s.flowStep}>
          <p className={s.flowStepLabel}>1. 生データ</p>
          <p className={s.flowStepValue}>35.6586, 139.7454</p>
          <p className={s.flowStepValue}>12:34:07</p>
        </div>

        <div className={s.flowArrow} aria-hidden="true">
          <Icon name="arrowRight" className={s.flowArrowIcon} />
          <span>20分単位に丸める</span>
        </div>

        <div className={s.flowStep}>
          <p className={s.flowStepLabel}>2. 丸め</p>
          <p className={s.flowStepValue}>12:40頃</p>
        </div>

        <div className={s.flowArrow} aria-hidden="true">
          <Icon name="arrowRight" className={s.flowArrowIcon} />
          <span>建物名＋「周辺」に変換</span>
        </div>

        <div className={`${s.flowStep} ${s.flowStepFinal}`}>
          <p className={s.flowStepLabel}>3. 場所名</p>
          <p className={s.flowStepValue}>〇〇タワー周辺</p>
          <p className={s.flowStepNote}>相手に届くのはこれだけ</p>
        </div>
      </div>

    </figure>
  );
}
