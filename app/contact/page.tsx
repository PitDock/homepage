"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";
import { CONTACT_FAQS } from "../../lib/seo/faqs";
import s from "../page.module.css";
import cs from "./contact.module.css";

/* =========================================================
   インラインSVGアイコン（線画・1.5px stroke・currentColor）
   外部ライブラリは追加しない
   ========================================================= */

type IconProps = { className?: string };

type SvgBaseProps = {
  viewBox: string;
  fill: "none";
  stroke: "currentColor";
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
  "aria-hidden": true;
  focusable: "false";
};

const svgBase: SvgBaseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

/** 相談無料（円＋斜線＝費用なし） */
function IconNoCost({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
    </svg>
  );
}

/** 所要30分 */
function IconClock({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

/** オンライン（全国対応） */
function IconMonitor({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

/** 平日夜間・土日祝も対応 */
function IconMoon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M20 14.6A8.6 8.6 0 0 1 9.4 4 8.6 8.6 0 1 0 20 14.6Z" />
    </svg>
  );
}

/** 資料の準備は不要（書類＋斜線） */
function IconDocumentOff({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 3 14 8 19 8" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  );
}

/** 相談例（吹き出し） */
function IconChat({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M20.5 11.6a7.9 7.9 0 0 1-8.5 7.9 9 9 0 0 1-2.6-.4L4.5 20.5l1.4-3.8a7.7 7.7 0 0 1-1.4-4.4 7.9 7.9 0 0 1 8.5-7.8 7.9 7.9 0 0 1 7.5 7.1Z" />
    </svg>
  );
}

/** 売り込みはしません（メガホン＋斜線） */
function IconMegaphoneOff({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M5 9.5h3l8-4.5v14l-8-4.5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z" />
      <path d="M8 14.5V19h3" />
      <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" />
    </svg>
  );
}

/** その場で契約を迫りません（署名ペン＋斜線） */
function IconPenOff({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M15.6 4.6 19.4 8.4 9 18.8l-4.6 1.3 1.3-4.6Z" />
      <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" />
    </svg>
  );
}

/** 資料の準備をお願いしません（フォルダ＋斜線） */
function IconFolderOff({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M3 7.5a2 2 0 0 1 2-2h3.8l2 2H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" />
    </svg>
  );
}

/** チェック */
function IconCheck({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className} strokeWidth={2.4}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** エラー */
function IconAlert({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7.5" x2="12" y2="13" />
      <line x1="12" y1="16.5" x2="12" y2="16.5" />
    </svg>
  );
}

/** 開閉シェブロン */
function IconChevronDown({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <polyline points="6 9.5 12 15.5 18 9.5" />
    </svg>
  );
}

/* =========================================================
   コンテンツ定数
   ========================================================= */

/** Resend による自動返信メールの実装が完了したら true にする（フェーズ3） */
const AUTO_REPLY_ENABLED = false;

const TRUST_BADGES = [
  { label: "相談無料", Icon: IconNoCost },
  { label: "所要30分", Icon: IconClock },
  { label: "オンライン（全国対応）", Icon: IconMonitor },
  { label: "平日夜間・土日祝も対応", Icon: IconMoon },
] as const;

const THEME_EXAMPLES = [
  "DXを進めたいが、何から手をつければいいか分からない",
  "生成AIを使いたいが、自社のどの業務に使えるか判断できない",
  "システム開発を外注したいが、要件がまだ固まっていない",
  "すでに他社に依頼しているが、進め方に不安がありセカンドオピニオンがほしい",
  "おおよその費用感・期間感だけ先に知っておきたい",
  "社内に技術判断ができる人がいない。相談相手がほしい",
  "今使っているシステムが古く、作り直すべきか使い続けるべきか判断できない",
  "今すぐ発注する予定はないが、情報収集として話を聞きたい",
] as const;

const PROMISES = [
  {
    title: "売り込みはしません",
    body: "サービスの説明から始めることはしません。最初の30分は、お客様の状況をお聞きすることに使います。PitDockが力になれない内容であれば、正直にそうお伝えします。",
    Icon: IconMegaphoneOff,
  },
  {
    title: "その場で契約を迫りません",
    body: "面談中に見積書をお出しして判断を求めることはありません。ご提案やお見積りは、ご希望があった場合に後日お送りします。",
    Icon: IconPenOff,
  },
  {
    title: "資料の準備をお願いしません",
    body: "事前に整理された資料や要件定義書は不要です。口頭でのご説明だけで構いません。むしろ、整理されていない状態から一緒に考えるのがPitDockの仕事です。",
    Icon: IconFolderOff,
  },
] as const;

const TAKEAWAYS = [
  {
    num: "01",
    title: "課題の輪郭",
    body: "漠然としている悩みを、「何が本当の問題か」という形に整理してお返しします。",
  },
  {
    num: "02",
    title: "打ち手の選択肢",
    body: "業務の見直し・ツール導入・AI活用・システム開発など、取りうる選択肢と、それぞれの向き不向きをお伝えします。",
  },
  {
    num: "03",
    title: "進める順番",
    body: "「まず何から着手すべきか」の優先順位をお伝えします。PitDockに依頼せずに自社で進められる部分があれば、その方法もお伝えします。",
  },
  {
    num: "04",
    title: "費用と期間の目安",
    body: "ご希望があれば、想定される規模感・期間・費用のレンジをその場で口頭でお伝えします。",
  },
] as const;

const TIMELINE = [
  { time: "0〜5分", body: "ご挨拶と、本日お聞きしたいことの確認" },
  { time: "5〜20分", body: "現在の状況・お困りごとのヒアリング" },
  { time: "20〜30分", body: "論点の整理と、進め方のご提案" },
] as const;

const THEME_OPTIONS = [
  { value: "DX推進・業務改善" },
  { value: "AI・生成AIの活用（AX）" },
  { value: "システム・アプリ開発" },
  { value: "技術顧問（外部CTO）" },
  { value: "まだ決まっていない・まとめて相談したい", emphasis: true },
  { value: "その他" },
] as const;

/* =========================================================
   フォーム
   ========================================================= */

type FormState = {
  name: string;
  email: string;
  categories: string[];
  content: string;
  company: string;
  preferredDate: string;
  privacy: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  categories: [],
  content: "",
  company: "",
  preferredDate: "",
  privacy: false,
};

type TextField = "name" | "email" | "content" | "company" | "preferredDate";

type FormErrors = Partial<Record<"name" | "email" | "categories" | "privacy", string>>;

/** 送信時にフォーカスを移す優先順位 */
const ERROR_FOCUS_ORDER = ["name", "email", "categories", "privacy"] as const;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submittedForm, setSubmittedForm] = useState<FormState | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const successRef = useRef<HTMLDivElement | null>(null);
  const heroSentinelRef = useRef<HTMLDivElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const [passedHero, setPassedHero] = useState(false);
  const [formInView, setFormInView] = useState(false);

  /* スクロールリビール（既存の仕組みを踏襲） */
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

  /* 追従CTAの表示判定（スクロール量ではなくセンチネル方式） */
  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPassedHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const formEl = formSectionRef.current;
    if (!formEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, [status]);

  const validateField = (field: keyof FormErrors, state: FormState): string | undefined => {
    switch (field) {
      case "name":
        return state.name.trim() ? undefined : "お名前をご入力ください";
      case "email":
        if (!state.email.trim()) return "メールアドレスをご入力ください";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
          ? undefined
          : "メールアドレスの形式をご確認ください";
      case "categories":
        return state.categories.length > 0
          ? undefined
          : "あてはまるものを1つ以上お選びください";
      case "privacy":
        return state.privacy ? undefined : "プライバシーポリシーへの同意が必要です";
      default:
        return undefined;
    }
  };

  const validateAll = (state: FormState): FormErrors => {
    const next: FormErrors = {};
    (["name", "email", "categories", "privacy"] as const).forEach((field) => {
      const message = validateField(field, state);
      if (message) next[field] = message;
    });
    return next;
  };

  /** 一度エラーになった項目のみ、以後の入力で即時再検証する */
  const revalidate = (field: keyof FormErrors, state: FormState) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const message = validateField(field, state);
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as TextField;
    const next: FormState = { ...form };
    next[field] = e.target.value;
    setForm(next);
    if (field === "name" || field === "email") revalidate(field, next);
  };

  const handleCategoryToggle = (value: string) => {
    const next: FormState = {
      ...form,
      categories: form.categories.includes(value)
        ? form.categories.filter((v) => v !== value)
        : [...form.categories, value],
    };
    setForm(next);
    revalidate("categories", next);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next: FormState = { ...form, privacy: e.target.checked };
    setForm(next);
    revalidate("privacy", next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateAll(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = ERROR_FOCUS_ORDER.find((field) => nextErrors[field]);
      if (firstField) {
        const target = fieldRefs.current[firstField];
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ block: "center" });
      }
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmittedForm(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  /* 完了ブロックへプログラム的にフォーカスを移す */
  useEffect(() => {
    if (status !== "success") return;
    const el = successRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [status]);

  const successSteps = [
    ...(AUTO_REPLY_ENABLED ? ["数分以内に、確認の自動返信メールをお送りします"] : []),
    "メールが届かない場合は、迷惑メールフォルダをご確認ください",
    "当日までにご準備いただくものはありません",
    "ご予定が変わった場合は、返信メールにそのままご返信ください",
  ];

  const stickyCtaVisible = passedHero && !formInView && status !== "success";

  return (
    <>
      <Nav />

      {/* ============ 【1】Page Hero ============ */}
      <section className={`${s.pageHero} ${cs.contactHero}`}>
        <div className="container">
          <nav className={s.breadcrumb} aria-label="パンくず">
            <ol>
              <li>
                <a href="/">ホーム</a>
              </li>
              <li aria-hidden="true" className={s.breadcrumbSep}>
                /
              </li>
              <li>
                <span aria-current="page">無料相談</span>
              </li>
            </ol>
          </nav>

          <h1 className={s.pageH1}>「まだ何も決まっていない」から、どうぞ。</h1>

          <p className={s.pageSubCopy}>
            DX推進、AI活用、システム開発、技術顧問。{"\n"}
            どのテーマでも、「何から手をつけるべきか分からない」段階からのご相談を歓迎しています。
            {"\n"}
            {"\n"}
            資料の準備は不要です。今いちばん困っていることを、そのまま話してください。{"\n"}
            一緒に論点を整理するところからお手伝いします。
          </p>

          <ul className={cs.trustBadgeRow}>
            {TRUST_BADGES.map(({ label, Icon }) => (
              <li key={label} className={cs.trustBadge}>
                <Icon className={cs.trustBadgeIcon} />
                {label}
              </li>
            ))}
          </ul>

          <p className={cs.heroSla}>
            お申し込みから翌営業日（土日祝を除く）までに、担当者よりご返信します。
          </p>

          <div className={`${s.ctaRow} ${cs.heroCtaRow}`}>
            <a href="#form" className={`${s.btnPrimary} ${cs.heroCtaMain}`}>
              相談フォームへ進む <span aria-hidden="true">↓</span>
            </a>
            <a href="#flow" className={s.btnGhost}>
              相談の流れを見る
            </a>
          </div>

          <p className={cs.heroRiskReversal}>
            その場で契約を迫ることはありません。お見積りのご提示も、ご希望があった場合のみです。
          </p>
        </div>
      </section>

      {/* 追従CTAの表示判定用センチネル */}
      <div ref={heroSentinelRef} aria-hidden="true" />

      {/* ============ 【2】こんなことでもご相談ください ============ */}
      <section id="themes" className={`${cs.sectionCompact} ${cs.anchorTarget}`}>
        <div className={`container ${s.reveal}`}>
          <h2 className={s.sectionTitle}>こんなことでも、ご相談ください。</h2>

          <ul className={cs.themeExampleGrid}>
            {THEME_EXAMPLES.map((example) => (
              <li key={example} className={cs.themeExampleCard}>
                <IconChat className={cs.themeExampleIcon} />
                <span>{example}</span>
              </li>
            ))}
          </ul>

          <p className={cs.themeClosing}>
            他社と比較検討中の方、情報収集の段階の方も歓迎しています。
            <br />
            「相談したから発注しなければいけない」ということは一切ありません。
          </p>
        </div>
      </section>

      {/* ============ 【3】無料相談でお約束すること ============ */}
      <section
        id="promise"
        className={`${cs.sectionCompact} ${cs.sectionAlt} ${cs.anchorTarget}`}
      >
        <div className={`container ${s.reveal}`}>
          <h2 className={s.sectionTitle}>無料相談で、PitDockがやらないこと。</h2>
          <p className={s.sectionSub}>
            PitDockの無料相談では、次の3つをお約束します。
          </p>

          <ul className={cs.promiseGrid}>
            {PROMISES.map(({ title, body, Icon }) => (
              <li key={title} className={cs.promiseCard}>
                <span className={cs.promiseIconBox}>
                  <Icon />
                </span>
                <h3 className={cs.promiseH3}>{title}</h3>
                <p className={cs.promiseBody}>{body}</p>
              </li>
            ))}
          </ul>

          <p className={cs.promiseNote}>
            ご相談の内容は外部に開示いたしません。ご希望があれば秘密保持契約（NDA）の締結にも対応します。
          </p>
        </div>
      </section>

      {/* ============ 【4】30分で持ち帰れるもの ============ */}
      <section id="takeaway" className={`${cs.sectionCompact} ${cs.anchorTarget}`}>
        <div className={`container ${s.reveal}`}>
          <h2 className={s.sectionTitle}>30分の相談で、持ち帰っていただけるもの。</h2>
          <p className={s.sectionSub}>
            限られた時間ですが、「話して終わり」にはしません。
            その場で以下までをお持ち帰りいただけるよう進行します。
          </p>

          <ul className={cs.takeawayGrid}>
            {TAKEAWAYS.map(({ num, title, body }) => (
              <li key={num} className={cs.takeawayCard}>
                <span className={cs.takeawayNum} aria-hidden="true">
                  {num}
                </span>
                <h3 className={cs.takeawayH3}>{title}</h3>
                <p className={cs.takeawayBody}>{body}</p>
              </li>
            ))}
          </ul>

          <div className={cs.timelineWrap}>
            <h3 className={cs.timelineTitle}>当日の進行（目安）</h3>
            <ol className={cs.timelineTrack}>
              {TIMELINE.map(({ time, body }) => (
                <li key={time} className={cs.timelineStep}>
                  <p className={cs.timelineTime}>{time}</p>
                  <p className={cs.timelineBody}>{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className={cs.presenterNote}>
            営業担当ではなく、コンサルタントが直接お話しします。
          </p>
        </div>
      </section>

      {/* ============ 【5】お申し込みから相談までの流れ ============ */}
      <section
        id="flow"
        className={`${cs.sectionCompact} ${cs.sectionAlt} ${cs.anchorTarget}`}
      >
        <div className={`container ${s.reveal}`}>
          <h2 className={s.sectionTitle}>お申し込みから相談までの流れ</h2>
          <p className={s.sectionSub}>
            お申し込みから相談当日、そしてその後までの流れをご説明します。
          </p>

          <ol className={cs.flowList}>
            <li className={cs.flowItem}>
              <span className={cs.flowNum} aria-hidden="true">
                01
              </span>
              <div className={cs.flowContent}>
                <h3 className={cs.flowH3}>フォームを送信（所要1分）</h3>
                <p className={cs.flowBody}>
                  必須はお名前・メールアドレス・ご相談テーマの3つだけです。日程のご希望は任意で、後からメールで調整することもできます。
                </p>
              </div>
            </li>

            <li className={cs.flowItem}>
              <span className={cs.flowNum} aria-hidden="true">
                02
              </span>
              <div className={cs.flowContent}>
                <h3 className={cs.flowH3}>翌営業日までにご返信・日程確定</h3>
                <p className={cs.flowBody}>
                  ご入力のメールアドレス宛に
                  <strong>翌営業日（土日祝を除く）までに</strong>
                  ご連絡し、日程を確定します。いただいた候補日で調整がつかない場合は、こちらから候補をご提案します。
                </p>
              </div>
            </li>

            <li className={cs.flowItem}>
              <span className={cs.flowNum} aria-hidden="true">
                03
              </span>
              <div className={cs.flowContent}>
                <h3 className={cs.flowH3}>オンラインで30分、お話します</h3>
                <p className={cs.flowBody}>
                  ご準備いただくものはありません。当日はカメラオフでも構いません。ご都合が悪くなった場合は、前日までにご連絡いただければ日程を変更します。
                </p>
              </div>
            </li>

            <li className={cs.flowItem}>
              <span className={cs.flowNum} aria-hidden="true">
                04
              </span>
              <div className={cs.flowContent}>
                <h3 className={cs.flowH3}>相談後</h3>
                <p className={cs.flowBody}>
                  ご希望があれば、後日ご提案・お見積りをお送りします。ご不要の場合はその旨をお伝えいただければ、こちらから追いかけのご連絡をすることはありません。
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ 【6】フォーム ============ */}
      <section
        id="form"
        ref={formSectionRef}
        className={`${cs.formSection} ${cs.anchorTarget}`}
      >
        <div className={cs.formSectionGlow} aria-hidden="true" />
        <div className={`container ${cs.formInner}`}>
          {status === "success" ? (
            <div
              className={cs.successBox}
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
            >
              <div className={cs.successIcon}>
                <IconCheck />
              </div>
              <h2 className={cs.successH2}>お申し込みありがとうございます。</h2>
              <p className={cs.successText}>
                翌営業日（土日祝を除く）までに、ご入力いただいたメールアドレス宛にご連絡し、
                <br />
                日程を確定させていただきます。
              </p>

              <ul className={cs.successSteps}>
                {successSteps.map((step) => (
                  <li key={step} className={cs.successStepItem}>
                    {step}
                  </li>
                ))}
              </ul>

              <p className={cs.successClosing}>お話しできるのを楽しみにしています。</p>

              <div className={cs.successActions}>
                <a href="/" className={s.btnPrimary}>
                  トップページに戻る
                </a>
              </div>

              {submittedForm && (
                <details className={cs.submittedDetails}>
                  <summary className={cs.submittedSummary}>
                    送信内容を確認する
                    <IconChevronDown className={cs.submittedSummaryIcon} />
                  </summary>
                  <div className={cs.submittedBody}>
                    <div className={cs.submittedTable}>
                      <div className={cs.submittedRow}>
                        <p className={cs.submittedLabel}>お名前</p>
                        <p className={cs.submittedValue}>{submittedForm.name}</p>
                      </div>
                      <div className={cs.submittedRow}>
                        <p className={cs.submittedLabel}>メールアドレス</p>
                        <p className={cs.submittedValue}>{submittedForm.email}</p>
                      </div>
                      <div className={cs.submittedRow}>
                        <p className={cs.submittedLabel}>ご相談のテーマ</p>
                        <p className={cs.submittedValue}>
                          {submittedForm.categories.join("、")}
                        </p>
                      </div>
                      {submittedForm.content.trim() && (
                        <div className={cs.submittedRow}>
                          <p className={cs.submittedLabel}>ご相談内容</p>
                          <p className={cs.submittedValue}>{submittedForm.content}</p>
                        </div>
                      )}
                      {submittedForm.company.trim() && (
                        <div className={cs.submittedRow}>
                          <p className={cs.submittedLabel}>会社名・屋号</p>
                          <p className={cs.submittedValue}>{submittedForm.company}</p>
                        </div>
                      )}
                      {submittedForm.preferredDate.trim() && (
                        <div className={cs.submittedRow}>
                          <p className={cs.submittedLabel}>ご希望の日時</p>
                          <p className={cs.submittedValue}>
                            {submittedForm.preferredDate}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
            </div>
          ) : (
            <>
              <h2 className={s.sectionTitle}>無料相談のお申し込み</h2>
              <p className={cs.formLead}>
                入力は1分ほどで完了します。必須はお名前・メールアドレス・ご相談テーマの
                <strong>3つだけ</strong>です。
                <br />
                詳しい内容は、当日お話しいただければ大丈夫です。
              </p>

              <form className={cs.form} onSubmit={handleSubmit} noValidate>
                <div className={cs.formGrid}>
                  {/* お名前 */}
                  <div className={cs.fieldWrap}>
                    <label className={cs.label} htmlFor="name">
                      お名前 <span className={cs.required}>必須</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`${cs.input} ${errors.name ? cs.inputError : ""}`}
                      placeholder="山田 太郎"
                      value={form.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      ref={(el) => {
                        fieldRefs.current.name = el;
                      }}
                    />
                    {errors.name && (
                      <p className={cs.errorMsg} id="name-error" role="alert">
                        <IconAlert className={cs.errorMsgIcon} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div className={cs.fieldWrap}>
                    <label className={cs.label} htmlFor="email">
                      メールアドレス <span className={cs.required}>必須</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`${cs.input} ${errors.email ? cs.inputError : ""}`}
                      placeholder="taro.yamada@example.com"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-help email-error" : "email-help"
                      }
                      ref={(el) => {
                        fieldRefs.current.email = el;
                      }}
                    />
                    <p className={cs.helpText} id="email-help">
                      ご返信はこちらのアドレスにお送りします。
                    </p>
                    {errors.email && (
                      <p className={cs.errorMsg} id="email-error" role="alert">
                        <IconAlert className={cs.errorMsgIcon} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* ご相談のテーマ */}
                  <fieldset
                    className={cs.themeFieldset}
                    aria-describedby={
                      errors.categories ? "themes-help themes-error" : "themes-help"
                    }
                  >
                    <legend className={cs.themeLegend}>
                      ご相談のテーマ（あてはまるものすべて）
                      <span className={cs.required}>必須</span>
                    </legend>
                    <div
                      className={cs.themeChipGroup}
                      data-invalid={errors.categories ? "true" : undefined}
                    >
                      {THEME_OPTIONS.map((option, index) => {
                        const checked = form.categories.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className={cs.themeChip}
                            data-checked={checked ? "true" : "false"}
                            data-emphasis={
                              "emphasis" in option && option.emphasis ? "true" : undefined
                            }
                          >
                            <input
                              type="checkbox"
                              className={cs.themeChipInput}
                              value={option.value}
                              checked={checked}
                              onChange={() => handleCategoryToggle(option.value)}
                              ref={
                                index === 0
                                  ? (el) => {
                                      fieldRefs.current.categories = el;
                                    }
                                  : undefined
                              }
                            />
                            <span className={cs.themeChipCheck} aria-hidden="true">
                              <IconCheck />
                            </span>
                            <span className={cs.themeChipLabel}>{option.value}</span>
                          </label>
                        );
                      })}
                    </div>
                    <p className={cs.helpText} id="themes-help">
                      選択肢にないテーマでもご相談いただけます。迷ったら「まだ決まっていない」で構いません。
                    </p>
                    {errors.categories && (
                      <p className={cs.errorMsg} id="themes-error" role="alert">
                        <IconAlert className={cs.errorMsgIcon} />
                        {errors.categories}
                      </p>
                    )}
                  </fieldset>

                  {/* ここから任意 */}
                  <hr className={cs.formDivider} />
                  <p className={cs.formDividerLabel}>ここから下はすべて任意です</p>

                  {/* ご相談内容 */}
                  <div className={`${cs.fieldWrap} ${cs.fullWidth}`}>
                    <label className={cs.label} htmlFor="content">
                      ご相談内容 <span className={cs.optional}>任意</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      className={cs.textarea}
                      rows={5}
                      maxLength={2000}
                      placeholder="例：紙とExcelの業務が多く、何から手をつけるべきか分からない。"
                      value={form.content}
                      onChange={handleChange}
                      aria-describedby="content-help"
                    />
                    <p className={cs.helpText} id="content-help">
                      1〜2行で構いません。空欄のままでも受け付けます。
                    </p>
                  </div>

                  {/* 会社名・屋号 */}
                  <div className={`${cs.fieldWrap} ${cs.fullWidth}`}>
                    <label className={cs.label} htmlFor="company">
                      会社名・屋号 <span className={cs.optional}>任意</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={cs.input}
                      placeholder="株式会社〇〇"
                      value={form.company}
                      onChange={handleChange}
                      aria-describedby="company-help"
                    />
                    <p className={cs.helpText} id="company-help">
                      個人事業主の方・創業準備中の方は空欄で構いません。
                    </p>
                  </div>

                  {/* ご希望の日時（フリーテキスト） */}
                  <div className={`${cs.fieldWrap} ${cs.fullWidth}`}>
                    <label className={cs.label} htmlFor="preferredDate">
                      ご希望の日時 <span className={cs.optional}>任意</span>
                    </label>
                    <textarea
                      id="preferredDate"
                      name="preferredDate"
                      className={cs.textarea}
                      rows={3}
                      maxLength={500}
                      placeholder="例：来週の火・水・木の午後ならいつでも"
                      value={form.preferredDate}
                      onChange={handleChange}
                      aria-describedby="preferredDate-help"
                    />
                    <p className={cs.helpText} id="preferredDate-help">
                      空欄でも構いません。その場合は、こちらから候補日をいくつかご提案します。
                      <br />
                      ほかの記入例：「平日の19時以降を希望」「来週木曜の 10:00〜13:00
                      の間」
                      <br />
                      <span className={cs.helpTextStrong}>
                        平日夜間・土日祝のご相談にも対応しています（9:00〜21:00）。
                      </span>
                    </p>
                  </div>

                  {/* プライバシーポリシー同意 */}
                  <label
                    className={`${cs.privacyCheck} ${
                      errors.privacy ? cs.privacyCheckError : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.privacy}
                      onChange={handlePrivacyChange}
                      aria-invalid={!!errors.privacy}
                      aria-describedby={errors.privacy ? "privacy-error" : undefined}
                      ref={(el) => {
                        fieldRefs.current.privacy = el;
                      }}
                    />
                    <span>
                      <a href="/privacy" target="_blank" rel="noopener noreferrer">
                        プライバシーポリシー
                      </a>
                      および
                      <a href="/personal-info" target="_blank" rel="noopener noreferrer">
                        個人情報の取り扱いについて
                      </a>
                      に同意する <span className={cs.required}>必須</span>
                    </span>
                  </label>
                  {errors.privacy && (
                    <div className={cs.privacyErrorRow}>
                      <p className={cs.errorMsg} id="privacy-error" role="alert">
                        <IconAlert className={cs.errorMsgIcon} />
                        {errors.privacy}
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <p className={cs.submitError} role="alert">
                      送信に失敗しました。しばらくしてから再度お試しください。
                    </p>
                  )}

                  <div className={cs.submitRow}>
                    <button
                      type="submit"
                      className={cs.submitBtn}
                      disabled={status === "loading"}
                      aria-busy={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <span className={cs.submitSpinner} aria-hidden="true" />
                          送信中…
                        </>
                      ) : (
                        "無料相談を申し込む（30分）"
                      )}
                    </button>

                    <div>
                      <p className={cs.submitNote}>
                        送信した時点で日程が確定することはありません。翌営業日までに、日程のご相談メールをお送りします。
                        <br />
                        ご相談は無料です。このフォームから費用が発生することはありません。
                      </p>
                      <p className={cs.submitNoteMuted}>
                        ※本フォームは、無料相談のお申し込み専用です。
                        <br />
                        営業・協業のご提案は、
                        <a
                          href="https://forms.gle/9EPiyGuYy5HdvDVZ8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cs.submitNoteLink}
                        >
                          お問い合わせフォーム
                        </a>
                        よりご連絡ください。
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ============ 【7】よくあるご質問 ============ */}
      <section
        id="faq"
        className={`${cs.sectionStd} ${cs.sectionAltTopOnly} ${cs.anchorTarget}`}
      >
        <div className={`container ${s.reveal}`}>
          <h2 className={s.sectionTitle}>無料相談について、よくあるご質問</h2>
          <p className={s.sectionSub}>
            ご相談の前に気になる点があれば、こちらをご確認ください。
          </p>
          <div className={cs.contactFaqWrap}>
            <FaqAccordion
              groups={[{ label: "無料相談について", faqs: CONTACT_FAQS }]}
              showTabs={false}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* モバイル限定のスクロール追従CTA */}
      <nav
        aria-label="フォームへのショートカット"
        className={`${cs.stickyCta} ${stickyCtaVisible ? cs.stickyCtaVisible : ""}`}
        aria-hidden={!stickyCtaVisible}
      >
        <a
          href="#form"
          className={cs.stickyCtaBtn}
          tabIndex={stickyCtaVisible ? undefined : -1}
        >
          相談フォームへ進む
        </a>
        <p className={cs.stickyCtaNote}>その場で契約を迫ることはありません。</p>
      </nav>
      <div className={cs.stickyCtaSpacer} aria-hidden="true" />
    </>
  );
}
