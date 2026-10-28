"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { bins, wasteCodes } from "./data";
import { HazardSymbol } from "./symbols";
import { makeSound } from "./sound";
import { BinRush } from "./bin-rush";
import { CodeBreaker } from "./code-breaker";
import { SymbolMatch } from "./symbol-match";
import {
  DEFAULT_SETTINGS,
  GAME_NAMES,
  addEntry,
  checkPassword,
  download,
  loadEntries,
  loadSettings,
  ranked,
  saveEntries,
  saveSettings,
  toCsv,
  type Entry,
  type GameId,
  type Settings,
} from "./store";

const GAMES: { id: GameId; icon: string; tagline: string; length: (s: Settings) => string; how: string[] }[] = [
  {
    id: "bin-rush",
    icon: "🗑️",
    tagline: "Sort each item into the right bin before the clock runs out.",
    length: (s) => `${s.binRushSeconds} seconds · ${s.binRushLives} lives`,
    how: [
      "A medical waste item appears in the middle of the screen.",
      "Tap the bin it belongs in: infectious, highly infectious, sharps, pharmaceutical, pathological or amalgam.",
      "Answer before the item's timer bar runs out. Items get faster as you go.",
      "Streaks and quick answers earn bonus points. A wrong bin or a timeout costs a life and shows you the rule.",
    ],
  },
  {
    id: "code-breaker",
    icon: "🏷️",
    tagline: "Crack the colour codes, labels and hazard symbols.",
    length: (s) => `${s.quizQuestions} questions · ${s.quizSeconds}s each`,
    how: [
      "Answer quick questions on container colours, label wording, required symbols and segregation rules.",
      "Tap the answer you think is right. You only get one try per question.",
      "Every correct answer scores 100 points, plus 10 for each second left on the clock.",
      "After each question you'll see the right answer and why.",
    ],
  },
  {
    id: "symbol-match",
    icon: "🧩",
    tagline: "Pair every hazard symbol and label with its waste category.",
    length: () => "8 pairs · beat the clock",
    how: [
      "Sixteen cards are face down. Tap two to flip them.",
      "Match each clue (a hazard symbol or a label) with its waste category card.",
      "Matched pairs stay open; mismatches flip back.",
      "Finish fast with few mismatches for the highest score.",
    ],
  },
];

type Phase = "intro" | "play" | "result";
type Result = { score: number; detail: string; rank: number; entryId: string };

function enterFullscreen() {
  const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
  try {
    if (document.fullscreenElement) return;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else el.webkitRequestFullscreen?.();
  } catch {
    /* fullscreen not allowed: the overlay still covers the page */
  }
}
function exitFullscreen() {
  try {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  } catch {
    /* ignore */
  }
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function MedicalWasteChallenge() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [active, setActive] = useState<GameId | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [player, setPlayer] = useState({ name: "", org: "" });
  const [result, setResult] = useState<Result | null>(null);
  const [round, setRound] = useState(0);
  const [board, setBoard] = useState<GameId>("bin-rush");
  const [boardFull, setBoardFull] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    setSettings(loadSettings());
    // Keep a second tab (e.g. a leaderboard on a projector) in sync.
    const onStorage = () => setEntries(loadEntries());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const sound = useMemo(() => makeSound(settings.sound), [settings.sound]);
  const game = GAMES.find((g) => g.id === active);

  function openGame(id: GameId) {
    enterFullscreen();
    setActive(id);
    setPhase("intro");
    setResult(null);
    setPlayer({ name: "", org: "" });
  }
  function closeGame() {
    setActive(null);
    exitFullscreen();
  }
  function start(e: FormEvent) {
    e.preventDefault();
    if (!player.name.trim()) return;
    setRound((r) => r + 1);
    setPhase("play");
  }

  const finish = useCallback(
    (score: number, detail: string) => {
      if (!active) return;
      const list = addEntry({ game: active, name: player.name.trim().slice(0, 24), org: player.org.trim().slice(0, 40), score, detail });
      setEntries(list);
      const mine = list[list.length - 1];
      const rank = ranked(list, active).findIndex((e) => e.id === mine.id) + 1;
      setResult({ score, detail, rank, entryId: mine.id });
      setBoard(active);
      setPhase("result");
      if (rank <= 3) sound.win();
    },
    [active, player, sound],
  );

  // Esc closes the overlay on keyboards; the ✕ button does the same on touch screens.
  useEffect(() => {
    if (!active && !boardFull) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (boardFull) setBoardFull(false);
      else if (phase !== "play") closeGame();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Lock page scrolling behind overlays.
  useEffect(() => {
    document.body.style.overflow = active || boardFull || adminOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active, boardFull, adminOpen]);

  const top = (g: GameId, n = 10) => ranked(entries, g).slice(0, n);

  return (
    <main className="mw">
      {/* ---------- Hero ---------- */}
      <header className="mw-hero">
        <div className="orb" aria-hidden="true" />
        <div className="wrap">
          <span className="mw-kicker">Medical Waste Management Conference · Qatar · 12 November</span>
          <h1>
            Sort it right. <span className="serif">Stop the spread.</span>
          </h1>
          <p className="mw-lede">
            Three quick games on segregating medical waste the safe way, based on the Ministry of Public Health&apos;s
            colour-coding and segregation guidance. Play, learn the rules, and climb the leaderboard.
          </p>
          <div className="mw-hero-actions">
            <a className="btn btn-primary" href="#games">
              Choose a game ↓
            </a>
            <button type="button" className="btn btn-secondary" onClick={() => setBoardFull(true)}>
              🏆 Leaderboard
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Games ---------- */}
      <section className="section" id="games">
        <div className="wrap">
          <div className="mw-games">
            {GAMES.map((g, i) => (
              <article className="card mw-game-card" key={g.id}>
                <span className="num">{["i.", "ii.", "iii."][i]}</span>
                <span className="mw-game-icon" aria-hidden="true">{g.icon}</span>
                <h2>{GAME_NAMES[g.id]}</h2>
                <p className="mw-tagline">{g.tagline}</p>
                <span className="mw-chip">{g.length(settings)}</span>
                <h3>How to play</h3>
                <ol>
                  {g.how.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
                <button type="button" className="btn btn-primary mw-play" onClick={() => openGame(g.id)}>
                  ▶ Play game
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Leaderboard ---------- */}
      <section className="section section--flush-top" id="leaderboard">
        <div className="wrap">
          <Leaderboard entries={entries} board={board} setBoard={setBoard} onFull={() => setBoardFull(true)} />
        </div>
      </section>

      {/* ---------- Quick reference ---------- */}
      <section className="section section--flush-top" id="guide">
        <div className="wrap">
          <div className="mw-section-head">
            <span className="mw-kicker">Quick reference</span>
            <h2>
              Colour coding, labels <span className="serif">and symbols.</span>
            </h2>
            <p>From the Ministry of Public Health&apos;s healthcare waste container colour coding, labeling and signing guide.</p>
          </div>
          <div className="mw-ref">
            {wasteCodes.map((c) => (
              <div className="mw-ref-row" key={c.id}>
                <b>{c.name}</b>
                <span className={`mw-swatch mw-swatch--${c.color}`}>{c.color === "red" ? "Red" : "Yellow"}</span>
                <span className="mw-ref-label">“{c.label}”</span>
                <HazardSymbol id={c.symbol} size={52} />
              </div>
            ))}
          </div>
          <div className="mw-section-head mw-section-head--sub">
            <h2>
              Which bin? <span className="serif">Segregation at a glance.</span>
            </h2>
          </div>
          <div className="mw-rules">
            {bins.map((b) => (
              <div className={`mw-rule mw-rule--${b.id}`} key={b.id}>
                <b>{b.name}</b>
                <small>{b.sub}</small>
                <p>{b.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mw-foot">
        <div className="wrap">
          <span>Based on the Ministry of Public Health (State of Qatar) healthcare waste colour coding and segregation guidance.</span>
          <span>
            Interactive experience by{" "}
            <a href="/gamification-brand-activation-qatar/" target="_blank" rel="noopener">
              Odysense
            </a>
            <button type="button" className="mw-admin-link" onClick={() => setAdminOpen(true)}>
              Admin
            </button>
          </span>
        </div>
      </footer>

      {/* ---------- Full-screen game stage ---------- */}
      {active && game && (
        <div className="mw-stage" role="dialog" aria-modal="true" aria-label={GAME_NAMES[active]}>
          <div className="mw-stage-bar">
            <b>
              <span aria-hidden="true">{game.icon}</span> {GAME_NAMES[active]}
            </b>
            {phase !== "intro" && <span className="mw-stage-player">{player.name}</span>}
            <button type="button" className="mw-x" onClick={closeGame} aria-label="Close game">
              ✕
            </button>
          </div>

          {phase === "intro" && (
            <form className="mw-intro" onSubmit={start}>
              <span className="mw-game-icon mw-game-icon--big" aria-hidden="true">{game.icon}</span>
              <h2>{GAME_NAMES[active]}</h2>
              <p className="mw-tagline">{game.tagline}</p>
              <ol>
                {game.how.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ol>
              <div className="mw-fields">
                <label>
                  Your name <em>(shown on the leaderboard)</em>
                  <input
                    autoFocus
                    required
                    maxLength={24}
                    value={player.name}
                    onChange={(e) => setPlayer({ ...player, name: e.target.value })}
                    placeholder="e.g. Fatima A."
                  />
                </label>
                <label>
                  Organisation <em>(optional)</em>
                  <input maxLength={40} value={player.org} onChange={(e) => setPlayer({ ...player, org: e.target.value })} placeholder="Hospital, clinic or company" />
                </label>
              </div>
              <button className="btn btn-primary mw-start" type="submit" disabled={!player.name.trim()}>
                ▶ Start {GAME_NAMES[active]}
              </button>
            </form>
          )}

          {phase === "play" && (
            <div className="mw-play-area" key={round}>
              {active === "bin-rush" && <BinRush settings={settings} sound={sound} onFinish={finish} />}
              {active === "code-breaker" && <CodeBreaker settings={settings} sound={sound} onFinish={finish} />}
              {active === "symbol-match" && <SymbolMatch sound={sound} onFinish={finish} />}
            </div>
          )}

          {phase === "result" && result && (
            <div className="mw-result">
              {result.rank <= 3 && <Confetti />}
              <span className="mw-result-medal" aria-hidden="true">{MEDALS[result.rank - 1] ?? "🎉"}</span>
              <h2>
                {result.rank <= 3 ? "You're on the podium" : "Well played"}, {player.name}!
              </h2>
              <p className="mw-result-score">
                <b>{result.score.toLocaleString("en-US")}</b> points
              </p>
              <p className="mw-result-detail">
                {result.detail} · Rank <b>#{result.rank}</b> in {GAME_NAMES[active]}
              </p>
              <ol className="mw-mini-board">
                {top(active, 5).map((e, i) => (
                  <li key={e.id} className={e.id === result.entryId ? "is-me" : ""}>
                    <span>{MEDALS[i] ?? `#${i + 1}`}</span>
                    <b>{e.name}</b>
                    <span>{e.score.toLocaleString("en-US")}</span>
                  </li>
                ))}
              </ol>
              <div className="mw-result-actions">
                <button type="button" className="btn btn-primary" onClick={() => openGame(active)}>
                  ↻ Next player
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeGame}>
                  All games
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------- Full-screen leaderboard (for a projector or a second screen) ---------- */}
      {boardFull && (
        <div className="mw-stage mw-stage--board" role="dialog" aria-modal="true" aria-label="Leaderboard">
          <div className="mw-stage-bar">
            <b>🏆 Leaderboard</b>
            <button type="button" className="mw-x" onClick={() => setBoardFull(false)} aria-label="Close leaderboard">
              ✕
            </button>
          </div>
          <div className="mw-board-full">
            {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
              <div className="mw-board-col" key={g}>
                <h3>{GAME_NAMES[g]}</h3>
                <BoardList list={top(g, 10)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {adminOpen && (
        <Admin
          unlocked={unlocked}
          setUnlocked={setUnlocked}
          entries={entries}
          setEntries={setEntries}
          settings={settings}
          setSettings={(s) => {
            setSettings(s);
            saveSettings(s);
          }}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </main>
  );
}

function BoardList({ list, onDelete }: { list: Entry[]; onDelete?: (id: string) => void }) {
  if (!list.length) return <p className="mw-empty">No scores yet. Be the first!</p>;
  return (
    <ol className="mw-board">
      {list.map((e, i) => (
        <li key={e.id} className={i < 3 ? "is-top" : ""}>
          <span className="mw-rank">{MEDALS[i] ?? i + 1}</span>
          <span className="mw-who">
            <b>{e.name}</b>
            {e.org && <small>{e.org}</small>}
          </span>
          <span className="mw-detail">{e.detail}</span>
          <b className="mw-points">{e.score.toLocaleString("en-US")}</b>
          {onDelete && (
            <button type="button" className="mw-del" onClick={() => onDelete(e.id)} aria-label={`Delete ${e.name}'s score`}>
              ✕
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}

function Leaderboard({ entries, board, setBoard, onFull }: { entries: Entry[]; board: GameId; setBoard: (g: GameId) => void; onFull: () => void }) {
  return (
    <div className="mw-leader">
      <div className="mw-leader-head">
        <div>
          <span className="mw-kicker">Leaderboard</span>
          <h2>
            Top players <span className="serif">today.</span>
          </h2>
        </div>
        <button type="button" className="btn btn-secondary" onClick={onFull}>
          ⛶ Full screen
        </button>
      </div>
      <div className="mw-tabs" role="tablist">
        {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
          <button type="button" role="tab" aria-selected={board === g} key={g} className={board === g ? "is-on" : ""} onClick={() => setBoard(g)}>
            {GAME_NAMES[g]} <small>{entries.filter((e) => e.game === g).length}</small>
          </button>
        ))}
      </div>
      <BoardList list={ranked(entries, board).slice(0, 10)} />
    </div>
  );
}

function Admin({
  unlocked,
  setUnlocked,
  entries,
  setEntries,
  settings,
  setSettings,
  onClose,
}: {
  unlocked: boolean;
  setUnlocked: (v: boolean) => void;
  entries: Entry[];
  setEntries: (e: Entry[]) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  onClose: () => void;
}) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<GameId>("bin-rush");
  const [confirm, setConfirm] = useState<string | null>(null);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function unlock(e: FormEvent) {
    e.preventDefault();
    if (await checkPassword(pw)) {
      setUnlocked(true);
      setErr("");
      setPw("");
    } else setErr("Incorrect password.");
  }

  /** Destructive actions need a second tap within 4 seconds. */
  function twice(key: string, action: () => void) {
    if (confirm === key) {
      action();
      setConfirm(null);
      return;
    }
    setConfirm(key);
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    confirmTimer.current = setTimeout(() => setConfirm(null), 4000);
  }

  function update(list: Entry[]) {
    saveEntries(list);
    setEntries(list);
  }

  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  const num = (k: keyof Settings, v: number) => setSettings({ ...settings, [k]: v });

  return (
    <div className="mw-modal" role="dialog" aria-modal="true" aria-label="Admin">
      <div className="mw-modal-box">
        <div className="mw-stage-bar">
          <b>🔒 Admin</b>
          <button type="button" className="mw-x" onClick={onClose} aria-label="Close admin">
            ✕
          </button>
        </div>
        {!unlocked ? (
          <form className="mw-admin-login" onSubmit={unlock}>
            <label>
              Password
              <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="off" />
            </label>
            {err && <p className="mw-err">{err}</p>}
            <button className="btn btn-primary" type="submit">
              Unlock
            </button>
          </form>
        ) : (
          <div className="mw-admin">
            <div className="mw-admin-row">
              <span>
                <b>{entries.length}</b> scores saved on this device
              </span>
              <button type="button" className="btn btn-primary" onClick={() => download(`medical-waste-leaderboard-${stamp}.csv`, toCsv(entries))} disabled={!entries.length}>
                ⬇ Export CSV
              </button>
            </div>

            <h4>Reset</h4>
            <div className="mw-admin-btns">
              {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
                <button type="button" key={g} className="btn btn-secondary" onClick={() => twice(`reset-${g}`, () => update(entries.filter((e) => e.game !== g)))}>
                  {confirm === `reset-${g}` ? "Tap again to confirm" : `Reset ${GAME_NAMES[g]}`}
                </button>
              ))}
              <button type="button" className="btn mw-danger" onClick={() => twice("reset-all", () => update([]))}>
                {confirm === "reset-all" ? "Tap again to delete everything" : "Reset all leaderboards"}
              </button>
            </div>
            <p className="mw-hint">Tip: export a CSV before resetting. Deleted scores can&apos;t be recovered.</p>

            <h4>Remove a score</h4>
            <div className="mw-tabs" role="tablist">
              {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
                <button type="button" role="tab" aria-selected={tab === g} key={g} className={tab === g ? "is-on" : ""} onClick={() => setTab(g)}>
                  {GAME_NAMES[g]}
                </button>
              ))}
            </div>
            <BoardList list={ranked(entries, tab)} onDelete={(id) => twice(`del-${id}`, () => update(entries.filter((e) => e.id !== id)))} />
            {confirm?.startsWith("del-") && <p className="mw-hint">Tap ✕ again to delete that score.</p>}

            <h4>Game settings</h4>
            <div className="mw-settings">
              <label>
                Bin Rush time
                <select value={settings.binRushSeconds} onChange={(e) => num("binRushSeconds", +e.target.value)}>
                  {[45, 60, 90, 120].map((v) => (
                    <option key={v} value={v}>{v} seconds</option>
                  ))}
                </select>
              </label>
              <label>
                Bin Rush lives
                <select value={settings.binRushLives} onChange={(e) => num("binRushLives", +e.target.value)}>
                  {[3, 5].map((v) => (
                    <option key={v} value={v}>{v} lives</option>
                  ))}
                </select>
              </label>
              <label>
                Code Breaker questions
                <select value={settings.quizQuestions} onChange={(e) => num("quizQuestions", +e.target.value)}>
                  {[5, 10, 15].map((v) => (
                    <option key={v} value={v}>{v} questions</option>
                  ))}
                </select>
              </label>
              <label>
                Seconds per question
                <select value={settings.quizSeconds} onChange={(e) => num("quizSeconds", +e.target.value)}>
                  {[10, 15, 20].map((v) => (
                    <option key={v} value={v}>{v} seconds</option>
                  ))}
                </select>
              </label>
              <label className="mw-check">
                <input type="checkbox" checked={settings.sound} onChange={(e) => setSettings({ ...settings, sound: e.target.checked })} />
                Sound effects
              </label>
            </div>
            <p className="mw-hint">Changing settings affects new games only. Scores from different settings stay on the same leaderboard.</p>

            <div className="mw-admin-row">
              <button type="button" className="btn btn-secondary" onClick={() => setUnlocked(false)}>
                🔒 Lock admin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 2.2 + Math.random() * 1.6,
        color: ["#6C4DF6", "#F55FA0", "#FF7A45", "#7CCBF6", "#F5E62A", "#D7252E"][i % 6],
        rot: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="mw-confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i key={i} style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, transform: `rotate(${p.rot}deg)` }} />
      ))}
    </div>
  );
}
