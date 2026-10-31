import s from "./site.module.css";
import { brandFontVariables } from "../../fonts";
import { INQUIRY_URL, headerNavItems } from "./links";

const serviceItems = headerNavItems.filter((item) => item.children);
const otherItems = headerNavItems.filter((item) => !item.children);

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/pitdock/", icon: "/icons/icon-linkedin.svg" },
  { name: "Facebook", href: "https://www.facebook.com/PitDock", icon: "/icons/icon-facebook.svg" },
  { name: "Instagram", href: "https://www.instagram.com/pitdock_official/", icon: "/icons/icon-instagram.svg" },
  { name: "X", href: "https://x.com/pitdock", icon: "/icons/icon-x.svg" },
  { name: "LINE", href: "https://line.me/R/ti/p/%40532icqyy", icon: "/icons/icon-line.svg" },
];

type Props = {
  /** トップページのリボンの位置合わせ用（app/components/home/Ribbon.tsx の data-ribbon-anchor） */
  ribbonAnchor?: string;
};

export default function SiteFooter({ ribbonAnchor }: Props) {
  return (
    <footer className={`${s.footer} ${brandFontVariables}`} data-ribbon-anchor={ribbonAnchor}>
      <div className={s.footerInner}>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <a href="/" className={s.footerLogo} aria-label="PitDock株式会社 トップへ">
              <img src="/brand/logo.svg" alt="PitDock" width={227} height={36} />
            </a>
            <p className={s.footerCatch}>課題を分解し、噛み合わせ、また走り始める。</p>
            <ul className={s.footerSocial} role="list" aria-label="SNS">
              {socialLinks.map((sn) => (
                <li key={sn.name}>
                  <a href={sn.href} target="_blank" rel="noopener noreferrer" aria-label={sn.name}>
                    <img src={sn.icon} alt="" width={24} height={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* ヘッダーと同じ項目。1 列目に「サービス」と下層リンク、2 列目にそれ以外、3 列目にお問い合わせ・プライバシーポリシー・個人情報の取り扱い */}
          <nav aria-label="フッターナビゲーション">
            <ul role="list" className={s.footerLinks}>
              {serviceItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                  {item.children && (
                    <ul role="list" className={s.footerSubLinks} aria-label={`${item.label}の一覧`}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <ul role="list" className={s.footerLinks}>
              {otherItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <ul role="list" className={s.footerLinks}>
              <li>
                <a href={INQUIRY_URL} target="_blank" rel="noopener noreferrer">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="/privacy">プライバシーポリシー</a>
              </li>
              <li>
                <a href="/personal-info">個人情報の取り扱いについて</a>
              </li>
            </ul>
          </nav>
        </div>
        <p className={s.copyright}>© {new Date().getFullYear()} PitDock株式会社</p>
      </div>
    </footer>
  );
}
