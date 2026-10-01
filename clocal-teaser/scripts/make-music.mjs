// Synthesises the teaser soundtrack: 120 BPM, 17s, beat-locked to the video cuts.
// 1 beat = 0.5s = 15 frames @ 30fps. 1 bar = 2s.
// Run: node scripts/make-music.mjs  -> public/audio/teaser.wav
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 44100;
const DUR = 17;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);
const BEAT = 0.5;
const b = (n) => n * BEAT; // beat index -> seconds

let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647 * 2 - 1;
};

const add = (t0, buf, gain = 1, pan = 0) => {
  const s0 = Math.floor(t0 * SR);
  const gl = gain * Math.min(1, 1 - pan);
  const gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < buf.length; i++) {
    const k = s0 + i;
    if (k < 0 || k >= N) continue;
    L[k] += buf[i] * gl;
    R[k] += buf[i] * gr;
  }
};

const make = (sec, fn) => {
  const n = Math.floor(sec * SR);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = fn(i / SR, i);
  return out;
};

// ---------- instruments ----------
const kick = (len = 0.45, punch = 1) => {
  let ph = 0;
  return make(len, (t) => {
    const f = 45 + 140 * Math.exp(-t * 28);
    ph += (2 * Math.PI * f) / SR;
    const env = Math.exp(-t * 7);
    const click = t < 0.004 ? rnd() * 0.6 * punch : 0;
    return Math.tanh(Math.sin(ph) * env * 2.2) * 0.9 + click;
  });
};

const b808 = (freq, len = 0.9, glideFrom = 0) => {
  let ph = 0;
  return make(len, (t) => {
    const f = glideFrom ? freq + (glideFrom - freq) * Math.exp(-t * 18) : freq;
    ph += (2 * Math.PI * f) / SR;
    const env = Math.min(1, t / 0.005) * Math.exp(-t * (1.6 / len));
    return Math.tanh(Math.sin(ph) * 2.6) * env * 0.75;
  });
};

const clap = () => {
  let lp = 0;
  return make(0.35, (t) => {
    const bursts = [0, 0.011, 0.022].reduce(
      (a, o) => a + (t >= o ? Math.exp(-(t - o) * 90) : 0),
      0,
    );
    const tail = Math.exp(-t * 14) * 0.5;
    const n = rnd();
    lp += 0.45 * (n - lp);
    const bp = n - lp; // crude high-pass
    return bp * (bursts * 0.55 + tail) * 0.9;
  });
};

const hat = (open = false) => {
  let prev = 0;
  return make(open ? 0.22 : 0.05, (t) => {
    const n = rnd();
    const hp = n - prev;
    prev = n;
    return hp * Math.exp(-t * (open ? 18 : 90)) * 0.28;
  });
};

const tick = () =>
  make(0.03, (t) => Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-t * 220) * 0.35);

const impact = (len = 2.2) => {
  let lp = 0;
  let ph = 0;
  return make(len, (t) => {
    const n = rnd();
    lp += 0.08 * (n - lp);
    ph += (2 * Math.PI * (38 + 80 * Math.exp(-t * 10))) / SR;
    const boom = Math.tanh(Math.sin(ph) * 3) * Math.exp(-t * 2.2) * 0.9;
    const crash = (n * 0.25 + lp * 1.2) * Math.exp(-t * 3.2) * 0.6;
    return boom + crash;
  });
};

const riser = (len, start = 0.0) => {
  let lp = 0;
  let ph = 0;
  return make(len, (t) => {
    const p = t / len;
    const n = rnd();
    const a = 0.01 + 0.5 * p * p;
    lp += a * (n - lp);
    ph += (2 * Math.PI * (200 + 1400 * p * p)) / SR;
    const tone = Math.sin(ph) * 0.12 * p;
    return (lp * 0.9 + tone) * (start + (1 - start) * p * p) * 0.8;
  });
};

const whoosh = (len = 0.35) => {
  let lp = 0;
  return make(len, (t) => {
    const p = t / len;
    const n = rnd();
    lp += (0.04 + 0.4 * Math.sin(Math.PI * p)) * (n - lp);
    return lp * Math.sin(Math.PI * p) * 0.9;
  });
};

// dark detuned saw stab (minor chord)
const stab = (freqs, len = 0.35, bright = 0.25) => {
  const phs = freqs.flatMap(() => [0, 0]);
  let lp = 0;
  return make(len, (t) => {
    let s = 0;
    freqs.forEach((f, i) => {
      for (const d of [0, 1]) {
        const idx = i * 2 + d;
        phs[idx] += (f * (d ? 1.006 : 0.994)) / SR;
        phs[idx] %= 1;
        s += phs[idx] * 2 - 1;
      }
    });
    s /= freqs.length * 2;
    const cutoff = bright * Math.exp(-t * 8) + 0.03;
    lp += cutoff * (s - lp);
    return lp * Math.exp(-t * 5) * 1.1;
  });
};

const subDrop = (len = 1.2) => {
  let ph = 0;
  return make(len, (t) => {
    ph += (2 * Math.PI * (90 * Math.exp(-t * 2.5) + 28)) / SR;
    return Math.sin(ph) * Math.exp(-t * 2) * 0.7;
  });
};

// ---------- arrangement ----------
const E1 = 41.2, G1 = 49.0, D1 = 36.7, C1 = 32.7, F1 = 43.65;
const Em = [164.8, 196.0, 246.9];
const Cmaj = [130.8, 164.8, 196.0];
const Dmaj = [146.8, 185.0, 220.0];
const Bm = [123.5, 146.8, 185.0];

// INTRO 0-2s: ticking clock + riser, silence right before the drop
for (let i = 0; i < 7; i++) add(b(i * 0.5), tick(), i % 2 ? 0.6 : 1, i % 2 ? 0.3 : -0.3);
add(0, riser(1.9, 0.05), 0.9);
add(0, subDrop(1.6), 0.5);

// MAIN GROOVE 2s - 14s (bars 1..6), drill-ish
const roots = [E1, E1, C1, D1, E1, G1];
const chords = [Em, Em, Cmaj, Dmaj, Em, Bm];
for (let bar = 0; bar < 6; bar++) {
  const t0 = 2 + bar * 2;
  const root = roots[bar];
  // kicks / 808
  [0, 1.5, 2.75].forEach((k, i) => {
    add(t0 + b(k), kick(0.4), i === 0 ? 1 : 0.85);
  });
  add(t0 + b(0), b808(root, 1.2, root * 2), 0.9);
  add(t0 + b(1.5), b808(root, 0.5), 0.7);
  add(t0 + b(2.75), b808(root * 1.5, 0.5, root * 1.2), 0.65);
  // claps on 2 and 4 (beats 1 and 3, zero-indexed)
  add(t0 + b(1), clap(), 0.9);
  add(t0 + b(3), clap(), 0.9);
  // hats: 8ths, with 16th/triplet rolls at the end of bars
  for (let h = 0; h < 8; h++) {
    if (h === 7 && bar % 2 === 1) {
      for (let r = 0; r < 4; r++) add(t0 + b(3.5) + r * 0.0625, hat(), 0.5 + r * 0.12, 0.2);
    } else {
      add(t0 + b(h * 0.5), hat(h === 3), h % 2 ? 0.6 : 0.85, -0.15);
    }
  }
  // stabs on downbeat + offbeat
  add(t0, stab(chords[bar], 0.4, 0.3), 0.35, -0.25);
  add(t0 + b(2.5), stab(chords[bar], 0.25, 0.2), 0.22, 0.25);
}
// drop impact at 2s
add(2, impact(2.2), 0.85);
// transition whooshes into each scene change
[3.75, 5.75, 7.75, 9.75, 11.75].forEach((t) => add(t, whoosh(0.28), 0.55));
// half-bar riser + impact into "surprises" at 8s
add(7, riser(1, 0.1), 0.45);
add(8, impact(1.4), 0.5);

// BUILD 12-14s: snare roll accelerating + big riser
for (let i = 0; i < 16; i++) {
  const t = 12 + i * 0.125;
  if (t < 13.5) add(t, clap(), 0.25 + i * 0.03, i % 2 ? 0.2 : -0.2);
}
for (let i = 0; i < 8; i++) add(13.5 + i * 0.0625, clap(), 0.55 + i * 0.05);
add(12, riser(2, 0.1), 0.75);

// FINAL HIT 14s: impact + long 808, then tail on the logo
add(14, impact(3), 1);
add(14, kick(0.6, 1.4), 1);
add(14, b808(E1, 2.6, E1 * 2), 1);
add(14, stab(Em, 1.6, 0.35), 0.4);
add(15, tick(), 0.8, 0.3);
add(15.5, tick(), 0.6, -0.3);

// ---------- master: simple reverb, glue, limiter ----------
const combs = [1557, 1617, 1491, 1422].map((d) => ({ d, buf: new Float32Array(d), i: 0 }));
const out = new Int16Array(N * 2);
let peak = 0;
const mixed = new Float32Array(N * 2);
for (let i = 0; i < N; i++) {
  const mono = (L[i] + R[i]) * 0.5;
  let rv = 0;
  for (const c of combs) {
    const y = c.buf[c.i];
    c.buf[c.i] = mono + y * 0.72;
    c.i = (c.i + 1) % c.d;
    rv += y;
  }
  rv *= 0.04;
  // fade the last 0.8s
  const fade = Math.min(1, (DUR - i / SR) / 0.8);
  mixed[i * 2] = Math.tanh((L[i] + rv) * 1.2) * fade;
  mixed[i * 2 + 1] = Math.tanh((R[i] + rv * 0.9) * 1.2) * fade;
  peak = Math.max(peak, Math.abs(mixed[i * 2]), Math.abs(mixed[i * 2 + 1]));
}
const norm = 0.84 / peak;
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
