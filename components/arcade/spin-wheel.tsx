"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "./shared";
import type { Locale } from "@/lib/i18n";
import { ARC_TEXT } from "./text";

// Segment colours; the labels come from ARC_TEXT in the page's language
const PRIZES = [
  { fill: "#6C4DF6", ink: "#fff" },
  { fill: "#F55FA0", ink: "#fff" },
  { fill: "#FF7A45", ink: "#fff" },
  { fill: "#7CCBF6", ink: "#16151A" },
  { fill: "#16151A", ink: "#fff" },
  { fill: "#F55FA0", ink: "#fff" },
  { fill: "#6C4DF6", ink: "#fff" },
  { fill: "#FF7A45", ink: "#fff" },
];
const SEG = 360 / PRIZES.length;
const R = 150;

function slicePath(i: number) {
  const a0 = ((i * SEG - 90) * Math.PI) / 180;
  const a1 = (((i + 1) * SEG - 90) * Math.PI) / 180;
  const x0 = R + R * Math.cos(a0);
  const y0 = R + R * Math.sin(a0);
  const x1 = R + R * Math.cos(a1);
  const y1 = R + R * Math.sin(a1);
  return `M${R},${R} L${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1} Z`;
}

export default function SpinWheel({ locale = "en" }: { locale?: Locale }) {
  const t = ARC_TEXT[locale].wheel;
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"gate" | "play">("gate");
  const [name, setName] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = () => {
    if (spinning) return;
    const target = Math.floor(Math.random() * PRIZES.length);
    const centre = target * SEG + SEG / 2;
    const current = ((rotation % 360) + 360) % 360;
    const delta = (((360 - centre - current) % 360) + 360) % 360;
    const next = rotation + 5 * 360 + delta;
    setResult(null);
    setSpinning(true);
    setRotation(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setSpinning(false);
        setResult(target);
      },
      reduce ? 50 : 4600
    );
  };

  if (stage === "gate") {
    return (
      <div className="arc-game arc-center">
        <h3 className="arc-title">
          {t.gateTitle} <span className="serif">{t.gateAccent}</span>
        </h3>
        <p className="arc-sub">{t.gateSub}</p>
        <form
          className="arc-gate"
          onSubmit={(e) => {
            e.preventDefault();
            setStage("play");
          }}
        >
          <label htmlFor="arc-wheel-name" className="mono">
            {t.nameLabel}
          </label>
          <input
            id="arc-wheel-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 24))}
            placeholder={t.namePlaceholder}
            autoComplete="off"
          />
          <button className="btn btn-invert" type="submit">
            {t.play}
          </button>
        </form>
        <button className="arc-link" type="button" onClick={() => setStage("play")}>
          {t.skip}
        </button>
      </div>
    );
  }

  return (
    <div className="arc-game arc-wheel-layout">
      <div className="arc-wheel-wrap">
        <span className="arc-pointer" aria-hidden="true" />
        <svg
          className="arc-wheel"
          viewBox={`0 0 ${R * 2} ${R * 2}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: reduce ? "none" : "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
          }}
          role="img"
          aria-label={t.wheelAria}
        >
          {PRIZES.map((p, i) => {
            const mid = i * SEG + SEG / 2;
            // Labels run along the radius; flip the left half so none read upside down
            const flip = mid > 180;
            return (
              <g key={i}>
                <path d={slicePath(i)} fill={p.fill} stroke="#FAF9F6" strokeWidth="2" />
                <text
                  x={flip ? R - 88 : R + 88}
                  y={R}
                  fill={p.ink}
                  fontSize="13"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${flip ? mid + 90 : mid - 90} ${R} ${R})`}
                  fontFamily="var(--font-sans)"
                >
                  {t.prizes[i]}
                </text>
              </g>
            );
          })}
          <circle cx={R} cy={R} r="26" fill="#FAF9F6" />
          <circle cx={R} cy={R} r="8" fill="#6C4DF6" />
        </svg>
      </div>
      <div className="arc-side">
        <h3 className="arc-title">
          {t.luck(name)} <span className="serif">{t.spinIt}</span>
        </h3>
        <p className="arc-sub">{t.sub}</p>
        <button className="btn btn-invert" type="button" onClick={spin} disabled={spinning}>
          {spinning ? t.spinning : result !== null ? t.again : t.spin}
        </button>
        <p className="arc-result" aria-live="polite">
          {result !== null && (result === t.tryAgainIndex ? t.close : t.won(t.prizes[result]))}
        </p>
      </div>
    </div>
  );
}
