# CLOCAL — Black Dragon Crewneck · Best Seller Restock · Meta Ads

8 concepts, 12 export-ready files in `exports/` (PNG, 1080 px wide).
All creatives are built from the original photoshoot; no AI generation, no altered product imagery, no mirroring.
Every photo is uniformly scaled and cropped only. The renderer fails loudly if a photo doesn't fill its frame.

**Brand system used:** wordmark and monogram vectors extracted from the Brand Book PDF ·
Cream `#F6EEE3` / Ink `#0A0A0A` / Electric Pulse Blue `#2B00FF` (one accent per ad) / Orange only as technical dots ·
Satoshi Black (sentence-case headlines) · Inter (product copy) · Geist (UPPERCASE +0.16em labels).
The wordmark always sits on flat cream or ink, never on photography.

**Claims:** this restock is sold as a **pre-order**. Every creative uses the CTA **"Pre-order now →"**, and no copy says the product is currently in stock. The only claims are the approved "best seller" and "restock" messages and the EGP 850 price.
No discounts, scarcity, statistics, or testimonials.

## Product notes (verified from the shoot)
- Black crewneck, oversized with dropped shoulders and ribbed cuffs/hem.
- **Back:** the dragon artwork. Two white dragons flank a blackletter "clocal" mark, with
  "PRECISION IN EVERY STITCH" and "EVERY DETAIL MATTERS. FROM FABRIC TO FINISH." This is the "Black Dragon".
- **Front:** a large white abstract splash/contour graphic down the wearer's right side, plus a grey كلوكال script mark on the left chest.
  Copy never calls the front graphic a dragon.

## Concepts

| # | File(s) | Angle | Hook / motivation | Why test it | Source photo | On-image copy | Price / CTA |
|---|---|---|---|---|---|---|---|
| 01 | `ad01-the-return_4x5`, `_9x16` | Restock announcement | The dragon back print fills the frame, and the black fabric runs straight into the ink type band | Tests a product-hero restock headline | `p11_back_closeup` | RESTOCK PRE-ORDER — BLACK DRAGON CREWNECK · "The Black Dragon is back." | EGP 850 + Pre-order now |
| 02 | `ad02-best-seller_4x5` | Best seller | Social approval: "a favourite people already own" | Tests the best-seller claim in isolation | `p14_man_pillar_front` (framed) | BEST SELLER — RESTOCK PRE-ORDER · "A clocal best seller. Back again." | EGP 850 + Pre-order now |
| 03 | `ad03-loud-in-the-details_4x5` | Artwork / craft | Labelled close-ups reward a closer look | Tests detail-led persuasion (ANETOS-style) | `p11` + `p08` + `p03` crops | "Loud in the details." · 01 DRAGON BACK PRINT · 02 FRONT GRAPHIC · 03 ARABIC CHEST MARK | "Restock pre-order" + EGP 850 + Pre-order now |
| 04 | `ad04-front-back_4x5`, `_1x1` | Product-first | Answers "what does each side look like?" before anyone has to ask | Tests full-product clarity + wordplay | `p08_man_vines_front` + `p05_man_back_sky` | "Front. Back. Coming back." · FRONT / BACK — DRAGON PRINT | EGP 850 + Pre-order now |
| 05 | `ad05-back-in-rotation_4x5`, `_9x16` | Editorial brand | Mood first: a real Cairo stairwell, front and back seen in one frame | Tests whether a brand-led ad converts against direct-response | `p01_stairs_duo` | "Back in rotation." · BLACK DRAGON CREWNECK · RESTOCK PRE-ORDER · EGP 850 | Quiet caption + Pre-order now |
| 06 | `ad06-direct-response_4x5`, `_1x1` | Direct response | Clear front view, biggest price, strongest button | Expected conversion control | `p03_man_sky_front` | BEST SELLER RESTOCK tag · "Pre-order open." | EGP 850 (largest) + Pre-order now + theclocal.com |
| 07 | `ad07-still-the-favourite_4x5` | Best seller (lifestyle) | Two people wearing it together, warm and human; dragon prints on both backs | Tests an emotional/lifestyle hook, with a woman in frame | `p06_duo_backs_rooftop` | BEST SELLER · "Still the favourite." | "Restock pre-order — EGP 850" + Pre-order now |
| 08 | `ad08-every-angle_4x5` | Experimental contact sheet | Six frames numbered like a lookbook contact sheet; men's and women's fit | Tests a multi-angle catalogue format (VOID/MURR insight), styled as CLOCAL | `p09`, `p05`, `p02`, `p12`, `p13`, `p04` | BEST SELLER — RESTOCK PRE-ORDER · "One crewneck. Every angle." | EGP 850 + Pre-order now |

## Teaser story (9:16, 3 frames, post before the restock goes live)
| Frame | File | Idea | Photo | Copy |
|---|---|---|---|---|
| 1 | `teaser-01-coming-back_9x16` | A narrow window shows only part of the dragon | `p11` crop | CLOCAL — RESTOCK · "Something's coming back." |
| 2 | `teaser-02-you-know-the-one_9x16` | A wider view, still incomplete; speaks to existing fans | `p11` crop | "You know the one." |
| 3 | `teaser-03-back-soon_9x16` | Reveal: the full back print and the product name | `p05_man_back_sky` | BEST SELLER — RESTOCK PRE-ORDER · "The Black Dragon. Back soon." |

All 3 frames carry a small "Pre-order now" button. No date and no price, so nothing is invented. If there's a confirmed launch date, it can replace "Back soon."

**Placements:** 4:5 for Feed (FB/IG). 9:16 for Stories/Reels: key copy stays out of the top ~250 px and bottom ~380 px.
1:1 for Feed and right column.

**Suggested first test split:** 06 (DR control) vs 01 (restock hero) vs 02 (best seller) vs 05 (editorial).
Bring in 03/04/07/08 as challengers once the winning angle is clear.

## Rebuild
`node render.mjs [filter]`. Edit `src/*.html`. Photo crops use `data-crop="sx,sy,sw"` in source pixels.
