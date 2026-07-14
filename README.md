# Bowsala — Landing Page

React + Vite + Tailwind CSS rebuild of the Bowsala "Inaugural Escape" landing page.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Deploy to Vercel

Push this folder to a Git repo and import it in Vercel — the Vite framework
preset is auto-detected (build command `npm run build`, output `dist`). No
extra config needed.

## Structure

- `src/components` — one component per section (Navbar, Hero, Manifesto,
  TripGallery, Highlights, Logistics, HouseRules, Footer) plus shared
  primitives (`Button`, `Eyebrow`, `Logo`, `Divider`).
- `src/data/site.js` — all page copy (nav links, hero text, pricing,
  pickup points, house rules, etc.) in one place — edit this file to
  update content without touching components.
- `public/images` — hero/gallery photography and the compass mark, pulled
  from the original design bundle.
- `public/fonts` — stand-in webfonts (Newsreader, Schibsted Grotesk, IBM
  Plex Mono). These are placeholders for the licensed production faces
  (29LT Zarid Serif / Greta Sans) — swap the files in `public/fonts` and
  update the `@font-face` blocks in `src/index.css` when the licensed
  fonts are available.

## Editing content

Update copy, pricing, pickup times, or links in `src/data/site.js`. Update
colors/spacing/fonts in `tailwind.config.js`.
