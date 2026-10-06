"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";

/**
 * "Arcade" panel of playable demos for the gamification page.
 * Each game is code-split and only loaded when its tab is first opened.
 * Everything is simulated in the browser: no backend, no storage, no data collected.
 */
const Loading = () => <div className="arc-game arc-center arc-loading">Loading demo…</div>;

const GAMES = [
  { id: "wheel", label: "Spin the Wheel", C: dynamic(() => import("./spin-wheel"), { ssr: false, loading: Loading }) },
  { id: "quiz", label: "Live Quiz", C: dynamic(() => import("./quiz"), { ssr: false, loading: Loading }) },
  { id: "memory", label: "Memory Match", C: dynamic(() => import("./memory"), { ssr: false, loading: Loading }) },
  { id: "tap", label: "Tap Challenge", C: dynamic(() => import("./tap"), { ssr: false, loading: Loading }) },
  { id: "poll", label: "Live Poll", C: dynamic(() => import("./poll"), { ssr: false, loading: Loading }) },
];

export function Arcade() {
  const [active, setActive] = useState(0);
  // Keep opened games mounted so scores survive switching tabs (session-only)
  const [opened, setOpened] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    setOpened((o) => (o.has(i) ? o : new Set(o).add(i)));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (active + dir + GAMES.length) % GAMES.length;
    select(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="arcade">
      <div className="orb orb--cta" aria-hidden="true" />
      <div className="arc-head">
        <div className="arc-tabs" role="tablist" aria-label="Demo games" onKeyDown={onKey}>
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
              <span className="arc-tab-num">{["i.", "ii.", "iii.", "iv.", "v."][i]}</span>
              {g.label}
            </button>
          ))}
        </div>
        <span className="arc-demo-badge">Demo</span>
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
          {opened.has(i) && <g.C />}
        </div>
      ))}
      <p className="arc-note">
        Demo only: leaderboards and audiences are simulated, nothing is saved, and no data leaves your browser.
      </p>
    </div>
  );
}
