import SubPage from "../components/sub/SubPage";
import PageHero from "../components/sub/PageHero";
import s from "../components/sub/sub.module.css";
import ns from "./news.module.css";
import { news } from "../../lib/data/news";

function isExternalNewsUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

// 全件を id 降順（新しい順）で表示
const allNewsSorted = [...news].sort((a, b) => b.id - a.id);

export default function NewsPage() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[{ label: "ホーム", href: "/" }, { label: "News" }]}
        title="News"
        lead="PitDockの最新情報・プレスリリースをお届けします。"
      />

      <section className={s.section} aria-label="ニュース一覧">
        <div className={s.inner}>
          <ul className={ns.newsList} role="list">
            {allNewsSorted.map((n) => (
              <li key={n.id}>
                <a
                  href={n.url}
                  className={ns.newsRow}
                  {...(isExternalNewsUrl(n.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <time className={ns.newsDate} dateTime={n.date.replace(/\./g, "-")}>
                    {n.date}
                  </time>
                  <span className={ns.newsCategory}>
                    {n.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                  <span className={ns.newsTitle}>{n.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubPage>
  );
}
