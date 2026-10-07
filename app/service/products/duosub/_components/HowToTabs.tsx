"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import s from "../page.module.css";

export type HowToTab = {
  key: string;
  label: string;
  content: ReactNode;
};

export function HowToTabs({ tabs }: { tabs: HowToTab[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(active === last ? 0 : active + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(active === 0 ? last : active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(last);
        break;
    }
  };

  return (
    <div>
      <div className={s.tabList} role="tablist" aria-label="使い方の種類">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.key}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${tab.key}`}
            tabIndex={active === i ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.key}
          role="tabpanel"
          id={`${baseId}-panel-${tab.key}`}
          aria-labelledby={`${baseId}-tab-${tab.key}`}
          tabIndex={0}
          hidden={active !== i}
          className={s.tabPanel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
