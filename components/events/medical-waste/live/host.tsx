"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { SettingsEditor } from "../admin-editor";
import { checkPassword, download, GAME_NAMES, loadContent, loadSettings, type GameId, type Settings } from "../store";
import { BASE, dbStatus, fetchRoom, joinUrl, post, rankRows, type RoomState } from "./client";
import { QR } from "./qr";

const GAME_ICONS: Record<GameId, string> = { "bin-rush": "🗑️", "code-breaker": "🏷️", "symbol-match": "🧩" };
const ROOM_KEY = "moph-live-host-room";

/**
 * Host console for a live round: pick the game and the number of attendees, show the QR code,
 * start and end rounds, and watch the scores come in. Opens the big-screen leaderboard in a new tab.
 */
export function LiveHost() {
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [err, setErr] = useState("");
  const [db, setDb] = useState<boolean | null>(null);
  const [game, setGame] = useState<GameId>("bin-rush");
  const [maxPlayers, setMaxPlayers] = useState(30);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [code, setCode] = useState("");
  const [state, setState] = useState<RoomState | null>(null);
  const [busy, setBusy] = useState(false);
  const [nextGame, setNextGame] = useState<GameId>("bin-rush");
  const [resume, setResume] = useState("");
  const [now, setNow] = useState(Date.now());
  const offset = useRef(0);

  useEffect(() => {
    setSettings(loadSettings());
    dbStatus().then(setDb);
    try {
      setResume(sessionStorage.getItem(ROOM_KEY) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!code) return;
    const r = await fetchRoom(code);
    if (r.ok) {
      offset.current = r.now - Date.now();
      setState(r);
      setErr("");
    } else setErr(r.error);
  }, [code]);

  useEffect(() => {
    if (!code) return;
    refresh();
    const id = setInterval(refresh, 2000);
    return () => clearInterval(id);
  }, [code, refresh]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  async function unlock(e: FormEvent) {
    e.preventDefault();
    if (await checkPassword(pw)) {
      setUnlocked(true);
      setErr("");
    } else setErr("Incorrect password.");
  }

  async function create() {
    if (!settings) return;
    setBusy(true);
    const r = await post<{ code: string }>({ action: "create", password: pw, game, maxPlayers, settings, content: loadContent() });
    setBusy(false);
    if (!r.ok) return setErr(r.error);
    openRoom(r.code);
  }

  function openRoom(c: string) {
    setCode(c);
    setState(null);
    try {
      sessionStorage.setItem(ROOM_KEY, c);
    } catch {
      /* ignore */
    }
  }

  async function act(action: string, extra: Record<string, unknown> = {}) {
    setBusy(true);
    const r = await post({ action, room: code, password: pw, ...extra });
    setBusy(false);
    if (!r.ok) setErr(r.error);
    refresh();
  }

  if (!unlocked) {
    return (
      <main className="mw mw-live">
        <form className="mw-live-login" onSubmit={unlock}>
          <span className="mw-kicker">Live multiplayer · Host</span>
          <h1>
            Medical Waste <span className="serif">Live Challenge.</span>
          </h1>
          <p className="mw-lede">Attendees join on their phones with a QR code and compete in the same round, with a live leaderboard on the big screen.</p>
          <label>
            Admin password
            <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="off" />
          </label>
          {err && <p className="mw-err">{err}</p>}
          <button className="btn btn-primary" type="submit">
            Unlock host console
          </button>
          <a className="mw-link" href={`${BASE}/`}>
            ← Back to the booth games
          </a>
        </form>
      </main>
    );
  }

  /* ------------------------------ room not created yet: set it up */
  if (!code) {
    return (
      <main className="mw mw-live">
        <div className="wrap mw-live-setup">
          <span className="mw-kicker">Live multiplayer · Host</span>
          <h1>
            Set up a <span className="serif">live round.</span>
          </h1>
          {db === false && (
            <p className="mw-warnbox">
              <b>Database not connected.</b> Live rooms need one so phones and screens can share scores. In Vercel, open the project → Storage →
              Create Database → Neon (free tier is enough), connect it to Production, then redeploy. Rooms created now only work on a local test server.
            </p>
          )}

          <h2 className="mw-step">1. Choose the game</h2>
          <div className="mw-live-games">
            {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
              <button type="button" key={g} className={`card mw-live-game ${game === g ? "is-on" : ""}`} onClick={() => setGame(g)} aria-pressed={game === g}>
                <span className="mw-game-icon" aria-hidden="true">{GAME_ICONS[g]}</span>
                <b>{GAME_NAMES[g]}</b>
              </button>
            ))}
          </div>

          <h2 className="mw-step">2. Number of attendees</h2>
          <label className="mw-live-max">
            Maximum players in this room
            <input type="number" min={2} max={500} value={maxPlayers} onChange={(e) => setMaxPlayers(Math.min(500, Math.max(2, Number(e.target.value) || 2)))} />
          </label>

          <h2 className="mw-step">3. Timings and rules</h2>
          <button type="button" className="mw-link" onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? "Hide settings" : "Adjust round time, lives, questions…"}
          </button>
          {showSettings && settings && <SettingsEditor settings={settings} onChange={setSettings} />}
          <p className="mw-hint">Questions, items and symbols come from the content saved on this device (edit them in the booth page&apos;s Admin → Content & symbols).</p>

          {err && <p className="mw-err">{err}</p>}
          <div className="mw-admin-btns">
            <button type="button" className="btn btn-primary mw-start" onClick={create} disabled={busy}>
              {busy ? "Creating…" : "Create room & show QR code →"}
            </button>
            {resume && (
              <button type="button" className="btn btn-secondary" onClick={() => openRoom(resume)}>
                Reopen room {resume}
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  /* ------------------------------ room console */
  const room = state?.room;
  const rows = state ? rankRows(state.players, state.scores) : [];
  const url = joinUrl(code);
  const serverNow = now + offset.current;
  const countdown = room?.status === "live" && room.startAt && room.startAt > serverNow ? Math.ceil((room.startAt - serverNow) / 1000) : 0;
  const finished = rows.filter((r) => r.finished).length;

  function exportCsv() {
    if (!state || !room) return;
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [["Room", "Round", "Game", "Rank", "Name", "Organisation", "Score", "Details", "Finished"].map(esc).join(",")];
    rows.forEach((r) => lines.push([room.code, room.round, GAME_NAMES[room.game], r.rank, r.player.name, r.player.org, r.score, r.detail, r.finished ? "yes" : "no"].map(esc).join(",")));
    download(`live-room-${room.code}-round-${room.round}.csv`, "﻿" + lines.join("\r\n"));
  }

  return (
    <main className="mw mw-live">
      <div className="wrap mw-live-console">
        <div className="mw-live-join">
          <QR value={url} size={240} />
          <div>
            <span className="mw-kicker">Join on your phone</span>
            <p className="mw-live-code">
              Room <b>{code}</b>
            </p>
            <p className="mw-live-url">{url.replace(/^https?:\/\//, "")}</p>
            <div className="mw-admin-btns">
              <a className="btn btn-primary" href={`${BASE}/screen/?room=${code}`} target="_blank" rel="noopener">
                🖥 Open leaderboard screen ↗
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => navigator.clipboard?.writeText(url)}>
                Copy join link
              </button>
            </div>
          </div>
        </div>

        <div className="mw-live-panel">
          <div className="mw-live-status">
            <span className={`mw-pill mw-pill--${room?.status ?? "lobby"}`}>
              {countdown ? `Starting in ${countdown}` : room?.status === "live" ? "● Live" : room?.status === "ended" ? "Round over" : "Lobby: waiting for players"}
            </span>
            <b>
              {room ? `${GAME_ICONS[room.game]} ${GAME_NAMES[room.game]} · Round ${room.round}` : "Loading…"}
            </b>
            <span>
              {state?.players.length ?? 0} / {room?.maxPlayers ?? maxPlayers} players{room?.status !== "lobby" && rows.length ? ` · ${finished} finished` : ""}
            </span>
          </div>
          {err && <p className="mw-err">{err}</p>}

          <div className="mw-admin-btns">
            {room?.status === "lobby" && (
              <button type="button" className="btn btn-primary mw-start" disabled={busy || !state?.players.length} onClick={() => act("start")}>
                ▶ Start round {state?.players.length ? `(${state.players.length} players)` : "(waiting for players)"}
              </button>
            )}
            {room?.status === "live" && (
              <button type="button" className="btn mw-danger" disabled={busy} onClick={() => act("end")}>
                ■ End round now
              </button>
            )}
            {room?.status === "ended" && (
              <>
                <select value={nextGame} onChange={(e) => setNextGame(e.target.value as GameId)} aria-label="Game for the next round">
                  {(Object.keys(GAME_NAMES) as GameId[]).map((g) => (
                    <option key={g} value={g}>
                      Next: {GAME_NAMES[g]}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-primary" disabled={busy} onClick={() => act("next", { game: nextGame, settings })}>
                  ↻ New round with the same players
                </button>
              </>
            )}
            <button type="button" className="btn btn-secondary" onClick={exportCsv} disabled={!rows.length}>
              ⬇ Export round CSV
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCode("");
                setState(null);
              }}
            >
              New room
            </button>
          </div>

          <ol className="mw-board mw-live-rows">
            {rows.length === 0 && <p className="mw-empty">No one has joined yet. Ask attendees to scan the QR code.</p>}
            {rows.map((r) => (
              <li key={r.player.id} className={r.rank <= 3 && r.score > 0 ? "is-top" : ""}>
                <span className="mw-rank">{r.score > 0 ? (["🥇", "🥈", "🥉"][r.rank - 1] ?? r.rank) : "·"}</span>
                <span className="mw-who">
                  <b>{r.player.name}</b>
                  {r.player.org && <small>{r.player.org}</small>}
                </span>
                <span className="mw-detail">{r.finished ? "✅ Finished" : r.started ? "⏳ Playing" : room?.status === "lobby" ? "Ready" : "Waiting"}</span>
                <b className="mw-points">{r.score.toLocaleString("en-US")}</b>
                <button type="button" className="mw-del" aria-label={`Remove ${r.player.name}`} onClick={() => act("kick", { playerId: r.player.id })}>
                  ✕
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
