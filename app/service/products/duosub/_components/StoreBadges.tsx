import Image from "next/image";
import s from "../page.module.css";

export const APP_STORE_URL = "https://apps.apple.com/jp/app/id6507464076";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.gows.duosub&hl=ja";

type StoreBadgesProps = {
  size?: 48 | 40;
  /** "hero": モバイル中央・デスクトップ左揃え／"center": 常に中央 */
  align?: "hero" | "center";
  className?: string;
};

/** Google Play バッジ（余白トリミング版）の縦横比 646:192 */
const GP_RATIO = 646 / 192;
/** App Store バッジ（SVG）の縦横比 108.85:40 */
const AS_RATIO = 108.85157 / 40;

export function StoreBadges({ size = 48, align = "center", className }: StoreBadgesProps) {
  const classes = [
    s.badges,
    size === 40 ? s.badgesSm : "",
    align === "hero" ? s.badgesHero : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={s.badgeLink}>
        <Image
          src="/images/products/Duosub/badge-appstore-ja.svg"
          alt="App Storeからダウンロード"
          width={Math.round(size * AS_RATIO)}
          height={size}
          className={s.badgeImg}
          unoptimized
        />
        <span className={s.srOnly}>（新しいタブで開きます）</span>
      </a>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={s.badgeLink}>
        <Image
          src="/images/products/Duosub/badge-googleplay-ja-trimmed.png"
          alt="Google Play で手に入れよう"
          width={Math.round(size * GP_RATIO)}
          height={size}
          sizes={`${Math.ceil(size * GP_RATIO)}px`}
          className={s.badgeImg}
        />
        <span className={s.srOnly}>（新しいタブで開きます）</span>
      </a>
    </div>
  );
}
