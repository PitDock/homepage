import { StoreBadges } from "./StoreBadges";
import s from "../page.module.css";

/** モバイル（〜767px）のみ常時表示する下部固定のストアバッジ。768px以上は固定ヘッダーにバッジがある */
export function StickyStoreBar() {
  return (
    <aside className={s.stickyBar} aria-label="アプリのダウンロード">
      <StoreBadges size={40} />
    </aside>
  );
}
