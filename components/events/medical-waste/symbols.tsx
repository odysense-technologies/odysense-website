"use client";

import { createContext, useContext, useId, type ReactNode } from "react";
import type { SymbolId } from "./data";

/**
 * Hazard symbols from the colour-coding poster, drawn as SVG with proper cut-outs (SVG masks), so they
 * stay crisp at any size. The admin can replace any of them with an uploaded image; replacements reach
 * every symbol on the page through SymbolProvider.
 */

const SymbolContext = createContext<Partial<Record<SymbolId, string>>>({});

export function SymbolProvider({ symbols, children }: { symbols: Partial<Record<SymbolId, string>>; children: ReactNode }) {
  return <SymbolContext.Provider value={symbols}>{children}</SymbolContext.Provider>;
}

const deg = (d: number) => (d * Math.PI) / 180;
const ARMS = [-90, 30, 150];

/** Biohazard trefoil: three crescents opening outwards, a broken inner ring and a hollow centre. */
function Biohazard({ color }: { color: string }) {
  const id = useId().replace(/:/g, "");
  const cx = 50;
  const cy = 55;
  const at = (angle: number, dist: number) => ({ x: cx + dist * Math.cos(deg(angle)), y: cy + dist * Math.sin(deg(angle)) });
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <mask id={`bh-${id}`}>
          <rect width="100" height="100" fill="black" />
          {ARMS.map((a) => {
            const o = at(a, 19);
            return <circle key={`o${a}`} cx={o.x} cy={o.y} r="20" fill="white" />;
          })}
          {ARMS.map((a) => {
            const i = at(a, 27);
            return <circle key={`i${a}`} cx={i.x} cy={i.y} r="15" fill="black" />;
          })}
          {/* the inner ring, drawn after the cut-outs so its arcs show inside each crescent's opening */}
          <circle cx={cx} cy={cy} r="15" fill="none" stroke="white" strokeWidth="3.6" />
          <circle cx={cx} cy={cy} r="6" fill="black" />
          {ARMS.map((a) => {
            // thin gaps where each crescent meets the centre, as on the standard symbol
            const p1 = at(a + 180, 3);
            const p2 = at(a + 180, 12);
            return <line key={`g${a}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" strokeWidth="2.2" />;
          })}
        </mask>
      </defs>
      <rect width="100" height="100" fill={color} mask={`url(#bh-${id})`} />
    </svg>
  );
}

/** Radioactive trefoil: a central disc and three blades 60° wide, 120° apart. */
function Radioactive() {
  const cx = 50;
  const cy = 52;
  const blade = (a: number) => {
    const r1 = 14;
    const r2 = 40;
    const p = (r: number, ang: number) => `${cx + r * Math.cos(deg(ang))} ${cy + r * Math.sin(deg(ang))}`;
    return `M ${p(r1, a - 30)} L ${p(r2, a - 30)} A ${r2} ${r2} 0 0 1 ${p(r2, a + 30)} L ${p(r1, a + 30)} A ${r1} ${r1} 0 0 0 ${p(r1, a - 30)} Z`;
  };
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {ARMS.map((a) => (
        <path key={a} d={blade(a)} fill="#111" />
      ))}
      <circle cx={cx} cy={cy} r="9" fill="#111" />
    </svg>
  );
}

/** Cytotoxic: a cell dividing (mitosis) inside a white oval, on black. */
function Cytotoxic() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="29" ry="39" fill="#fff" />
      <path d="M50 22 C 33 22 33 48 50 50 C 67 52 67 78 50 78 C 33 78 33 52 50 50 C 67 48 67 22 50 22 Z" fill="none" stroke="#111" strokeWidth="4.5" strokeLinejoin="round" />
      <line x1="36" y1="50" x2="64" y2="50" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

/** Chemical hazard: a GHS-style red-bordered diamond with an exclamation mark. */
function Chemical() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="21" y="21" width="58" height="58" rx="3" transform="rotate(45 50 50)" fill="#fff" stroke="#E2231A" strokeWidth="7" />
      <path d="M45.5 30 h9 l-1.8 28 h-5.4 Z" fill="#111" />
      <circle cx="50" cy="67" r="4.8" fill="#111" />
    </svg>
  );
}

const BG: Record<SymbolId, string> = {
  biohazard: "#F5E62A",
  "biohazard-red": "#D7252E",
  cytotoxic: "#111",
  chemical: "#fff",
  radioactive: "#F5E62A",
};

/** Draws the built-in symbol, ignoring any uploaded replacement (used in the admin preview). */
export function DefaultSymbol({ id }: { id: SymbolId }) {
  return (
    <>
      {(id === "biohazard" || id === "biohazard-red") && <Biohazard color="#111" />}
      {id === "radioactive" && <Radioactive />}
      {id === "cytotoxic" && <Cytotoxic />}
      {id === "chemical" && <Chemical />}
    </>
  );
}

/** The required symbol from the colour-coding poster, as a square tile. */
export function HazardSymbol({ id, size = 64, original = false }: { id: SymbolId; size?: number; original?: boolean }) {
  const custom = useContext(SymbolContext)[id];
  if (custom && !original) {
    return (
      <span className="mw-sym mw-sym--img" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- uploaded data URL, not an optimisable asset */}
        <img src={custom} alt="" />
      </span>
    );
  }
  return (
    <span className="mw-sym" style={{ width: size, height: size, background: BG[id] }}>
      <DefaultSymbol id={id} />
    </span>
  );
}
