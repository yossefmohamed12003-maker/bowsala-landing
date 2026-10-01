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

**Satoshi:** the display face isn't downloadable here; DM Sans stands in. Drop `Satoshi-Variable.woff2`
into `public/fonts/` and set `DISPLAY_FILE` in `src/brand/theme.ts`.

## Editable props
`dayLabel` (default "FRI 02.10"), `timeLabel` (default "7:00 PM") and `dropLabel` (default "OCTOBER 2026") on the `ClocalTeaser` composition.
