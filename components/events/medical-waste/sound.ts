/** Tiny Web Audio cues (no audio files). Silent when muted or when the browser blocks audio. */
let ctx: AudioContext | null = null;

function tone(freq: number, ms: number, type: OscillatorType = "sine", gain = 0.08, delay = 0) {
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const t = ctx.currentTime + delay / 1000;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + ms / 1000);
  } catch {
    /* no audio available */
  }
}

export function makeSound(enabled: boolean) {
  return {
    good: () => enabled && (tone(660, 120), tone(990, 160, "sine", 0.08, 90)),
    bad: () => enabled && tone(160, 260, "square", 0.05),
    tick: () => enabled && tone(880, 50, "sine", 0.03),
    win: () => enabled && [523, 659, 784, 1047].forEach((f, i) => tone(f, 220, "triangle", 0.07, i * 120)),
  };
}
export type Sound = ReturnType<typeof makeSound>;
