"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import s from "../page.module.css";
import p from "./partner.module.css";

// ---- データ定義 ----

type Role = {
  id: string;
  label: string;
  badgeClass: string;
  badgeText: string;
  h3: string;
  desc: string;
  fits: string[];
  skills: string[];
};

const roles: Role[] = [
  {
    id: "consultant",
    label: "ITコンサルタント",
    badgeClass: p.partnerRoleBadgeBlue,
    badgeText: "IT Consultant",
    h3: "ITコンサルタント",
    desc: "DX推進・業務改革・AI活用の企画や導入支援を担当します。クライアントとの上流コミュニケーションから要件整理まで、コンサルタントとして幅広く関与いただきます。",
    fits: [
      "上流工程（戦略立案・要件定義）に関わりたい方",
      "業務改革やDX推進の実績がある方",
      "クライアントワーク・提案資料作成の経験がある方",
    ],
    skills: [
      "DX推進・業務改革・AI活用の企画・導入経験",
      "クライアントワーク・提案資料作成",
      "業務フロー整理・要件定義",
      "プロジェクトのPM・PMO",
      "特定業種（金融・製造・小売・教育等）の深い知見",
    ],
  },
  {
    id: "engineer",
    label: "システム / フルスタックエンジニア",
    badgeClass: p.partnerRoleBadgeGreen,
    badgeText: "Engineer",
    h3: "システムエンジニア / フルスタックエンジニア",
    desc: "WebアプリやシステムのFE・BE・フルスタック開発を担当します。要件定義フェーズへの参加も歓迎しています。",
    fits: [
      "コンサルティング的思考（課題特定・要件整理）ができる方",
      "上流工程への参加経験がある方",
      "アジャイル・スクラム開発の経験がある方",
    ],
    skills: [
      "Webアプリ・業務システム開発（FE / BE / フルスタック）",
      "Next.js・React・TypeScript・Node.js・Python・Go等",
      "DB設計・API設計",
      "アジャイル・スクラム開発",
      "クラウドインフラ（AWS・GCP・Azure）",
    ],
  },
  {
    id: "ai",
    label: "AI・機械学習エンジニア",
    badgeClass: p.partnerRoleBadgePurple,
    badgeText: "AI Engineer",
    h3: "AI・機械学習エンジニア",
    desc: "生成AI活用・RAG構築・MLモデル開発など、AI領域の技術支援を担当します。ビジネス側との要件調整経験がある方を特に歓迎します。",
    fits: [
      "ビジネス側との要件調整経験がある方",
      "LLM・RAG・プロンプトエンジニアリングの実績がある方",
      "研究バックグラウンド（大学院・研究機関）がある方",
    ],
    skills: [
      "生成AI（LLM）業務活用・RAG構築・プロンプトエンジニアリング",
      "Python・機械学習フレームワーク（PyTorch・scikit-learn等）",
      "データ分析・データエンジニアリング",
      "ML Ops・モデル運用の知識",
    ],
  },
];

type Step = {
  num: string;
  h3: string;
  body: string;
};

const steps: Step[] = [
  {
    num: "01",
    h3: "まずカジュアルに話しましょう",
    body: "オンラインまたは対面でお話させてください。あなたの経験・スキル・希望条件をヒアリングし、PitDockの案件状況もお伝えします。",
  },
  {
    num: "02",
    h3: "PitDockと案件についてすり合わせ",
    body: "スキル・稼働可能日数・希望条件について詳しくヒアリングします。今すぐ動けない状況でも歓迎です。",
  },
  {
    num: "03",
    h3: "案件と条件の提案",
    body: "あなたに合う案件が生まれた段階でご連絡します。稼働時間・報酬・業務範囲を個別にご提案します。",
  },
  {
    num: "04",
    h3: "参画・プロジェクト開始",
    body: "業務委託契約を締結し、プロジェクトを開始します。初回の案件後も継続的にパートナーとして関わっていただくことが多いです。",
  },
];

type FaqItem = { q: string; a: string };

const faqs: FaqItem[] = [
  { q: "稼働時間はどのくらい必要ですか？", a: "タイミング次第では週数時間程度から参画いただける案件があります。稼働時間・日数はご状況に合わせてご相談ください。" },
  { q: "契約形態はどうなりますか？", a: "業務委託契約（準委任または請負）となります。雇用関係は発生しません。副業も大歓迎です。" },
  { q: "今すぐ動けない状態でも相談できますか？", a: "はい、歓迎です。まずはご状況をお聞きし、タイミングが合う案件が出た際にご連絡することも可能です。" },
];

// ---- フォーム型定義 ----

type PartnerFormData = {
  name: string;
  email: string;
  tel: string;
  roles: string[];
  status: string;
  availDays: string;
  skills: string;
  message: string;
  privacy: boolean;
};

const initialForm: PartnerFormData = {
  name: "",
  email: "",
  tel: "",
  roles: [],
  status: "",
  availDays: "",
  skills: "",
  message: "",
  privacy: false,
};

const roleOptions = [
  "ITコンサルタント",
  "システムエンジニア / フルスタックエンジニア",
  "AI・機械学習エンジニア",
  "その他",
];

const statusOptions = [
  "すでにフリーランス / 副業として活動中",
  "独立・副業を検討中",
  "その他",
];

// ---- コンポーネント ----

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState<PartnerFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PartnerFormData | "roles" | "status" | "availDays", string>>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // IntersectionObserver による reveal アニメーション
  const mainRef = useRef<HTMLElement>(null);
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

  // フォームハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (option: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      roles: checked ? [...prev.roles, option] : prev.roles.filter((r) => r !== option),
    }));
    setErrors((prev) => ({ ...prev, roles: "" }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, privacy: e.target.checked }));
    setErrors((prev) => ({ ...prev, privacy: "" }));
  };

  const validate = (): Partial<Record<string, string>> => {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "必須項目です";
    if (!form.email.trim()) {
      e.email = "必須項目です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "メールアドレスの形式が正しくありません";
    }
    if (form.roles.length === 0) e.roles = "1つ以上選択してください";
    if (!form.status) e.status = "必須項目です";
    if (!form.availDays) e.availDays = "必須項目です";
    if (!form.privacy) e.privacy = "同意が必要です";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          tel: form.tel || undefined,
          roles: form.roles,
          status: form.status,
          availDays: form.availDays,
          skills: form.skills || undefined,
          message: form.message || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Nav />

      <main ref={mainRef}>
        {/* ======================================
            Section 1: Hero
            ====================================== */}
        <section className={p.partnerHero}>
          <div className={p.partnerHeroOrb} aria-hidden="true" />
          <div className="container">
            <nav className={s.breadcrumb} aria-label="パンくず">
              <ol>
                <li><a href="/">ホーム</a></li>
                <li aria-hidden="true" className={s.breadcrumbSep}>/</li>
                <li><span aria-current="page">パートナー募集</span></li>
              </ol>
            </nav>

            <h1 className={p.partnerHeroH1}>
              あなたの専門性を、<br />
              <em>本物の課題解決</em>に使ってほしい。
            </h1>

            <p className={p.partnerHeroSub}>
              PitDock株式会社は、DX・AX推進とシステム開発を手がけるITコンサルティング会社です。
              事業の最前線で動く案件に、一緒に向き合ってくれるコンサルタントやエンジニアを随時募集しています。「請負って終わり」ではなく、戦略から実装まで本質的な課題解決を追求するチームに、参加しませんか。
            </p>

            <div className={p.partnerHeroCtaRow}>
              <a href="#entry" className={p.partnerBtnPrimary}>まず話を聞く</a>
              <a href="#roles" className={p.partnerBtnGhost}>募集職種を見る</a>
            </div>
          </div>
        </section>

        {/* ======================================
            Section 2: PitDockと一緒に働くとは
            ====================================== */}
        <section className={p.partnerWorkSection}>
          <div className="container">
            <div className={`${p.partnerSectionHead} ${s.reveal}`}>
              <span className={p.partnerSectionLabel}>WORK WITH US</span>
              <h2 className={p.partnerSectionH2}>
                PitDockのパートナー
              </h2>
              <p className={p.partnerSectionDesc}>
                PitDockが扱う案件は「ツールを入れて終わり」の仕事ではありません。
                クライアントの経営課題・業務課題を深掘りし、テクノロジーで本質的に解決するプロジェクトに参画いただきます。
              </p>
            </div>

            <div className={p.partnerWorkGrid}>
              {/* カード1 */}
              <div className={`${p.partnerWorkCard} ${s.reveal}`} style={{ transitionDelay: "0s" }}>
                <div>
                  <span
                    className={p.partnerWorkKeyword}
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    上流から
                  </span>
                  <h3 className={p.partnerWorkH3}>上流工程から参画できる</h3>
                  <p className={p.partnerWorkBody}>
                    要件整理・業務設計・戦略立案フェーズから関与いただける案件が多くあります。
                    「言われたものを作る」ではなく、課題の設定から一緒に考えるポジションです。
                  </p>
                </div>
              </div>

              {/* カード2 */}
              <div className={`${p.partnerWorkCard} ${s.reveal}`} style={{ transitionDelay: "0.08s" }}>
                <div>
                  <span
                    className={p.partnerWorkKeyword}
                    style={{ background: "linear-gradient(135deg, #2DD4BF, #22D3EE)" }}
                  >
                    多業種
                  </span>
                  <h3 className={p.partnerWorkH3}>多様な業種の案件に関われる</h3>
                  <p className={p.partnerWorkBody}>
                    製造・小売・金融・教育・ヘルスケアなど、幅広い業種のクライアントと向き合います。
                    特定業種の専門性だけでなく、横断的な視点が身につきます。
                  </p>
                </div>
              </div>

              {/* カード3 */}
              <div className={`${p.partnerWorkCard} ${s.reveal}`} style={{ transitionDelay: "0.16s" }}>
                <div>
                  <span
                    className={p.partnerWorkKeyword}
                    style={{ background: "linear-gradient(135deg, #E8A838, #F0C060)" }}
                  >
                    AI活用
                  </span>
                  <h3 className={p.partnerWorkH3}>AI・AX領域の案件にも携われる</h3>
                  <p className={p.partnerWorkBody}>
                    生成AI活用やAIの実装を伴う案件に参画する機会があります。
                    実務を通じて、AI活用の実践知見や市場価値の高いスキルを磨けます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================
            Section 3: 募集職種
            ====================================== */}
        <section className={p.partnerRoleSection} id="roles">
          <div className="container">
            <div className={`${p.partnerSectionHead} ${p.center} ${s.reveal}`}>
              <span className={p.partnerSectionLabel}>ROLES</span>
              <h2 className={p.partnerSectionH2}>こんな方を探しています。</h2>
              <p className={p.partnerSectionDesc}>
                職種を問わず、「ビジネスとテクノロジーの両方を理解して動ける人」を求めています。
                以下はあくまで参考です。「自分はどこに当てはまるか」が気になれば、まず話しましょう。
              </p>
            </div>

            {/* タブバー */}
            <ul className={p.partnerRoleTabList} role="tablist">
              {roles.map((role, i) => (
                <li key={role.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={activeTab === i}
                    aria-controls={`panel-${role.id}`}
                    id={`tab-${role.id}`}
                    className={`${p.partnerRoleTab} ${activeTab === i ? p.partnerRoleTabActive : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {role.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* パネル */}
            {roles.map((role, i) => (
              <div
                key={role.id}
                id={`panel-${role.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${role.id}`}
                className={`${p.partnerRolePanel} ${activeTab === i ? p.partnerRolePanelActive : ""}`}
                hidden={activeTab !== i}
              >
                <div className={p.partnerRolePanelInfo}>
                  <span className={`${p.partnerRoleBadge} ${role.badgeClass}`}>{role.badgeText}</span>
                  <h3 className={p.partnerRolePanelH3}>{role.h3}</h3>
                  <p className={p.partnerRolePanelDesc}>{role.desc}</p>
                  <p className={p.partnerRoleFitLabel}>こんな方に向いています</p>
                  <ul className={p.partnerRoleFitList}>
                    {role.fits.map((fit) => (
                      <li key={fit}><span aria-hidden="true">✓</span> {fit}</li>
                    ))}
                  </ul>
                </div>
                <div className={p.partnerRolePanelSkills}>
                  <p className={p.partnerRoleSkillLabel}>求めるスキル・経験</p>
                  <ul className={p.partnerSkillList}>
                    {role.skills.map((skill) => (
                      <li key={skill} className={p.partnerSkillItem}>
                        <span aria-hidden="true">/</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* 締めメッセージ */}
            <div className={`${p.partnerRoleNote} ${s.reveal}`}>
              肩書きや職種の分類よりも大切にしているのは、「クライアントの課題を自分ごとにして考えられるか」です。「言われたことをやる」より「なぜそれが必要かを考えながら動く」スタンスを持つ方と働きたいと思っています。
            </div>
          </div>
        </section>

        {/* ======================================
            Section 4: 参画の流れ
            ====================================== */}
        <section className={p.partnerStepSection}>
          <div className="container">
            <div className={`${p.partnerSectionHead} ${p.center} ${s.reveal}`}>
              <span className={p.partnerSectionLabel}>PROCESS</span>
              <h2 className={p.partnerSectionH2}>参画までの流れ</h2>
              <p className={p.partnerSectionDesc}>
                気軽な一歩から始まります。まずはカジュアルに話しましょう。
              </p>
            </div>

            <ol className={p.partnerStepList}>
              {steps.map((step, i) => (
                <li key={step.num} className={`${p.partnerStepItem} ${s.reveal}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className={p.partnerStepNum} aria-hidden="true">{step.num}</div>
                  <div className={p.partnerStepContent}>
                    <h3 className={p.partnerStepH3}>{step.h3}</h3>
                    <p className={p.partnerStepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ======================================
            Section 5: FAQ
            ====================================== */}
        <section className={p.partnerFaqSection}>
          <div className="container">
            <div className={`${p.partnerSectionHead} ${p.center} ${s.reveal}`}>
              <span className={p.partnerSectionLabel}>FAQ</span>
              <h2 className={p.partnerSectionH2}>よくあるご質問</h2>
            </div>

            <div className={p.partnerFaqGrid}>
              {faqs.map((faq, i) => (
                <div key={i} className={`${p.partnerFaqCard} ${s.reveal}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className={p.partnerFaqQ}>
                    <span className={p.partnerFaqQMark} aria-hidden="true">Q</span>
                    <p className={p.partnerFaqQText}>{faq.q}</p>
                  </div>
                  <div className={p.partnerFaqA}>
                    <span className={p.partnerFaqAMark} aria-hidden="true">A</span>
                    <p className={p.partnerFaqAText}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================
            Section 6: エントリーフォーム
            ====================================== */}
        <section className={p.partnerEntrySection} id="entry">
          <div className={p.partnerEntryBg} aria-hidden="true" />
          <div className="container">
            <div className={`${p.partnerSectionHead} ${p.center} ${s.reveal}`}>
              <span className={p.partnerSectionLabel}>ENTRY</span>
              <h2 className={p.partnerSectionH2}>まず話を聞く</h2>
              <p className={p.partnerSectionDesc}>
                フォームから送信いただくと、翌営業日中にご連絡します。
                「まだ迷っている」という段階でも歓迎です。
              </p>
            </div>

            {submitStatus === "success" ? (
              <div className={p.partnerSuccessBox}>
                <div className={p.partnerSuccessIcon} aria-hidden="true">✓</div>
                <h2 className={p.partnerSuccessH2}>受け付けました</h2>
                <p className={p.partnerSuccessText}>
                  ご応募ありがとうございます。<br />
                  翌営業日中にご入力いただいたメールアドレス宛にご連絡させていただきます。
                </p>
              </div>
            ) : (
              <form className={`${p.partnerEntryForm} ${s.reveal}`} onSubmit={handleSubmit} noValidate>
                <div className={p.partnerFormGrid}>
                  {/* お名前 */}
                  <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                    <label className={p.partnerLabel} htmlFor="partner-name">
                      お名前 <span className={p.partnerRequired}>必須</span>
                    </label>
                    <input
                      id="partner-name"
                      name="name"
                      type="text"
                      className={p.partnerInput}
                      placeholder="山田 太郎"
                      value={form.name}
                      onChange={handleTextChange}
                    />
                    {errors.name && <p className={p.partnerErrorMsg}>{errors.name}</p>}
                  </div>

                  {/* メールアドレス */}
                  <div className={p.partnerFieldWrap}>
                    <label className={p.partnerLabel} htmlFor="partner-email">
                      メールアドレス <span className={p.partnerRequired}>必須</span>
                    </label>
                    <input
                      id="partner-email"
                      name="email"
                      type="email"
                      className={p.partnerInput}
                      placeholder="taro.yamada@example.com"
                      value={form.email}
                      onChange={handleTextChange}
                    />
                    {errors.email && <p className={p.partnerErrorMsg}>{errors.email}</p>}
                  </div>

                  {/* 電話番号 */}
                  <div className={p.partnerFieldWrap}>
                    <label className={p.partnerLabel} htmlFor="partner-tel">
                      電話番号
                      <span style={{ fontSize: "11px", color: "var(--color-muted)", fontWeight: 400 }}>（任意）</span>
                    </label>
                    <input
                      id="partner-tel"
                      name="tel"
                      type="tel"
                      className={p.partnerInput}
                      placeholder="090-0000-0000"
                      value={form.tel}
                      onChange={handleTextChange}
                    />
                  </div>

                  <hr className={p.partnerFormDivider} />

                  {/* 職種 */}
                  <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                    <p className={p.partnerLabel}>
                      あなたの職種 <span className={p.partnerRequired}>必須</span>
                    </p>
                    <div className={p.partnerCheckGroup} role="group" aria-label="職種">
                      {roleOptions.map((option) => (
                        <label key={option} className={p.partnerCheckItem}>
                          <input
                            type="checkbox"
                            checked={form.roles.includes(option)}
                            onChange={(e) => handleRoleChange(option, e.target.checked)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.roles && <p className={p.partnerErrorMsg}>{errors.roles}</p>}
                  </div>

                  {/* 稼働状況 */}
                  <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                    <p className={p.partnerLabel}>
                      現在の稼働状況 <span className={p.partnerRequired}>必須</span>
                    </p>
                    <div className={p.partnerRadioGroup} role="group" aria-label="稼働状況">
                      {statusOptions.map((option) => (
                        <label key={option} className={p.partnerRadioItem}>
                          <input
                            type="radio"
                            name="status"
                            value={option}
                            checked={form.status === option}
                            onChange={handleTextChange}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.status && <p className={p.partnerErrorMsg}>{errors.status}</p>}
                  </div>

                  <hr className={p.partnerFormDivider} />

                  {/* スキル・経験 */}
                  <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                    <label className={p.partnerLabel} htmlFor="partner-skills">
                      スキル・経験の概要
                      <span style={{ fontSize: "11px", color: "var(--color-muted)", fontWeight: 400 }}>（任意）</span>
                    </label>
                    <textarea
                      id="partner-skills"
                      name="skills"
                      className={p.partnerTextarea}
                      placeholder="例：Webアプリ開発10年、直近はNext.js/TypeScript中心。DX推進の上流支援経験あり。"
                      value={form.skills}
                      onChange={handleTextChange}
                      rows={4}
                    />
                  </div>

                  {/* メッセージ */}
                  <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                    <label className={p.partnerLabel} htmlFor="partner-message">
                      ご希望・その他メッセージ
                      <span style={{ fontSize: "11px", color: "var(--color-muted)", fontWeight: 400 }}>（任意）</span>
                    </label>
                    <textarea
                      id="partner-message"
                      name="message"
                      className={p.partnerTextarea}
                      placeholder="稼働開始希望時期や条件など、自由にご記入ください。"
                      value={form.message}
                      onChange={handleTextChange}
                      rows={4}
                    />
                  </div>

                  {/* プライバシーポリシー */}
                  <label className={p.partnerPrivacyCheck}>
                    <input
                      type="checkbox"
                      checked={form.privacy}
                      onChange={handlePrivacyChange}
                    />
                    <span>
                      <a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>および
                      <a href="/personal-info" target="_blank" rel="noopener noreferrer">個人情報の取り扱いについて</a>
                      に同意する
                    </span>
                  </label>
                  {errors.privacy && <p className={p.partnerErrorMsg} style={{ gridColumn: "1 / -1" }}>{errors.privacy}</p>}

                  {submitStatus === "error" && (
                    <p className={p.partnerSubmitError}>
                      送信に失敗しました。しばらくしてから再度お試しください。
                    </p>
                  )}

                  <div className={p.partnerSubmitRow}>
                    <button
                      type="submit"
                      className={p.partnerSubmitBtn}
                      disabled={submitStatus === "loading"}
                    >
                      {submitStatus === "loading" ? "送信中..." : "送信する"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
