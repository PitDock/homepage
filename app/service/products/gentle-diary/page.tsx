import { JsonLd } from "../../../components/JsonLd";
import {
  faqPageJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "../../../../lib/seo/json-ld";
import { GENTLE_DIARY_FAQS } from "../../../../lib/seo/gentle-diary-faqs";
import { formatIsoWeekKey, getWeeklyVariant, type LpVariant } from "../../../../lib/ab/iso-week";
import VariantA from "./_components/VariantA";
import VariantB from "./_components/VariantB";
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  ICON_SRC,
  PAGE_DESCRIPTION,
  PAGE_PATH,
  PAGE_TITLE,
} from "./_components/copy";

// 週替わり出し分けのため、CDNキャッシュで固定されないよう動的レンダリングにする
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GentleDiaryPage({ searchParams }: Props) {
  const now = new Date();
  let variant: LpVariant = getWeeklyVariant(now);
  const isoWeek = formatIsoWeekKey(now);

  // 開発時のみ ?variant=A / ?variant=B で両パターンを目視確認できる。
  // 本番ビルドでは分岐自体が無効（production では必ず週番号判定に従う）。
  if (process.env.NODE_ENV !== "production") {
    const forced = (await searchParams)?.variant;
    const value = Array.isArray(forced) ? forced[0] : forced;
    if (value === "A" || value === "B") variant = value;
  }

  // JSON-LD は A/B 完全同一（§3-10 SEO交絡防止）
  const jsonLd = [
    webPageJsonLd({ name: PAGE_TITLE, description: PAGE_DESCRIPTION, path: PAGE_PATH }),
    softwareApplicationJsonLd({
      name: "Gentle Diary",
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
      image: ICON_SRC,
      offers: { price: "0", priceCurrency: "JPY", description: "無料" },
    }),
    faqPageJsonLd(GENTLE_DIARY_FAQS),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      {variant === "A" ? (
        <VariantA isoWeek={isoWeek} variant="A" />
      ) : (
        <VariantB isoWeek={isoWeek} variant="B" />
      )}
    </>
  );
}
