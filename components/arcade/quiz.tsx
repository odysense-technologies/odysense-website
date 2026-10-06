"use client";

import { useEffect, useRef, useState } from "react";
import { Leaderboard } from "./shared";

const QUESTIONS = [
  { q: "What is the capital of Qatar?", options: ["Al Wakrah", "Doha", "Lusail", "Al Khor"], answer: 1 },
  { q: "How many players does a football team have on the pitch?", options: ["9", "10", "11", "12"], answer: 2 },
  { q: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Mercury"], answer: 0 },
  { q: "What colour do you get by mixing blue and yellow?", options: ["Purple", "Orange", "Brown", "Green"], answer: 3 },
  { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
];
const SECONDS = 10;
const DEMO_PLAYERS = [
  { name: "Guest 214", score: 3900 },
  { name: "Guest 087", score: 3350 },
  { name: "Guest 152", score: 2700 },
  { name: "Guest 031", score: 1950 },
  { name: "Guest 120", score: 1200 },
];

type Phase = "intro" | "question" | "reveal" | "done";

export default function Quiz() {
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
          Live quiz <span className="serif">— five quick questions.</span>
        </h3>
        <p className="arc-sub">
          Ten seconds per question. Right answers score points, and faster answers score more. At an event, everyone
          plays on their phones at the same time while the leaderboard runs on the big screen.
        </p>
        <button className="btn btn-invert" type="button" onClick={start}>
          Start the quiz →
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="arc-game arc-split">
        <div>
          <span className="mono arc-muted">Results</span>
          <h3 className="arc-title" aria-live="polite">
            {score.toLocaleString("en-US")} <span className="serif">points.</span>
          </h3>
          <p className="arc-sub">
            {correct} of {QUESTIONS.length} correct. Your best this visit: {best.toLocaleString("en-US")}.
          </p>
          <button className="btn btn-invert" type="button" onClick={start}>
            Play again
          </button>
        </div>
        <Leaderboard rows={DEMO_PLAYERS} unit="pts" you={{ name: "You", score }} />
      </div>
    );
  }

  const Q = QUESTIONS[idx];
  return (
    <div className="arc-game">
      <div className="arc-quiz-top">
        <span className="mono arc-muted">
          Question {idx + 1} / {QUESTIONS.length}
        </span>
        <span className="mono arc-muted">{score.toLocaleString("en-US")} pts</span>
      </div>
      <div
        className="arc-timer"
        role="progressbar"
        aria-label="Time left"
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
              {picked === null ? "Time's up!" : picked === Q.answer ? "Correct!" : "Not quite."}
            </span>
            <button className="btn btn-invert" type="button" onClick={next}>
              {idx + 1 >= QUESTIONS.length ? "See results" : "Next question"} →
            </button>
          </>
        )}
        {phase === "question" && <span className="arc-muted">{Math.ceil(left)}s left</span>}
      </div>
    </div>
  );
}
