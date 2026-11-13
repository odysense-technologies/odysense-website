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
  /** Participation totals for the event report: counts only, never names or organisations */
  stats(): Promise<Stats>;
}

export type Stats = {
  rooms: number;
  roomsWithPlayers: number;
  players: number;
  organisations: number;
  roundsPlayed: number;
  /** One player playing one round = one game */
  gamesPlayed: number;
  gamesFinished: number;
  /** By the game each room is set to now (a host can switch games between rounds) */
  byGame: { game: string; rooms: number; players: number; gamesPlayed: number; gamesFinished: number; avgScore: number; topScore: number }[];
  /** Days in Qatar time (UTC+3) */
  byDay: { day: string; rooms: number; players: number }[];
  firstJoin: string | null;
  lastJoin: string | null;
};

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
  async stats() {
    const rooms = [...mem.rooms.values()];
    const players = rooms.flatMap((r) => (mem.players.get(r.code) ?? []).map((p) => ({ ...p, game: r.game })));
    const scores = [...mem.scores.entries()].flatMap(([k, m]) => [...m.values()].map((sc) => ({ ...sc, key: k, game: mem.rooms.get(k.split(":")[0])?.game ?? "" })));
    const games = [...new Set(rooms.map((r) => r.game))];
    const day = (t: number) => new Date(t + 3 * 3600_000).toISOString().slice(0, 10);
    const days = [...new Set([...rooms.map((r) => day(r.createdAt)), ...players.map((p) => day(p.joinedAt))])].sort();
    const joins = players.map((p) => p.joinedAt).sort((a, b) => a - b);
    const done = scores.filter((x) => x.finished);
    return {
      rooms: rooms.length,
      roomsWithPlayers: rooms.filter((r) => (mem.players.get(r.code) ?? []).length > 0).length,
      players: players.length,
      organisations: new Set(players.map((p) => p.org.trim().toLowerCase()).filter(Boolean)).size,
      roundsPlayed: new Set(scores.map((x) => x.key)).size,
      gamesPlayed: scores.length,
      gamesFinished: done.length,
      byGame: games.map((game) => {
        const f = done.filter((x) => x.game === game);
        return {
          game,
          rooms: rooms.filter((r) => r.game === game).length,
          players: players.filter((p) => p.game === game).length,
          gamesPlayed: scores.filter((x) => x.game === game).length,
          gamesFinished: f.length,
          avgScore: f.length ? Math.round(f.reduce((a, x) => a + x.score, 0) / f.length) : 0,
          topScore: f.reduce((a, x) => Math.max(a, x.score), 0),
        };
      }),
      byDay: days.map((d) => ({ day: d, rooms: rooms.filter((r) => day(r.createdAt) === d).length, players: players.filter((p) => day(p.joinedAt) === d).length })),
      firstJoin: joins.length ? new Date(joins[0]).toISOString() : null,
      lastJoin: joins.length ? new Date(joins[joins.length - 1]).toISOString() : null,
    };
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
      // Keep rooms for 90 days so the event report (stats) can be pulled afterwards, then free the codes.
      const old = await q(`DELETE FROM mw_rooms WHERE created_at < now() - interval '90 days' RETURNING code`);
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
    async stats() {
      const q = await pg();
      const n = (v: unknown) => Number(v ?? 0);
      const [tot] = await q(`SELECT
          (SELECT count(*) FROM mw_rooms) AS rooms,
          (SELECT count(DISTINCT code) FROM mw_players) AS rooms_with_players,
          (SELECT count(*) FROM mw_players) AS players,
          (SELECT count(DISTINCT lower(trim(org))) FROM mw_players WHERE trim(org) <> '') AS orgs,
          (SELECT count(DISTINCT (code, round)) FROM mw_scores) AS rounds,
          (SELECT count(*) FROM mw_scores) AS scores,
          (SELECT count(*) FROM mw_scores WHERE finished) AS finished,
          (SELECT min(joined_at) FROM mw_players) AS first_join,
          (SELECT max(joined_at) FROM mw_players) AS last_join`);
      const games = await q(`SELECT r.game, r.rooms, coalesce(p.players, 0) AS players, coalesce(s.scores, 0) AS scores,
          coalesce(s.finished, 0) AS finished, coalesce(s.avg_score, 0) AS avg_score, coalesce(s.top_score, 0) AS top_score
        FROM (SELECT data->>'game' AS game, count(*) AS rooms FROM mw_rooms GROUP BY 1) r
        LEFT JOIN (SELECT r2.data->>'game' AS game, count(*) AS players FROM mw_players p2 JOIN mw_rooms r2 ON r2.code = p2.code GROUP BY 1) p ON p.game = r.game
        LEFT JOIN (SELECT r2.data->>'game' AS game, count(*) AS scores, count(*) FILTER (WHERE s2.finished) AS finished,
            round(avg(s2.score) FILTER (WHERE s2.finished)) AS avg_score, max(s2.score) FILTER (WHERE s2.finished) AS top_score
          FROM mw_scores s2 JOIN mw_rooms r2 ON r2.code = s2.code GROUP BY 1) s ON s.game = r.game
        ORDER BY 1`);
      const days = await q(`SELECT d AS day, sum(rooms) AS rooms, sum(players) AS players FROM (
          SELECT to_char(created_at AT TIME ZONE 'Asia/Qatar', 'YYYY-MM-DD') AS d, 1 AS rooms, 0 AS players FROM mw_rooms
          UNION ALL SELECT to_char(joined_at AT TIME ZONE 'Asia/Qatar', 'YYYY-MM-DD'), 0, 1 FROM mw_players) t GROUP BY d ORDER BY d`);
      const iso = (v: unknown) => (v ? new Date(String(v)).toISOString() : null);
      return {
        rooms: n(tot.rooms),
        roomsWithPlayers: n(tot.rooms_with_players),
        players: n(tot.players),
        organisations: n(tot.orgs),
        roundsPlayed: n(tot.rounds),
        gamesPlayed: n(tot.scores),
        gamesFinished: n(tot.finished),
        byGame: games.map((g) => ({
          game: String(g.game),
          rooms: n(g.rooms),
          players: n(g.players),
          gamesPlayed: n(g.scores),
          gamesFinished: n(g.finished),
          avgScore: n(g.avg_score),
          topScore: n(g.top_score),
        })),
        byDay: days.map((d) => ({ day: String(d.day), rooms: n(d.rooms), players: n(d.players) })),
        firstJoin: iso(tot.first_join),
        lastJoin: iso(tot.last_join),
      };
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
