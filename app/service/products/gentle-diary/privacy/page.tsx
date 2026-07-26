import type { Metadata } from "next";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import { createPageMetadata } from "../../../../../lib/seo/metadata";
import s from "../../../../page.module.css";
import ts from "../../duosub/terms/terms.module.css";
import ps from "./privacy.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Gentle Diary プライバシーポリシー",
  description:
    "GOWS合同会社が提供するアプリケーション「Gentle Diary」における個人情報およびプライバシー情報の取り扱いについて定めたプライバシーポリシーです。",
  path: "/service/products/gentle-diary/privacy",
});

const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9TY96vilXIJadOm95aWLbaLY5_E5icg0qsGsmBdJDey6OIw/viewform";

export default function GentleDiaryPrivacyPage() {
  return (
    <>
      <Nav />

      <section className={s.pageHero}>
        <div className={`container ${ts.pageHeroInner}`}>
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li>
                <a href="/">ホーム</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <a href="/service/products">サービス・プロダクト</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <a href="/service/products/gentle-diary">Gentle Diary</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <span aria-current="page">プライバシーポリシー</span>
              </li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>Gentle Diary - プライバシーポリシー</h1>
        </div>
      </section>

      <section className={s.section}>
        <div className="container">
          <div className={ts.contentWrap}>
            <p className={ts.meta}>
              2026年3月22日制定
              <br />
              2026年3月22日最終改訂
              <br />
              GOWS合同会社
              <br />
              代表　小山 望海
            </p>

            <hr className={ts.divider} />

            <p className={ts.lead}>
              GOWS合同会社（以下、弊社といいます。）は、提供するアプリケーション「Gentle Diary」（以下「本サービス」といいます。）におけるユーザーの個人情報およびプライバシー情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
            </p>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>1. 取得する情報</h2>
              <p className={ts.plainPara}>
                弊社は、本サービスの提供にあたり、以下の情報を取得する場合があります。
              </p>
              <h3 className={ps.subTitle}>(1) 位置情報</h3>
              <p className={ts.plainPara}>
                ユーザーの端末から取得される緯度・経度等の位置情報
                <br />
                ※本サービスは、アプリを使用していない状態（バックグラウンド）でも位置情報を取得する場合があります。
              </p>
              <h3 className={ps.subTitle}>(2) 利用情報</h3>
              <ul className={ps.bulletList}>
                <li>アプリの利用状況</li>
                <li>操作履歴</li>
                <li>端末情報（OS、デバイス情報等）</li>
              </ul>
              <h3 className={ps.subTitle}>(3) アカウント情報</h3>
              <ul className={ps.bulletList}>
                <li>メールアドレス</li>
                <li>その他ユーザーが登録する情報</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>2. 取得方法</h2>
              <p className={ts.plainPara}>
                弊社は、ユーザーの同意に基づき、以下の方法で情報を取得します。
              </p>
              <ul className={ps.bulletList}>
                <li>端末の位置情報機能を通じた取得</li>
                <li>アプリ利用時の自動収集</li>
                <li>ユーザーによる入力</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>3. 利用目的</h2>
              <p className={ts.plainPara}>取得した情報は、以下の目的で利用します。</p>
              <ul className={ps.bulletList}>
                <li>ユーザーの1日の移動履歴の記録</li>
                <li>訪問エリアおよび滞在時間の分析</li>
                <li>行動サマリー（1日の要約）の生成</li>
                <li>ユーザー間での情報共有機能の提供</li>
                <li>サービスの改善および品質向上</li>
                <li>不正利用の防止</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>4. 位置情報の取り扱い</h2>
              <p className={ts.plainPara}>本サービスは、位置情報を以下の方針で取り扱います。</p>
              <ul className={ps.bulletList}>
                <li>リアルタイムで第三者に位置情報を共有することはありません</li>
                <li>共有される情報は、訪問エリアなどを抽象化した情報に限られます</li>
                <li>ユーザーが明示的に指定した相手にのみ情報が共有されます</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>5. 情報の共有・第三者提供</h2>
              <p className={ts.plainPara}>
                弊社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
              </p>
              <ul className={ps.bulletList}>
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命・身体・財産の保護に必要な場合</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>6. 情報の管理</h2>
              <p className={ts.plainPara}>
                弊社は、取得した情報について、不正アクセス、漏えい、改ざん等を防止するため、適切な安全管理措置を講じます。
              </p>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>7. 保存期間</h2>
              <p className={ts.plainPara}>
                弊社は、利用目的の達成に必要な期間に限り、情報を保存し、その後は適切に削除または匿名化します。
              </p>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>8. ユーザーの権利</h2>
              <p className={ts.plainPara}>ユーザーは、以下の操作を行うことができます。</p>
              <ul className={ps.bulletList}>
                <li>端末設定から位置情報の取得を停止</li>
                <li>アプリ内設定から情報共有の制御</li>
                <li>アカウント削除によるデータ削除</li>
              </ul>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>9. 外部サービスの利用</h2>
              <p className={ts.plainPara}>
                本サービスでは、サービス向上のために外部サービスを利用する場合があります。これらのサービスにおける情報の取り扱いについては、各サービスのプライバシーポリシーに従います。
              </p>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>10. 本ポリシーの変更</h2>
              <p className={ts.plainPara}>
                弊社は、必要に応じて本ポリシーを変更することがあります。変更後の内容は、本サービス上に掲載した時点から効力を生じます。
              </p>
            </div>

            <div className={ts.articleBlock}>
              <h2 className={ts.articleTitle}>11. お問い合わせ</h2>
              <p className={ts.plainPara}>
                本ポリシーに関するお問い合わせは、
                <a
                  href={CONTACT_FORM_URL}
                  className={ts.privacyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  お問い合わせフォーム
                </a>
                からご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
