import Image from "next/image";
import { XLogo } from "./XLogo";
import { InstagramLogo } from "./InstagramLogo";
import { YouTubeLogo } from "./YouTubeLogo";
import s from "./LpProductFooter.module.css";

export type LpProductSocialIcon = "x" | "instagram" | "youtube";

export type LpProductFooterLink = {
  href: string;
  label: string;
};

export type LpProductFooterProps = {
  /** Duosub: default（緑） / Gentle Diary: teal / dinder: orange / SafePage: safepage */
  variant?: "default" | "teal" | "orange" | "safepage";
  iconSrc: string;
  iconAlt: string;
  productName: string;
  tagline: string;
  links: LpProductFooterLink[];
  /** モバイルアプリ向け。chromeWebStoreUrl を指定しないときは両方渡す */
  appStoreUrl?: string;
  googlePlayUrl?: string;
  /** Chrome 拡張向け。指定時は App Store / Google Play の代わりに1ボタンを表示 */
  chromeWebStoreUrl?: string;
  /** ブランド列の補足（免責など） */
  footerNote?: string;
  social?: { href: string; ariaLabel: string; icon: LpProductSocialIcon }[];
  socialNavLabel?: string;
};

function IconChrome({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function SocialIcon({ icon, className }: { icon: LpProductSocialIcon; className?: string }) {
  switch (icon) {
    case "x":
      return <XLogo className={className} />;
    case "instagram":
      return <InstagramLogo className={className} />;
    case "youtube":
      return <YouTubeLogo className={className} />;
    default:
      return null;
  }
}

export function LpProductFooter({
  variant = "default",
  iconSrc,
  iconAlt,
  productName,
  tagline,
  links,
  appStoreUrl,
  googlePlayUrl,
  chromeWebStoreUrl,
  footerNote,
  social,
  socialNavLabel = "公式SNS",
}: LpProductFooterProps) {
  const footerClass = [
    s.footer,
    variant === "teal" ? s.footerTeal : "",
    variant === "orange" ? s.footerOrange : "",
    variant === "safepage" ? s.footerSafepage : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showChromeStore = Boolean(chromeWebStoreUrl);

  return (
    <footer className={footerClass}>
      <div className={s.lpFooterMain}>
        <div className={s.lpFooterBrand}>
          <div className={s.lpFooterBrandRow}>
            <Image src={iconSrc} alt={iconAlt} width={40} height={40} className={s.lpFooterIcon} />
            <span className={s.lpFooterName}>{productName}</span>
          </div>
          <p className={s.lpFooterTagline}>{tagline}</p>
          {footerNote ? <p className={s.lpFooterNote}>{footerNote}</p> : null}
        </div>

        <nav className={s.lpFooterNav} aria-label="フッターナビ">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.lpFooterLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={s.lpFooterDownload}>
          {showChromeStore ? (
            <a
              href={chromeWebStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.lpFooterStoreBtn}
            >
              <IconChrome className={s.iconSm} />
              Chromeに追加
            </a>
          ) : appStoreUrl && googlePlayUrl ? (
            <>
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.lpFooterStoreBtn}
              >
                <IconDownload className={s.iconSm} />
                App Store
              </a>
              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.lpFooterStoreBtn}
              >
                <IconDownload className={s.iconSm} />
                Google Play
              </a>
            </>
          ) : null}
        </div>
      </div>

      <div className={s.lpFooterBottom}>
        <p className={s.lpFooterCopy}>© GOWS合同会社</p>
        {social && social.length > 0 ? (
          <ul className={s.lpFooterSocial} aria-label={socialNavLabel}>
            {social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.lpFooterSocialLink}
                  aria-label={item.ariaLabel}
                >
                  <SocialIcon icon={item.icon} className={s.lpFooterSocialIcon} />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
