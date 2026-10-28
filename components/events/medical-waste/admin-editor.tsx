"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { bins, defaultContent, symbolNames, type Clue, type Content, type SymbolId } from "./data";
import { HazardSymbol } from "./symbols";
import { DEFAULT_SETTINGS, download, normalizeContent, type QuizType, type Settings } from "./store";

const SYMBOL_IDS = Object.keys(symbolNames) as SymbolId[];

/* ------------------------------------------------------------------ settings */

export function SettingsEditor({ settings, onChange }: { settings: Settings; onChange: (s: Settings) => void }) {
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => onChange({ ...settings, [k]: v });
  const num = (k: keyof Settings, v: string, min: number, max: number) => {
    const n = Number(v);
    if (Number.isFinite(n)) set(k, Math.min(max, Math.max(min, n)) as never);
  };
  const types: [QuizType, string][] = [
    ["label", "Whose label is this?"],
    ["colour", "Colour codes"],
    ["symbol", "Required symbols"],
    ["tf", "True or false"],
  ];
  return (
    <div className="mw-ed">
      <fieldset>
        <legend>Bin Rush</legend>
        <label>
          Round time (seconds)
          <input type="number" min={20} max={300} step={5} value={settings.binRushSeconds} onChange={(e) => num("binRushSeconds", e.target.value, 20, 300)} />
        </label>
        <label>
          Lives
          <input type="number" min={1} max={10} value={settings.binRushLives} onChange={(e) => num("binRushLives", e.target.value, 1, 10)} />
        </label>
        <label>
          Seconds for the first item
          <input type="number" min={2} max={20} step={0.5} value={settings.binRushItemStart} onChange={(e) => num("binRushItemStart", e.target.value, 2, 20)} />
        </label>
        <label>
          Fastest item time (seconds)
          <input type="number" min={1} max={20} step={0.1} value={settings.binRushItemMin} onChange={(e) => num("binRushItemMin", e.target.value, 1, 20)} />
        </label>
      </fieldset>
      <fieldset>
        <legend>Code Breaker</legend>
        <label>
          Questions per round
          <input type="number" min={3} max={40} value={settings.quizQuestions} onChange={(e) => num("quizQuestions", e.target.value, 3, 40)} />
        </label>
        <label>
          Seconds per question
          <input type="number" min={5} max={60} value={settings.quizSeconds} onChange={(e) => num("quizSeconds", e.target.value, 5, 60)} />
        </label>
        <div className="mw-ed-checks">
          <span>Question types</span>
          {types.map(([t, label]) => (
            <label className="mw-check" key={t}>
              <input
                type="checkbox"
                checked={settings.quizTypes[t]}
                onChange={(e) => {
                  const next = { ...settings.quizTypes, [t]: e.target.checked };
                  if (Object.values(next).some(Boolean)) set("quizTypes", next);
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Symbol Match</legend>
        <label>
          Pairs on the board
          <select value={settings.matchPairs} onChange={(e) => set("matchPairs", Number(e.target.value))}>
            {[4, 6, 8].map((v) => (
              <option key={v} value={v}>
                {v} pairs ({v * 2} cards)
              </option>
            ))}
          </select>
        </label>
        <label>
          Time limit
          <select value={settings.matchSeconds} onChange={(e) => set("matchSeconds", Number(e.target.value))}>
            {[0, 45, 60, 90, 120, 180].map((v) => (
              <option key={v} value={v}>
                {v ? `${v} seconds` : "No limit"}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <fieldset>
        <legend>General</legend>
        <label className="mw-check">
          <input type="checkbox" checked={settings.sound} onChange={(e) => set("sound", e.target.checked)} />
          Sound effects
        </label>
        <button type="button" className="btn btn-secondary" onClick={() => onChange(DEFAULT_SETTINGS)}>
          Restore default settings
        </button>
      </fieldset>
    </div>
  );
}

/* ------------------------------------------------------------------- content */

type Section = "items" | "questions" | "categories" | "pairs" | "symbols" | "backup";

/** Resizes an uploaded image to a 200px square PNG data URL, so it stays small enough to store and share. */
async function toSymbolDataUrl(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const size = 200;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const scale = Math.min(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function ContentEditor({ content, onChange }: { content: Content; onChange: (c: Content) => void }) {
  const [section, setSection] = useState<Section>("items");
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const patch = (p: Partial<Content>) => onChange({ ...content, ...p });
  const sections: [Section, string][] = [
    ["items", `Bin Rush items (${content.items.length})`],
    ["questions", `True/false (${content.statements.length})`],
    ["categories", `Categories & labels (${content.codes.length})`],
    ["pairs", `Match pairs (${content.pairs.length})`],
    ["symbols", "Symbols"],
    ["backup", "Backup & reset"],
  ];

  async function upload(id: SymbolId, e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const data = await toSymbolDataUrl(f);
      patch({ symbols: { ...content.symbols, [id]: data } });
      setMsg(`${symbolNames[id]} replaced.`);
    } catch {
      setMsg("That file couldn't be read as an image. Try a PNG, JPG or SVG.");
    }
  }

  async function importFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      onChange(normalizeContent(data));
      setMsg("Content imported.");
    } catch {
      setMsg("That file isn't a valid content backup.");
    }
  }

  const clueKind = (c: Clue) => c.kind;

  return (
    <div className="mw-ed">
      <div className="mw-tabs mw-tabs--small" role="tablist">
        {sections.map(([k, label]) => (
          <button type="button" role="tab" aria-selected={section === k} key={k} className={section === k ? "is-on" : ""} onClick={() => setSection(k)}>
            {label}
          </button>
        ))}
      </div>
      {msg && <p className="mw-hint">{msg}</p>}

      {section === "items" && (
        <>
          <p className="mw-hint">Each item appears in Bin Rush; players tap its bin. Icons can be any emoji.</p>
          <div className="mw-ed-rows">
            {content.items.map((it, i) => (
              <div className="mw-ed-row mw-ed-row--item" key={i}>
                <input className="mw-ed-icon" value={it.icon} maxLength={8} aria-label="Icon" onChange={(e) => patch({ items: content.items.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)) })} />
                <input value={it.name} maxLength={80} aria-label="Item name" onChange={(e) => patch({ items: content.items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} />
                <select value={it.bin} aria-label="Correct bin" onChange={(e) => patch({ items: content.items.map((x, j) => (j === i ? { ...x, bin: e.target.value as typeof x.bin } : x)) })}>
                  {bins.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <button type="button" className="mw-del" aria-label="Remove item" disabled={content.items.length <= 3} onClick={() => patch({ items: content.items.filter((_, j) => j !== i) })}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => patch({ items: [...content.items, { icon: "🗑️", name: "New item", bin: "infectious" }] })}>
            + Add item
          </button>
        </>
      )}

      {section === "questions" && (
        <>
          <p className="mw-hint">True/false statements for Code Breaker. The explanation shows after each answer.</p>
          <div className="mw-ed-rows">
            {content.statements.map((st, i) => (
              <div className="mw-ed-row mw-ed-row--tf" key={i}>
                <input value={st.text} maxLength={160} aria-label="Statement" onChange={(e) => patch({ statements: content.statements.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })} />
                <select value={String(st.answer)} aria-label="Answer" onChange={(e) => patch({ statements: content.statements.map((x, j) => (j === i ? { ...x, answer: e.target.value === "true" } : x)) })}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                <input value={st.why} maxLength={200} aria-label="Explanation" placeholder="Explanation" onChange={(e) => patch({ statements: content.statements.map((x, j) => (j === i ? { ...x, why: e.target.value } : x)) })} />
                <button type="button" className="mw-del" aria-label="Remove question" disabled={content.statements.length <= 1} onClick={() => patch({ statements: content.statements.filter((_, j) => j !== i) })}>
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => patch({ statements: [...content.statements, { text: "New statement", answer: true, why: "" }] })}>
            + Add question
          </button>
        </>
      )}

      {section === "categories" && (
        <>
          <p className="mw-hint">
            These drive the label, colour and symbol questions in Code Breaker and the quick-reference table. &ldquo;Hidden label&rdquo; is the label
            with the category words replaced by ▇▇▇▇.
          </p>
          <div className="mw-ed-rows">
            {content.codes.map((c, i) => {
              const upd = (p: Partial<typeof c>) => patch({ codes: content.codes.map((x, j) => (j === i ? { ...x, ...p } : x)) });
              return (
                <div className="mw-ed-card" key={c.id}>
                  <div className="mw-ed-row mw-ed-row--code">
                    <input value={c.name} maxLength={60} aria-label="Category name" onChange={(e) => upd({ name: e.target.value })} />
                    <select value={c.color} aria-label="Colour code" onChange={(e) => upd({ color: e.target.value as typeof c.color })}>
                      <option value="yellow">Yellow</option>
                      <option value="red">Red</option>
                    </select>
                    <select value={c.symbol} aria-label="Required symbol" onChange={(e) => upd({ symbol: e.target.value as SymbolId })}>
                      {SYMBOL_IDS.map((s) => (
                        <option key={s} value={s}>
                          {symbolNames[s]}
                        </option>
                      ))}
                    </select>
                    <HazardSymbol id={c.symbol} size={40} />
                  </div>
                  <label>
                    Label
                    <input value={c.label} maxLength={140} onChange={(e) => upd({ label: e.target.value })} />
                  </label>
                  <label>
                    Hidden label
                    <input value={c.masked} maxLength={140} onChange={(e) => upd({ masked: e.target.value })} />
                  </label>
                </div>
              );
            })}
          </div>
        </>
      )}

      {section === "pairs" && (
        <>
          <p className="mw-hint">Symbol Match pairs a clue (a hazard symbol, or an icon and text) with a category. Keep at least 4.</p>
          <div className="mw-ed-rows">
            {content.pairs.map((p, i) => {
              const upd = (np: Partial<typeof p>) => patch({ pairs: content.pairs.map((x, j) => (j === i ? { ...x, ...np } : x)) });
              return (
                <div className="mw-ed-row mw-ed-row--pair" key={p.id}>
                  <select
                    value={clueKind(p.clue)}
                    aria-label="Clue type"
                    onChange={(e) => upd({ clue: e.target.value === "symbol" ? { kind: "symbol", symbol: "biohazard" } : { kind: "text", text: "Clue text", icon: "🏷️" } })}
                  >
                    <option value="symbol">Symbol</option>
                    <option value="text">Icon + text</option>
                  </select>
                  {p.clue.kind === "symbol" ? (
                    <select value={p.clue.symbol} aria-label="Symbol" onChange={(e) => upd({ clue: { kind: "symbol", symbol: e.target.value as SymbolId } })}>
                      {SYMBOL_IDS.map((s) => (
                        <option key={s} value={s}>
                          {symbolNames[s]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="mw-ed-pair-text">
                      <input className="mw-ed-icon" value={p.clue.icon} maxLength={8} aria-label="Clue icon" onChange={(e) => upd({ clue: { ...(p.clue as Extract<Clue, { kind: "text" }>), icon: e.target.value } })} />
                      <input value={p.clue.text} maxLength={60} aria-label="Clue text" onChange={(e) => upd({ clue: { ...(p.clue as Extract<Clue, { kind: "text" }>), text: e.target.value } })} />
                    </span>
                  )}
                  <input value={p.category} maxLength={40} aria-label="Category" onChange={(e) => upd({ category: e.target.value })} />
                  <button type="button" className="mw-del" aria-label="Remove pair" disabled={content.pairs.length <= 4} onClick={() => patch({ pairs: content.pairs.filter((_, j) => j !== i) })}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => patch({ pairs: [...content.pairs, { id: `p${Date.now()}`, clue: { kind: "text", text: "Clue text", icon: "🏷️" }, category: "Category" }] })}
          >
            + Add pair
          </button>
        </>
      )}

      {section === "symbols" && (
        <>
          <p className="mw-hint">Upload an official artwork file (PNG, JPG or SVG) to replace any symbol everywhere in the games. It&apos;s resized to 200×200.</p>
          <div className="mw-ed-symbols">
            {SYMBOL_IDS.map((id) => (
              <div className="mw-ed-symbol" key={id}>
                <b>{symbolNames[id]}</b>
                <div className="mw-ed-symbol-pair">
                  <span>
                    <HazardSymbol id={id} size={64} original />
                    <small>Built-in</small>
                  </span>
                  <span>
                    <HazardSymbol id={id} size={64} />
                    <small>{content.symbols[id] ? "Uploaded" : "In use"}</small>
                  </span>
                </div>
                <label className="btn btn-secondary mw-ed-upload">
                  Upload image
                  <input type="file" accept="image/*" onChange={(e) => upload(id, e)} />
                </label>
                {content.symbols[id] && (
                  <button
                    type="button"
                    className="mw-link"
                    onClick={() => {
                      const next = { ...content.symbols };
                      delete next[id];
                      patch({ symbols: next });
                    }}
                  >
                    Use built-in symbol
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {section === "backup" && (
        <>
          <p className="mw-hint">
            Content is saved on this device. Export it to back it up or to copy it to another tablet; live rooms use the content of the device
            that creates them.
          </p>
          <div className="mw-admin-btns">
            <button type="button" className="btn btn-primary" onClick={() => download(`medical-waste-content-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(content, null, 1), "application/json")}>
              ⬇ Export content
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
              ⬆ Import content
            </button>
            <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importFile} />
            <button
              type="button"
              className="btn mw-danger"
              onClick={() => {
                if (window.confirm("Reset all items, questions, categories, pairs and symbols to the MoPH poster defaults?")) {
                  onChange(defaultContent());
                  setMsg("Content reset to the MoPH defaults.");
                }
              }}
            >
              Reset content to MoPH defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
}
