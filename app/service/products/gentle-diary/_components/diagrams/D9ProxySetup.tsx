import { Icon } from "../Icon";
import { FigSlot } from "../Shot";
import s from "../../page.module.css";

function LaneChip({ lane }: { lane: "theirs" | "yours" }) {
  return lane === "theirs" ? (
    <span className={`${s.d9LaneChip} ${s.d9LaneTheirs}`}>
      <Icon name="phone" className={s.d9LaneChipIcon} />
      相手の端末
    </span>
  ) : (
    <span className={`${s.d9LaneChip} ${s.d9LaneYours}`}>
      <Icon name="phonePerson" className={s.d9LaneChipIcon} />
      あなたの端末
    </span>
  );
}

function Connector() {
  return (
    <li className={s.d9Connector} aria-hidden="true">
      <Icon name="arrowRight" className={s.d9ConnectorIcon} />
    </li>
  );
}

/**
 * D9 保護者が代理で設定する流れ図（B7 の .proxyBlock 内側 / B5 からアンカー）。
 *
 * レーンは色だけに依存させない: ①レーン名のテキスト ②塗り／枠線 ③実線／破線の左アクセント
 * ④アイコンの違い の4重で区別する。
 * ⚠注意は赤ではなくアンバー（.notice）で、図の末尾・4ステップの直後に置く。
 */
export default function D9ProxySetup() {
  return (
    <div className={s.d9}>
      <div className={s.d9LaneHeads} aria-hidden="true">
        <LaneChip lane="theirs" />
        <LaneChip lane="yours" />
      </div>

      <ol className={s.d9Steps}>
        <li className={`${s.d9Step} ${s.d9StepTheirs}`}>
          <div className={s.d9StepHead}>
            <span className={s.d9StepNum}>1</span>
            <LaneChip lane="theirs" />
          </div>
          <p className={s.d9StepTitle}>相手の端末に Gentle Diary をインストールする</p>
        </li>

        <Connector />

        <li className={`${s.d9Step} ${s.d9StepTheirs}`}>
          <div className={s.d9StepHead}>
            <span className={s.d9StepNum}>2</span>
            <LaneChip lane="theirs" />
          </div>
          <p className={s.d9StepTitle}>相手用のメールアドレスで、相手のアカウントを作る</p>
          <div className={s.d9StepShot}>
            <FigSlot id="S6" />
          </div>
          <p className={s.d9StepNote}>パスワードは不要。届いたメールのリンクを開くだけです。</p>
        </li>

        <Connector />

        <li className={`${s.d9Step} ${s.d9StepTheirs}`}>
          <div className={s.d9StepHead}>
            <span className={s.d9StepNum}>3</span>
            <LaneChip lane="theirs" />
          </div>
          <p className={s.d9StepTitle}>その端末で、位置情報の許可を「常に許可」にする</p>
          <div className={s.d9StepShot}>
            <FigSlot id="S7a" />
          </div>
        </li>

        <Connector />

        <li className={`${s.d9Step} ${s.d9StepYours}`}>
          <div className={s.d9StepHead}>
            <span className={s.d9StepNum}>4</span>
            <LaneChip lane="yours" />
          </div>
          <p className={s.d9StepTitle}>あなたの端末から、相手のメールアドレスに閲覧を申請する</p>
          <div className={s.d9StepShot}>
            <FigSlot id="S4" />
          </div>
          <p className={s.d9StepNote}>そのあと、相手の端末で承認します。</p>
        </li>
      </ol>

      <div className={s.notice}>
        <Icon name="warning" className={s.noticeIcon} />
        <div>
          <p className={s.noticeLabel}>注意</p>
          <p className={s.noticeTitle}>
            あなた自身のアカウントで相手の端末にログインしないでください。
          </p>
          <p className={s.noticeBody}>
            位置情報も日記も<strong>あなたのアカウントのものとして記録されてしまい、相手の日記は作られません。</strong>
            見守りたい相手には、必ず相手自身のアカウントを作ってください（メールアドレスは、相手用に新しく用意したものでも構いません）。
          </p>
        </div>
      </div>
    </div>
  );
}
