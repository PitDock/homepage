import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";
import { HOME_OG_IMAGE, SITE_NAME } from "../../../lib/seo/site";
import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import s from "../../components/sub/sub.module.css";
import ns from "../newsArticle.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "ホームページリニューアルのお知らせ | PitDock株式会社",
  description:
    "公式ホームページをリニューアルいたしました。サイト全体のデザインを一新し、サービスや取り組みをより分かりやすくお伝えできるよう構成を見直しました。",
  path: "/news/10",
  // ページ別OGPは作らず、トップページの画像を使う
  image: HOME_OG_IMAGE,
  imageAlt: SITE_NAME,
  type: "article",
  keywords: ["PitDock", "ホームページリニューアル", "サイトリニューアル", "お知らせ"],
});

export default function News10Page() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "News", href: "/news" },
          { label: "ホームページリニューアルのお知らせ" },
        ]}
        title="PitDock株式会社のホームページをリニューアルいたしました。"
        titleSize="long"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <article className={ns.article}>
            <p className={ns.meta}>2026年11月3日</p>

            <div className={ns.body}>
              <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>
              <p>
                このたび弊社は、2026年11月3日に公式ホームページをリニューアルいたしましたのでお知らせいたします。
              </p>
              <p>
                今回のリニューアルでは、サイト全体のデザインを一新するとともに、弊社のサービスや取り組みをより分かりやすくお伝えできるよう、構成を見直しました。
              </p>
              <p>
                今後も本サイトを通じて、DX・AXコンサルティングやシステム開発に関する情報を発信してまいります。引き続きご愛顧を賜りますよう、よろしくお願い申し上げます。
              </p>
            </div>

            <h2 className={ns.changeTableHeading}>
              <img src="/brand/p-mark.svg" alt="" className={ns.pMark} width={36} height={30} />
              <span>主な変更点</span>
            </h2>
            <dl className={`${s.dataTable} ${ns.changeTable}`}>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>デザイン</dt>
                <dd className={s.dataValue}>新しいブランドデザインをサイト全体に適用</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>ナビゲーション</dt>
                <dd className={s.dataValue}>
                  ヘッダー・フッターを刷新し、各サービス（DX/AXコンサルティング・システム開発・技術顧問・自社プロダクト）のページへ移動しやすく改善
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>コラム</dt>
                <dd className={s.dataValue}>トップページに、note で発信しているコラムの最新記事を掲載</dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>公式SNS</dt>
                <dd className={s.dataValue}>
                  フッターから LinkedIn・Facebook・Instagram・X・LINE の各公式アカウントへ移動できるように
                </dd>
              </div>
              <div className={s.dataRow}>
                <dt className={s.dataLabel}>ページURL</dt>
                <dd className={s.dataValue}>変更なし</dd>
              </div>
            </dl>

            <ul className={ns.linkList}>
              <li>
                <a href="/#services" className={s.textLink}>提供サービスはこちら</a>
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
