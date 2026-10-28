"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { makeRng, shuffle, type Clue, type Content } from "./data";
import { HazardSymbol } from "./symbols";
import type { Settings } from "./store";
import type { Sound } from "./sound";

type Card = { key: string; pair: string; clue?: Clue; category?: string };

/**
 * Score for a finished board: 100 per pair, a speed bonus of 10 per second under 15 s/pair,
 * minus 20 per mismatch. If a time limit runs out first, only the matched pairs count.
 */
export function matchScore(pairs: number, matched: number, seconds: number, misses: number, complete: boolean) {
  if (!complete) return Math.max(0, matched * 100 - misses * 20);
  return Math.max(100, pairs * 100 + Math.max(0, pairs * 15 - seconds) * 10 - misses * 20);
}

/** Symbol Match: flip cards to pair each symbol or label clue with its waste category. */
export function SymbolMatch({
  settings,
  content,
  sound,
  seed,
  onFinish,
  onProgress,
}: {
  settings: Settings;
  content: Content;
  sound: Sound;
  seed?: number;
  onFinish: (score: number, detail: string) => void;
  onProgress?: (score: number, detail: string) => void;
}) {
  const { cards, total } = useMemo(() => {
    const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
    const chosen = shuffle(content.pairs, rng).slice(0, Math.max(4, Math.min(settings.matchPairs, content.pairs.length)));
    const deck: Card[] = shuffle(
      chosen.flatMap((p, i) => [
        { key: `${i}-clue`, pair: `${i}`, clue: p.clue },
        { key: `${i}-cat`, pair: `${i}`, category: p.category },
      ]),
      rng,
    );
    return { cards: deck, total: chosen.length };
  }, [content.pairs, settings.matchPairs, seed]);
  const limit = settings.matchSeconds;
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

  const current = matchScore(total, matched.size, seconds, misses, matched.size === total);
  useEffect(() => {
    onProgress?.(matched.size === total ? current : matched.size * 100, `${matched.size}/${total} pairs`);
  }, [matched, total, current, onProgress]);

  // Time limit (optional)
  useEffect(() => {
    if (!limit || done.current || seconds < limit) return;
    done.current = true;
    sound.bad();
    onFinish(matchScore(total, matched.size, seconds, misses, false), `${matched.size}/${total} pairs · time's up`);
  }, [seconds, limit, total, matched, misses, onFinish, sound]);

  function flip(i: number) {
    if (done.current || open.length === 2 || open.includes(i) || matched.has(cards[i].pair)) return;
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
        if (m.size === total && !done.current) {
          done.current = true;
          setTimeout(() => onFinish(matchScore(total, total, seconds, misses, true), `${total} pairs in ${seconds}s · ${misses} mismatch${misses === 1 ? "" : "es"}`), 500);
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

  const left = limit ? Math.max(0, limit - seconds) : 0;
  return (
    <div className="mw-game mw-match">
      <div className="mw-hud">
        <span>
          <small>Pairs</small>
          <b>
            {matched.size}/{total}
          </b>
        </span>
        <span>
          <small>{limit ? "Time left" : "Time"}</small>
          <b className={limit && left <= 10 ? "mw-warn" : ""}>{limit ? left : seconds}s</b>
        </span>
        <span>
          <small>Mismatches</small>
          <b>{misses}</b>
        </span>
        <span>
          <small>Score now</small>
          <b>{current}</b>
        </span>
      </div>
      <div className={`mw-grid mw-grid--${cards.length}`}>
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
