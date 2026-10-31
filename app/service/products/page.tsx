import Image from "next/image";
import SubPage from "../../components/sub/SubPage";
import PageHero from "../../components/sub/PageHero";
import SectionHeading from "../../components/sub/SectionHeading";
import CtaBand from "../../components/sub/CtaBand";
import s from "../../components/sub/sub.module.css";
import ps from "./products.module.css";

const CONTACT_URL = "/contact";
const PRODUCT_CONTACT_URL = "https://forms.gle/9EPiyGuYy5HdvDVZ8";

type ProductEntry = {
  name: string;
  logoSrc: string;
  subtitle: string;
  desc: string;
  tags: string[];
  cta: string;
  href: string;
};

const products: ProductEntry[] = [
  {
    name: "Duosub",
    logoSrc: "/images/products/Duosub_logo.png",
    subtitle: "動画で楽しく英語学習",
    desc: "海外映画やドラマ、YouTubeのリアルな英会話を聴きながら英語字幕と日本語字幕で内容を確認し、楽しく英語が学べる究極ツール",
    tags: ["iOS / Android", "英語学習"],
    cta: "詳しく見る",
    href: "/service/products/duosub",
  },
  {
    name: "Gentle Diary",
    logoSrc: "/images/products/GentleDiary.png",
    subtitle: "リアルタイム共有しない位置情報日記",
    desc: "リアルタイムな位置情報共有に縛られない、新しい位置情報共有のかたち\n1日の行動をざっくりまとめてから共有\n見せすぎないから、ちょうどいい距離感で繋がれる",
    tags: ["iOS / Android", "位置情報共有", "見守り", "プライバシー重視"],
    cta: "詳しく見る",
    href: "/service/products/gentle-diary",
  },
  {
    name: "dinder",
    logoSrc: "/images/products/dinder_6x9.png",
    subtitle: "お店選びに時間はかけない",
    desc: "「何食べる？」「どこに食べに行く？」「2次会のお店どうする？」を解決する、飲食店選びの新定番アプリ",
    tags: ["iOS / Android", "飲食店選び"],
    cta: "詳しく見る",
    href: "/service/products/dinder",
  },
];

export default function ProductsPage() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サービス", href: "/#services" },
          { label: "自社プロダクト" },
        ]}
        title="自社プロダクト"
        actions={
          <a href={PRODUCT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
            プロダクトについて問い合わせる
          </a>
        }
      />

      <section className={s.section}>
        <div className={s.inner}>
          <ul className={ps.productList} role="list">
            {products.map((p, i) => (
              <li key={p.href} className={`${s.card} ${ps.productCard}`}>
                <div className={ps.productThumb}>
                  <Image
                    src={p.logoSrc}
                    alt={`${p.name} のロゴ`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 360px"
                    priority={i === 0}
                  />
                </div>
                <div className={ps.productBody}>
                  <h2 className={s.cardTitle}>{p.name}</h2>
                  <p className={ps.productSubtitle}>{p.subtitle}</p>
                  <p className={`${s.body} ${ps.productDesc}`}>{p.desc}</p>
                  <ul className={s.tags} role="list" aria-label="タグ">
                    {p.tags.map((t) => (
                      <li key={t} className={s.tag}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className={ps.productActions}>
                    <a href={p.href} className={`${s.btnOutline} ${s.btnSm}`}>
                      {p.cta}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading>PitDockがプロダクトをつくる理由</SectionHeading>
          <p className={`${s.body} ${s.narrow}`}>
            コンサルティング・開発の現場や日常生活で感じた課題や「あったらいいな」を、プロダクトに変えています。<br />
            ユーザー目線と開発者目線を兼ね備えたチームが、使いやすさと品質にこだわって開発・運営しています。
          </p>
        </div>
      </section>

      <CtaBand
        heading="プロダクト開発のご相談もお気軽に。"
        body="アプリやサービスのアイデアをお持ちの方は、ぜひ一度ご相談ください。"
        href={CONTACT_URL}
        label="無料相談を予約する"
      />
    </SubPage>
  );
}
