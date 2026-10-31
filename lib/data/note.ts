// note（https://note.com/pitdock）の記事を RSS から取得する。
// トップページの「情報発信」セクションで最新記事を表示するために使う。

export const NOTE_URL = "https://note.com/pitdock";
const NOTE_RSS_URL = `${NOTE_URL}/rss`;

// RSS の再取得間隔（秒）。記事公開からトップページへの反映は最大でこの時間だけ遅れる
export const NOTE_REVALIDATE_SECONDS = 3600;

export type NoteArticle = {
  title: string;
  url: string;
  /** YYYY.MM.DD（日本時間） */
  date: string;
  /** サムネイルが設定されていない記事は null */
  thumbnail: string | null;
};

function decodeXml(text: string): string {
  return text
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function pickTag(item: string, tag: string): string | null {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decodeXml(m[1]) : null;
}

function formatDate(pubDate: string): string | null {
  const t = Date.parse(pubDate);
  if (Number.isNaN(t)) return null;
  // サーバーのタイムゾーンに依存しないよう、日本時間に固定して日付を組み立てる
  const jst = new Date(t + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(jst.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

/** 最新記事を新しい順に最大 limit 件返す。取得に失敗した場合は空配列（ページ自体は表示させる） */
export async function fetchLatestNoteArticles(limit = 4): Promise<NoteArticle[]> {
  try {
    const res = await fetch(NOTE_RSS_URL, { next: { revalidate: NOTE_REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const articles: NoteArticle[] = [];
    for (const item of items) {
      const title = pickTag(item, "title");
      const url = pickTag(item, "link");
      const pubDate = pickTag(item, "pubDate");
      const date = pubDate ? formatDate(pubDate) : null;
      if (!title || !url || !date) continue;
      articles.push({ title, url, date, thumbnail: pickTag(item, "media:thumbnail") || null });
      if (articles.length >= limit) break;
    }
    return articles;
  } catch {
    return [];
  }
}
