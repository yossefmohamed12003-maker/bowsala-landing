// Synthesises the teaser soundtrack — dark, minimal, half-time "premium street".
// 120 BPM grid (felt as 60 half-time), 23s, every scene change on a beat.
// 1 beat = 0.5s = 15 frames @ 30fps. 1 bar = 2s.
// Run: node scripts/make-music.mjs  -> public/audio/teaser.wav
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 44100;
const DUR = 23;
const N = SR * DUR;
const BEAT = 0.5;

// buses: dry, reverb send, delay send, pad (sidechained)
const bus = () => ({ L: new Float32Array(N), R: new Float32Array(N) });
const DRY = bus();
const VERB = bus();
const DELAY = bus();
const PAD = bus();

let seed = 11;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed / 2147483647) * 2 - 1;
};

const add = (b, t0, buf, gain = 1, pan = 0) => {
  const s0 = Math.floor(t0 * SR);
  const gl = gain * Math.min(1, 1 - pan);
  const gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < buf.length; i++) {
    const k = s0 + i;
    if (k < 0 || k >= N) continue;
    b.L[k] += buf[i] * gl;
    b.R[k] += buf[i] * gr;
  }
};
const make = (sec, fn) => {
  const n = Math.floor(sec * SR);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = fn(i / SR, i);
  return out;
};

// ---------- instruments ----------
const kick = (len = 0.5) => {
  let ph = 0;
  return make(len, (t) => {
    ph += (2 * Math.PI * (42 + 95 * Math.exp(-t * 32))) / SR;
    return Math.tanh(Math.sin(ph) * Math.exp(-t * 6) * 2) * 0.85 + (t < 0.003 ? rnd() * 0.3 : 0);
  });
};

// long sliding 808 — the backbone
const b808 = (freq, len = 1.5, from = 0) => {
  let ph = 0;
  return make(len, (t) => {
    const f = from ? freq + (from - freq) * Math.exp(-t * 9) : freq;
    ph += (2 * Math.PI * f) / SR;
    const env = Math.min(1, t / 0.008) * Math.exp(-t * (1.1 / len));
    const x = Math.sin(ph) + 0.18 * Math.sin(2 * ph);
    return Math.tanh(x * 1.8) * env * 0.8;
  });
};

// dry, tight snare (half-time, beat 3) — body + filtered noise
const snare = () => {
  let lp = 0;
  let ph = 0;
  return make(0.35, (t) => {
    ph += (2 * Math.PI * (185 + 40 * Math.exp(-t * 40))) / SR;
    const n = rnd();
    lp += 0.35 * (n - lp);
    const noise = (n - lp) * Math.exp(-t * 20);
    const body = Math.sin(ph) * Math.exp(-t * 30) * 0.5;
    return (noise * 0.75 + body) * 0.85;
  });
};

const rim = () => make(0.06, (t) => (Math.sin(2 * Math.PI * 1700 * t) * 0.6 + rnd() * 0.25) * Math.exp(-t * 90) * 0.5);

const hat = (open = false) => {
  let prev = 0;
  return make(open ? 0.25 : 0.04, (t) => {
    const n = rnd();
    const hp = n - prev;
    prev = n;
    return hp * Math.exp(-t * (open ? 14 : 110)) * 0.2;
  });
};

const tick = () => make(0.025, (t) => Math.sin(2 * Math.PI * 2600 * t) * Math.exp(-t * 260) * 0.3);

// glassy bell / pluck for the motif (sent to delay)
const bell = (f, len = 1.6) =>
  make(len, (t) => {
    const env = Math.exp(-t * 3.2) * Math.min(1, t / 0.002);
    const x = Math.sin(2 * Math.PI * f * t + 1.6 * Math.sin(2 * Math.PI * f * 3.5 * t) * Math.exp(-t * 6));
    return x * env * 0.28;
  });

// dark detuned pad — slow-moving filter
const pad = (freqs, len) => {
  const ph = freqs.flatMap((_, i) => [0.13 * i, 0.41 + 0.07 * i, 0.77 - 0.05 * i]);
  let lp1 = 0;
  let lp2 = 0;
  return make(len, (t) => {
    let s = 0;
    freqs.forEach((f, i) => {
      [-0.11, 0, 0.13].forEach((det, j) => {
        const k = i * 3 + j;
        ph[k] = (ph[k] + (f * Math.pow(2, det / 12)) / SR) % 1;
        s += ph[k] * 2 - 1;
      });
    });
    s /= freqs.length * 3;
    const cutoff = 0.006 + 0.02 * (0.5 + 0.5 * Math.sin(t * 0.9 - 1.5));
    lp1 += cutoff * (s - lp1);
    lp2 += cutoff * (lp1 - lp2);
    const env = Math.min(1, t / 1.2) * Math.min(1, (len - t) / 0.6);
    return lp2 * env * 2.2;
  });
};

// tape / vinyl bed
const crackle = (len) => {
  let lp = 0;
  return make(len, () => {
    const n = rnd();
    lp += 0.02 * (n - lp);
    const pop = rnd() > 0.9988 ? rnd() * 0.5 : 0;
    return lp * 0.25 + pop;
  });
};

// reversed swell (into hits) — noise + tone rising, then hard stop
const swell = (len, f = 164.8) => {
  let lp = 0;
  return make(len, (t) => {
    const p = t / len;
    const n = rnd();
    lp += (0.01 + 0.15 * p * p) * (n - lp);
    return (lp * 0.8 + Math.sin(2 * Math.PI * f * t) * 0.15) * p ** 3;
  });
};

const subDrop = (len = 2) => {
  let ph = 0;
  return make(len, (t) => {
    ph += (2 * Math.PI * (70 * Math.exp(-t * 1.6) + 30)) / SR;
    return Math.sin(ph) * Math.exp(-t * 1.4) * 0.8;
  });
};

// ---------- notes ----------
const E1 = 41.2, A1 = 55.0, C1 = 32.7, D1 = 36.7;
const Em9 = [82.4, 123.5, 196.0, 293.7, 370.0];
const Cmaj7 = [65.4, 130.8, 196.0, 246.9, 329.6];
const motif = [659.3, 587.3, 493.9, 587.3, 440.0, 493.9];

const kickTimes = [];
const K = (t, g = 1) => {
  add(DRY, t, kick(), g);
  kickTimes.push(t);
};

// ---------- arrangement ----------
// INTRO 0–2: crackle, pad, clock ticks, swell. Full stop just before the drop.
add(DRY, 0, crackle(DUR), 0.5);
add(PAD, 0, pad(Em9, 1.85), 0.9);
for (let i = 0; i < 7; i++) add(DRY, i * 0.25, tick(), i % 2 ? 0.5 : 0.8, i % 2 ? 0.35 : -0.35);
add(DRY, 0.6, swell(1.3), 0.55);

// GROOVE 2–14 and 16–18. Half-time: kick on 1 (+ syncopation), snare on 3, sparse hats.
const bars = [
  { t: 2, root: E1, chord: Em9 },
  { t: 4, root: C1, chord: Cmaj7 },
  { t: 6, root: E1, chord: Em9 },
  { t: 8, root: E1, chord: Em9 },
  { t: 10, root: C1, chord: Cmaj7 },
  { t: 12, root: A1, chord: Em9 },
  { t: 14, root: D1, chord: Cmaj7 },
  { t: 18, root: E1, chord: Em9 },
];
bars.forEach(({ t, root, chord }, bi) => {
  K(t, 1);
  K(t + 1.75 * BEAT, 0.7);
  if (bi % 2 === 1) K(t + 3.25 * BEAT, 0.6);
  add(DRY, t, b808(root, 1.6, root * 1.5), 0.95);
  add(DRY, t + 1.75 * BEAT, b808(root, 0.6), 0.6);
  if (bi % 2 === 1) add(DRY, t + 3.25 * BEAT, b808(root * 1.19, 0.5, root * 1.5), 0.55);
  // half-time snare on beat 3, a little reverb
  add(DRY, t + 2 * BEAT, snare(), 0.85);
  add(VERB, t + 2 * BEAT, snare(), 0.35);
  add(DRY, t + 3.5 * BEAT, rim(), 0.5, 0.4);
  // hats: swung 8ths with gaps, a drill triplet at the end of every other bar
  for (let h = 0; h < 8; h++) {
    if (h === 2 || h === 6) continue;
    const swing = h % 2 ? 0.035 : 0;
    add(DRY, t + h * 0.25 + swing, hat(h === 5 && bi % 2 === 0), h % 2 ? 0.55 : 0.8, -0.2);
  }
  if (bi % 2 === 1) for (let r = 0; r < 3; r++) add(DRY, t + 1.75 + r * (0.25 / 3), hat(), 0.6, 0.25);
  add(PAD, t, pad(chord, 2.05), 0.8);
  // motif every other bar, into the delay
  if (bi % 2 === 0) {
    [0, 0.375, 0.75, 1.0, 1.375].forEach((o, j) => {
      add(DRY, t + o, bell(motif[j % motif.length]), 0.6, j % 2 ? 0.3 : -0.3);
      add(DELAY, t + o, bell(motif[j % motif.length]), 0.5);
    });
  }
});

// drop at 2s: deep sub drop, no cymbal crash
add(DRY, 2, subDrop(2), 0.8);
// "surprises" at 12s lands after a beat of silence (see gate) on a sub hit
add(DRY, 12, subDrop(1.6), 0.6);

// ACCESS TERMINAL 16–18: breakdown — pad, keystrokes, one clunk on the button
add(PAD, 16, pad(Em9, 2.05), 1.0);
for (let i = 0; i < 12; i++) add(DRY, 16.4 + i * 0.045, tick(), 0.3 + (i % 3) * 0.08, i % 2 ? 0.25 : -0.25);
K(17, 0.7);
add(DRY, 17, rim(), 0.8);
add(DELAY, 17, bell(987.8), 0.5);
add(DRY, 17.5, hat(), 0.5);
add(DRY, 17.75, hat(), 0.6);

// 18–20 last groove bar with a soft swell into the final hit
add(DRY, 18.4, swell(1.6, 196), 0.6);

// FINAL 20–23: one long 808, one bell, the pad tail, ticks
K(20, 1.1);
add(DRY, 20, b808(E1, 3, E1 * 2), 1);
add(DRY, 20, bell(329.6, 2.4), 0.7);
add(DELAY, 20, bell(329.6, 2.4), 0.6);
add(PAD, 20, pad(Em9, 3), 0.9);
add(DRY, 21, tick(), 0.6, 0.3);
add(DRY, 21.5, tick(), 0.45, -0.3);

// ---------- FX ----------
// reverb (Schroeder): 4 combs + 2 allpasses
const reverb = (src, decay = 0.78) => {
  const out = new Float32Array(N);
  const combs = [1557, 1617, 1491, 1422].map((d) => ({ d, b: new Float32Array(d), i: 0 }));
  const aps = [225, 556].map((d) => ({ d, b: new Float32Array(d), i: 0 }));
  for (let n = 0; n < N; n++) {
    let y = 0;
    for (const c of combs) {
      const v = c.b[c.i];
      c.b[c.i] = src[n] + v * decay;
      c.i = (c.i + 1) % c.d;
      y += v;
    }
    y *= 0.25;
    for (const a of aps) {
      const v = a.b[a.i];
      const w = y + v * 0.5;
      a.b[a.i] = w;
      a.i = (a.i + 1) % a.d;
      y = v - w * 0.5;
    }
    out[n] = y;
  }
  return out;
};
// ping-pong dotted-8th delay
const delayed = (() => {
  const d = Math.floor(0.375 * SR);
  const L = new Float32Array(N);
  const R = new Float32Array(N);
  for (let n = 0; n < N; n++) {
    const inp = (DELAY.L[n] + DELAY.R[n]) * 0.5;
    L[n] = inp + (n >= d ? R[n - d] * 0.45 : 0);
    R[n] = n >= d ? L[n - d] * 0.8 : 0;
  }
  return { L, R };
})();
const vL = reverb(VERB.L.map((x, i) => x + delayed.L[i] * 0.3 + PAD.L[i] * 0.15));
const vR = reverb(VERB.R.map((x, i) => x + delayed.R[i] * 0.3 + PAD.R[i] * 0.15), 0.8);

// sidechain: pad ducks under every kick
const duck = new Float32Array(N).fill(1);
for (const t of kickTimes) {
  const s0 = Math.floor(t * SR);
  for (let i = 0; i < SR * 0.35; i++) {
    const k = s0 + i;
    if (k >= N) break;
    duck[k] = Math.min(duck[k], 1 - 0.65 * Math.exp(-i / (SR * 0.09)));
  }
}

// silence just before the drop (1.85–2.0) and before "surprises" (11.75–12.0)
const gate = (t) => ((t >= 1.85 && t < 2.0) || (t >= 11.75 && t < 12.0) ? 0 : 1);

// ---------- master ----------
const mixed = new Float32Array(N * 2);
let peak = 0;
let lpL = 0;
let lpR = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = gate(t);
  const fade = Math.min(1, (DUR - t) / 1.2);
  const l = DRY.L[i] + PAD.L[i] * duck[i] + delayed.L[i] * 0.55 + vL[i] * 0.5;
  const r = DRY.R[i] + PAD.R[i] * duck[i] + delayed.R[i] * 0.55 + vR[i] * 0.5;
  // gentle tape-style top roll-off
  lpL += 0.55 * (l - lpL);
  lpR += 0.55 * (r - lpR);
  mixed[i * 2] = Math.tanh(lpL * 1.1) * g * fade;
  mixed[i * 2 + 1] = Math.tanh(lpR * 1.1) * g * fade;
  peak = Math.max(peak, Math.abs(mixed[i * 2]), Math.abs(mixed[i * 2 + 1]));
}
const norm = 0.84 / peak;
const out = new Int16Array(N * 2);
for (let i = 0; i < N * 2; i++) out[i] = Math.round(mixed[i] * norm * 32767);

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + out.byteLength, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(out.byteLength, 40);
mkdirSync("public/audio", { recursive: true });
writeFileSync("public/audio/teaser.wav", Buffer.concat([header, Buffer.from(out.buffer)]));
console.log("wrote public/audio/teaser.wav", DUR + "s");
