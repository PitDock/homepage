import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { createPageMetadata } from "../../../lib/seo/metadata";
import s from "../../page.module.css";
import ns from "./news8.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "社名変更のお知らせ（GOWS合同会社 → PitDock株式会社） | PitDock株式会社",
  description:
    "GOWS合同会社は2026年8月16日、組織形態を株式会社へ変更し、商号をPitDock株式会社（PitDock, Inc.）に変更いたしました。代表者・所在地・事業内容に変更はございません。",
  path: "/news/8",
  type: "article",
  keywords: ["PitDock", "社名変更", "GOWS合同会社", "組織変更", "お知らせ"],
});

export default function News8Page() {
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
                <a href="/news">News</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <span aria-current="page">社名変更のお知らせ</span>
              </li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>
            GOWS合同会社は、2026年8月16日をもって PitDock株式会社 に社名変更いたしました。
          </h1>
        </div>
      </section>

      <section className={s.section}>
        <div className="container">
          <article className={ns.article}>
            <p className={ns.meta}>2026年8月16日</p>

            <div className={ns.body}>
              <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>
              <p>
                このたび弊社は、2026年8月16日をもちまして、組織形態を合同会社から株式会社へ変更するとともに、商号を「GOWS合同会社」から「PitDock株式会社（英文表記：PitDock,
                Inc.）」に変更いたしましたのでお知らせいたします。
              </p>
              <p>
                代表者・所在地・事業内容に変更はございません。今後もDX・AX推進、システム開発を中心に、お客様の事業成長を支援してまいります。
              </p>
              <p>
                社名変更に伴い、皆様には何かとご不便をおかけする場合もございますが、何卒ご理解を賜りますようお願い申し上げます。今後とも変わらぬご支援・お引き立てを賜りますよう、よろしくお願い申し上げます。
              </p>
            </div>

            <h2 className={ns.changeTableHeading}>変更内容</h2>
            <div className={ns.changeTableWrap}>
              <dl className={ns.changeTable}>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>変更日</dt>
                  <dd className={ns.changeTd}>2026年8月16日</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>旧社名</dt>
                  <dd className={ns.changeTd}>GOWS合同会社</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>新社名</dt>
                  <dd className={ns.changeTd}>PitDock株式会社（PitDock, Inc.）</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>組織形態</dt>
                  <dd className={ns.changeTd}>合同会社 → 株式会社</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>代表者</dt>
                  <dd className={ns.changeTd}>小山 望海（変更なし）</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>所在地</dt>
                  <dd className={ns.changeTd}>変更なし（東京都渋谷区神泉町10-15-301）</dd>
                </div>
                <div className={ns.changeRow}>
                  <dt className={ns.changeTh}>事業内容</dt>
                  <dd className={ns.changeTd}>変更なし</dd>
                </div>
              </dl>
            </div>

            <ul className={ns.linkList}>
              <li>
                <a href="/company-info">会社概要はこちら</a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
