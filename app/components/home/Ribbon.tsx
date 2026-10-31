"use client";

import { useEffect, useRef } from "react";
import s from "../../home.module.css";

/*
 * スクロールに合わせて伸びるリボン（デザイナー支給の SVG）。
 *
 * - PC 用（public/brand/ribbon_v3s.svg、1440 × 6028）と
 *   モバイル用（public/brand/ribbon_sp.svg、375 × 7894）を画面幅で切り替える。
 *   どちらも Works 非表示時のページを基準に描かれている。
 * - 横は画面幅に合わせて拡大縮小し、縦はセクションごとに区間を対応させて伸縮する
 *   （data-ribbon-anchor を付けた要素の上端が、Figma 上の各セクション上端に対応する）。
 *   セクションの高さが変わってもループやリングが同じセクション内に収まる。
 * - 先端は画面上端から 85% の高さを追いかける（stroke-dashoffset で伸縮）。
 * - 最初のスクロール（約 250px）で、40px 下から浮かび上がりながらフェードイン。
 * - 描き終えたら 1.5 秒止まって 0.8 秒でフェードアウト。上に戻ると再びフェードイン。
 * - prefers-reduced-motion の人には、描き終えた状態で静止表示する。
 */

type RibbonSource = {
  url: string;
  /** デザイン上のページ幅 */
  width: number;
  /**
   * Figma 上の各セクション上端（px）。順番は data-ribbon-anchor の値（0 始まり）と対応する。
   * 0: ページ上端 / 1: FV / 2: Concept / 3: Services / 4: Note / 5: Company / 6: News / 7: Contact / 8: Footer / 9: ページ下端
   */
  anchors: number[];
  /** グラデーションの始点・終点（Figma 上の y 座標） */
  gradientY1: number;
  gradientY2: number;
  /** 線の太さ（デザイン上の値。PC は画面幅に合わせて拡大縮小する） */
  strokeWidth: number;
};

const PC_SOURCE: RibbonSource = {
  url: "/brand/ribbon_v3s.svg",
  width: 1440,
  anchors: [0, 133, 973, 2343, 3152, 3876, 4417, 5162, 5639, 6028],
  gradientY1: 1010,
  gradientY2: 5510,
  strokeWidth: 110,
};

// 各セクションの上端は Figma の「Mobile - ○○」フレームの高さを積み上げた値
// （Header 56 / FV 516 / Concept 2111 / Services 1845 / Note 806 / Company 1035 / News 648 / Contact 431 / Footer 446）
const SP_SOURCE: RibbonSource = {
  url: "/brand/ribbon_sp.svg",
  width: 375,
  anchors: [0, 56, 572, 2683, 4528, 5334, 6369, 7017, 7448, 7894],
  gradientY1: 560,
  gradientY2: 7295.55,
  strokeWidth: 48,
};

const APPEAR_SCROLL = 250;
const APPEAR_OFFSET = 40;
const TIP_RATIO = 0.85;
const HOLD_MS = 1500;
const MOBILE_MAX_WIDTH = 767;

type Segment = { cmd: string; nums: number[] };

function parsePath(d: string): Segment[] {
  const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const segments: Segment[] = [];
  for (const t of tokens) {
    if (/[A-Za-z]/.test(t)) segments.push({ cmd: t, nums: [] });
    else segments[segments.length - 1]?.nums.push(Number(t));
  }
  return joinSubpaths(segments);
}

/*
 * Figma から書き出したパスは、ループやリングの部分が同じ点で区切られた別のサブパス（Z / M）になる。
 * 破線（stroke-dasharray）はサブパスごとに最初からやり直して描かれるため、
 * そのままだと後半のサブパスが先端より先まで一気に描かれてしまう。
 * 同じ点でつながっている Z / M を取り除いて、1 本の連続した線にする。
 */
function joinSubpaths(segments: Segment[]): Segment[] {
  const same = (ax: number, ay: number, bx: number, by: number) => Math.abs(ax - bx) < 0.01 && Math.abs(ay - by) < 0.01;
  const out: Segment[] = [];
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  for (const seg of segments) {
    const { cmd, nums } = seg;
    if (cmd === "M" && nums.length >= 2) {
      // 現在位置と同じ点からの M は、線をつなげたまま続ける
      if (out.length > 0 && same(nums[0], nums[1], cx, cy)) {
        if (nums.length > 2) out.push({ cmd: "L", nums: nums.slice(2) });
      } else {
        out.push(seg);
      }
      // Z が戻る先は、つなげた場合も含めて直前の M の位置
      sx = nums[0];
      sy = nums[1];
      [cx, cy] = nums.slice(-2);
      continue;
    }
    if (cmd === "Z" || cmd === "z") {
      // 始点に戻っていない場合だけ、始点までの線として残す
      if (!same(cx, cy, sx, sy)) out.push({ cmd: "L", nums: [sx, sy] });
      cx = sx;
      cy = sy;
      continue;
    }
    out.push(seg);
    if (nums.length >= 2) [cx, cy] = nums.slice(-2);
  }
  return out;
}

function makeYMapper(figma: number[], actual: number[]) {
  return (y: number) => {
    let i = 0;
    while (i < figma.length - 2 && y > figma[i + 1]) i++;
    const f0 = figma[i];
    const f1 = figma[i + 1];
    const a0 = actual[i];
    const a1 = actual[i + 1];
    return a0 + ((y - f0) / (f1 - f0)) * (a1 - a0);
  };
}

// ループ（線が上に戻る区間）を、前後このくらいのスクロール量（ループの長さに対する比）に分けて描く
const LOOP_SCROLL_RATIO = 0.6;
const LOOP_MIN_HALF_WINDOW = 60;
const LOOP_MIN_LENGTH = 40;

/*
 * tips[i] =「長さ lengths[i] まで描き終える先端の高さ」を、ループでも連続して伸びるように整える。
 *
 * 単純に「そこまでで到達した最大の y」を使うと、線が上に戻る区間（ループの後半）では値が変わらず、
 * 先端がループの最下点に届いた瞬間にループ全体が一気に描かれてしまう。
 * そこでループの前後に一定のスクロール区間を確保し、その区間ではスクロール量に比例して長さを伸ばす。
 * 配列はその場で書き換える（単調非減少は保たれる）。
 */
function smoothLoops(lengths: number[], tips: number[], maxTip: number) {
  const last = tips.length - 1;
  const windows: { a: number; b: number; ya: number; yb: number }[] = [];

  let i = 1;
  while (i <= last) {
    if (tips[i] > tips[i - 1]) {
      i++;
      continue;
    }
    // tips が増えない区間 = ループで上に戻っている区間
    const start = i - 1;
    while (i <= last && tips[i] <= tips[start]) i++;
    const end = i - 1;
    const loopLength = lengths[end] - lengths[start];
    if (loopLength < LOOP_MIN_LENGTH) continue;

    const peak = tips[start];
    const half = Math.max(LOOP_MIN_HALF_WINDOW, (loopLength * LOOP_SCROLL_RATIO) / 2);
    let a = start;
    while (a > 0 && tips[a] > peak - half) a--;
    let b = end;
    while (b < last && tips[b] < peak + half) b++;
    // パスの終わりがループ（最後のリング）の場合は、ページ最下部までに描き切れるようにする
    const yb = b === last ? Math.max(Math.min(peak + half, maxTip), tips[a] + 1) : tips[b];
    windows.push({ a, b, ya: tips[a], yb });
  }

  // 重なった区間はひとつにまとめる
  const merged: typeof windows = [];
  for (const w of windows) {
    const prev = merged[merged.length - 1];
    if (prev && w.a <= prev.b) {
      prev.b = Math.max(prev.b, w.b);
      prev.yb = Math.max(prev.yb, w.yb);
    } else {
      merged.push({ ...w });
    }
  }

  for (const { a, b, ya, yb } of merged) {
    const span = lengths[b] - lengths[a] || 1;
    for (let k = a; k <= b; k++) {
      tips[k] = ya + ((lengths[k] - lengths[a]) / span) * (yb - ya);
    }
  }
  // 最後のリングの後ろに残る値も、区間の終わりを超えないように揃える
  for (let k = 1; k <= last; k++) tips[k] = Math.max(tips[k], tips[k - 1]);
}

export default function Ribbon() {
  const layerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const motionRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const gradient = gradientRef.current;
    const motion = motionRef.current;
    const page = layer?.parentElement;
    if (!layer || !svg || !path || !gradient || !motion || !page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // 読み込んだパスを URL ごとに保持する（PC ⇔ モバイルの切り替えで読み直さない）
    const loaded = new Map<string, Segment[]>();
    const loading = new Set<string>();
    let total = 0;
    // サンプル点ごとの「そこまで描き終える先端の高さ」（単調非減少。ループは smoothLoops で均す）
    let sampleLengths: number[] = [];
    let sampleMaxY: number[] = [];
    let holdTimer: number | undefined;
    let fadedOut = false;
    let frame = 0;
    let disposed = false;

    const load = (url: string) => {
      if (loading.has(url)) return;
      loading.add(url);
      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          if (disposed) return;
          const d = new DOMParser()
            .parseFromString(text, "image/svg+xml")
            .querySelector("path")
            ?.getAttribute("d");
          if (!d) return;
          loaded.set(url, parsePath(d));
          layout();
        })
        .catch(() => {
          // リボンは装飾なので、読み込めなければ表示しないだけにする
          loading.delete(url);
        });
    };

    const layout = () => {
      const width = page.clientWidth;
      const source = width <= MOBILE_MAX_WIDTH ? SP_SOURCE : PC_SOURCE;
      const segments = loaded.get(source.url);
      if (!segments) {
        // 切り替え先のパスが届くまでは前のパスを出さない
        total = 0;
        path.removeAttribute("d");
        load(source.url);
        return;
      }
      const height = page.scrollHeight;
      const pageTop = page.getBoundingClientRect().top + window.scrollY;
      const anchors = Array.from(page.querySelectorAll<HTMLElement>("[data-ribbon-anchor]"))
        .sort((a, b) => Number(a.dataset.ribbonAnchor) - Number(b.dataset.ribbonAnchor))
        .map((el) => el.getBoundingClientRect().top + window.scrollY - pageTop);
      const figma = source.anchors;
      // アンカーが揃っていない場合は単純な縦方向の拡大縮小にする
      const actual =
        anchors.length === figma.length - 2
          ? [0, ...anchors, height]
          : figma.map((y) => (y / figma[figma.length - 1]) * height);
      const mapY = makeYMapper(figma, actual);
      const sx = width / source.width;

      const d = segments
        .map(({ cmd, nums }) => {
          const out: string[] = [];
          for (let i = 0; i + 1 < nums.length; i += 2) {
            out.push(`${(nums[i] * sx).toFixed(1)} ${mapY(nums[i + 1]).toFixed(1)}`);
          }
          return `${cmd}${out.join(" ")}`;
        })
        .join(" ");

      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute("d", d);
      gradient.setAttribute("y1", String(mapY(source.gradientY1)));
      gradient.setAttribute("y2", String(mapY(source.gradientY2)));
      // モバイル用は 375〜767px の幅で同じ太さ（48px）のまま。PC 用は幅に合わせて細くし、48px を下限にする
      const strokeWidth =
        source === SP_SOURCE ? source.strokeWidth : Math.max(SP_SOURCE.strokeWidth, source.strokeWidth * sx);
      path.setAttribute("stroke-width", strokeWidth.toFixed(1));

      total = path.getTotalLength();
      const step = 8;
      const count = Math.ceil(total / step);
      sampleLengths = new Array(count + 1);
      sampleMaxY = new Array(count + 1);
      let maxY = -Infinity;
      for (let i = 0; i <= count; i++) {
        const len = Math.min(i * step, total);
        maxY = Math.max(maxY, path.getPointAtLength(len).y);
        sampleLengths[i] = len;
        sampleMaxY[i] = maxY;
      }
      // 先端が届く一番下の位置（ページ最下部までスクロールしたとき）。最後のリングもここまでに描き切る
      const maxTip = height - window.innerHeight * (1 - TIP_RATIO) - 1;
      smoothLoops(sampleLengths, sampleMaxY, maxTip);
      path.style.strokeDasharray = `${total} ${total}`;
      update();
    };

    const drawnLengthFor = (tipY: number) => {
      const last = sampleMaxY.length - 1;
      if (last < 0 || tipY < sampleMaxY[0]) return 0;
      if (tipY >= sampleMaxY[last]) return sampleLengths[last];
      // tipY 以下に収まる最後のサンプルを二分探索し、次のサンプルとの間を補間する
      let lo = 0;
      let hi = last;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (sampleMaxY[mid] <= tipY) lo = mid;
        else hi = mid - 1;
      }
      const y0 = sampleMaxY[lo];
      const y1 = sampleMaxY[lo + 1];
      const t = y1 > y0 ? (tipY - y0) / (y1 - y0) : 0;
      return sampleLengths[lo] + t * (sampleLengths[lo + 1] - sampleLengths[lo]);
    };

    const setFadedOut = (value: boolean) => {
      fadedOut = value;
      layer.dataset.faded = value ? "true" : "false";
    };

    const update = () => {
      frame = 0;
      if (total === 0) return;

      if (reducedMotion.matches) {
        window.clearTimeout(holdTimer);
        holdTimer = undefined;
        setFadedOut(false);
        path.style.strokeDashoffset = "0";
        path.style.visibility = "visible";
        motion.style.opacity = "1";
        motion.style.transform = "none";
        return;
      }

      const pageTop = page.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;
      const appear = Math.min(Math.max(scrollY / APPEAR_SCROLL, 0), 1);
      motion.style.opacity = String(appear);
      motion.style.transform = `translateY(${(1 - appear) * APPEAR_OFFSET}px)`;

      const tipY = scrollY - pageTop + window.innerHeight * TIP_RATIO;
      const drawn = drawnLengthFor(tipY);
      path.style.strokeDashoffset = String(total - drawn);
      // 長さ 0 でも丸い線端だけが点として描かれてしまうため、伸び始めるまでは隠す
      path.style.visibility = drawn > 0 ? "visible" : "hidden";

      const complete = drawn >= total - 1;
      if (complete) {
        if (!fadedOut && holdTimer === undefined) {
          holdTimer = window.setTimeout(() => {
            holdTimer = undefined;
            setFadedOut(true);
          }, HOLD_MS);
        }
      } else {
        window.clearTimeout(holdTimer);
        holdTimer = undefined;
        if (fadedOut) setFadedOut(false);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    let layoutFrame = 0;
    const requestLayout = () => {
      if (!layoutFrame)
        layoutFrame = requestAnimationFrame(() => {
          layoutFrame = 0;
          layout();
        });
    };

    // 画面幅に応じたパスを読み込んでから配置する
    layout();

    const resizeObserver = new ResizeObserver(requestLayout);
    resizeObserver.observe(page);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestLayout);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestLayout);
      reducedMotion.removeEventListener("change", requestUpdate);
      window.clearTimeout(holdTimer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(layoutFrame);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className={s.ribbonLayer}
      // SVG の高さをページの高さに合わせるため、万一 CSS が効かずに SVG がページを押し広げると
      // 「高さ計測 → SVG 拡大」が際限なく続く。配置に関わる指定だけはインラインでも持たせておく
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      aria-hidden="true"
      data-faded="false"
    >
      <svg ref={svgRef} className={s.ribbonSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient ref={gradientRef} id="home-ribbon-gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0">
            <stop offset="0" stopColor="#14509E" />
            <stop offset="0.35" stopColor="#3AA0E8" />
            <stop offset="0.7" stopColor="#4FD1B5" />
            <stop offset="1" stopColor="#8C7BE8" />
          </linearGradient>
        </defs>
        <g ref={motionRef} className={s.ribbonMotion}>
          <path
            ref={pathRef}
            stroke="url(#home-ribbon-gradient)"
            strokeOpacity={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
