"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ICONS = [
  { name: "WASL", src: "/logos/wasl.svg" },
  { name: "QFlow", src: "/logos/qflow.svg" },
  { name: "Store Portal", src: "/logos/store-portal.svg" },
  { name: "Social Bakery", src: "/logos/social-bakery.svg" },
  { name: "Odysense AI", src: "/logos/odysense-ai.png" },
  { name: "ProSeek", src: "/logos/proseek.png" },
];

type Card = { id: number; icon: number };

function deal(): Card[] {
  const cards = ICONS.flatMap((_, i) => [i, i]).map((icon, id) => ({ id, icon }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function Memory() {
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const lock = useRef(false);

  useEffect(() => setCards(deal()), []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const done = cards.length > 0 && matched.size === ICONS.length;

  useEffect(() => {
    if (!done) return;
    setRunning(false);
    setBest((b) => (b === null ? moves : Math.min(b, moves)));
  }, [done, moves]);

  const flip = (pos: number) => {
    if (lock.current || open.includes(pos) || matched.has(cards[pos].icon) || done) return;
    if (!running && moves === 0 && open.length === 0) setRunning(true);
    const nextOpen = [...open, pos];
    setOpen(nextOpen);
    if (nextOpen.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = nextOpen;
    if (cards[a].icon === cards[b].icon) {
      setMatched((m) => new Set(m).add(cards[a].icon));
      setOpen([]);
    } else {
      lock.current = true;
      setTimeout(() => {
        setOpen([]);
        lock.current = false;
      }, 800);
    }
  };

  const reset = () => {
    setCards(deal());
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setSeconds(0);
    setRunning(false);
  };

  return (
    <div className="arc-game arc-memory-layout">
      <div className="arc-memory" role="group" aria-label="Memory cards">
        {cards.map((c, pos) => {
          const shown = open.includes(pos) || matched.has(c.icon);
          const icon = ICONS[c.icon];
          return (
            <button
              key={c.id}
              type="button"
              className={`arc-card ${shown ? "up" : ""} ${matched.has(c.icon) ? "got" : ""}`}
              onClick={() => flip(pos)}
              aria-label={shown ? icon.name : `Card ${pos + 1}, face down`}
            >
              <span className="arc-card-inner">
                <span className="arc-card-back" aria-hidden="true" />
                <span className="arc-card-front" aria-hidden="true">
                  <Image src={icon.src} alt="" width={56} height={56} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="arc-side">
        <h3 className="arc-title">
          Memory match <span className="serif">— find the pairs.</span>
        </h3>
        <p className="arc-sub">Six pairs of Odysense product icons. At your event these would be your products or brand assets.</p>
        <div className="arc-stats">
          <div>
            <b>{moves}</b>
            <span className="mono">Moves</span>
          </div>
          <div>
            <b>
              {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </b>
            <span className="mono">Time</span>
          </div>
          <div>
            <b>{best ?? "—"}</b>
            <span className="mono">Best</span>
          </div>
        </div>
        <p className="arc-result" aria-live="polite">
          {done && `All pairs found in ${moves} moves.`}
        </p>
        <button className="btn btn-invert" type="button" onClick={reset}>
          {done ? "Play again" : "Shuffle & restart"}
        </button>
      </div>
    </div>
  );
}
