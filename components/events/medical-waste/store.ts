/**
 * Leaderboard and settings for the event kiosk, kept in this device's browser storage.
 *
 * Deliberate exception to the "no localStorage for site data" rule (CLAUDE.md section 4): this page
 * runs on the booth's own screen at a single event, there's no database yet, and the admin exports
 * the results as CSV. Every read and write is wrapped, so the page still works if storage is blocked.
 */

import { defaultContent, type Content } from "./data";
import { ADMIN_HASH } from "./auth";

export type GameId = "bin-rush" | "code-breaker" | "symbol-match";

export type Entry = {
  id: string;
  game: GameId;
  name: string;
  org: string;
  score: number;
  detail: string;
  at: string; // ISO timestamp
};

export type QuizType = "label" | "colour" | "symbol" | "tf";

export type Settings = {
  binRushSeconds: number;
  binRushLives: number;
  /** Seconds a player gets for the first item, and the floor it speeds up to */
  binRushItemStart: number;
  binRushItemMin: number;
  quizQuestions: number;
  quizSeconds: number;
  quizTypes: Record<QuizType, boolean>;
  matchPairs: number;
  /** Symbol Match time limit in seconds; 0 = no limit */
  matchSeconds: number;
  sound: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  binRushSeconds: 60,
  binRushLives: 3,
  binRushItemStart: 6,
  binRushItemMin: 2.6,
  quizQuestions: 10,
  quizSeconds: 15,
  quizTypes: { label: true, colour: true, symbol: true, tf: true },
  matchPairs: 8,
  matchSeconds: 0,
  sound: true,
};

/** Fills in any setting missing from older saved data. */
export function normalizeSettings(s: Partial<Settings> | null | undefined): Settings {
  const merged = { ...DEFAULT_SETTINGS, ...(s ?? {}) };
  merged.quizTypes = { ...DEFAULT_SETTINGS.quizTypes, ...(s?.quizTypes ?? {}) };
  if (!Object.values(merged.quizTypes).some(Boolean)) merged.quizTypes = DEFAULT_SETTINGS.quizTypes;
  return merged;
}

const KEY = "moph-mw-leaderboard-v1";
const SETTINGS_KEY = "moph-mw-settings-v1";


export function loadEntries(): Entry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Entry[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveEntries(list: Entry[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full or blocked: the leaderboard just won't persist */
  }
}

export function addEntry(e: Omit<Entry, "id" | "at">): Entry[] {
  const entry: Entry = { ...e, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: new Date().toISOString() };
  const list = [...loadEntries(), entry];
  saveEntries(list);
  return list;
}

/** Highest score first; ties go to whoever got there first. */
export function ranked(list: Entry[], game: GameId): Entry[] {
  return list.filter((e) => e.game === game).sort((a, b) => b.score - a.score || a.at.localeCompare(b.at));
}

export function loadSettings(): Settings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    return normalizeSettings(raw ? (JSON.parse(raw) as Partial<Settings>) : null);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const CONTENT_KEY = "moph-mw-content-v1";

/** Admin-edited content, falling back to the MoPH poster defaults for anything missing or invalid. */
export function normalizeContent(c: Partial<Content> | null | undefined): Content {
  const d = defaultContent();
  if (!c) return d;
  const okItems = Array.isArray(c.items) && c.items.filter((i) => i && i.name && i.bin).length >= 3;
  const okCodes = Array.isArray(c.codes) && c.codes.length >= 4;
  const okStatements = Array.isArray(c.statements) && c.statements.length >= 1;
  const okPairs = Array.isArray(c.pairs) && c.pairs.length >= 4;
  const symbols: Content["symbols"] = {};
  for (const [k, v] of Object.entries(c.symbols ?? {})) if (typeof v === "string" && v.startsWith("data:image/")) symbols[k as keyof Content["symbols"]] = v;
  return {
    codes: okCodes ? c.codes! : d.codes,
    items: okItems ? c.items!.filter((i) => i && i.name && i.bin) : d.items,
    statements: okStatements ? c.statements! : d.statements,
    pairs: okPairs ? c.pairs! : d.pairs,
    symbols,
  };
}

export function loadContent(): Content {
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    return normalizeContent(raw ? (JSON.parse(raw) as Partial<Content>) : null);
  } catch {
    return defaultContent();
  }
}

export function saveContent(c: Content): boolean {
  try {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(c));
    return true;
  } catch {
    return false; // most likely storage full because of large symbol images
  }
}

export function clearContent() {
  try {
    window.localStorage.removeItem(CONTENT_KEY);
  } catch {
    /* ignore */
  }
}

export function saveSettings(s: Settings) {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export async function checkPassword(pw: string): Promise<boolean> {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
    const hex = Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
    return hex === ADMIN_HASH;
  } catch {
    return false;
  }
}

const GAME_NAMES: Record<GameId, string> = { "bin-rush": "Bin Rush", "code-breaker": "Code Breaker", "symbol-match": "Symbol Match" };

export function toCsv(list: Entry[]): string {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ["Game", "Rank", "Name", "Organisation", "Score", "Details", "Played at"];
  const rows: string[] = [head.map(esc).join(",")];
  (Object.keys(GAME_NAMES) as GameId[]).forEach((g) =>
    ranked(list, g).forEach((e, i) =>
      rows.push([GAME_NAMES[g], i + 1, e.name, e.org, e.score, e.detail, new Date(e.at).toLocaleString("en-GB")].map(esc).join(",")),
    ),
  );
  return "﻿" + rows.join("\r\n"); // BOM so Excel opens Arabic names correctly
}

export function download(filename: string, text: string, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export { GAME_NAMES };
