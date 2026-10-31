import SubPage from "./components/sub/SubPage";
import BackButton from "./components/sub/BackButton";
import s from "./components/sub/sub.module.css";
import nf from "./not-found.module.css";

export default function NotFound() {
  return (
    <SubPage>
      <section className={`${s.section} ${nf.section}`}>
        <div className={`${s.inner} ${nf.content}`}>
          <span className={s.tag}>404 NOT FOUND</span>
          <div className={nf.number} aria-hidden="true" lang="en">
            <span className={nf.numberPit}>4</span>
            <span className={nf.numberDock}>04</span>
          </div>
          <h1 className={nf.heading}>ページが見つかりません</h1>
          <p className={s.body}>
            お探しのページは存在しないか、移動・削除された可能性があります。<br />
            URLをご確認いただくか、ホームページからお探しください。
          </p>
          <div className={nf.buttons}>
            <a href="/" className={s.btn}>
              ホームへ戻る
            </a>
            <BackButton className={s.btnOutline}>← 前のページに戻る</BackButton>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
