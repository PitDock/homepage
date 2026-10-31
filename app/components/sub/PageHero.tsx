import { Fragment } from "react";
import s from "./sub.module.css";

export type Crumb = { label: string; href?: string };

type Props = {
  /** 先頭の「ホーム」も含めて渡す。href なしは現在のページ */
  breadcrumbs: Crumb[];
  /** 英字ラベル [Pit色の語, Dock色の語]。装飾なので読み上げない */
  en?: [string, string];
  title: React.ReactNode;
  titleSize?: "default" | "long";
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  /** lead の下、actions の上に入るページ固有の要素 */
  children?: React.ReactNode;
  /** actions の下に置く注記 */
  after?: React.ReactNode;
};

export default function PageHero({
  breadcrumbs,
  en,
  title,
  titleSize = "default",
  lead,
  actions,
  children,
  after,
}: Props) {
  return (
    <section className={s.hero}>
      <div className={`${s.inner} ${s.heroInner}`}>
        <nav className={s.breadcrumb} aria-label="パンくず">
          <ol>
            {breadcrumbs.map((c, i) => (
              <Fragment key={`${c.label}-${i}`}>
                {i > 0 && (
                  <li aria-hidden="true" className={s.breadcrumbSep}>
                    /
                  </li>
                )}
                <li>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
              </Fragment>
            ))}
          </ol>
        </nav>
        {en && (
          <p className={s.heroEn} lang="en" aria-hidden="true">
            <span className={s.heroEnPit}>{en[0]}</span> <span className={s.heroEnDock}>{en[1]}</span>
          </p>
        )}
        <h1 className={`${s.heroTitle} ${titleSize === "long" ? s.heroTitleLong : ""}`}>{title}</h1>
        {lead && <p className={s.heroLead}>{lead}</p>}
        {children}
        {actions && <div className={s.heroActions}>{actions}</div>}
        {after}
      </div>
    </section>
  );
}
