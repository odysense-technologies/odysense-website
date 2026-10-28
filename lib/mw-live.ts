/**
 * Live rooms for the MoPH Medical Waste Segregation Challenge (multiplayer on phones).
 *
 * Storage: Postgres (Neon, via DATABASE_URL or POSTGRES_URL) in production. Without a database the
 * rooms live in this server process's memory, which is fine for local testing but NOT on Vercel, where
 * requests land on different instances; the API refuses to create rooms in production without one.
 */
import type { Content } from "@/components/events/medical-waste/data";
import type { GameId, Settings } from "@/components/events/medical-waste/store";

export type RoomStatus = "lobby" | "live" | "ended";

export type Room = {
  code: string;
  game: GameId;
  maxPlayers: number;
  status: RoomStatus;
  round: number;
  seed: number;
  startAt: number | null; // ms epoch: when the current round starts (after the countdown)
  settings: Settings;
  createdAt: number;
};

export type Player = { id: string; name: string; org: string; joinedAt: number };
export type Score = { playerId: string; score: number; detail: string; finished: boolean; updatedAt: number };

export const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

export interface Store {
  createRoom(room: Omit<Room, "code" | "createdAt">, content: Content): Promise<string>;
  getRoom(code: string): Promise<Room | null>;
  getContent(code: string): Promise<Content | null>;
  updateRoom(code: string, patch: Partial<Room>): Promise<void>;
  addPlayer(code: string, max: number, name: string, org: string): Promise<Player | null>;
  removePlayer(code: string, id: string): Promise<void>;
  players(code: string): Promise<Player[]>;
  upsertScore(code: string, round: number, s: Omit<Score, "updatedAt">): Promise<void>;
  scores(code: string, round: number): Promise<Score[]>;
  /** Round-trip check: sets up the tables if needed and counts the rooms */
  health(): Promise<number>;
}

const newCode = () => String(1000 + Math.floor(Math.random() * 9000));
const newId = () => crypto.randomUUID();

/* ------------------------------------------------------------- memory store */

type Mem = { rooms: Map<string, Room & { content: Content }>; players: Map<string, Player[]>; scores: Map<string, Map<string, Score>> };
const g = globalThis as unknown as { __mwLive?: Mem };
const mem: Mem = (g.__mwLive ??= { rooms: new Map(), players: new Map(), scores: new Map() });

const memoryStore: Store = {
  async createRoom(room, content) {
    let code = newCode();
    for (let i = 0; i < 50 && mem.rooms.has(code); i++) code = newCode();
    mem.rooms.set(code, { ...room, code, createdAt: Date.now(), content });
    mem.players.set(code, []);
    return code;
  },
  async getRoom(code) {
    const r = mem.rooms.get(code);
    if (!r) return null;
    const { content: _c, ...room } = r;
    return room;
  },
  async getContent(code) {
    return mem.rooms.get(code)?.content ?? null;
  },
  async updateRoom(code, patch) {
    const r = mem.rooms.get(code);
    if (r) mem.rooms.set(code, { ...r, ...patch });
  },
  async addPlayer(code, max, name, org) {
    const list = mem.players.get(code) ?? [];
    if (list.length >= max) return null;
    const p = { id: newId(), name, org, joinedAt: Date.now() };
    mem.players.set(code, [...list, p]);
    return p;
  },
  async removePlayer(code, id) {
    mem.players.set(
      code,
      (mem.players.get(code) ?? []).filter((p) => p.id !== id),
    );
    for (const [k, m] of mem.scores) if (k.startsWith(`${code}:`)) m.delete(id);
  },
  async players(code) {
    return mem.players.get(code) ?? [];
  },
  async upsertScore(code, round, s) {
    const key = `${code}:${round}`;
    const m = mem.scores.get(key) ?? new Map<string, Score>();
    const prev = m.get(s.playerId);
    if (prev?.finished) return;
    m.set(s.playerId, { ...s, updatedAt: Date.now() });
    mem.scores.set(key, m);
  },
  async scores(code, round) {
    return [...(mem.scores.get(`${code}:${round}`)?.values() ?? [])];
  },
  async health() {
    return mem.rooms.size;
  },
};

/* --------------------------------------------------------------- pg store */

export type Q = (text: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;

/** Builds the Postgres store on any query function (Neon in production; an embedded Postgres in tests). */
export function createPgStore(connect: () => Promise<Q>): Store {
  let ready: Promise<void> | null = null;
  async function pg(): Promise<Q> {
    const q = await connect();
    ready ??= (async () => {
      await q(`CREATE TABLE IF NOT EXISTS mw_rooms (code TEXT PRIMARY KEY, data JSONB NOT NULL, content JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
      await q(
        `CREATE TABLE IF NOT EXISTS mw_players (id TEXT PRIMARY KEY, code TEXT NOT NULL, name TEXT NOT NULL, org TEXT NOT NULL DEFAULT '', joined_at TIMESTAMPTZ NOT NULL DEFAULT now())`,
      );
      await q(`CREATE INDEX IF NOT EXISTS mw_players_code ON mw_players (code)`);
      await q(
        `CREATE TABLE IF NOT EXISTS mw_scores (code TEXT NOT NULL, round INT NOT NULL, player_id TEXT NOT NULL, score INT NOT NULL, detail TEXT NOT NULL DEFAULT '', finished BOOLEAN NOT NULL DEFAULT false, updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), PRIMARY KEY (code, round, player_id))`,
      );
    })().catch((e) => {
      ready = null;
      throw e;
    });
    await ready;
    return q;
  }

  return {
    async createRoom(room, content) {
      const q = await pg();
      // Rooms are for one event day; clear out anything older than two days so codes can be reused.
      const old = await q(`DELETE FROM mw_rooms WHERE created_at < now() - interval '2 days' RETURNING code`);
      for (const r of old) {
        await q(`DELETE FROM mw_players WHERE code = $1`, [r.code]);
        await q(`DELETE FROM mw_scores WHERE code = $1`, [r.code]);
      }
      for (let i = 0; i < 30; i++) {
        const code = newCode();
        const rows = await q(`INSERT INTO mw_rooms (code, data, content) VALUES ($1, $2::jsonb, $3::jsonb) ON CONFLICT (code) DO NOTHING RETURNING code`, [
          code,
          JSON.stringify({ ...room, createdAt: Date.now() }),
          JSON.stringify(content),
        ]);
        if (rows.length) return code;
      }
      throw new Error("No free room code");
    },
    async getRoom(code) {
      const rows = await (await pg())(`SELECT data FROM mw_rooms WHERE code = $1`, [code]);
      return rows.length ? ({ ...(rows[0].data as Omit<Room, "code">), code } as Room) : null;
    },
    async getContent(code) {
      const rows = await (await pg())(`SELECT content FROM mw_rooms WHERE code = $1`, [code]);
      return rows.length ? (rows[0].content as Content) : null;
    },
    async updateRoom(code, patch) {
      await (
        await pg()
      )(`UPDATE mw_rooms SET data = data || $2::jsonb WHERE code = $1`, [code, JSON.stringify(patch)]);
    },
    async addPlayer(code, max, name, org) {
      const id = newId();
      const rows = await (
        await pg()
      )(
        `INSERT INTO mw_players (id, code, name, org) SELECT $1, $2, $3, $4 WHERE (SELECT count(*) FROM mw_players WHERE code = $2) < $5
       RETURNING id, name, org, extract(epoch from joined_at) * 1000 AS joined`,
        [id, code, name, org, max],
      );
      return rows.length ? { id, name, org, joinedAt: ms(rows[0].joined) } : null;
    },
    async removePlayer(code, id) {
      const q = await pg();
      await q(`DELETE FROM mw_players WHERE code = $1 AND id = $2`, [code, id]);
      await q(`DELETE FROM mw_scores WHERE code = $1 AND player_id = $2`, [code, id]);
    },
    async players(code) {
      const rows = await (
        await pg()
      )(`SELECT id, name, org, extract(epoch from joined_at) * 1000 AS joined FROM mw_players WHERE code = $1 ORDER BY joined_at`, [code]);
      return rows.map((r) => ({ id: String(r.id), name: String(r.name), org: String(r.org), joinedAt: ms(r.joined) }));
    },
    async upsertScore(code, round, s) {
      await (
        await pg()
      )(
        `INSERT INTO mw_scores (code, round, player_id, score, detail, finished) VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (code, round, player_id) DO UPDATE SET score = EXCLUDED.score, detail = EXCLUDED.detail, finished = EXCLUDED.finished, updated_at = now()
       WHERE mw_scores.finished = false`,
        [code, round, s.playerId, s.score, s.detail, s.finished],
      );
    },
    async scores(code, round) {
      const rows = await (
        await pg()
      )(`SELECT player_id, score, detail, finished, extract(epoch from updated_at) * 1000 AS updated FROM mw_scores WHERE code = $1 AND round = $2`, [
        code,
        round,
      ]);
      return rows.map((r) => ({
        playerId: String(r.player_id),
        score: Number(r.score),
        detail: String(r.detail),
        finished: Boolean(r.finished),
        updatedAt: ms(r.updated),
      }));
    },
    async health() {
      const rows = await (await pg())(`SELECT count(*) AS n FROM mw_rooms`);
      return Number(rows[0]?.n ?? 0);
    },
  };
}

const ms = (v: unknown) => Math.round(Number(v));

const neonStore = createPgStore(async () => {
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(DB_URL);
  return (text, params = []) => sql(text, params) as Promise<Record<string, unknown>[]>;
});

export const store: Store = DB_URL ? neonStore : memoryStore;

/** Longest a round can run before it ends on its own (covers feedback pauses and slow phones). */
export function maxRoundMs(room: Room): number {
  const s = room.settings;
  if (room.game === "bin-rush") return (s.binRushSeconds + 45) * 1000;
  if (room.game === "code-breaker") return (s.quizQuestions * (s.quizSeconds + 2) + 30) * 1000;
  return ((s.matchSeconds || 300) + 30) * 1000;
}
