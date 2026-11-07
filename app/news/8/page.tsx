import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/seo/metadata";
import { HOME_OG_IMAGE, SITE_NAME } from "../../../lib/seo/site";
import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import s from "../../components/sub/sub.module.css";
import ns from "../newsArticle.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "社名変更のお知らせ（GOWS合同会社 → PitDock株式会社） | PitDock株式会社",
  description:
    "GOWS合同会社は2026年8月16日、組織形態を株式会社へ変更し、商号をPitDock株式会社（PitDock, Inc.）に変更いたしました。",
  path: "/news/8",
  // ページ別OGPは作らず、トップページの画像を使う
  image: HOME_OG_IMAGE,
  imageAlt: SITE_NAME,
  type: "article",
  keywords: ["PitDock", "社名変更", "GOWS合同会社", "組織変更", "お知らせ"],
});

export default function News8Page() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "News", href: "/news" },
          { label: "社名変更のお知らせ" },
        ]}
        title="GOWS合同会社は、2026年8月16日をもって PitDock株式会社 に社名変更いたしました。"
        titleSize="long"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <article className={ns.article}>
            <p className={ns.meta}>2026年8月16日</p>

            <div className={ns.body}>
              <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>
              <p>
                このたび弊社は、2026年8月16日をもちまして、組織形態を合同会社から株式会社へ変更するとともに、
                商号を「GOWS合同会社」から「PitDock株式会社（英文表記：PitDock, Inc.）」に変更いたしましたのでお知らせいたします。
              </p>
              <p>
                代表者・所在地・事業内容に変更はございません。今後もDX・AXコンサルティング、システム開発を中心に、お客様の事業成長を支援してまいります。
              </p>
              <p>
                社名変更に伴い、皆様には何かとご不便をおかけする場合もございますが、何卒ご理解を賜りますようお願い申し上げます。今後とも変わらぬご支援・お引き立てを賜りますよう、よろしくお願い申し上げます。
              </p>
            </div>

            <h2 className={ns.changeTableHeading}>
              <img src="/brand/p-mark.svg" alt="" className={ns.pMark} width={36} height={30} />
              <span>変更内容</span>
            </h2>
            <dl className={`${s.dataTable} ${ns.changeTable}`}>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>変更日</dt>
                  <dd className={s.dataValue}>2026年8月16日</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>旧社名</dt>
                  <dd className={s.dataValue}>GOWS合同会社</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>新社名</dt>
                  <dd className={s.dataValue}>PitDock株式会社（PitDock, Inc.）</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>組織形態</dt>
                  <dd className={s.dataValue}>合同会社 → 株式会社</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>代表者</dt>
                  <dd className={s.dataValue}>小山 望海（変更なし）</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>所在地</dt>
                  <dd className={s.dataValue}>変更なし（東京都渋谷区神泉町10-15-301）</dd>
                </div>
                <div className={s.dataRow}>
                  <dt className={s.dataLabel}>事業内容</dt>
                  <dd className={s.dataValue}>変更なし</dd>
                </div>
            </dl>

            <ul className={ns.linkList}>
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
