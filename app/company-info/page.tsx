import SubPage from "../components/sub/SubPage";
import PageHero from "../components/sub/PageHero";
import s from "../components/sub/sub.module.css";
import cs from "./company.module.css";

export default function CompanyPage() {
  return (
    <SubPage>
      <PageHero
        breadcrumbs={[{ label: "ホーム", href: "/" }, { label: "会社概要" }]}
        title="会社概要"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <dl className={s.dataTable}>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>社名</dt>
              <dd className={s.dataValue}>PitDock株式会社（PitDock, Inc.）</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>設立</dt>
              <dd className={s.dataValue}>2024年4月8日<br />(2026年8月16日 社名変更)</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>代表取締役</dt>
              <dd className={s.dataValue}>小山 望海</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>資本金</dt>
              <dd className={s.dataValue}>1,500,000円</dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>事業内容</dt>
              <dd className={s.dataValue}>
                <ul>
                  <li>DX・AXコンサルティング</li>
                  <li>システム開発</li>
                  <li>技術顧問</li>
                  <li>自社プロダクトの開発・運営</li>
                </ul>
              </dd>
            </div>
            <div className={s.dataRow}>
              <dt className={s.dataLabel}>所在地</dt>
              <dd className={s.dataValue}>
                〒150-0045<br />
                東京都渋谷区神泉町10-15-301
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          <div className={cs.profile}>
            <img
              src="/images/photo-ceo.webp"
              alt="代表取締役 小山望海"
              className={cs.profilePhoto}
              width={244}
              height={244}
              loading="lazy"
            />
            <p className={cs.profileRole}>代表取締役 CEO</p>
            <p className={cs.profileName}>小山 望海</p>
            <p className={cs.profileNameEn} lang="en">
              KOYAMA Nozomi
            </p>
            <p className={`${s.body} ${cs.profileBio}`}>
                  埼玉県さいたま市出身。{"\n"}
                  北海道大学・大学院で画像認識を中心にAIや機械学習の研究を行い、情報理工学の修士号を取得。{"\n"}
                  2018年4月に新卒でフューチャーアーキテクト株式会社にITコンサルタントとして入社。{"\n"}
                  金融業界や小売業のプロジェクトでコンサルタント兼エンジニアとして従事。{"\n"}
                  2022年8月にフリーランスとして独立。{"\n"}
                  2024年4月にPitDock株式会社(当時の社名：GOWS合同会社)を設立。
            </p>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
