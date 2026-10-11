import { Icon } from "../Icon";
import { THIRD_PARTY_STATEMENT } from "../copy";
import s from "../../page.module.css";

/**
 * D6 データのライフサイクル図（B6 のみ・コンパクト帯）。
 * ④の「10日」は実装値（DeleteOldData.py の RETENTION_DAYS）。
 * 変更時は FAQ Q3・信頼バッジ4・この図の3箇所を同時に更新する（設計書 §3-11）。
 * ④は D3 の③と区別するため中立色で落ち着かせる（削除は強調色にしない）。
 */
export default function D6Lifecycle() {
  return (
    <figure className={s.figure}>
      <h3 className={s.figTitle}>見守られる側のデータも、溜まり続けません</h3>

      <div className={`${s.flow} ${s.flowCompact}`}>
        <div className={s.flowStep}>
          <p className={s.flowStepLabel}>1</p>
          <p className={s.flowStepValue}>位置情報を記録</p>
        </div>

        <div className={s.flowArrow} aria-hidden="true">
          <Icon name="arrowRight" className={s.flowArrowIcon} />
        </div>

        <div className={s.flowStep}>
          <p className={s.flowStepLabel}>2</p>
          <p className={s.flowStepValue}>深夜3時に日記を作成</p>
        </div>

        <div className={s.flowArrow} aria-hidden="true">
          <Icon name="arrowRight" className={s.flowArrowIcon} />
        </div>

        <div className={s.flowStep}>
          <p className={s.flowStepLabel}>3</p>
          <p className={s.flowStepValue}>相手が読めるのは直近2日分</p>
          <p className={s.flowStepNote}>3日以上前は閲覧できません</p>
        </div>

        <div className={s.flowArrow} aria-hidden="true">
          <Icon name="arrowRight" className={s.flowArrowIcon} />
        </div>

        <div className={`${s.flowStep} ${s.flowStepLast}`}>
          <p className={s.flowStepLabel}>4</p>
          <p className={s.flowStepValue}>取得から10日後に自動削除</p>
          <Icon name="trash" className={s.flowStepIcon} />
        </div>
      </div>

      <p className={s.flowBranch}>アカウントを削除すれば、データも削除されます</p>

      {/* 確定文言・言い換え禁止（FAQ Q3・社会的証明・D1 と同一文言） */}
      <p className={s.compareFoot}>{THIRD_PARTY_STATEMENT}</p>
    </figure>
  );
}
