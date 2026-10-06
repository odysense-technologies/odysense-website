"use client";

import { useEffect, useRef, useState } from "react";

const QUESTION = "What should we serve at the next team gathering?";
const OPTIONS = ["Karak", "Arabic coffee", "Fresh juice", "Iced latte"];
// Relative pull of each option for the simulated audience
const WEIGHTS = [0.38, 0.27, 0.2, 0.15];
const SEED = [14, 10, 7, 5];

function pickWeighted() {
  let r = Math.random();
  for (let i = 0; i < WEIGHTS.length; i++) {
    r -= WEIGHTS[i];
    if (r <= 0) return i;
  }
  return WEIGHTS.length - 1;
}

export default function Poll() {
  const [votes, setVotes] = useState<number[]>(SEED);
  const [mine, setMine] = useState<number | null>(null);
  const [live, setLive] = useState(false);
  const stopAt = useRef(0);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      if (Date.now() > stopAt.current) {
        setLive(false);
        return;
      }
      setVotes((v) => {
        const n = [...v];
        const burst = 1 + Math.floor(Math.random() * 3);
        for (let k = 0; k < burst; k++) n[pickWeighted()]++;
        return n;
      });
    }, 450);
    return () => clearInterval(t);
  }, [live]);

  const vote = (i: number) => {
    if (mine !== null) return;
    setMine(i);
    setVotes((v) => v.map((n, k) => (k === i ? n + 1 : n)));
    stopAt.current = Date.now() + 12000;
    setLive(true);
  };

  const reset = () => {
    setVotes(SEED);
    setMine(null);
    setLive(false);
  };

  const total = votes.reduce((a, b) => a + b, 0);
  const lead = votes.indexOf(Math.max(...votes));

  return (
    <div className="arc-game">
      <div className="arc-quiz-top">
        <span className="mono arc-muted">
          {live ? <span className="arc-live-dot" aria-hidden="true" /> : null}
          {live ? "Live · votes coming in" : mine === null ? "Live poll" : "Poll closed"}
        </span>
        <span className="mono arc-muted">{total} votes · simulated audience</span>
      </div>
      <h3 className="arc-q">{QUESTION}</h3>
      <div className="arc-poll">
        {OPTIONS.map((o, i) => {
          const pct = Math.round((votes[i] / total) * 100);
          return (
            <button
              key={o}
              type="button"
              className={`arc-poll-row ${mine === i ? "mine" : ""} ${mine !== null && i === lead ? "lead" : ""}`}
              onClick={() => vote(i)}
              disabled={mine !== null}
              aria-label={mine === null ? `Vote ${o}` : `${o}: ${pct}%`}
            >
              <span className="arc-poll-bar" style={{ width: mine === null ? "0%" : `${pct}%` }} aria-hidden="true" />
              <span className="arc-poll-label">
                {o}
                {mine === i && <small> · your vote</small>}
              </span>
              <span className="arc-poll-pct">{mine === null ? "Vote" : `${pct}%`}</span>
            </button>
          );
        })}
      </div>
      <div className="arc-quiz-foot" aria-live="polite">
        <span className="arc-muted">
          {mine === null
            ? "Cast a vote to reveal the results as the room answers."
            : live
              ? "Results update as each vote lands — on phones and the big screen at once."
              : `${OPTIONS[lead]} wins the room.`}
        </span>
        {mine !== null && !live && (
          <button className="btn btn-invert" type="button" onClick={reset}>
            Run it again
          </button>
        )}
      </div>
    </div>
  );
}
