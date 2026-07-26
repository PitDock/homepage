"use client";

import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import s from "../page.module.css";
import cs from "./company.module.css";

export default function CompanyPage() {
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
        <div className={`container ${cs.pageHeroInner}`}>
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li><a href="/">ホーム</a></li>
              <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
              <li><span aria-current="page">会社概要</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>会社概要</h1>
          <p className={s.pageSubCopy}>
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className={s.section}>
        <div className="container">
          <div className={`${cs.companyTableWrap} ${s.reveal}`}>
            <dl className={cs.companyTable}>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>社名</dt>
                <dd className={cs.companyTd}>GOWS合同会社（GOWS Inc.）</dd>
              </div>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>設立</dt>
                <dd className={cs.companyTd}>2024年4月8日</dd>
              </div>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>代表</dt>
                <dd className={cs.companyTd}>小山 望海</dd>
              </div>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>資本金</dt>
                <dd className={cs.companyTd}>1,500,000円</dd>
              </div>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>事業内容</dt>
                <dd className={cs.companyTd}>
                  <ul className={cs.companyList}>
                    <li>DX・AXを中心としたITコンサルティング</li>
                    <li>システム開発</li>
                    <li>自社プロダクトの開発・運営</li>
                  </ul>
                </dd>
              </div>
              <div className={cs.companyRow}>
                <dt className={cs.companyTh}>所在地</dt>
                <dd className={cs.companyTd}>
                  〒150-0045<br />
                  東京都渋谷区神泉町10-15-301
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 役員紹介 */}
      <section className={s.section}>
        <div className="container">
          {/* <h2 className={`${s.sectionTitle} ${s.reveal}`}>役員紹介</h2> */}
          <ul className={cs.officerList} role="list">
            <li className={`${cs.officerCard} ${s.reveal}`}>
              <div className={cs.officerPhoto}>
                <img
                  src="/images/company/koyama-nozomi.png"
                  alt="代表 小山望海"
                  loading="lazy"
                />
              </div>
              <div className={cs.officerInfo}>
                <p className={cs.officerRole}>代表（CEO / Founder）</p>
                <p className={cs.officerName}>小山 望海</p>
                <p className={cs.officerNameEn}>KOYAMA Nozomi</p>
                <p className={cs.officerBio}>
                  埼玉県さいたま市出身。{"\n"}
                  北海道大学・大学院で画像認識を中心にAIや機械学習の研究を行い、情報理工学の修士号を取得。{"\n"}
                  2018年4月に新卒でフューチャーアーキテクト株式会社にITコンサルタントとして入社。{"\n"}
                  金融業界や小売業のプロジェクトでコンサルタント兼エンジニアとして従事。{"\n"}
                  2022年8月にフリーランスとして独立。{"\n"}
                  2024年4月にGOWS合同会社を設立。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
