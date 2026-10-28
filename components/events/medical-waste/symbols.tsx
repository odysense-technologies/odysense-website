import type { SymbolId } from "./data";

/** Biohazard trefoil: three crescents around a ring, drawn so it scales cleanly. */
function Biohazard({ fill }: { fill: string }) {
  const arm = (rot: number) => (
    <g transform={`rotate(${rot} 50 50)`} key={rot}>
      <circle cx="50" cy="30" r="17" fill={fill} />
      <circle cx="50" cy="25" r="11" fill="var(--mw-sym-bg)" />
    </g>
  );
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {[0, 120, 240].map(arm)}
      <circle cx="50" cy="52" r="15" fill="none" stroke={fill} strokeWidth="6" />
      <circle cx="50" cy="52" r="5" fill="var(--mw-sym-bg)" />
    </svg>
  );
}

/** Radioactive trefoil: three blades around a dot. */
function Radioactive() {
  const blade = (rot: number) => (
    <path key={rot} transform={`rotate(${rot} 50 50)`} d="M50 50 L36 26 A28 28 0 0 1 64 26 Z" fill="#111" />
  );
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {[0, 120, 240].map(blade)}
      <circle cx="50" cy="50" r="10" fill="var(--mw-sym-bg)" />
      <circle cx="50" cy="50" r="7" fill="#111" />
    </svg>
  );
}

/** Cytotoxic: a dividing cell (a figure-of-eight) on a white oval. */
function Cytotoxic() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="26" ry="38" fill="#fff" />
      <circle cx="50" cy="35" r="12" fill="none" stroke="#111" strokeWidth="5" />
      <circle cx="50" cy="65" r="12" fill="none" stroke="#111" strokeWidth="5" />
    </svg>
  );
}

/** Chemical hazard: a hazard diamond with an exclamation mark. */
function Chemical() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="22" y="22" width="56" height="56" rx="4" transform="rotate(45 50 50)" fill="#E2231A" />
      <rect x="27" y="27" width="46" height="46" rx="3" transform="rotate(45 50 50)" fill="none" stroke="#fff" strokeWidth="3" />
      <rect x="46" y="30" width="8" height="26" rx="3" fill="#fff" />
      <circle cx="50" cy="66" r="5" fill="#fff" />
    </svg>
  );
}

const BG: Record<SymbolId, string> = {
  biohazard: "#F5E62A",
  "biohazard-red": "#D7252E",
  cytotoxic: "#111",
  chemical: "#FFF6D6",
  radioactive: "#F5E62A",
};

/** The required symbol from the colour-coding poster, as a square tile. */
export function HazardSymbol({ id, size = 64 }: { id: SymbolId; size?: number }) {
  return (
    <span className="mw-sym" style={{ width: size, height: size, ["--mw-sym-bg" as string]: BG[id], background: BG[id] }}>
      {id === "biohazard" && <Biohazard fill="#111" />}
      {id === "biohazard-red" && <Biohazard fill="#111" />}
      {id === "radioactive" && <Radioactive />}
      {id === "cytotoxic" && <Cytotoxic />}
      {id === "chemical" && <Chemical />}
    </span>
  );
}
