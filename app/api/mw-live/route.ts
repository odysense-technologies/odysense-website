import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { ADMIN_HASH } from "@/components/events/medical-waste/auth";
import { normalizeContent, normalizeSettings, type GameId } from "@/components/events/medical-waste/store";
import { DB_URL, maxRoundMs, store, type Room } from "@/lib/mw-live";

/**
 * Live rooms API for the MoPH Medical Waste Segregation Challenge.
 *   GET  ?room=1234[&content=1]   room state, players and the current round's scores (polled every ~2 s)
 *   GET  ?status=1                whether a database is configured (db) and answering (dbOk)
 *   POST { action, ... }          create | start | end | next | kick (host, password) · join | score (players)
 */
export const dynamic = "force-dynamic";

const GAMES: GameId[] = ["bin-rush", "code-breaker", "symbol-match"];
const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const isHost = (pw: unknown) => typeof pw === "string" && createHash("sha256").update(pw).digest("hex") === ADMIN_HASH;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max) : "");
const roomCode = (v: unknown) => (typeof v === "string" && /^\d{4}$/.test(v) ? v : "");

/** Ends a live round once everyone has finished, or when its time is well past. */
async function settle(room: Room, playerCount: number, finished: number): Promise<Room> {
  if (room.status !== "live" || !room.startAt) return room;
  const allDone = playerCount > 0 && finished >= playerCount;
  const timedOut = Date.now() > room.startAt + maxRoundMs(room);
  if (!allDone && !timedOut) return room;
  await store.updateRoom(room.code, { status: "ended" });
  return { ...room, status: "ended" };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("status")) {
    // db: a connection string is set; dbOk: a real query succeeded (tables are created on first use).
    if (!DB_URL) return json({ ok: true, db: false, dbOk: false });
    try {
      const rooms = await store.health();
      return json({ ok: true, db: true, dbOk: true, rooms });
    } catch (e) {
      const msg = String(e instanceof Error ? e.message : e).replace(/postgres(ql)?:\/\/\S+/gi, "[connection string]").slice(0, 160);
      return json({ ok: true, db: true, dbOk: false, error: msg });
    }
  }
  const code = roomCode(url.searchParams.get("room"));
  if (!code) return json({ ok: false, error: "Enter the 4-digit room code." }, 400);
  try {
    let room = await store.getRoom(code);
    if (!room) return json({ ok: false, error: "Room not found. Check the code with the host." }, 404);
    const [players, scores] = await Promise.all([store.players(code), store.scores(code, room.round)]);
    const ids = new Set(players.map((p) => p.id));
    room = await settle(room, players.length, scores.filter((s) => s.finished && ids.has(s.playerId)).length);
    const content = url.searchParams.get("content") ? await store.getContent(code) : undefined;
    return json({ ok: true, now: Date.now(), room, players, scores: scores.filter((s) => ids.has(s.playerId)), content });
  } catch (e) {
    console.error("mw-live GET failed", e);
    return json({ ok: false, error: "The game server is busy. Trying again…" }, 503);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
  const action = body.action;
  try {
    if (action === "create") {
      if (!isHost(body.password)) return json({ ok: false, error: "Incorrect admin password." }, 401);
      if (!DB_URL && process.env.VERCEL_ENV === "production") {
        return json({ ok: false, error: "Live mode needs the database connected first (Vercel → Storage → Neon)." }, 503);
      }
      const game = GAMES.includes(body.game as GameId) ? (body.game as GameId) : "bin-rush";
      const maxPlayers = Math.min(500, Math.max(2, Math.round(Number(body.maxPlayers) || 50)));
      const content = normalizeContent(body.content as never);
      if (JSON.stringify(content).length > 600_000) return json({ ok: false, error: "The content is too large. Use smaller symbol images." }, 413);
      const code = await store.createRoom(
        { game, maxPlayers, status: "lobby", round: 1, seed: Math.floor(Math.random() * 2 ** 31), startAt: null, settings: normalizeSettings(body.settings as never) },
        content,
      );
      return json({ ok: true, code });
    }

    const code = roomCode(body.room);
    if (!code) return json({ ok: false, error: "Enter the 4-digit room code." }, 400);
    const room = await store.getRoom(code);
    if (!room) return json({ ok: false, error: "Room not found. Check the code with the host." }, 404);

    if (action === "join") {
      const name = clean(body.name, 24);
      if (!name) return json({ ok: false, error: "Please enter your name." }, 400);
      const player = await store.addPlayer(code, room.maxPlayers, name, clean(body.org, 40));
      if (!player) return json({ ok: false, error: `This room is full (${room.maxPlayers} players).` }, 409);
      return json({ ok: true, player });
    }

    if (action === "score") {
      const playerId = clean(body.playerId, 64);
      const round = Math.round(Number(body.round));
      if (round !== room.round) return json({ ok: true, ignored: "old round" });
      const players = await store.players(code);
      if (!players.some((p) => p.id === playerId)) return json({ ok: false, error: "You're no longer in this room." }, 403);
      await store.upsertScore(code, round, {
        playerId,
        score: Math.min(100_000, Math.max(0, Math.round(Number(body.score) || 0))),
        detail: clean(body.detail, 80),
        finished: Boolean(body.finished),
      });
      return json({ ok: true, status: room.status, round: room.round });
    }

    // Everything below is a host action.
    if (!isHost(body.password)) return json({ ok: false, error: "Incorrect admin password." }, 401);

    if (action === "start") {
      await store.updateRoom(code, { status: "live", startAt: Date.now() + 5000 });
      return json({ ok: true });
    }
    if (action === "end") {
      await store.updateRoom(code, { status: "ended" });
      return json({ ok: true });
    }
    if (action === "next") {
      const game = GAMES.includes(body.game as GameId) ? (body.game as GameId) : room.game;
      const patch: Partial<Room> = { status: "lobby", round: room.round + 1, seed: Math.floor(Math.random() * 2 ** 31), startAt: null, game };
      if (body.settings) patch.settings = normalizeSettings(body.settings as never);
      if (body.maxPlayers) patch.maxPlayers = Math.min(500, Math.max(2, Math.round(Number(body.maxPlayers))));
      await store.updateRoom(code, patch);
      return json({ ok: true });
    }
    if (action === "kick") {
      await store.removePlayer(code, clean(body.playerId, 64));
      return json({ ok: true });
    }
    return json({ ok: false, error: "Unknown action." }, 400);
  } catch (e) {
    console.error("mw-live POST failed", e);
    return json({ ok: false, error: "The game server is busy. Please try again." }, 503);
  }
}
