import s from "../page.module.css";

type SubtitleRow = {
  /** 行ブロックの上端（viewBox座標） */
  y: number;
  time: string;
  en: string;
  ja: string;
  big?: boolean;
};

const ROWS: SubtitleRow[] = [
  { y: 268, time: "0:00:08", en: "EVERY PERSON, PLACE OR THING…", ja: "私たちが知っているあらゆる人、場所…" },
  { y: 398, time: "0:00:12", en: "EVERY MEMORY WE MAKE.", ja: "私たちが作るすべての思い出。", big: true },
  { y: 526, time: "0:00:14", en: "IT'S HERE.", ja: "ここにあります。" },
];

/** PiP の図解。座標は docs/duosub-pip-diagram.svg が正（ラベル「英語と日本語の字幕」が収まるよう viewBox の幅だけ 540 に広げている） */
export function PipDiagram() {
  return (
    <svg
      className={s.pip}
      viewBox="0 0 540 760"
      role="img"
      aria-labelledby="ds-pip-title ds-pip-desc"
    >
      <title id="ds-pip-title">ピクチャーインピクチャーの使い方の図</title>
      <desc id="ds-pip-desc">
        スマホのDuosub画面の上部にある緑の点線の枠に、動画アプリの小窓を重ねる。その下に英語と日本語の字幕が流れる。
      </desc>

      {/* スマホ外形 */}
      <rect x="10" y="10" width="330" height="740" rx="52" className={s.pipBody} strokeWidth="2" />
      <rect x="22" y="22" width="306" height="716" rx="42" className={s.pipScreen} />
      <rect x="125" y="22" width="100" height="22" rx="11" className={s.pipNotch} />

      {/* PiP の設置枠（アプリ実装どおり: 緑の点線・角丸・16:9） */}
      <rect
        x="38"
        y="66"
        width="274"
        height="154"
        rx="14"
        fill="none"
        className={s.pipAppStroke}
        strokeWidth="2"
        strokeDasharray="7 6"
      />

      {/* 動画アプリの小窓: 点線が見えるよう枠の内側に6px余らせる */}
      <rect x="44" y="72" width="262" height="142" rx="10" className={s.pipWindow} />
      <path d="M164 125 L164 161 L196 143 Z" className={s.pipInk} fillOpacity="0.85" />
      <rect x="58" y="198" width="234" height="3" rx="1.5" className={s.pipInk} fillOpacity="0.25" />
      <rect x="58" y="198" width="96" height="3" rx="1.5" className={s.pipInk} fillOpacity="0.7" />

      {/* 字幕の行 */}
      {ROWS.map((row) => (
        <g key={row.time}>
          <circle cx="50" cy={row.y} r="8" fill="none" className={s.pipMutedStroke} strokeWidth="1.6" />
          <path
            d={`M50 ${row.y - 5} V${row.y} L53.5 ${row.y + 2.5}`}
            fill="none"
            className={s.pipMutedStroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <text x="66" y={row.y + 5} fontSize="13" className={`${s.pipMuted} ${s.pipInter}`}>
            {row.time}
          </text>
          <text x="40" y={row.y + 38} fontSize={row.big ? 15 : 14} letterSpacing="0.6" className={s.pipText}>
            {row.en}
          </text>
          <text x="40" y={row.y + (row.big ? 64 : 62)} fontSize={row.big ? 14 : 13} className={s.pipTextSub}>
            {row.ja}
          </text>
          <text x="300" y={row.y + (row.big ? 52 : 50)} fontSize="16" fontWeight="700" className={s.pipAppFill}>
            …
          </text>
        </g>
      ))}
      <line x1="22" y1="358" x2="328" y2="358" className={s.pipLine} strokeWidth="1" />
      <line x1="22" y1="370" x2="328" y2="370" className={s.pipAppStroke} strokeWidth="2" />
      <line x1="22" y1="492" x2="328" y2="492" className={s.pipAppStroke} strokeWidth="2" />
      <line x1="22" y1="616" x2="328" y2="616" className={s.pipLine} strokeWidth="1" />

      {/* 下部バー（Back / 一時停止） */}
      <text x="40" y="690" fontSize="14" className={s.pipMuted}>
        ← Back
      </text>
      <rect x="296" y="676" width="4" height="16" rx="1" className={s.pipMutedFill} />
      <rect x="304" y="676" width="4" height="16" rx="1" className={s.pipMutedFill} />

      {/* 引き出し線とラベル（スマホの外＝ページ側の配色。矢印は使わない） */}
      <circle cx="306" cy="110" r="4" className={s.pipGreenFill} />
      <line x1="306" y1="110" x2="372" y2="110" className={s.pipGreenStroke} strokeWidth="1.5" />
      <text x="380" y="106" fontSize="22" fontWeight="700" className={s.pipLabel}>
        動画アプリ
      </text>
      <text x="380" y="136" fontSize="17" className={s.pipLabelSub}>
        PiPの小窓
      </text>

      <circle cx="328" cy="430" r="4" className={s.pipGreenFill} />
      <line x1="328" y1="430" x2="372" y2="430" className={s.pipGreenStroke} strokeWidth="1.5" />
      <text x="380" y="426" fontSize="22" fontWeight="700" className={s.pipLabel}>
        Duosub
      </text>
      <text x="380" y="456" fontSize="17" className={s.pipLabelSub}>
        英語と日本語の字幕
      </text>
    </svg>
  );
}
