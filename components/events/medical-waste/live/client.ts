"use client";

import type { Content } from "../data";
import type { GameId, Settings } from "../store";

/** Client side of the live rooms API (app/api/mw-live/route.ts). */
export const API = "/api/mw-live/";
export const BASE = "/events/moph-medical-waste-challenge";

export type RoomStatus = "lobby" | "live" | "ended";
export type Room = { code: string; game: GameId; maxPlayers: number; status: RoomStatus; round: number; seed: number; startAt: number | null; settings: Settings; createdAt: number };
export type Player = { id: string; name: string; org: string; joinedAt: number };
export type Score = { playerId: string; score: number; detail: string; finished: boolean; updatedAt: number };
export type RoomState = { ok: true; now: number; room: Room; players: Player[]; scores: Score[]; content?: Content };
type Fail = { ok: false; error: string };

export async function fetchRoom(code: string, withContent = false): Promise<RoomState | Fail> {
  try {
    const r = await fetch(`${API}?room=${encodeURIComponent(code)}${withContent ? "&content=1" : ""}&t=${Date.now()}`, { cache: "no-store" });
    return await r.json();
  } catch {
    return { ok: false, error: "Can't reach the game server. Check your connection." };
  }
}

export async function post<T = Record<string, unknown>>(body: Record<string, unknown>): Promise<({ ok: true } & T) | Fail> {
  try {
    const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return await r.json();
  } catch {
    return { ok: false, error: "Can't reach the game server. Check your connection." };
  }
}

export async function dbStatus(): Promise<boolean | null> {
  try {
    const r = await fetch(`${API}?status=1`, { cache: "no-store" });
    const j = await r.json();
    return Boolean(j.db && j.dbOk);
  } catch {
    return null;
  }
}

export type Row = { player: Player; score: number; detail: string; finished: boolean; started: boolean; rank: number };

/** Every joined player with their score this round, best first (ties: whoever got there first). */
export function rankRows(players: Player[], scores: Score[]): Row[] {
  const by = new Map(scores.map((s) => [s.playerId, s]));
  return players
    .map((p) => {
      const s = by.get(p.id);
      return { player: p, score: s?.score ?? 0, detail: s?.detail ?? "", finished: Boolean(s?.finished), started: Boolean(s), at: s?.updatedAt ?? Infinity };
    })
    .sort((a, b) => b.score - a.score || Number(b.finished) - Number(a.finished) || a.at - b.at)
    .map((r, i) => ({ player: r.player, score: r.score, detail: r.detail, finished: r.finished, started: r.started, rank: i + 1 }));
}

export const joinUrl = (code: string) => (typeof window === "undefined" ? `${BASE}/join/?room=${code}` : `${window.location.origin}${BASE}/join/?room=${code}`);
