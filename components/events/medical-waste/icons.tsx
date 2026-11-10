/**
 * Game logos and item icons for the Medical Waste Segregation Challenge.
 *
 * Bin Rush's logo is the game's own six bins, in the same colours as the bins players tap (see .mw-bin in
 * globals.css); Code Breaker's is a question mark. An item icon is either an emoji or a picture: a path
 * under /images/ (the default pictures) or an uploaded data:image URL.
 */
import type { GameId } from "./store";

const LOGO_BINS: { lines: string[]; lid: string; lidStroke?: string; body: string; ink: string }[] = [
  { lines: ["Infectious"], lid: "#c9b800", body: "#F5E62A", ink: "#2d2900" },
  { lines: ["Highly", "infectious"], lid: "#3b3b3b", body: "#D7252E", ink: "#fff" },
  { lines: ["Sharps"], lid: "#D7252E", body: "#F5E62A", ink: "#2d2900" },
  { lines: ["Pharma-", "ceutical"], lid: "#fff7e0", lidStroke: "#e3c86a", body: "#F2C230", ink: "#2d2900" },
  { lines: ["Patho-", "logical"], lid: "#c9b800", body: "#F5E62A", ink: "#2d2900" },
  { lines: ["Amalgam"], lid: "#D7252E", body: "#F3E3D3", ink: "#4a3424" },
];

function BinRushLogo() {
  return (
    <svg className="mw-logo" viewBox="0 0 132 100" aria-hidden="true">
      {LOGO_BINS.map((b, i) => {
        const x = 3 + (i % 3) * 44;
        const y = 3 + Math.floor(i / 3) * 49;
        const last = b.lines.length - 1;
        return (
          <g key={i}>
            <rect x={x + 4} y={y} width={30} height={7} rx={3} fill={b.lid} stroke={b.lidStroke} strokeWidth={b.lidStroke ? 0.8 : 0} />
            <path d={`M${x} ${y + 8}h38v30a6 6 0 0 1-6 6h-26a6 6 0 0 1-6-6z`} fill={b.body} />
            <path d={`M${x} ${y + 40}a6 6 0 0 0 6 4h26a6 6 0 0 0 6-4z`} fill="rgba(0,0,0,.08)" />
            <circle cx={x + 4} cy={y + 12} r={1.1} fill={b.ink} opacity={0.5} />
            {b.lines.map((l, j) => (
              <text key={j} x={x + 19} y={y + 39 - (last - j) * 6.4} textAnchor="middle" fontSize={5.9} fontWeight={800} fill={b.ink}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function CodeBreakerLogo() {
  return (
    <svg className="mw-logo" viewBox="0 0 100 100" aria-hidden="true">
      <text x="50" y="84" textAnchor="middle" fontSize="96" fontWeight={800} fill="#16151A">
        ?
      </text>
    </svg>
  );
}

/** The game's logo: drawn for Bin Rush and Code Breaker, an emoji for Symbol Match. */
export function GameIcon({ game }: { game: GameId }) {
  if (game === "bin-rush") return <BinRushLogo />;
  if (game === "code-breaker") return <CodeBreakerLogo />;
  return <>🧩</>;
}

/** Only our own pictures and uploaded images render as <img>; anything else is shown as text (an emoji). */
export const isPictureIcon = (icon: string) => icon.startsWith("/images/") || icon.startsWith("data:image/");

export function ItemIcon({ icon }: { icon: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return isPictureIcon(icon) ? <img className="mw-icon-img" src={icon} alt="" draggable={false} /> : <>{icon}</>;
}
