"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { makeRng, shuffle, symbolNames, type Content, type SymbolId } from "./data";
import { HazardSymbol } from "./symbols";
import type { QuizType, Settings } from "./store";
import type { Sound } from "./sound";

type Option = { key: string; label: string; symbol?: SymbolId; swatch?: "yellow" | "red" };
type Question = { kind: string; prompt: string; display?: string; options: Option[]; answer: string; why: string };

/** Builds a varied quiz: masked labels, colour codes, required symbols and true/false rules. */
export function buildQuiz(count: number, content: Content, types: Record<QuizType, boolean>, rng: () => number): Question[] {
  const wasteCodes = content.codes;
  const statements = content.statements;
  const shuffleR = <T,>(a: T[]) => shuffle(a, rng);
  const label: Question[] = wasteCodes.map((c) => {
    const others = shuffleR(wasteCodes.filter((o) => o.masked !== c.masked)).slice(0, 3);
    return {
      kind: "Label",
      prompt: "Whose container carries this label?",
      display: c.masked,
      options: shuffleR([c, ...others]).map((o) => ({ key: o.id, label: o.name })),
      answer: c.id,
      why: `The full label reads: "${c.label}".`,
    };
  });
  const colour: Question[] = wasteCodes.map((c) => ({
    kind: "Colour code",
    prompt: `Which colour code is required for ${c.name.toLowerCase()}?`,
    options: [
      { key: "yellow", label: "Yellow", swatch: "yellow" },
      { key: "red", label: "Red", swatch: "red" },
    ],
    answer: c.color,
    why: `${c.name} is colour-coded ${c.color}.`,
  }));
  const symbol: Question[] = wasteCodes.map((c) => {
    const others = shuffleR((Object.keys(symbolNames) as SymbolId[]).filter((s) => s !== c.symbol)).slice(0, 3);
    return {
      kind: "Symbol",
      prompt: `Which symbol must the ${c.name.toLowerCase()} container show?`,
      options: shuffleR([c.symbol, ...others]).map((s) => ({ key: s, label: symbolNames[s], symbol: s })),
      answer: c.symbol,
      why: `${c.name} needs the ${symbolNames[c.symbol].toLowerCase()} symbol.`,
    };
  });
  const tf: Question[] = statements.map((s) => ({
    kind: "True or false",
    prompt: s.text,
    options: [
      { key: "true", label: "True" },
      { key: "false", label: "False" },
    ],
    answer: String(s.answer),
    why: s.why,
  }));
  // Share the questions out across the enabled types (label 30%, colour 20%, symbol 20%, true/false 30%),
  // then top up from whatever is left if a pool runs short.
  const pools: [QuizType, Question[], number][] = [
    ["label", label, 0.3],
    ["colour", colour, 0.2],
    ["symbol", symbol, 0.2],
    ["tf", tf, 0.3],
  ];
  const on = pools.filter(([t, pool]) => types[t] && pool.length);
  const weight = on.reduce((n, [, , w]) => n + w, 0) || 1;
  const shuffled = on.map(([, pool, w]) => ({ pool: shuffleR(pool), want: Math.round((count * w) / weight) }));
  const picked: Question[] = [];
  shuffled.forEach((p) => picked.push(...p.pool.splice(0, p.want)));
  const rest = shuffleR(shuffled.flatMap((p) => p.pool));
  while (picked.length < count && rest.length) picked.push(rest.shift()!);
  return shuffleR(picked.slice(0, count));
}

/** Code Breaker: a timed quiz on colour codes, labels and symbols. Faster right answers score more. */
export function CodeBreaker({
  settings,
  content,
  sound,
  seed,
  onFinish,
  onProgress,
}: {
  settings: Settings;
  content: Content;
  sound: Sound;
  seed?: number;
  onFinish: (score: number, detail: string) => void;
  onProgress?: (score: number, detail: string) => void;
}) {
  const quiz = useMemo(
    () => buildQuiz(settings.quizQuestions, content, settings.quizTypes, makeRng(seed ?? Math.floor(Math.random() * 2 ** 31))),
    [settings.quizQuestions, settings.quizTypes, content, seed],
  );
  const limit = settings.quizSeconds * 1000;
  const [q, setQ] = useState(0);
  const [left, setLeft] = useState(limit);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [right, setRight] = useState(0);
  const [gain, setGain] = useState(0);
  const done = useRef(false);
  const cur = quiz[q];

  useEffect(() => {
    onProgress?.(score, `${right}/${quiz.length} correct`);
  }, [score, right, quiz.length, onProgress]);
  const revealed = picked !== null;

  useEffect(() => {
    if (revealed) return;
    const id = setInterval(() => setLeft((t) => Math.max(0, t - 100)), 100);
    return () => clearInterval(id);
  }, [revealed, q]);

  function advance(newScore: number, newRight: number) {
    setTimeout(() => {
      if (q + 1 >= quiz.length) {
        if (done.current) return;
        done.current = true;
        onFinish(newScore, `${newRight}/${quiz.length} correct`);
        return;
      }
      setQ(q + 1);
      setPicked(null);
      setGain(0);
      setLeft(limit);
    }, 1900);
  }

  function answer(key: string) {
    if (revealed || !cur) return;
    setPicked(key);
    if (key === cur.answer) {
      const g = 100 + Math.ceil(left / 1000) * 10;
      sound.good();
      setGain(g);
      setScore(score + g);
      setRight(right + 1);
      advance(score + g, right + 1);
    } else {
      sound.bad();
      advance(score, right);
    }
  }

  useEffect(() => {
    if (left <= 0 && !revealed) answer("__timeout__");
  });

  if (!cur) return <div className="mw-game"><p className="mw-empty">No questions available. Check the question types in the admin settings.</p></div>;
  const secs = Math.ceil(left / 1000);
  return (
    <div className="mw-game mw-quiz">
      <div className="mw-hud">
        <span>
          <small>Question</small>
          <b>
            {q + 1}/{quiz.length}
          </b>
        </span>
        <span>
          <small>Time</small>
          <b className={secs <= 5 ? "mw-warn" : ""}>{secs}s</b>
        </span>
        <span>
          <small>Correct</small>
          <b>{right}</b>
        </span>
        <span>
          <small>Score</small>
          <b>{score}</b>
        </span>
      </div>
      <div className="mw-quiz-bar">
        <i style={{ width: `${(left / limit) * 100}%` }} />
      </div>

      <div className="mw-quiz-card" key={q}>
        <span className="mw-chip">{cur.kind}</span>
        <h3>{cur.prompt}</h3>
        {cur.display && <div className="mw-label-tag">{cur.display}</div>}
        <div className={`mw-options ${cur.options.length === 2 ? "is-two" : ""}`}>
          {cur.options.map((o) => {
            const state = !revealed ? "" : o.key === cur.answer ? "is-ok" : o.key === picked ? "is-bad" : "is-dim";
            return (
              <button type="button" key={o.key} className={`mw-option ${state}`} onClick={() => answer(o.key)} disabled={revealed}>
                {o.symbol && <HazardSymbol id={o.symbol} size={56} />}
                {o.swatch && <span className={`mw-swatch mw-swatch--${o.swatch}`} aria-hidden="true" />}
                <span>{o.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mw-feedback" role="status" aria-live="assertive">
          {revealed && (
            <div className={picked === cur.answer ? "is-ok" : "is-bad"}>
              <b>{picked === cur.answer ? `Correct! +${gain}` : picked === "__timeout__" ? "Time's up!" : "Not quite."}</b>
              <p>{cur.why}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
