import Image from "next/image";
import s from "../page.module.css";
import { XLogo } from "./XLogo";
import { InstagramLogo } from "./InstagramLogo";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7495083231109730304/?actorCompanyId=105150520",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/pitdock",
    icon: <XLogo />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/pitdock_official/",
    icon: <InstagramLogo />,
  },
  {
    name: "LINE",
    href: "https://line.me/R/ti/p/%40532icqyy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.365 9.89c.41 0 .746.335.746.747 0 .41-.336.745-.746.745h-2.083v1.337h2.083a.75.75 0 0 1 0 1.498h-2.83a.747.747 0 0 1-.745-.745V8.633c0-.41.335-.746.746-.746h2.83a.75.75 0 0 1 0 1.5h-2.084v1.337h2.084V9.89zm-3.781 3.582a.747.747 0 0 1-.515.71.752.752 0 0 1-.232.036.741.741 0 0 1-.604-.298l-2.9-3.95v3.502a.747.747 0 0 1-.747.745.747.747 0 0 1-.745-.745V8.633c0-.32.207-.604.514-.71a.778.778 0 0 1 .233-.036c.23 0 .457.116.604.299l2.9 3.95V8.633c0-.41.335-.746.747-.746a.747.747 0 0 1 .746.746v4.84zm-6.61 0a.747.747 0 0 1-.747.745.747.747 0 0 1-.745-.745V8.633c0-.41.335-.746.745-.746.412 0 .747.335.747.746v4.84zm-2.527.745H3.616a.747.747 0 0 1-.746-.746V8.633c0-.41.335-.746.746-.746.41 0 .746.335.746.746v4.094h2.085c.41 0 .746.335.746.745 0 .411-.335.746-.746.746zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerGrid}>
          <div className={s.footerBrand}>
            <Image
              src="/images/logo_white.png"
              alt="PitDock"
              width={780}
              height={123}
              className={s.footerLogo}
            />
            <p className={s.footerTagline}>
              ITで未来を切り拓く、課題解決のプロフェッショナル。<br/>
              PitDock株式会社は、DX・AXコンサルティングとシステム開発を通じて、
              事業を加速させ、企業の成長を支援します。
            </p>
            <ul className={s.footerSocial} role="list" aria-label="SNSリンク・お問い合わせ">
              {socialLinks.map((sn) => (
                <li key={sn.name}>
                  <a
                    href={sn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.footerSocialLink}
                    aria-label={sn.name}
                  >
                    {sn.icon}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://forms.gle/BGJ5MAuT8nHxxkXK9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.footerContactBtn}
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="サービス">
            <ul role="list" className={s.footerNavList}>
              <li><a href="/service/dx-ax">DX・AXコンサルティング</a></li>
              <li><a href="/service/system-dev">システム開発</a></li>
              <li><a href="/service/tech-advisor">技術顧問</a></li>
              <li><a href="/service/products">自社プロダクト</a></li>
            </ul>
          </nav>
          <nav aria-label="会社情報">
            <ul role="list" className={s.footerNavList}>
              <li><a href="/company-info">会社概要</a></li>
              <li><a href="/news">お知らせ</a></li>
              <li><a href="/#faq">よくある質問</a></li>
            </ul>
          </nav>
          <nav aria-label="その他">
            <ul role="list" className={s.footerNavList}>
              <li><a href="/partner">パートナー募集</a></li>
              <li><a href="/privacy">プライバシーポリシー</a></li>
              <li><a href="/personal-info">個人情報の取り扱いについて</a></li>
            </ul>
          </nav>
        </div>
        <p className={s.copyright}>© PitDock株式会社</p>
      </div>
    </footer>
  );
}
