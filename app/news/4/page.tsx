import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { createPageMetadata } from "../../../lib/seo/metadata";
import s from "../../page.module.css";
import ns from "./news4.module.css";

const MBP_PROFILE_URL = "https://mbp-japan.com/tokyo/koyama/";

export const metadata: Metadata = createPageMetadata({
  title: "朝日新聞朝刊に掲載されました。",
  description:
    "2025年10月28日(火)の朝日新聞朝刊にてマイベストプロ東京が紹介する専門家として弊社代表の小山が掲載されました。「マイベストプロ東京」は、東京都を拠点に活躍するさまざまな専門家が掲載されている、朝日新聞が運営するWebガイドです。",
  path: "/news/4",
  type: "article",
  keywords: ["GOWS", "朝日新聞", "マイベストプロ", "メディア掲載", "小山望海"],
});

function listPressImages(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "news", "4");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((name) => /\.(jpe?g|png|gif|webp|avif)$/i.test(name) && !name.startsWith("."))
      .sort((a, b) => a.localeCompare(b, "ja"))
      .map((name) => `/images/news/4/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}

export default function News4Page() {
  const pressImages = listPressImages();

  return (
    <>
      <Nav />

      <section className={s.pageHero}>
        <div className={`container ${ns.heroInner}`}>
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li>
                <a href="/">ホーム</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <a href="/#news">News</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <span aria-current="page">朝日新聞掲載</span>
              </li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>2025年10月28日(火)の朝日新聞朝刊に掲載されました。</h1>
        </div>
      </section>

      <section className={s.section}>
        <div className="container">
          <article className={ns.article}>
            <p className={ns.meta}>2025年11月10日</p>

            <div className={ns.body}>
              <p>
                2025年10月28日(火)の朝日新聞朝刊にてマイベストプロ東京が紹介する専門家として弊社代表の小山が掲載されました。
              </p>
              <p>
                「マイベストプロ東京」は、東京都を拠点に活躍するさまざまな専門家が掲載されている、朝日新聞が運営するWebガイドです。
              </p>
            </div>

            {pressImages.length > 0 && (
              <div className={ns.pressFigures}>
                {pressImages.map((src) => (
                  <figure key={src} className={ns.pressFigure}>
                    <img className={ns.pressImg} src={src} alt="朝日新聞掲載の紹介誌面" loading="lazy" />
                  </figure>
                ))}
              </div>
            )}

            <ul className={ns.linkList}>
              <li>
                <a href={MBP_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  「マイベストプロ東京」掲載の弊社代表小山の紹介ページ
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
