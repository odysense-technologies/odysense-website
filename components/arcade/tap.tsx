"use client";

import { useEffect, useRef, useState } from "react";
import { Leaderboard } from "./shared";
import type { Locale } from "@/lib/i18n";
import { ARC_TEXT } from "./text";

const DURATION = 10;
const DEMO_SCORES = [
  ["044", 78],
  ["213", 71],
  ["109", 64],
  ["076", 55],
  ["158", 47],
] as const;

export default function Tap({ locale = "en" }: { locale?: Locale }) {
  const all = ARC_TEXT[locale];
  const t = all.tap;
  const DEMO_PLAYERS = DEMO_SCORES.map(([n, score]) => ({ name: all.guest(n), score }));
  const [phase, setPhase] = useState<"ready" | "go" | "done">("ready");
  const [taps, setTaps] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [best, setBest] = useState(0);
  const [pop, setPop] = useState(0);
  const endsAt = useRef(0);

  useEffect(() => {
    if (phase !== "go") return;
    const t = setInterval(() => {
      const remaining = Math.max(0, (endsAt.current - Date.now()) / 1000);
      setLeft(remaining);
      if (remaining <= 0) setPhase("done");
    }, 50);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") setBest((b) => Math.max(b, taps));
  }, [phase, taps]);

  const hit = () => {
    if (phase === "done") return;
    if (phase === "ready") {
      endsAt.current = Date.now() + DURATION * 1000;
      setPhase("go");
    }
    setTaps((n) => n + 1);
    setPop((p) => p + 1);
  };

  const reset = () => {
    setTaps(0);
    setLeft(DURATION);
    setPhase("ready");
  };

  return (
    <div className="arc-game arc-split">
      <div className="arc-tap-col">
        <div className="arc-quiz-top">
          <span className="mono arc-muted">{left.toFixed(1)}s</span>
          <span className="mono arc-muted">{t.taps(taps)}</span>
        </div>
        <button
          type="button"
          className={`arc-tap ${phase}`}
          onPointerDown={(e) => {
            e.preventDefault();
            hit();
          }}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              hit();
            }
          }}
          disabled={phase === "done"}
          aria-label={phase === "ready" ? t.startAria : t.tapAria}
        >
          <span key={pop} className="arc-tap-ring" aria-hidden="true" />
          <b>{phase === "ready" ? t.tap : taps}</b>
          <small>{phase === "ready" ? t.toStart : phase === "go" ? t.going : t.time}</small>
        </button>
        <p className="arc-sub arc-center-text">{t.how(DURATION)}</p>
      </div>
      <div>
        {phase === "done" ? (
          <>
            <h3 className="arc-title" aria-live="polite">
              {t.resultA(taps)} <span className="serif">{t.resultB(DURATION)}</span>
            </h3>
            <p className="arc-sub">{t.best(best)}</p>
            <button className="btn btn-invert" type="button" onClick={reset} style={{ marginBottom: 20 }}>
              {t.again}
            </button>
          </>
        ) : (
          <h3 className="arc-title">
            {t.title} <span className="serif">{t.accent}</span>
          </h3>
        )}
        <Leaderboard rows={DEMO_PLAYERS} unit={t.unit} you={phase === "done" ? { name: all.you, score: taps } : undefined} locale={locale} />
      </div>
    </div>
  );
}
