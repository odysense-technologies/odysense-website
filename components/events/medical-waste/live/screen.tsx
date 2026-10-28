"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_NAMES, type GameId } from "../store";
import { fetchRoom, joinUrl, rankRows, type RoomState } from "./client";
import { QR } from "./qr";

const GAME_ICONS: Record<GameId, string> = { "bin-rush": "🗑️", "code-breaker": "🏷️", "symbol-match": "🧩" };
const MEDALS = ["🥇", "🥈", "🥉"];

/**
 * Big-screen display for a projector or TV: QR code and joined players in the lobby, a live leaderboard
 * during the round, and the podium at the end. Read-only; it just polls the room.
 */
export function LiveScreen({ initialRoom }: { initialRoom: string }) {
  const [code, setCode] = useState(initialRoom);
  const [input, setInput] = useState("");
  const [state, setState] = useState<RoomState | null>(null);
  const [err, setErr] = useState("");
  const [now, setNow] = useState(Date.now());
  const offset = useRef(0);

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
    const id = setInterval(refresh, 1500);
    return () => clearInterval(id);
  }, [code, refresh]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  if (!code) {
    return (
      <main className="mw mw-screen">
        <form
          className="mw-phone-card"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\d{4}$/.test(input)) setCode(input);
          }}
        >
          <h1>Leaderboard screen</h1>
          <label>
            Room code
            <input inputMode="numeric" maxLength={4} value={input} onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))} autoFocus />
          </label>
          <button className="btn btn-primary" type="submit">
            Show leaderboard
          </button>
        </form>
      </main>
    );
  }

  const room = state?.room;
  const rows = state ? rankRows(state.players, state.scores) : [];
  const url = joinUrl(code);
  const serverNow = now + offset.current;
  const countdown = room?.status === "live" && room.startAt && room.startAt > serverNow ? Math.ceil((room.startAt - serverNow) / 1000) : 0;
  const top = Math.max(1, ...rows.map((r) => r.score));
  const finished = rows.filter((r) => r.finished).length;
  const podium = rows.filter((r) => r.score > 0).slice(0, 3);

  async function fullscreen() {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* not allowed */
    }
  }

  return (
    <main className="mw mw-screen">
      <header className="mw-screen-head">
        <div>
          <span className="mw-kicker">Medical Waste Management Conference · Live Challenge</span>
          <h1>
            {room ? (
              <>
                {GAME_ICONS[room.game]} {GAME_NAMES[room.game]} <span className="serif">· round {room.round}</span>
              </>
            ) : (
              "Connecting…"
            )}
          </h1>
        </div>
        <div className="mw-screen-meta">
          <span className={`mw-pill mw-pill--${room?.status ?? "lobby"}`}>
            {countdown ? `Starting in ${countdown}` : room?.status === "live" ? "● Live" : room?.status === "ended" ? "Final results" : "Join now"}
          </span>
          <span>
            {state?.players.length ?? 0} / {room?.maxPlayers ?? "–"} players{room?.status === "live" ? ` · ${finished} finished` : ""}
          </span>
          <button type="button" className="mw-link" onClick={fullscreen}>
            ⛶ Full screen
          </button>
        </div>
      </header>
      {err && <p className="mw-err">{err}</p>}

      {/* Lobby: big QR and the names as they join */}
      {room?.status === "lobby" && (
        <section className="mw-screen-lobby">
          <div className="mw-screen-qr">
            <QR value={url} size={360} />
            <p>
              Scan to join · or go to <b>{url.replace(/^https?:\/\//, "").replace(/\?room=.*/, "")}</b> and enter room <b>{code}</b>
            </p>
          </div>
          <div className="mw-screen-names">
            <h2>
              {state?.players.length ? (
                <>
                  {state.players.length} <span className="serif">ready to play</span>
                </>
              ) : (
                <>
                  Waiting for <span className="serif">players…</span>
                </>
              )}
            </h2>
            <div className="mw-chips">
              {state?.players.map((p) => (
                <span className="mw-name-chip" key={p.id}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {countdown > 0 && (
        <section className="mw-screen-count">
          <span className="mw-count">{countdown}</span>
        </section>
      )}

      {/* Live leaderboard / final results */}
      {room && room.status !== "lobby" && !countdown && (
        <section className="mw-screen-board">
          {room.status === "ended" && podium.length > 0 && (
            <div className="mw-podium">
              {[1, 0, 2].map((i) =>
                podium[i] ? (
                  <div className={`mw-podium-step mw-podium-step--${i + 1}`} key={podium[i].player.id}>
                    <span className="mw-podium-medal">{MEDALS[i]}</span>
                    <b>{podium[i].player.name}</b>
                    {podium[i].player.org && <small>{podium[i].player.org}</small>}
                    <span className="mw-podium-score">{podium[i].score.toLocaleString("en-US")}</span>
                    <span className="mw-podium-block">{i + 1}</span>
                  </div>
                ) : null,
              )}
            </div>
          )}
          <ol className="mw-bars">
            {rows.slice(room.status === "ended" ? podium.length : 0, room.status === "ended" ? podium.length + 10 : 12).map((r) => (
              <li key={r.player.id} className={r.finished ? "is-done" : ""}>
                <span className="mw-bars-rank">{r.rank <= 3 && r.score > 0 ? MEDALS[r.rank - 1] : r.rank}</span>
                <span className="mw-bars-name">
                  <b>{r.player.name}</b>
                  {r.player.org && <small>{r.player.org}</small>}
                </span>
                <span className="mw-bars-track">
                  <i style={{ width: `${(r.score / top) * 100}%` }} />
                </span>
                <b className="mw-bars-score">
                  {r.score.toLocaleString("en-US")}
                  {r.finished && " ✓"}
                </b>
              </li>
            ))}
          </ol>
          {room.status === "live" && (
            <div className="mw-screen-mini-qr">
              <QR value={url} size={120} />
              <small>Late? Scan to join · room {code}</small>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
