"use client";

import { useEffect, useRef, useState } from "react";
import { pairs, shuffle, type Clue } from "./data";
import { HazardSymbol } from "./symbols";
import type { Sound } from "./sound";

type Card = { key: string; pair: string; clue?: Clue; category?: string };

function deal(): Card[] {
  return shuffle(
    pairs.flatMap((p) => [
      { key: `${p.id}-clue`, pair: p.id, clue: p.clue },
      { key: `${p.id}-cat`, pair: p.id, category: p.category },
    ]),
  );
}

/** Score: completing the board earns 800, plus up to 1,200 for speed, minus 20 per mismatch. */
export function matchScore(seconds: number, misses: number) {
  return Math.max(100, 800 + Math.max(0, 120 - seconds) * 10 - misses * 20);
}

/** Symbol Match: flip cards to pair each symbol or label clue with its waste category. */
export function SymbolMatch({ sound, onFinish }: { sound: Sound; onFinish: (score: number, detail: string) => void }) {
  const [cards] = useState(deal);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [misses, setMisses] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [wrong, setWrong] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const id = setInterval(() => !done.current && setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  function flip(i: number) {
    if (open.length === 2 || open.includes(i) || matched.has(cards[i].pair)) return;
    sound.tick();
    const now = [...open, i];
    setOpen(now);
    if (now.length < 2) return;
    const [a, b] = now.map((n) => cards[n]);
    if (a.pair === b.pair) {
      const m = new Set(matched).add(a.pair);
      setTimeout(() => {
        sound.good();
        setMatched(m);
        setOpen([]);
        if (m.size === pairs.length && !done.current) {
          done.current = true;
          setTimeout(() => onFinish(matchScore(seconds, misses), `${seconds}s · ${misses} mismatch${misses === 1 ? "" : "es"}`), 500);
        }
      }, 350);
    } else {
      setWrong(true);
      setTimeout(() => {
        sound.bad();
        setMisses((x) => x + 1);
        setOpen([]);
        setWrong(false);
      }, 900);
    }
  }

  return (
    <div className="mw-game mw-match">
      <div className="mw-hud">
        <span>
          <small>Pairs</small>
          <b>
            {matched.size}/{pairs.length}
          </b>
        </span>
        <span>
          <small>Time</small>
          <b>{seconds}s</b>
        </span>
        <span>
          <small>Mismatches</small>
          <b>{misses}</b>
        </span>
        <span>
          <small>Score now</small>
          <b>{matchScore(seconds, misses)}</b>
        </span>
      </div>
      <div className="mw-grid">
        {cards.map((c, i) => {
          const up = open.includes(i) || matched.has(c.pair);
          return (
            <button
              type="button"
              key={c.key}
              className={`mw-card ${up ? "is-up" : ""} ${matched.has(c.pair) ? "is-matched" : ""} ${wrong && open.includes(i) ? "is-wrong" : ""}`}
              onClick={() => flip(i)}
              aria-label={up ? (c.category ?? (c.clue?.kind === "text" ? c.clue.text : `${c.clue?.kind === "symbol" ? c.clue.symbol : ""} symbol`)) : "Hidden card"}
            >
              <span className="mw-card-inner">
                <span className="mw-card-back" aria-hidden="true">
                  ♻
                </span>
                <span className="mw-card-face">
                  {c.category && <b className="mw-card-cat">{c.category}</b>}
                  {c.clue?.kind === "symbol" && <HazardSymbol id={c.clue.symbol} size={64} />}
                  {c.clue?.kind === "text" && (
                    <>
                      <span className="mw-card-icon" aria-hidden="true">{c.clue.icon}</span>
                      <small>{c.clue.text}</small>
                    </>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
