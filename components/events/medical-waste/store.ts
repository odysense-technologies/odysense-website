/**
 * Leaderboard and settings for the event kiosk, kept in this device's browser storage.
 *
 * Deliberate exception to the "no localStorage for site data" rule (CLAUDE.md section 4): this page
 * runs on the booth's own screen at a single event, there's no database yet, and the admin exports
 * the results as CSV. Every read and write is wrapped, so the page still works if storage is blocked.
 */

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

export type Settings = {
  binRushSeconds: number;
  binRushLives: number;
  quizQuestions: number;
  quizSeconds: number;
  sound: boolean;
};

export const DEFAULT_SETTINGS: Settings = { binRushSeconds: 60, binRushLives: 3, quizQuestions: 10, quizSeconds: 15, sound: true };

const KEY = "moph-mw-leaderboard-v1";
const SETTINGS_KEY = "moph-mw-settings-v1";

// SHA-256 of the admin password; the password itself never ships in the page.
// This is a light gate for a staffed booth, not real security: anyone with dev tools can edit storage.
const ADMIN_HASH = "5b09bd3cdf42f1a500413821a2536cf89f5f1924f4c0a1661b35a3ad5480f839";

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
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
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
