// note（https://note.com/pitdock）の記事を取得する。
// トップページの「コラム」セクションで「最新1件＋スキ数の多い記事」を表示するために使う。
// スキ数は note の公開API（非公式）から取る。取れない場合は RSS の新しい順にフォールバックする。

export const NOTE_URL = "https://note.com/pitdock";
const NOTE_RSS_URL = `${NOTE_URL}/rss`;
const NOTE_CREATOR = "pitdock";
const NOTE_API_URL = `https://note.com/api/v2/creators/${NOTE_CREATOR}/contents?kind=note`;
// API の取得ページ数の上限（1ページ6件程度。記事が増えても取得回数が増えすぎないようにする）
const NOTE_API_MAX_PAGES = 10;

// RSS の再取得間隔（秒）。記事公開からトップページへの反映は最大でこの時間だけ遅れる
export const NOTE_REVALIDATE_SECONDS = 3600;

// コラムカードのラベルの条件
/** 公開日（日本時間）から何日以内の最新記事に NEW を付けるか */
const NOTE_NEW_BADGE_DAYS = 30;
/** スキ数がいくつ以上の記事に「人気」を付けるか */
const NOTE_POPULAR_BADGE_MIN_LIKES = 5;

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type NoteBadge = "new" | "popular" | null;

export type NoteArticle = {
  title: string;
  url: string;
  /** YYYY.MM.DD（日本時間） */
  date: string;
  /** サムネイルが設定されていない記事は null */
  thumbnail: string | null;
  /** コラムカードに付けるラベル。並び順ではなく取得結果から決める */
  badge: NoteBadge;
};

type NoteArticleSource = Omit<NoteArticle, "badge"> & { publishedAt: number };

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
  const jst = new Date(t + JST_OFFSET_MS);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(jst.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

/** 日本時間の日付で数えて、公開日から now までが NOTE_NEW_BADGE_DAYS 日以内か */
function isWithinNewPeriod(publishedAt: number, now: number): boolean {
  const jstDay = (t: number) => Math.floor((t + JST_OFFSET_MS) / DAY_MS);
  return jstDay(now) - jstDay(publishedAt) <= NOTE_NEW_BADGE_DAYS;
}

function toNoteArticle({ title, url, date, thumbnail }: NoteArticleSource, badge: NoteBadge): NoteArticle {
  return { title, url, date, thumbnail, badge };
}

/** RSS から最新記事を新しい順に最大 limit 件返す。取得に失敗した場合は空配列（ページ自体は表示させる） */
async function fetchLatestNoteArticlesFromRss(limit = 4): Promise<NoteArticleSource[]> {
  try {
    const res = await fetch(NOTE_RSS_URL, { next: { revalidate: NOTE_REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const articles: NoteArticleSource[] = [];
    for (const item of items) {
      const title = pickTag(item, "title");
      const url = pickTag(item, "link");
      const pubDate = pickTag(item, "pubDate");
      const date = pubDate ? formatDate(pubDate) : null;
      const publishedAt = pubDate ? Date.parse(pubDate) : NaN;
      if (!title || !url || !date || Number.isNaN(publishedAt)) continue;
      articles.push({ title, url, date, thumbnail: pickTag(item, "media:thumbnail") || null, publishedAt });
      if (articles.length >= limit) break;
    }
    return articles;
  } catch {
    return [];
  }
}

type NoteArticleWithLikes = NoteArticleSource & { likeCount: number };

type NoteApiContent = {
  name?: unknown;
  noteUrl?: unknown;
  publishAt?: unknown;
  eyecatch?: unknown;
  likeCount?: unknown;
};

/** 公開API から全記事をスキ数付きで取得する。取れない・形式が想定と違う場合は null */
async function fetchNoteArticlesWithLikes(): Promise<NoteArticleWithLikes[] | null> {
  try {
    const articles: NoteArticleWithLikes[] = [];
    for (let page = 1; page <= NOTE_API_MAX_PAGES; page++) {
      const res = await fetch(`${NOTE_API_URL}&page=${page}`, { next: { revalidate: NOTE_REVALIDATE_SECONDS } });
      if (!res.ok) return null;
      const json = await res.json();
      const contents: unknown = json?.data?.contents;
      if (!Array.isArray(contents)) return null;
      for (const c of contents as NoteApiContent[]) {
        if (typeof c.name !== "string" || typeof c.noteUrl !== "string" || typeof c.publishAt !== "string") continue;
        if (typeof c.likeCount !== "number") return null;
        const publishedAt = Date.parse(c.publishAt);
        const date = formatDate(c.publishAt);
        if (Number.isNaN(publishedAt) || !date) continue;
        articles.push({
          title: c.name,
          url: c.noteUrl,
          date,
          thumbnail: typeof c.eyecatch === "string" && c.eyecatch ? c.eyecatch : null,
          likeCount: c.likeCount,
          publishedAt,
        });
      }
      if (json?.data?.isLastPage !== false) break;
    }
    return articles.length > 0 ? articles : null;
  } catch {
    return null;
  }
}

/**
 * トップページのコラム用に、最新1件＋スキ数の多い記事を合計 limit 件返す。
 * 最新記事はスキ数の候補から除く。スキ数が同じ場合は新しい記事を優先する。
 * スキ数が取れない場合は RSS の新しい順に limit 件返す。どちらも取れない場合は空配列。
 *
 * ラベル: 最新記事は公開から NOTE_NEW_BADGE_DAYS 日以内なら NEW。スキ数で選んだ記事は
 * NOTE_POPULAR_BADGE_MIN_LIKES 以上なら人気。RSS 版は1件目だけ NEW の条件で判定し、残りはラベルなし。
 */
export async function fetchColumnNoteArticles(limit = 4): Promise<NoteArticle[]> {
  // ISR で再生成されるたびに判定し直すため、ビルド時刻ではなく取得時点の時刻を使う
  const now = Date.now();
  const newBadge = (a: NoteArticleSource): NoteBadge => (isWithinNewPeriod(a.publishedAt, now) ? "new" : null);

  const withLikes = await fetchNoteArticlesWithLikes();
  if (!withLikes) {
    const latest = await fetchLatestNoteArticlesFromRss(limit);
    return latest.map((a, i) => toNoteArticle(a, i === 0 ? newBadge(a) : null));
  }

  const byNewest = [...withLikes].sort((a, b) => b.publishedAt - a.publishedAt);
  const [latest, ...rest] = byNewest;
  const popular = rest
    .sort((a, b) => b.likeCount - a.likeCount || b.publishedAt - a.publishedAt)
    .slice(0, limit - 1);
  return [
    toNoteArticle(latest, newBadge(latest)),
    ...popular.map((a) => toNoteArticle(a, a.likeCount >= NOTE_POPULAR_BADGE_MIN_LIKES ? "popular" : null)),
  ];
}
