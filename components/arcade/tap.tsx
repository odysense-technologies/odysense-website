"use client";

import { useEffect, useRef, useState } from "react";
import { Leaderboard } from "./shared";

const DURATION = 10;
const DEMO_PLAYERS = [
  { name: "Guest 044", score: 78 },
  { name: "Guest 213", score: 71 },
  { name: "Guest 109", score: 64 },
  { name: "Guest 076", score: 55 },
  { name: "Guest 158", score: 47 },
];

export default function Tap() {
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
          <span className="mono arc-muted">{taps} taps</span>
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
          aria-label={phase === "ready" ? "Tap to start" : "Tap"}
        >
          <span key={pop} className="arc-tap-ring" aria-hidden="true" />
          <b>{phase === "ready" ? "TAP" : taps}</b>
          <small>{phase === "ready" ? "to start the clock" : phase === "go" ? "keep going!" : "time!"}</small>
        </button>
        <p className="arc-sub arc-center-text">Tap, click, or press Space as fast as you can for {DURATION} seconds.</p>
      </div>
      <div>
        {phase === "done" ? (
          <>
            <h3 className="arc-title" aria-live="polite">
              {taps} taps <span className="serif">in {DURATION} seconds.</span>
            </h3>
            <p className="arc-sub">Your best this visit: {best}.</p>
            <button className="btn btn-invert" type="button" onClick={reset} style={{ marginBottom: 20 }}>
              Try again
            </button>
          </>
        ) : (
          <h3 className="arc-title">
            Tap challenge <span className="serif">— fastest fingers win.</span>
          </h3>
        )}
        <Leaderboard rows={DEMO_PLAYERS} unit="taps" you={phase === "done" ? { name: "You", score: taps } : undefined} />
      </div>
    </div>
  );
}
