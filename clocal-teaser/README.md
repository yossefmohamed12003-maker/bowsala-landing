# clocal — Drop Teaser (Reel 9:16)

Remotion project for the clocal new-branding + drop teaser. 1080×1920, 30fps, 21s, 120 BPM — every cut lands on a beat.

```
npm i
npm run dev                 # Remotion Studio preview
node scripts/make-music.mjs # regenerate the soundtrack (public/audio/teaser.wav)
npx remotion render ClocalTeaser out/clocal-teaser.mp4 --codec=h264 --crf=18
```

In this cloud container, set `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Brand
All marks, colours and photography come from the clocal Brand Book (Vol. 01 — 2026):
`src/brand/marks.ts` (wordmark, monogram, Arabic mark as vectors), `src/brand/theme.ts` (palette + fonts).

**Fonts** (public/fonts): Satoshi (brand display), Geist, Geist Mono, Inter, and Archivo Expanded for the
extended uppercase headlines used in the live teaser posts.

## Editable props
`dayLabel` (default "FRI 02.10"), `timeLabel` (default "7:00 PM") and `dropLabel` (default "OCTOBER 2026") on the `ClocalTeaser` composition.
