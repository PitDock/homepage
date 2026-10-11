import Image from "next/image";
import type { CSSProperties } from "react";
import { SHOTS, type ShotId } from "./shots";
import s from "../page.module.css";

type Frame = "phone" | "phoneSm" | "plain" | "contain";

type Props = {
  id: ShotId;
  /** 端末フレームの種類。"contain" は比率の違う画像を切らずに収める汎用スロット */
  frame?: Frame;
  /** 外枠に足すクラス（表示幅はこちらで決める） */
  className?: string;
  /** ヒーロー（LCP）のみ true */
  priority?: boolean;
  /** next/image の sizes */
  sizes?: string;
};

const FRAME_CLASS: Record<Frame, string> = {
  phone: s.shotPhone,
  phoneSm: `${s.shotPhone} ${s.shotPhoneSm}`,
  plain: s.shotPlain,
  contain: s.shotPlain,
};

/**
 * 枠（aspect-ratio）が寸法を決め、中身だけが差し替わる（設計仕様書 §7-2）。
 * src が null ならプレースホルダ、入れば実画像。レイアウトは1pxも動かない。
 */
/**
 * 比率の違う画像を並べる箇所（D4 / D9 のステップ内）用のスロット。
 * 枠の比率を固定し、中身は contain で絶対に切らない（設計仕様書 §6-4 / §6-9）。
 */
export function FigSlot({ id, ar, className }: { id: ShotId; ar?: string; className?: string }) {
  const spec = SHOTS[id];
  // 既定は画像そのものの比率。枠と画像の比率が一致するので上下左右に余白が出ない
  const slotAr = ar ?? spec.ar;
  return (
    <div
      className={[s.figSlot, className].filter(Boolean).join(" ")}
      style={{ "--gd-ar": slotAr } as CSSProperties}
    >
      {spec.src ? (
        <Image
          src={spec.src}
          alt={spec.alt}
          fill
          sizes="(max-width: 767px) 80vw, 240px"
          style={{ objectFit: "contain" }}
          quality={85}
        />
      ) : (
        <div className={s.shotPlaceholder} aria-hidden="true">
          <span className={s.shotPlaceholderId}>{id}</span>
          <span className={s.shotPlaceholderText}>{spec.label}</span>
          <span className={s.shotPlaceholderText}>撮影待ち</span>
          <span className={s.shotPlaceholderAr}>{spec.ar.replace("/", ":")}</span>
        </div>
      )}
    </div>
  );
}

export default function Shot({ id, frame = "plain", className, priority, sizes }: Props) {
  const spec = SHOTS[id];
  const outer = [s.shot, FRAME_CLASS[frame], frame === "contain" ? s.shotContain : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={outer}>
      <div className={s.shotMedia} style={{ "--gd-ar": spec.ar } as CSSProperties}>
        {spec.src ? (
          <Image
            src={spec.src}
            alt={spec.alt}
            fill
            sizes={sizes ?? "(max-width: 767px) 80vw, 320px"}
            priority={priority}
            quality={85}
          />
        ) : (
          <div className={s.shotPlaceholder} aria-hidden="true">
            <span className={s.shotPlaceholderId}>{id}</span>
            <span className={s.shotPlaceholderText}>{spec.label}</span>
            <span className={s.shotPlaceholderText}>撮影待ち</span>
            <span className={s.shotPlaceholderAr}>{spec.ar.replace("/", ":")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
