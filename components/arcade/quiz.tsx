"use client";

import { useEffect, useRef, useState } from "react";
import { Leaderboard } from "./shared";
import type { Locale } from "@/lib/i18n";
import { ARC_TEXT } from "./text";

const SECONDS = 10;
const DEMO_SCORES = [
  ["214", 3900],
  ["087", 3350],
  ["152", 2700],
  ["031", 1950],
  ["120", 1200],
] as const;

type Phase = "intro" | "question" | "reveal" | "done";

export default function Quiz({ locale = "en" }: { locale?: Locale }) {
  const all = ARC_TEXT[locale];
  const t = all.quiz;
  const QUESTIONS = t.questions;
  const DEMO_PLAYERS = DEMO_SCORES.map(([n, score]) => ({ name: all.guest(n), score }));
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [best, setBest] = useState(0);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown while a question is open
  useEffect(() => {
    if (phase !== "question") return;
    tick.current = setInterval(() => setLeft((s) => Math.max(0, +(s - 0.1).toFixed(1))), 100);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [phase, idx]);

  // Time's up
  useEffect(() => {
    if (phase === "question" && left <= 0) setPhase("reveal");
  }, [left, phase]);

  const start = () => {
    setIdx(0);
    setScore(0);
    setCorrect(0);
    setPicked(null);
    setLeft(SECONDS);
    setPhase("question");
  };

  const choose = (i: number) => {
    if (phase !== "question") return;
    setPicked(i);
    if (i === QUESTIONS[idx].answer) {
      // Accuracy earns 500, speed earns up to 500 more
      setScore((s) => s + 500 + Math.round((left / SECONDS) * 500));
      setCorrect((c) => c + 1);
    }
    setPhase("reveal");
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) {
      setBest((b) => Math.max(b, score));
      setPhase("done");
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
    setLeft(SECONDS);
    setPhase("question");
  };

  if (phase === "intro") {
    return (
      <div className="arc-game arc-center">
        <h3 className="arc-title">
          {t.title} <span className="serif">{t.accent}</span>
        </h3>
        <p className="arc-sub">{t.intro}</p>
        <button className="btn btn-invert" type="button" onClick={start}>
          {t.start}
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="arc-game arc-split">
        <div>
          <span className="mono arc-muted">{t.results}</span>
          <h3 className="arc-title" aria-live="polite">
            {score.toLocaleString("en-US")} <span className="serif">{t.points}</span>
          </h3>
          <p className="arc-sub">{t.summary(correct, QUESTIONS.length, best.toLocaleString("en-US"))}</p>
          <button className="btn btn-invert" type="button" onClick={start}>
            {t.again}
          </button>
        </div>
        <Leaderboard rows={DEMO_PLAYERS} unit={t.pts} you={{ name: all.you, score }} locale={locale} />
      </div>
    );
  }

  const Q = QUESTIONS[idx];
  return (
    <div className="arc-game">
      <div className="arc-quiz-top">
        <span className="mono arc-muted">
          {t.question(idx + 1, QUESTIONS.length)}
        </span>
        <span className="mono arc-muted">
          {score.toLocaleString("en-US")} {t.pts}
        </span>
      </div>
      <div
        className="arc-timer"
        role="progressbar"
        aria-label={t.timeAria}
        aria-valuemin={0}
        aria-valuemax={SECONDS}
        aria-valuenow={Math.ceil(left)}
      >
        <span style={{ width: `${(left / SECONDS) * 100}%` }} />
      </div>
      <h3 className="arc-q">{Q.q}</h3>
      <div className="arc-options">
        {Q.options.map((o, i) => {
          const state =
            phase === "reveal" ? (i === Q.answer ? "right" : i === picked ? "wrong" : "dim") : "";
          return (
            <button key={o} type="button" className={`arc-opt ${state}`} onClick={() => choose(i)} disabled={phase === "reveal"}>
              <span className="arc-key">{String.fromCharCode(65 + i)}</span>
              {o}
            </button>
          );
        })}
      </div>
      <div className="arc-quiz-foot" aria-live="polite">
        {phase === "reveal" && (
          <>
            <span>
              {picked === null ? t.timeUp : picked === Q.answer ? t.correct : t.wrong}
            </span>
            <button className="btn btn-invert" type="button" onClick={next}>
              {idx + 1 >= QUESTIONS.length ? t.seeResults : t.next} {t.arrow}
            </button>
          </>
        )}
        {phase === "question" && <span className="arc-muted">{t.left(Math.ceil(left))}</span>}
      </div>
    </div>
  );
}
