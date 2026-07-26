"use client";

import { useEffect } from "react";
import Image from "next/image";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { XLogo } from "../../components/XLogo";
import s from "../../page.module.css";

const CONTACT_URL = "/contact";
const PRODUCT_CONTACT_URL = "https://forms.gle/BGJ5MAuT8nHxxkXK9";
const DUOSUB_X_URL = "https://x.com/duosub_app";

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(`.${s.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />

      {/* Page Hero */}
      <section className={s.pageHero}>
        <div className="container">
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li><a href="/">ホーム</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><a href="/#services">サービス</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><span aria-current="page">自社プロダクト</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>自社プロダクト</h1>
          <p className={s.pageSubCopy}>
          </p>
          <a href={PRODUCT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className={s.btnSecondary}>
            プロダクトについて問い合わせる →
          </a>
        </div>
      </section>

      {/* Products List */}
      <section className={s.serviceSection}>
        <div className="container">
          <ul className={s.productListStack} role="list">
            {products.map((p, i) => (
              <li key={p.href} className={`${s.serviceCard} ${s.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={s.productCardInner}>
                  <div className={s.productCardLogo}>
                    <Image
                      src={p.logoSrc}
                      alt={`${p.name} のロゴ`}
                      fill
                      className={s.productLogoImg}
                      sizes="(max-width: 640px) 220px, 200px"
                      priority={i === 0}
                    />
                  </div>
                  <div className={s.productCardBody}>
                    <h3 className={s.serviceH3}>{p.name}</h3>
                    <p className={s.serviceSubtitle}>{p.subtitle}</p>
                    <p className={s.serviceDesc}>{p.desc}</p>
                    <ul className={s.darkTagList} role="list" aria-label="タグ">
                      {p.tags.map((t) => <li key={t} className={s.darkTag}>{t}</li>)}
                    </ul>
                    <div className={s.productCardActions}>
                      <a href={p.href} className={s.btnGhostSm}>{p.cta}</a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why section */}
      <section className={s.featuresSection}>
        <div className="container">
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>GOWSがプロダクトをつくる理由</h2>
          <div className={`${s.productsNote} ${s.reveal}`}>
            <p className={s.productsNoteText}>
              コンサルティング・開発の現場や日常生活で感じた課題や「あったらいいな」を、プロダクトに変えています。<br />
              ユーザー目線と開発者目線を兼ね備えたチームが、使いやすさと品質にこだわって開発・運営しています。
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={s.footerCta}>
        <div className="container">
          <h2 className={s.footerCtaH2}>プロダクト開発のご相談もお気軽に。</h2>
          <p className={s.footerCtaSub}>
            アプリやサービスのアイデアをお持ちの方は、ぜひ一度ご相談ください。
          </p>
          <div className={`${s.ctaRow} ${s.ctaRowCenter}`}>
            <a href={CONTACT_URL} className={s.btnPrimary}>
              無料相談を予約する →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
