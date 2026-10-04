"use client";
import { useId, useState } from "react";
import { FAQ_GROUPS } from "../../lib/seo/faqs";
import styles from "./FaqAccordion.module.css";

export type FaqItemData = { q: string; a: string };
export type FaqGroupData = { label: string; faqs: readonly FaqItemData[] };

type Props = {
  /** 表示するFAQ群。未指定時はサイト共通の FAQ_GROUPS を使う */
  groups?: readonly FaqGroupData[];
  /** カテゴリタブを表示するか。単一グループのページでは false にする */
  showTabs?: boolean;
};

export default function FaqAccordion({ groups = FAQ_GROUPS, showTabs = true }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpen(null);
  };

  const safeTab = Math.min(activeTab, groups.length - 1);
  const currentGroup = groups[safeTab];
  const currentFaqs = currentGroup ? currentGroup.faqs : [];
  const tabbed = showTabs && groups.length > 1;

  return (
    <div>
      {tabbed && (
        <div className={styles.tabList} role="tablist">
          {groups.map((group, i) => (
            <button
              key={group.label}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={safeTab === i}
              aria-controls={`${uid}-panel-${i}`}
              className={`${styles.tab} ${safeTab === i ? styles.tabActive : ""}`}
              onClick={() => handleTabChange(i)}
            >
              {group.label}
            </button>
          ))}
        </div>
      )}

      <div
        role={tabbed ? "tabpanel" : undefined}
        id={tabbed ? `${uid}-panel-${safeTab}` : undefined}
        aria-labelledby={tabbed ? `${uid}-tab-${safeTab}` : undefined}
      >
        <dl>
          {currentFaqs.map((faq, i) => (
            <div className={styles.item} key={faq.q}>
              <dt>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`${uid}-answer-${i}`}
                >
                  {faq.q}
                  <span className={styles.toggle} aria-hidden="true">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd id={`${uid}-answer-${i}`} className={styles.answer}>
                  {faq.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
