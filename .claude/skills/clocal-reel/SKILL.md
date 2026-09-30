---
name: clocal-reel
description: House style and workflow for Clocal (كلوكال) TikTok / Reels videos — Egyptian-Arabic talking-head edits with word-by-word captions, brand title cards, product B-roll and the approved colour grade. Use whenever the user sends new footage, an .srt, or asks to make/edit a Clocal video, reel, or TikTok.
---

# Clocal reel — house style (approved by the client)

The first reel (`clocal-video/`, composition `ClocalReel`) is the approved template.
**Reuse it**: copy the project structure, swap footage + captions + cards. Do not redesign.
The user writes in Egyptian Arabic — reply in Egyptian Arabic.

## Brand (from the Clocal Brand Book Vol.01)
- Cairo streetwear, "quiet luxury in the streets". Rule: *when in doubt, do less.*
- Colours: Premium Cream `#F6EEE3` · Ink `#0A0A0A` · Electric Pulse Blue `#2B00FF` (hero, ~10%) · Fiery Orange `#FF4200` (technical details/numbers only).
- Arabic type: IBM Plex Sans Arabic 700/500. Latin display: Satoshi (not on Google Fonts → Inter 900 stand-in). Technical labels: Geist, UPPERCASE, wide tracking.
- Logos (vector, extracted from the brand book): `clocal-video/public/brand/{wordmark,monogram,arabic}.svg` (fill = currentColor; used as CSS masks in `Cards.tsx`).
- Fonts are bundled in `clocal-video/public/fonts/` — Chromium in the cloud container rejects the proxy CA, so Google-Fonts loading fails at render time. Keep fonts local.

## Captions (`src/captions.ts`, `src/Captions.tsx`)
- Word-by-word reveal (words spread across each SRT phrase by length), centred at `top: 1060`, width 820, 78px Plex Arabic Bold, cream with soft shadow. Keeps clear of TikTok UI.
- Markup in phrase text: `*word*` = Electric Blue on a cream box (1–2 key words per line max) · `#word#` = orange (numbers like ست شهور / تلات سنين) · `word_word` = one token (keeps multi-word English in LTR order, e.g. `Gawhar_×_Wound`, `customer_experience`).
- Over B-roll the line sits on a solid ink plate.
- **User preferences (important):**
  - Any word that is really English is written in English: operation, character, brand, website, client, stock, drop, pieces, limited, feedback, business, customer experience, products, hype, rebranding, end of season sale…
  - Arabic article before English gets a space: «الـ operation» (handled automatically for `الـword`).
  - Product line is written **Gawhar × Wound**.
  - Clean up filler («ااا») and fix transcription errors. Known SRT mishearings: «نيك لوكل / تيك لوكال» = **كلوكال** · «لمتت» / «لما تتجد» = **limited** · «حسينا» (operation) = **حسّنّا** · «كاراكتر» = **character** · «سالتو» = سألتوا · «البروتكس» = products.
  - When a line is unclear, ask the user instead of guessing.

## Title cards (`src/Cards.tsx`) — hard cuts, like the reference
- `WordCard` blue bg + cream Arabic words landing one by one (key statements: «فاحنا رجعنا.», drop day, closing line).
- `MarkCard` cream bg + blue wordmark (+ optional line) for brand moments; ink bg + orange Arabic mark when he says «كلوكال».
- `LatinCard` cream bg + blue Inter-900 sentence case («end of season sale.»).
- Small labels on blue cards are cream (orange on blue clashes).
- Outro: cream + blue wordmark + `QUIET LUXURY IN THE STREETS` (Geist).

## B-roll rules
- **Never use lifestyle shots** (sofa / wood-panel / rug scenes) — they show the unreleased sweatpants.
- Allowed: Gawhar × Wound **flat mockup** alone (contain on white) or Gawhar × Wound on the **white studio** background. Current files: `public/broll/p16_3.jpg` (flat tee), `p16_1.jpg`, `p16_2.jpg` (studio). Slow push-in; "detail" = tight crop on the print.
- Cut B-roll in when the speaker names the product.

## Talking head
- Jump-cut punch-ins (scale 1.0 ↔ 1.12–1.18, origin on the face) every 1–3 phrases.
- **Colour grade: light touch only.** A gentle RGB curve (`tableValues="0 0.085 0.2 0.34 0.505 0.655 0.795 0.91 1"`) so blacks sit slightly deeper; no saturation or tint change. The user rejected both the cool/matte brand grade (grey, flat) and a strong contrast/warm grade ("too much"). Keep skin as shot.

## Audio
- Original voice only; **no music** unless the user asks.
- Normalise to **-14 LUFS**, true peak -1.5 dB (source phone audio is ~-23 LUFS and sounds "silent" otherwise).

## Workflow
1. `bash clocal-video/scripts/setup.sh` (npm deps + ffmpeg via pip).
2. Put footage at `clocal-video/public/main.mp4` (git-ignored — raw footage stays out of Git). Inspect it with ffmpeg contact sheets; set `durationInFrames` = footage + ~2.5 s outro.
3. Rewrite `PHRASES` from the new .srt following the caption rules; set cards/B-roll/punch-ins in `Composition.tsx`.
4. Check frames: `bash clocal-video/scripts/stills.sh <frames…>` → `out/stills/sheet.jpg` (read it).
5. Final: `bash clocal-video/scripts/render-final.sh` → `out/clocal-reel-final.mp4` (~27 MB, two-pass, fits the 30 MB chat limit; TikTok re-encodes lower anyway). Send it with SendUserFile (`display: attach`).
6. Commit + push source changes (not `out/`, not `main.mp4`).
