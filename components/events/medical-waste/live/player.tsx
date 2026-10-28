"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { BinRush } from "../bin-rush";
import { CodeBreaker } from "../code-breaker";
import { SymbolMatch } from "../symbol-match";
import { SymbolProvider } from "../symbols";
import { makeSound } from "../sound";
import type { Content } from "../data";
import { GAME_NAMES, type GameId } from "../store";
import { fetchRoom, post, rankRows, type Player, type RoomState } from "./client";

const GAME_ICONS: Record<GameId, string> = { "bin-rush": "🗑️", "code-breaker": "🏷️", "symbol-match": "🧩" };
const HOW: Record<GameId, string> = {
  "bin-rush": "Tap the right bin for each waste item before its timer runs out. Streaks and speed earn bonus points.",
  "code-breaker": "Answer quick questions on colour codes, labels and hazard symbols. Faster right answers score more.",
  "symbol-match": "Flip two cards at a time to pair each symbol or label with its waste category. Be quick and avoid mismatches.",
};
const MEDALS = ["🥇", "🥈", "🥉"];
const playerKey = (code: string) => `moph-live-player-${code}`;

/**
 * The attendee's phone: join a room by QR code, wait in the lobby, play the round when the host starts
 * it (same items and questions for everyone), and see the live ranking.
 */
export function LivePlayer({ initialRoom }: { initialRoom: string }) {
  const [code, setCode] = useState(initialRoom);
  const [codeInput, setCodeInput] = useState(initialRoom);
  const [state, setState] = useState<RoomState | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [me, setMe] = useState<Player | null>(null);
  const [form, setForm] = useState({ name: "", org: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [playedRound, setPlayedRound] = useState(0); // the round this phone finished
  const [final, setFinal] = useState<{ score: number; detail: string } | null>(null);
  const offset = useRef(0);
  const progress = useRef({ score: 0, detail: "" });
  const lastSent = useRef(0);

  // Restore this phone's player after a refresh.
  useEffect(() => {
    if (!code) return;
    try {
      const saved = sessionStorage.getItem(playerKey(code));
      if (saved) setMe(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, [code]);

  const refresh = useCallback(async () => {
    if (!code) return;
    const r = await fetchRoom(code, !content);
    if (!r.ok) {
      setErr(r.error);
      return;
    }
    offset.current = r.now - Date.now();
    if (r.content) setContent(r.content);
    setState(r);
    setErr("");
    // Removed by the host?
    if (me && !r.players.some((p) => p.id === me.id)) {
      setMe(null);
      try {
        sessionStorage.removeItem(playerKey(code));
      } catch {
        /* ignore */
      }
      setErr("You were removed from the room. You can join again.");
    }
  }, [code, content, me]);

  useEffect(() => {
    if (!code) return;
    refresh();
    const id = setInterval(refresh, 2000);
    return () => clearInterval(id);
  }, [code, refresh]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, []);

  const room = state?.room;
  const settings = room?.settings;
  const sound = useMemo(() => makeSound(settings?.sound ?? true), [settings?.sound]);

  // New round started by the host: reset this phone's result.
  useEffect(() => {
    if (room && playedRound && room.round !== playedRound && room.status === "lobby") {
      setPlayedRound(0);
      setFinal(null);
    }
  }, [room, playedRound]);

  async function join(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setBusy(true);
    const r = await post<{ player: Player }>({ action: "join", room: code, name: form.name, org: form.org });
    setBusy(false);
    if (!r.ok) return setErr(r.error);
    setMe(r.player);
    setErr("");
    try {
      sessionStorage.setItem(playerKey(code), JSON.stringify(r.player));
    } catch {
      /* ignore */
    }
    refresh();
  }

  const sendScore = useCallback(
    async (score: number, detail: string, finished: boolean) => {
      if (!me || !room) return;
      lastSent.current = Date.now();
      await post({ action: "score", room: code, playerId: me.id, round: room.round, score, detail, finished });
    },
    [me, room, code],
  );

  // Throttled live score updates while playing (every ~2 s).
  const onProgress = useCallback(
    (score: number, detail: string) => {
      progress.current = { score, detail };
      if (Date.now() - lastSent.current > 2000) sendScore(score, detail, false);
    },
    [sendScore],
  );

  const onFinish = useCallback(
    (score: number, detail: string) => {
      if (!room) return;
      setFinal({ score, detail });
      setPlayedRound(room.round);
      sendScore(score, detail, true);
    },
    [room, sendScore],
  );

  // Host ended the round while this phone was still playing: submit what we have.
  const serverNow = now + offset.current;
  const playing = Boolean(me && room?.status === "live" && room.startAt && room.startAt <= serverNow && playedRound !== room.round);
  const wasPlaying = useRef(false);
  useEffect(() => {
    if (wasPlaying.current && !playing && room && room.status === "ended" && playedRound !== room.round) {
      setFinal(progress.current);
      setPlayedRound(room.round);
      sendScore(progress.current.score, progress.current.detail, true);
    }
    wasPlaying.current = playing;
  }, [playing, room, playedRound, sendScore]);

  /* ---------------------------------------------------------------- views */

  if (!code) {
    return (
      <main className="mw mw-phone">
        <form
          className="mw-phone-card"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\d{4}$/.test(codeInput)) setCode(codeInput);
            else setErr("Enter the 4-digit room code shown on the screen.");
          }}
        >
          <span className="mw-kicker">Medical Waste Live Challenge</span>
          <h1>Join a game</h1>
          <label>
            Room code
            <input inputMode="numeric" maxLength={4} value={codeInput} onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, ""))} placeholder="1234" autoFocus />
          </label>
          {err && <p className="mw-err">{err}</p>}
          <button className="btn btn-primary mw-start" type="submit">
            Continue →
          </button>
        </form>
      </main>
    );
  }

  if (!state || !room || !content || !settings) {
    return (
      <main className="mw mw-phone">
        <div className="mw-phone-card">
          <span className="mw-kicker">Room {code}</span>
          <h1>{err ? "Couldn't open the room" : "Connecting…"}</h1>
          {err && <p className="mw-err">{err}</p>}
          {err && (
            <button type="button" className="btn btn-secondary" onClick={() => setCode("")}>
              Enter a different code
            </button>
          )}
        </div>
      </main>
    );
  }

  const rows = rankRows(state.players, state.scores);
  const mine = me ? rows.find((r) => r.player.id === me.id) : undefined;

  if (!me) {
    return (
      <main className="mw mw-phone">
        <form className="mw-phone-card" onSubmit={join}>
          <span className="mw-kicker">Room {code} · {state.players.length}/{room.maxPlayers} joined</span>
          <span className="mw-game-icon mw-game-icon--big" aria-hidden="true">{GAME_ICONS[room.game]}</span>
          <h1>{GAME_NAMES[room.game]}</h1>
          <p className="mw-tagline">{HOW[room.game]}</p>
          <label>
            Your name <em>(shown on the leaderboard)</em>
            <input required maxLength={24} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fatima A." autoFocus />
          </label>
          <label>
            Organisation <em>(optional)</em>
            <input maxLength={40} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="Hospital, clinic or company" />
          </label>
          {err && <p className="mw-err">{err}</p>}
          <button className="btn btn-primary mw-start" type="submit" disabled={busy || !form.name.trim() || state.players.length >= room.maxPlayers}>
            {state.players.length >= room.maxPlayers ? "Room is full" : busy ? "Joining…" : "Join the game →"}
          </button>
        </form>
      </main>
    );
  }

  // Countdown before the round starts
  if (room.status === "live" && room.startAt && room.startAt > serverNow && playedRound !== room.round) {
    return (
      <main className="mw mw-phone mw-phone--count">
        <p className="mw-kicker">{GAME_NAMES[room.game]} starts in</p>
        <span className="mw-count">{Math.ceil((room.startAt - serverNow) / 1000)}</span>
        <p className="mw-tagline">{HOW[room.game]}</p>
      </main>
    );
  }

  // Playing
  if (playing) {
    const props = { settings, content, sound, seed: room.seed, onFinish, onProgress };
    return (
      <SymbolProvider symbols={content.symbols}>
        <main className="mw mw-phone mw-phone--play">
          <div className="mw-stage mw-stage--phone">
            <div className="mw-stage-bar">
              <b>
                <span aria-hidden="true">{GAME_ICONS[room.game]}</span> {GAME_NAMES[room.game]}
              </b>
              <span className="mw-stage-player">{me.name}</span>
            </div>
            <div className="mw-play-area" key={`${room.round}`}>
              {room.game === "bin-rush" && <BinRush {...props} />}
              {room.game === "code-breaker" && <CodeBreaker {...props} />}
              {room.game === "symbol-match" && <SymbolMatch {...props} />}
            </div>
          </div>
        </main>
      </SymbolProvider>
    );
  }

  // Finished this round (live or ended)
  if (playedRound === room.round && final) {
    const done = room.status === "ended";
    return (
      <main className="mw mw-phone">
        <div className="mw-phone-card mw-result">
          <span className="mw-result-medal" aria-hidden="true">{mine && mine.rank <= 3 ? MEDALS[mine.rank - 1] : "🎉"}</span>
          <h1>{done ? "Round over!" : "Nice work!"}</h1>
          <p className="mw-result-score">
            <b>{final.score.toLocaleString("en-US")}</b> points
          </p>
          <p className="mw-result-detail">
            {final.detail}
            {mine && (
              <>
                {" "}
                · {done ? "Final rank" : "Rank right now"} <b>#{mine.rank}</b> of {rows.length}
              </>
            )}
          </p>
          <ol className="mw-mini-board">
            {rows.slice(0, 5).map((r) => (
              <li key={r.player.id} className={r.player.id === me.id ? "is-me" : ""}>
                <span>{MEDALS[r.rank - 1] ?? `#${r.rank}`}</span>
                <b>{r.player.name}</b>
                <span>{r.score.toLocaleString("en-US")}</span>
              </li>
            ))}
          </ol>
          <p className="mw-hint">{done ? "Stay on this page: the host may start another round." : "Waiting for the other players to finish…"}</p>
        </div>
      </main>
    );
  }

  // Lobby, or a round that ended before this phone played
  return (
    <main className="mw mw-phone">
      <div className="mw-phone-card">
        <span className="mw-kicker">Room {code} · Round {room.round}</span>
        <span className="mw-game-icon mw-game-icon--big" aria-hidden="true">{GAME_ICONS[room.game]}</span>
        <h1>You&apos;re in, {me.name}!</h1>
        <p className="mw-tagline">
          {room.status === "ended" ? "This round has finished. Wait here for the next one." : `Waiting for the host to start ${GAME_NAMES[room.game]}…`}
        </p>
        <p className="mw-hint">{HOW[room.game]}</p>
        <div className="mw-lobby-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <p className="mw-hint">
          {state.players.length} player{state.players.length === 1 ? "" : "s"} joined · keep this screen open
        </p>
        {err && <p className="mw-err">{err}</p>}
      </div>
    </main>
  );
}

