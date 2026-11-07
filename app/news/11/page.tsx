import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";
import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import s from "../../components/sub/sub.module.css";
import ns from "../newsArticle.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "金沢シーサイドFM「社長！あなたの〇〇教えてください。」に代表の小山が出演しました | PitDock株式会社",
  description:
    "金沢シーサイドFMの番組「社長！あなたの〇〇教えてください。」に、弊社代表取締役の小山望海が出演しました。エピソード「PitDock株式会社」は2026年11月4日よりSpotifyで配信中です（約16分）。",
  path: "/news/11",
  type: "article",
  keywords: [
    "PitDock",
    "金沢シーサイドFM",
    "社長！あなたの〇〇教えてください。",
    "ラジオ出演",
    "ポッドキャスト",
    "メディア出演",
    "小山望海",
    "DX",
    "AX",
  ],
});

const SPOTIFY_EMBED_URL =
  "https://creators.spotify.com/pod/profile/3d3v64l385g/embed/episodes/PitDock-e3qtnbn";

export default function News11Page() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "News", href: "/news" },
          { label: "金沢シーサイドFM出演" },
        ]}
        title="金沢シーサイドFMの番組「社長！あなたの〇〇教えてください。」に弊社代表の小山が出演しました。"
        titleSize="long"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <article className={ns.article}>
            <p className={ns.meta}>2026年11月4日</p>

            <div className={ns.body}>
              <p>
                このたび、金沢シーサイドFMの番組「社長！あなたの〇〇教えてください。」に、弊社代表の小山望海が出演いたしました。
              </p>
              <p>
                同番組は、地域や業界で注目されている企業の社長をゲストに招き、その魅力や取り組みを伺う番組です。
              </p>
              <p>
                今回は、「技術と経営をつなぎ、企業の未来を切り拓くITコンサルティングに迫る！」と題して、2026年11月4日よりSpotifyで配信されています。約16分のエピソードです。ぜひお聴きください。
              </p>
              <p>このような機会をいただきました番組関係者の皆さまに、心より御礼申し上げます。</p>
            </div>

            <h2 className={ns.changeTableHeading}>
              <img src="/brand/p-mark.svg" alt="" className={ns.pMark} width={36} height={30} />
              <span>エピソードを聴く</span>
            </h2>
            <div className={ns.player}>
              <iframe
                className={ns.playerFrame}
                src={SPOTIFY_EMBED_URL}
                title="「社長！あなたの〇〇教えてください。」エピソード「PitDock株式会社」の音声プレイヤー"
                width="100%"
                height="102"
                loading="lazy"
                scrolling="no"
              />
            </div>

            <h2 className={ns.changeTableHeading}>
              <img src="/brand/p-mark.svg" alt="" className={ns.pMark} width={36} height={30} />
              <span>番組情報</span>
            </h2>
            <dl className={`${s.dataTable} ${ns.changeTable}`}>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>番組名</dt>
                <dd className={s.dataValue}>社長！あなたの〇〇教えてください。</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>放送局</dt>
                <dd className={s.dataValue}>金沢シーサイドFM</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>テーマ</dt>
                <dd className={s.dataValue}>
                  技術と経営をつなぎ、企業の未来を切り拓くITコンサルティングに迫る！
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>ゲスト</dt>
                <dd className={s.dataValue}>PitDock株式会社 代表取締役 小山望海</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>ナビゲーター</dt>
                <dd className={s.dataValue}>藍田隆希</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>配信日</dt>
                <dd className={s.dataValue}>2026年11月4日</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>再生時間</dt>
                <dd className={s.dataValue}>約16分</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>配信</dt>
                <dd className={s.dataValue}>Spotify</dd>
              </div>
            </dl>

            <ul className={ns.linkList}>
              <li>
                <a
                  href="https://open.spotify.com/episode/2CPU84c3EEpkq6lC3DhSgZ"
                  className={s.textLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotifyで番組を聴く
                </a>
              </li>
              <li>
                <a
                  href="https://kanazawa-seasidefm.co.jp/"
                  className={s.textLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  金沢シーサイドFM 公式サイト
                </a>
              </li>
              <li>
                <a href="/service/dx-ax" className={s.textLink}>DX/AXコンサルティングについてはこちら</a>
              </li>
              <li>
                <a href="/contact" className={s.textLink}>無料相談はこちら</a>
              </li>
              <li>
                <a href="/company-info" className={s.textLink}>会社概要はこちら</a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </SubPage>
  );
}
