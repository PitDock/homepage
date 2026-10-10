import { Icon } from "../Icon";
import s from "../../page.module.css";

function Badges() {
  return (
    <div className={s.d5Badges}>
      <span className={s.d5Badge}>
        <Icon name="lockCheck" className={s.d5BadgeIcon} />
        承認が必要
      </span>
      <span className={s.d5Badge}>
        <Icon name="linkOff" className={s.d5BadgeIcon} />
        いつでも解除
      </span>
    </div>
  );
}

/**
 * D5 承認制・一方向の共有図（A7 / B6）。
 * 相互登録が必須でないことを1枚で伝える。2本の矢印は向きと地の違いで区別し、
 * 色の強弱で優劣を作らない。
 *
 * showProxyNote: B のみ true。相手側に「相手の端末にもアプリの登録が必要」の注記と
 * B7（#proxy-setup）へのアンカーを足す。A では描かない。
 */
export default function D5Approval({ showProxyNote = false }: { showProxyNote?: boolean }) {
  return (
    <figure className={s.figure}>
      <div className={s.d5}>
        <div className={`${s.d5Person} ${s.d5PersonYou}`}>
          <Icon name="person" className={s.d5PersonIcon} />
          <p className={s.d5PersonName}>あなた</p>
        </div>

        <div className={`${s.d5Arrows} ${s.d5ArrowsFirst}`}>
          <div className={s.d5Arrow}>
            <p className={s.d5ArrowHead}>
              <Icon name="arrowRight" className={s.d5ArrowIcon} />
              相手からの申請を、あなたが承認
            </p>
            <p className={s.d5ArrowBody}>
              相手が申請し、あなたが承認したときだけ、相手があなたの日記を見られます。
            </p>
            <Badges />
          </div>

          <div className={`${s.d5Arrow} ${s.d5ArrowBack}`}>
            <p className={s.d5ArrowHead}>
              <Icon name="arrowRight" className={s.d5ArrowIcon} />
              あなたからの申請を、相手が承認
            </p>
            <p className={s.d5ArrowBody}>
              あなたが申請し、相手が承認したときだけ、あなたが相手の日記を見られます。これは別の設定で、片方向だけでも使えます。
            </p>
            <Badges />
          </div>
        </div>

        <div className={`${s.d5Person} ${s.d5PersonOther}`}>
          <Icon name="person" className={s.d5PersonIcon} />
          <p className={s.d5PersonName}>相手</p>
          {showProxyNote ? (
            <>
              <p className={s.d5PersonNote}>相手の端末にもアプリの登録が必要</p>
            </>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
