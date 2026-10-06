"use client";

import { useEffect, useState } from "react";

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/**
 * Simulated leaderboard. The other rows are made-up demo players; nothing is
 * sent anywhere or saved — it only lives in this browser tab.
 */
export function Leaderboard({
  rows,
  unit,
  you,
}: {
  rows: { name: string; score: number }[];
  unit: string;
  you?: { name: string; score: number };
}) {
  const all = [...rows, ...(you ? [{ ...you, me: true }] : [])].sort((a, b) => b.score - a.score);
  return (
    <ol className="arc-board" aria-label="Demo leaderboard">
      {all.slice(0, 6).map((r, i) => (
        <li key={`${r.name}-${i}`} className={"me" in r ? "me" : ""}>
          <span className="arc-rank">{i + 1}</span>
          <span className="arc-name">{r.name}</span>
          <span className="arc-score">
            {r.score.toLocaleString("en-US")} <small>{unit}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
