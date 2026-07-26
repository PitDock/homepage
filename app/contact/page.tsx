"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import s from "../page.module.css";
import cs from "./contact.module.css";

type FormData = {
  company: string;
  name: string;
  email: string;
  content: string;
  date1Date: string; date1Start: string; date1End: string;
  date2Date: string; date2Start: string; date2End: string;
  date3Date: string; date3Start: string; date3End: string;
  date4Date: string; date4Start: string; date4End: string;
  date5Date: string; date5Start: string; date5End: string;
};

const initialForm: FormData = {
  company: "", name: "", email: "", content: "",
  date1Date: "", date1Start: "", date1End: "",
  date2Date: "", date2Start: "", date2End: "",
  date3Date: "", date3Start: "", date3End: "",
  date4Date: "", date4Start: "", date4End: "",
  date5Date: "", date5Start: "", date5End: "",
};

const dateFields = [
  { prefix: "date1", label: "第1希望" },
  { prefix: "date2", label: "第2希望" },
  { prefix: "date3", label: "第3希望" },
  { prefix: "date4", label: "第4希望" },
  { prefix: "date5", label: "第5希望" },
] as const;

const MINUTES = ["00", "15", "30", "45"];
const HOURS = Array.from({ length: 13 }, (_, i) => String(i + 9).padStart(2, "0"));

type TimeSelectProps = {
  name: string;
  value: string;
  error: boolean;
  onTimeChange: (name: string, value: string) => void;
};

function TimeSelect({ name, value, error, onTimeChange }: TimeSelectProps) {
  const [hour, minute] = value ? value.split(":") : ["", ""];
  const [h, setH] = useState(hour ?? "");
  const [m, setM] = useState(minute ?? "");

  useEffect(() => {
    setH(hour ?? "");
    setM(minute ?? "");
  }, [hour, minute]);

  const update = (hour: string, min: string) =>
    onTimeChange(name, hour && min ? `${hour}:${min}` : "");
  return (
    <div className={cs.timeSelectWrap}>
      <select
        className={`${cs.timeSelect} ${error ? cs.inputError : ""}`}
        value={h}
        onChange={(e) => {
          const nextHour = e.target.value;
          setH(nextHour);
          update(nextHour, m);
        }}
      >
        <option value="">--</option>
        {HOURS.map((hh) => <option key={hh} value={hh}>{hh}</option>)}
      </select>
      <span className={cs.timeSelectColon}>:</span>
      <select
        className={`${cs.timeSelect} ${error ? cs.inputError : ""}`}
        value={m}
        onChange={(e) => {
          const nextMinute = e.target.value;
          setM(nextMinute);
          update(h, nextMinute);
        }}
      >
        <option value="">--</option>
        {MINUTES.map((mm) => <option key={mm} value={mm}>{mm}</option>)}
      </select>
    </div>
  );
}

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function ContactPage() {
  const minDate = getTomorrowDate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submittedForm, setSubmittedForm] = useState<FormData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateSlot = (prefix: string): string | undefined => {
    const d = form[`${prefix}Date` as keyof FormData];
    const start = form[`${prefix}Start` as keyof FormData];
    const end = form[`${prefix}End` as keyof FormData];
    if (!d && !start && !end) return undefined;
    if (!d) return "日付を入力してください";
    if (!start) return "開始時刻を入力してください";
    if (!end) return "終了時刻を入力してください";
    if (start >= end) return "終了時刻は開始時刻より後にしてください";
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    if (endTotalMinutes - startTotalMinutes < 30) {
      return "希望日時は30分以上の幅で入力してください";
    }
    return undefined;
  };

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!form.company.trim()) e.company = "必須項目です";
    if (!form.name.trim()) e.name = "必須項目です";
    if (!form.email.trim()) {
      e.email = "必須項目です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "メールアドレスの形式が正しくありません";
    }
    if (!form.content.trim()) e.content = "必須項目です";
    for (const { prefix } of dateFields) {
      const slotErr = validateSlot(prefix);
      if (slotErr) e[prefix] = slotErr;
    }
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const slotMatch = name.match(/^(date[1-5])(Date|Start|End)$/);
    if (slotMatch) {
      setErrors((prev) => ({ ...prev, [slotMatch[1]]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTimeChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    const slotMatch = name.match(/^(date[1-5])(Start|End)$/);
    if (slotMatch) setErrors((prev) => ({ ...prev, [slotMatch[1]]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).filter((k) => errs[k]).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmittedForm(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

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
              <li><span aria-current="page">無料相談のご予約</span></li>
            </ol>
          </nav>
          <h1 className={s.pageH1}>無料相談のご予約</h1>
          <p className={s.pageSubCopy}>
            DX推進・AI活用・システム開発など、どんな段階のご相談も歓迎です。{"\n"}
            まずはお気軽にご予約ください。初回相談は無料です。{"\n"}{"\n"}
            ※本フォームからの営業は受け付けておりません。
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className={s.section}>
        <div className="container">
          {status === "success" ? (
            <div className={cs.successBox}>
              <div className={cs.successIcon} aria-hidden="true">✓</div>
              <h2 className={cs.successH2}>ご予約を受け付けました</h2>
              <p className={cs.successText}>
                無料相談のご予約ありがとうございます。<br />
                翌営業日中にはご入力いただいたメールアドレス宛にご連絡させていただきます。
              </p>
              {submittedForm && (
                <div className={`${cs.dateSection} ${cs.submittedSection}`}>
                  <h3 className={`${cs.dateSectionTitle} ${cs.submittedTitle}`}>送信内容</h3>
                  <div className={cs.submittedTable}>
                    <div className={cs.submittedRow}>
                      <p className={cs.submittedLabel}>会社名 / 部署・役職名</p>
                      <p className={cs.submittedValue}>{submittedForm.company}</p>
                    </div>
                    <div className={cs.submittedRow}>
                      <p className={cs.submittedLabel}>お名前</p>
                      <p className={cs.submittedValue}>{submittedForm.name}</p>
                    </div>
                    <div className={cs.submittedRow}>
                      <p className={cs.submittedLabel}>メールアドレス</p>
                      <p className={cs.submittedValue}>{submittedForm.email}</p>
                    </div>
                    <div className={cs.submittedRow}>
                      <p className={cs.submittedLabel}>ご相談内容</p>
                      <p className={cs.submittedValue}>{submittedForm.content}</p>
                    </div>
                  </div>
                  <div className={`${cs.dateSlotList} ${cs.submittedDateList}`}>
                    {dateFields.map(({ prefix, label }) => {
                      const dateKey = `${prefix}Date` as keyof FormData;
                      const startKey = `${prefix}Start` as keyof FormData;
                      const endKey = `${prefix}End` as keyof FormData;
                      const date = submittedForm[dateKey];
                      const start = submittedForm[startKey];
                      const end = submittedForm[endKey];
                      if (!date && !start && !end) return null;
                      return (
                        <div key={prefix} className={cs.submittedRow}>
                          <p className={cs.submittedLabel}>{label}</p>
                          <p className={cs.submittedValue}>
                            {date} {start} 〜 {end}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <a href="/" className={`${s.btnGhost} ${cs.successBackBtn}`}>トップページに戻る</a>
            </div>
          ) : (
            <form className={`${cs.form} ${s.reveal}`} onSubmit={handleSubmit} noValidate>
              <div className={cs.formGrid}>
                {/* 会社名/部署・役職名 */}
                <div className={cs.fieldWrap}>
                  <label className={cs.label} htmlFor="company">
                    会社名 / 部署・役職名 <span className={cs.required}>必須</span>
                  </label>
                  <input
                    id="company" name="company" type="text"
                    className={`${cs.input} ${errors.company ? cs.inputError : ""}`}
                    placeholder="株式会社〇〇 / 営業部 部長"
                    value={form.company}
                    onChange={handleChange}
                  />
                  {errors.company && <p className={cs.errorMsg}>{errors.company}</p>}
                </div>

                {/* 氏名 */}
                <div className={cs.fieldWrap}>
                  <label className={cs.label} htmlFor="name">
                    お名前 <span className={cs.required}>必須</span>
                  </label>
                  <input
                    id="name" name="name" type="text"
                    className={`${cs.input} ${errors.name ? cs.inputError : ""}`}
                    placeholder="山田 太郎"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className={cs.errorMsg}>{errors.name}</p>}
                </div>

                {/* メールアドレス */}
                <div className={`${cs.fieldWrap} ${cs.fullWidth}`}>
                  <label className={cs.label} htmlFor="email">
                    メールアドレス <span className={cs.required}>必須</span>
                  </label>
                  <input
                    id="email" name="email" type="email"
                    className={`${cs.input} ${errors.email ? cs.inputError : ""}`}
                    placeholder="taro.yamada@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className={cs.errorMsg}>{errors.email}</p>}
                </div>

                {/* 相談内容 */}
                <div className={`${cs.fieldWrap} ${cs.fullWidth}`}>
                  <label className={cs.label} htmlFor="content">
                    ご相談内容 <span className={cs.required}>必須</span>
                  </label>
                  <textarea
                    id="content" name="content"
                    className={`${cs.textarea} ${errors.content ? cs.inputError : ""}`}
                    placeholder="例：DXを推進したいが何から始めればよいかわからない。"
                    value={form.content}
                    onChange={handleChange}
                    rows={5}
                  />
                  {errors.content && <p className={cs.errorMsg}>{errors.content}</p>}
                </div>
              </div>

              {/* 希望日時 */}
              <div className={cs.dateSection}>
                <h3 className={cs.dateSectionTitle}>ご希望日時</h3>
                <div className={cs.dateSlotList}>
                  {dateFields.map(({ prefix, label }) => {
                    const dateKey = `${prefix}Date` as keyof FormData;
                    const startKey = `${prefix}Start` as keyof FormData;
                    const endKey = `${prefix}End` as keyof FormData;
                    const error = errors[prefix];
                    return (
                      <div key={prefix} className={cs.dateSlot}>
                        <div className={cs.dateSlotMeta}>
                          <span className={cs.dateSlotLabel}>{label}</span>
                        </div>
                        <div className={cs.dateSlotRight}>
                          <div className={cs.dateSlotInputs}>
                            <input
                              name={dateKey}
                              type="date"
                              min={minDate}
                              className={`${cs.input} ${cs.dateInput} ${error ? cs.inputError : ""}`}
                              value={form[dateKey]}
                              onChange={handleChange}
                            />
                            <TimeSelect
                              name={startKey}
                              value={form[startKey]}
                              error={!!error}
                              onTimeChange={handleTimeChange}
                            />
                            <span className={cs.dateSlotSep}>〜</span>
                            <TimeSelect
                              name={endKey}
                              value={form[endKey]}
                              error={!!error}
                              onTimeChange={handleTimeChange}
                            />
                          </div>
                          {error && <p className={cs.errorMsg}>{error}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {status === "error" && (
                <p className={cs.submitError}>
                  送信に失敗しました。しばらくしてから再度お試しください。
                </p>
              )}

              <div className={cs.submitRow}>
                <button
                  type="submit"
                  className={`${cs.submitBtn} ${status === "loading" ? cs.loading : ""}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "送信中..." : "予約を送信する →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
