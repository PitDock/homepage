import SiteHeader from "../site/SiteHeader";
import SiteFooter from "../site/SiteFooter";
import { brandFontVariables } from "../../fonts";
import s from "./sub.module.css";

type Props = {
  children: React.ReactNode;
  /** フッターの後ろに置く要素（/contact のモバイル追従CTAと、それがフッターを隠さないための余白） */
  afterFooter?: React.ReactNode;
};

export default function SubPage({ children, afterFooter }: Props) {
  return (
    <div className={`${s.page} ${brandFontVariables}`}>
      <SiteHeader />
      <main className={s.main}>{children}</main>
      <SiteFooter />
      {afterFooter}
    </div>
  );
}
