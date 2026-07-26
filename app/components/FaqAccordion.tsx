"use client";
import { useState } from "react";
import { FAQ_GROUPS } from "../../lib/seo/faqs";
import styles from "./FaqAccordion.module.css";

export default function FaqAccordion() {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpen(null);
  };

  const currentFaqs = FAQ_GROUPS[activeTab].faqs;

  return (
    <div>
      <div className={styles.tabList} role="tablist">
        {FAQ_GROUPS.map((group, i) => (
          <button
            key={group.label}
            role="tab"
            aria-selected={activeTab === i}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(i)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {currentFaqs.map((faq, i) => (
          <dl key={i}>
            <div className={styles.item}>
              <dt>
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {faq.q}
                  <span className={styles.toggle} aria-hidden="true">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
              </dt>
              {open === i && <dd className={styles.answer}>{faq.a}</dd>}
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
}
