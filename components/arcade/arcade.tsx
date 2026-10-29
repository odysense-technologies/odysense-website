"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";
import { ARC_TEXT } from "./text";

/**
 * "Arcade" panel of playable demos for the gamification page.
 * Each game is code-split and only loaded when its tab is first opened.
 * Everything is simulated in the browser: no backend, no storage, no data collected.
 */
// The loading placeholder gets no props from next/dynamic, so the language reaches it through context
const LocaleCtx = createContext<Locale>("en");
const Loading = () => (
  <div className="arc-game arc-center arc-loading">
    {ARC_TEXT[useContext(LocaleCtx)].loading}
  </div>
);

const GAMES = [
  {
    id: "wheel",
    C: dynamic(() => import("./spin-wheel"), { ssr: false, loading: Loading }),
  },
  {
    id: "quiz",
    C: dynamic(() => import("./quiz"), { ssr: false, loading: Loading }),
  },
  {
    id: "memory",
    C: dynamic(() => import("./memory"), { ssr: false, loading: Loading }),
  },
  {
    id: "tap",
    C: dynamic(() => import("./tap"), { ssr: false, loading: Loading }),
  },
  {
    id: "poll",
    C: dynamic(() => import("./poll"), { ssr: false, loading: Loading }),
  },
];

export function Arcade({ locale = "en" }: { locale?: Locale }) {
  const t = ARC_TEXT[locale];
  const rtl = locale === "ar";
  const [active, setActive] = useState(0);
  // Keep opened games mounted so scores survive switching tabs (session-only)
  const [opened, setOpened] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    setOpened((o) => (o.has(i) ? o : new Set(o).add(i)));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    // In right-to-left layouts the next tab sits to the left
    const fwd = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const dir = e.key === fwd ? 1 : e.key === back ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (active + dir + GAMES.length) % GAMES.length;
    select(n);
    tabs.current[n]?.focus();
  };

  return (
    <LocaleCtx.Provider value={locale}>
      <div className="arcade">
        <div className="orb orb--cta" aria-hidden="true" />
        <div className="arc-head">
          <div
            className="arc-tabs"
            role="tablist"
            aria-label={t.tabsAria}
            onKeyDown={onKey}
          >
            {GAMES.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`arc-tab-${g.id}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`arc-panel-${g.id}`}
                tabIndex={active === i ? 0 : -1}
                className={active === i ? "on" : ""}
                onClick={() => select(i)}
              >
                <span className="arc-tab-num">
                  {["i.", "ii.", "iii.", "iv.", "v."][i]}
                </span>
                {t.tabs[i]}
              </button>
            ))}
          </div>
          <span className="arc-demo-badge">{t.badge}</span>
        </div>
        {GAMES.map((g, i) => (
          <div
            key={g.id}
            id={`arc-panel-${g.id}`}
            role="tabpanel"
            aria-labelledby={`arc-tab-${g.id}`}
            hidden={active !== i}
            className="arc-panel"
          >
            {opened.has(i) && <g.C locale={locale} />}
          </div>
        ))}
        <p className="arc-note">{t.note}</p>
      </div>
    </LocaleCtx.Provider>
  );
}
