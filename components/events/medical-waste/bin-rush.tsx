"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bins, makeRng, shuffle, type BinId, type Content } from "./data";
import type { Settings } from "./store";
import type { Sound } from "./sound";

type Feedback = { ok: boolean; text: string; rule?: string } | null;


/**
 * Bin Rush: one waste item at a time, tap the right bin before the item timer runs out.
 * Streaks and fast answers score extra; a wrong bin or a timeout costs a life and shows the rule.
 */
export function BinRush({
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
  /** Same seed = same item order (live rounds) */
  seed?: number;
  onFinish: (score: number, detail: string) => void;
  onProgress?: (score: number, detail: string) => void;
}) {
  const START_ITEM_MS = Math.round(settings.binRushItemStart * 1000);
  const MIN_ITEM_MS = Math.min(START_ITEM_MS, Math.round(settings.binRushItemMin * 1000));
  const rng = useMemo(() => makeRng(seed ?? Math.floor(Math.random() * 2 ** 31)), [seed]);
  const items = content.items;
  const [queue, setQueue] = useState(() => shuffle(items, rng));
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.binRushSeconds * 1000);
  const [itemLeft, setItemLeft] = useState(START_ITEM_MS);
  const [itemTotal, setItemTotal] = useState(START_ITEM_MS);
  const [lives, setLives] = useState(settings.binRushLives);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({ right: 0, total: 0 });
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pop, setPop] = useState<{ bin: BinId; ok: boolean } | null>(null);
  const done = useRef(false);
  const paused = feedback !== null;
  const item = queue[index];

  const finish = useCallback(
    (finalScore: number, s: { right: number; total: number }) => {
      if (done.current) return;
      done.current = true;
      onFinish(finalScore, `${s.right}/${s.total} sorted correctly`);
    },
    [onFinish],
  );

  const next = useCallback(() => {
    setFeedback(null);
    setPop(null);
    if (index + 1 >= queue.length) {
      setQueue(shuffle(items, rng));
      setIndex(0);
    } else setIndex(index + 1);
    setItemLeft(itemTotal);
  }, [index, queue.length, itemTotal, items, rng]);

  useEffect(() => {
    onProgress?.(score, `${stats.right}/${stats.total} sorted correctly`);
  }, [score, stats, onProgress]);

  // Clock: game time and the per-item countdown, frozen while feedback is showing.
  useEffect(() => {
    if (paused || done.current) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 100));
      setItemLeft((t) => Math.max(0, t - 100));
    }, 100);
    return () => clearInterval(id);
  }, [paused]);

  const miss = useCallback(
    (text: string, chosen?: BinId) => {
      const s = { right: stats.right, total: stats.total + 1 };
      setStats(s);
      setStreak(0);
      sound.bad();
      const right = bins.find((b) => b.id === item.bin)!;
      setFeedback({ ok: false, text, rule: right.rule });
      if (chosen) setPop({ bin: chosen, ok: false });
      const left = lives - 1;
      setLives(left);
      if (left <= 0) setTimeout(() => finish(score, s), 1800);
      else setTimeout(next, 2000);
    },
    [stats, sound, item, lives, finish, score, next],
  );

  useEffect(() => {
    if (done.current || paused) return;
    if (timeLeft <= 0) finish(score, stats);
    else if (itemLeft <= 0) miss(`Too slow! That goes in the ${bins.find((b) => b.id === item.bin)!.name.toLowerCase()} bin.`);
  }, [timeLeft, itemLeft, paused, finish, score, stats, miss, item]);

  function choose(bin: BinId) {
    if (paused || done.current) return;
    if (bin !== item.bin) {
      miss(`Not quite: that goes in the ${bins.find((b) => b.id === item.bin)!.name.toLowerCase()} bin.`, bin);
      return;
    }
    const fast = itemLeft > itemTotal * 0.6;
    const gained = 100 + Math.min(streak, 5) * 20 + (fast ? 50 : 0);
    const s = { right: stats.right + 1, total: stats.total + 1 };
    setStats(s);
    setScore(score + gained);
    setStreak(streak + 1);
    setItemTotal((t) => Math.max(MIN_ITEM_MS, t - 150));
    sound.good();
    setPop({ bin, ok: true });
    setFeedback({ ok: true, text: `Correct! +${gained}${fast ? " (speed bonus)" : ""}` });
    setTimeout(next, 650);
  }

  // Keyboard shortcuts 1–6 for a keyboard-equipped kiosk.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= bins.length) choose(bins[n - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const secs = Math.ceil(timeLeft / 1000);
  return (
    <div className="mw-game mw-rush">
      <div className="mw-hud">
        <span>
          <small>Time</small>
          <b className={secs <= 10 ? "mw-warn" : ""}>{secs}s</b>
        </span>
        <span>
          <small>Lives</small>
          <b aria-label={`${lives} lives`}>{"❤️".repeat(Math.max(0, lives))}{"🤍".repeat(Math.max(0, settings.binRushLives - lives))}</b>
        </span>
        <span>
          <small>Streak</small>
          <b>{streak > 1 ? `🔥 ×${streak}` : streak}</b>
        </span>
        <span>
          <small>Score</small>
          <b>{score}</b>
        </span>
      </div>

      <div className="mw-rush-stage">
        <div className={`mw-item ${feedback ? (feedback.ok ? "is-ok" : "is-bad") : ""}`} key={`${index}-${queue.length}`}>
          <span className="mw-item-icon" aria-hidden="true">{item.icon}</span>
          <b>{item.name}</b>
          <span className="mw-item-bar">
            <i style={{ width: `${(itemLeft / itemTotal) * 100}%` }} />
          </span>
        </div>
        <div className="mw-feedback" role="status" aria-live="assertive">
          {feedback && (
            <div className={feedback.ok ? "is-ok" : "is-bad"}>
              <b>{feedback.text}</b>
              {feedback.rule && <p>{feedback.rule}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="mw-bins">
        {bins.map((b, i) => (
          <button
            type="button"
            key={b.id}
            className={`mw-bin mw-bin--${b.id} ${pop?.bin === b.id ? (pop.ok ? "is-ok" : "is-bad") : ""} ${feedback && !feedback.ok && item.bin === b.id ? "is-answer" : ""}`}
            onClick={() => choose(b.id)}
            disabled={paused}
          >
            <span className="mw-bin-lid" aria-hidden="true" />
            <span className="mw-bin-body">
              <span className="mw-bin-key" aria-hidden="true">{i + 1}</span>
              <b>{b.name}</b>
              <small>{b.sub}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
