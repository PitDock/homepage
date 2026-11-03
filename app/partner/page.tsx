"use client";

import { useState } from "react";
import SubPage from "../components/sub/SubPage";
import PageHero from "../components/sub/PageHero";
import SectionHeading from "../components/sub/SectionHeading";
import { AgentNotice, HoneypotField, useFormGuard } from "../components/FormGuard";
import s from "../components/sub/sub.module.css";
import p from "./partner.module.css";

// ---- データ定義 ----

type Role = {
  id: string;
  label: string;
  h3: string;
  desc: string;
  fits: string[];
  skills: string[];
};

const roles: Role[] = [
  {
    id: "consultant",
    label: "ITコンサルタント",
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
      "エンジニア経験など、技術面も踏まえて提案・判断できる知見",
      "プロジェクトのPM・PMO",
      "特定業種（金融・製造・小売・教育等）の深い知見",
    ],
  },
  {
    id: "engineer",
    label: "システム / フルスタックエンジニア",
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
    body: "スキル・稼働可能時間・希望条件について詳しくヒアリングします。今すぐ動けない状況でも歓迎です。",
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
  availHours: string;
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
  availHours: "",
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

const availHoursOptions = [
  "週10時間程度",
  "週20時間程度",
  "週30時間程度",
  "週40時間以上",
  "未定・相談したい",
];

// ---- コンポーネント ----

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState<PartnerFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PartnerFormData | "roles" | "status" | "availHours", string>>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { honeypotRef, getGuard } = useFormGuard();

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
    if (!form.availHours) e.availHours = "必須項目です";
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
          availHours: form.availHours,
          skills: form.skills || undefined,
          message: form.message || undefined,
          guard: getGuard(),
        }),
      });
      if (res.status === 422) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        if (data?.error === "email_undeliverable") {
          setErrors((prev) => ({
            ...prev,
            email: "このメールアドレスにはメールをお送りできませんでした。お手数ですが、入力内容をご確認ください。",
          }));
          setSubmitStatus("idle");
          document.getElementById("partner-email")?.focus();
          return;
        }
      }
      if (!res.ok) throw new Error();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <SubPage>
      {/* Section 1: Hero */}
      <PageHero
        breadcrumbs={[{ label: "ホーム", href: "/" }, { label: "パートナー募集" }]}
        title={
          <>
            あなたの専門性を、<em className={p.heroEm}>本物の課題解決</em>に使ってほしい。
          </>
        }
        lead={
          <>
            PitDock株式会社は、DX・AX推進とシステム開発を手がけています。<br />
            事業の最前線で動く案件に、一緒に向き合ってくれるコンサルタントやエンジニアを随時募集しています。
          </>
        }
        actions={
          <>
            <a href="#entry" className={s.btn}>
              まず話を聞く
            </a>
            <a href="#roles" className={s.btnOutline}>
              募集職種を見る
            </a>
          </>
        }
      />

      {/* Section 2: 募集職種 */}
      <section className={s.section} id="roles">
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading>
            こんな方を探しています。
          </SectionHeading>

          <div>
            {/* タブバー */}
            <ul className={p.partnerRoleTabList} role="tablist">
              {roles.map((role, i) => (
                <li key={role.id} role="presentation">
                  <button
                    type="button"
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
                className={`${s.card} ${p.partnerRolePanel}`}
                hidden={activeTab !== i}
              >
                <div className={p.partnerRolePanelInfo}>
                  <h3 className={s.cardTitle}>{role.h3}</h3>
                  <p className={s.body}>{role.desc}</p>
                  <p className={p.partnerRoleLabel}>こんな方に向いています</p>
                  <ul className={p.partnerRoleFitList}>
                    {role.fits.map((fit) => (
                      <li key={fit}>
                        <span aria-hidden="true" className={p.partnerRoleMark}>
                          ✓
                        </span>
                        {fit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={p.partnerRolePanelSkills}>
                  <p className={p.partnerRoleLabel}>求めるスキル・経験</p>
                  <ul className={p.partnerRoleFitList}>
                    {role.skills.map((skill) => (
                      <li key={skill}>
                        <span aria-hidden="true" className={p.partnerRoleMark}>
                          /
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* 締めメッセージ */}
            <p className={`${s.body} ${p.partnerRoleNote}`}>
              肩書きや職種の分類よりも大切にしているのは、「クライアントの課題を自分ごとにして考えられるか」です。<br className={s.pcOnly} />
              「言われたことをやる」より「なぜそれが必要かを考えながら動く」スタンスを持つ方と働きたいと思っています。
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 参画の流れ */}
      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading lead="気軽な一歩から始まります。まずはカジュアルに話しましょう。">参画までの流れ</SectionHeading>

          <ol className={s.rowList}>
            {steps.map((step) => (
              <li key={step.num} className={s.rowItem}>
                <span className={s.rowNum} aria-hidden="true">
                  {step.num}
                </span>
                <div className={s.rowContent}>
                  <h3 className={s.rowTitle}>{step.h3}</h3>
                  <p className={s.body}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 4: FAQ */}
      <section className={s.section}>
        <div className={`${s.inner} ${s.block}`}>
          <SectionHeading>よくあるご質問</SectionHeading>

          <div className={s.grid2}>
            {faqs.map((faq) => (
              <div key={faq.q} className={`${s.card} ${p.partnerFaqCard}`}>
                <div className={p.partnerFaqRow}>
                  <span className={p.partnerFaqQMark} aria-hidden="true">
                    Q
                  </span>
                  <p className={p.partnerFaqQText}>{faq.q}</p>
                </div>
                <div className={p.partnerFaqRow}>
                  <span className={p.partnerFaqAMark} aria-hidden="true">
                    A
                  </span>
                  <p className={s.body}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: エントリーフォーム */}
      <section className={s.section} id="entry">
        <div className={s.inner}>
          <SectionHeading
            lead={
              <>
                フォームから送信いただくと、翌営業日中にご連絡します。
                「まだ迷っている」という段階でも歓迎です。
              </>
            }
          >
            まず話を聞く
          </SectionHeading>

          {submitStatus === "success" ? (
            <div className={p.partnerSuccessBox} role="status" aria-live="polite">
              <div className={p.partnerSuccessIcon} aria-hidden="true">
                ✓
              </div>
              <h2 className={p.partnerSuccessH2}>受け付けました</h2>
              <p className={s.body}>
                ご応募ありがとうございます。<br />
                翌営業日中にご入力いただいたメールアドレス宛にご連絡させていただきます。
              </p>
            </div>
          ) : (
            <form className={p.partnerEntryForm} onSubmit={handleSubmit} noValidate>
              <AgentNotice />
              <HoneypotField inputRef={honeypotRef} />
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
                    <span className={p.partnerOptional}>（任意）</span>
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

                {/* 稼働可能時間 */}
                <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                  <label className={p.partnerLabel} htmlFor="partner-avail-hours">
                    稼働可能時間 <span className={p.partnerRequired}>必須</span>
                  </label>
                  <select
                    id="partner-avail-hours"
                    name="availHours"
                    className={p.partnerSelect}
                    value={form.availHours}
                    onChange={handleTextChange}
                  >
                    <option value="">選択してください</option>
                    {availHoursOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.availHours && <p className={p.partnerErrorMsg}>{errors.availHours}</p>}
                </div>

                <hr className={p.partnerFormDivider} />

                {/* スキル・経験 */}
                <div className={`${p.partnerFieldWrap} ${p.partnerFieldFull}`}>
                  <label className={p.partnerLabel} htmlFor="partner-skills">
                    スキル・経験の概要
                    <span className={p.partnerOptional}>（任意）</span>
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
                    <span className={p.partnerOptional}>（任意）</span>
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
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className={s.textLink}>プライバシーポリシー</a>および
                    <a href="/personal-info" target="_blank" rel="noopener noreferrer" className={s.textLink}>個人情報の取り扱いについて</a>
                    に同意する
                  </span>
                </label>
                {errors.privacy && <p className={`${p.partnerErrorMsg} ${p.partnerFieldFull}`}>{errors.privacy}</p>}

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
    </SubPage>
  );
}
