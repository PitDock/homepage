"use client";

import { sendLpEvent } from "../../../../../lib/ab/lp-event";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./copy";
import s from "../page.module.css";

/** ストアURLの定義は copy.ts（サーバ側からも読めるようにするため）。ここから再公開する */
export { APP_STORE_URL, GOOGLE_PLAY_URL };

/** 見た目の変種。計測用の `variant`（A/B）とは別物（設計仕様書 §3-3 の命名注意） */
export type StoreCtaSize = "hero" | "block" | "inline" | "final" | "sticky" | "header";

type Props = {
  isoWeek: string;
  variant: "A" | "B";
  size: StoreCtaSize;
  /** バッジの上に出す一言（例: 「無料でダウンロード」） */
  heading?: string;
  /** バッジの下のマイクロコピー */
  note?: string;
  className?: string;
};

const STORES = [
  {
    store: "appstore" as const,
    href: APP_STORE_URL,
    src: "/images/products/AppStore.png",
    alt: "App Storeで Gentle Diary を無料ダウンロード",
  },
  {
    store: "googleplay" as const,
    href: GOOGLE_PLAY_URL,
    src: "/images/products/GooglePlay.png",
    alt: "Google Play で Gentle Diary を無料ダウンロード",
  },
];

const SIZE_CLASS: Record<StoreCtaSize, string> = {
  hero: s.storeCtaHero,
  block: "",
  inline: s.storeCtaInline,
  final: s.storeCtaFinal,
  sticky: s.storeCtaSticky,
  header: s.storeCtaHeader,
};

/**
 * ストアCTA。A/Bとも4箇所すべてこのコンポーネント経由にする（計測漏れの最大要因）。
 * 生の <a href={APP_STORE_URL}> を他のファイルに書かないこと。
 * 並び順は App Store → Google Play で固定。
 */
export default function StoreCta({ isoWeek, variant, size, heading, note, className }: Props) {
  return (
    <div className={[s.storeCta, SIZE_CLASS[size], className].filter(Boolean).join(" ")}>
      {heading ? <p className={s.ctaHeading}>{heading}</p> : null}
      <div className={s.storeButtons}>
        {STORES.map((b) => (
          <a
            key={b.store}
            className={s.storeBtn}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendLpEvent({ isoWeek, variant, type: "click", store: b.store })}
          >
            {/* バッジは高さ固定・幅自動のため next/image ではなく img を使う */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.storeBtnImg} src={b.src} alt={b.alt} />
            <span className={s.srOnly}>（新しいタブで開きます）</span>
          </a>
        ))}
      </div>
      {note ? <p className={s.ctaNote}>{note}</p> : null}
    </div>
  );
}
