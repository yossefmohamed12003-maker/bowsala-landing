"""Black Dragon Crewneck flat mockups (front and back) built from the reference flat-lay.

VIEW=front (default) or VIEW=back.  Back view uses the back flat-lay reference: its embroidery and
the back yoke seam (not on the real garment) are removed, and the supplied back dragon artwork is
placed centred under the collar as on the real garment.

Recolours the reference garment to black while keeping its own folds/shading,
removes the reference brand's chest embroidery and neck tag, then places the
supplied CLOCAL front artwork and Arabic chest mark where they sit on the real
garment (artwork clipped at the left side seam, Arabic mark on the wearer's left chest).
Output: assets/mockup_<view>.png (RGBA cut-out).
"""
import os
import sys
import cv2
import numpy as np
from PIL import Image

A = 'assets/'
K = 2                              # work at 2x the reference resolution
VIEW = os.environ.get('VIEW', 'front')
BACK_W, BACK_TOP = 320, 560        # back print width / top edge (reference px)
# Placement (reference px, 1280x1920). Tunable from the command line for iteration.
ART_SCALE = float(sys.argv[1]) if len(sys.argv) > 1 else 1.45   # px per unit of an 800-unit artwork
ART_X = float(sys.argv[2]) if len(sys.argv) > 2 else -391        # artwork origin
ART_Y = float(sys.argv[3]) if len(sys.argv) > 3 else 394
SEAM_X = 292                       # left side seam: front print stops here
COLLAR_Y, HEM_Y = 590, 1338        # print area between collar rib and hem rib
AR_CX, AR_CY, AR_W = 794, 848, 150  # Arabic chest mark centre / width

ref0 = np.array(Image.open(A + ('ref_crewneck_flat_back.webp' if VIEW == 'back' else 'ref_crewneck_flat.webp')).convert('RGB'))
# Remove WebP block artefacts before upscaling, keeping folds and seams (edge-preserving).
ref0 = cv2.bilateralFilter(ref0, 7, 10, 5)
ref = cv2.resize(ref0, None, fx=K, fy=K, interpolation=cv2.INTER_CUBIC).astype(np.float32)
H, W = ref.shape[:2]
r, g, b = ref[..., 0], ref[..., 1], ref[..., 2]
L = 0.299 * r + 0.587 * g + 0.114 * b

# Garment mask: the pink fabric has chroma, the studio background does not; the dark tag is inside.
chroma = cv2.GaussianBlur(r - b, (0, 0), 1.5)
mask = ((chroma > 7) | (L < 140)).astype(np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9 * K, 9 * K), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(mask)
mask = (lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
ff = mask.copy(); h2 = np.zeros((H + 2, W + 2), np.uint8)
cv2.floodFill(ff, h2, (0, 0), 1)
mask = mask | (1 - ff)                                  # fill interior holes

# Remove the reference brand (and, on the back, the yoke seam the real garment doesn't have).
src = ref.clip(0, 255).astype(np.uint8)
fix = np.zeros((H, W), np.uint8)
if VIEW == 'front':
    fix[712 * K:768 * K, 736 * K:836 * K] = 1                               # chest embroidery: whole patch
    fix[466 * K:510 * K, 606 * K:678 * K] = 1                               # woven neck label
else:
    yoke = np.array([(332, 699), (380, 691), (460, 685), (620, 684), (740, 688), (820, 692),
                     (900, 701), (945, 707), (968, 712)]) * K                # traced from the reference
    cv2.polylines(fix, [yoke.astype(np.int32)], False, 1, 13 * K)           # back yoke seam
clean = cv2.inpaint(src, (fix * 255).astype(np.uint8), 9 * K, cv2.INPAINT_TELEA).astype(np.float32)
if VIEW == 'back':
    # Back embroidery (incl. its emboss): fill with a smooth field from the surrounding fabric
    # (normalised convolution) and feather it in, so no inpainting streaks appear.
    hole = np.zeros((H, W), np.float32); hole[738 * K:968 * K, 432 * K:832 * K] = 1
    keep = (1 - hole) * mask
    # computed at 1/8 scale: the hole is large, so the field needs a wide radius to reach its centre
    q = 8
    small = lambda im: cv2.resize(im, (W // q, H // q), interpolation=cv2.INTER_AREA)
    big = lambda im: cv2.resize(im, (W, H), interpolation=cv2.INTER_CUBIC)
    sig = 90 * K / q
    den = cv2.GaussianBlur(small(keep), (0, 0), sig)
    feather = cv2.GaussianBlur(hole, (0, 0), 6 * K)
    for c in range(3):
        fill = big(cv2.GaussianBlur(small(clean[..., c] * keep), (0, 0), sig) / np.maximum(den, 1e-3))
        clean[..., c] = clean[..., c] * (1 - feather) + fill * feather
Lc = 0.299 * clean[..., 0] + 0.587 * clean[..., 1] + 0.114 * clean[..., 2]
Lc = cv2.bilateralFilter(Lc.astype(np.float32), 9, 4, 6)   # smooth fabric, keep seams

# Recolour to black fleece, keeping the reference folds (shade relative to the median fabric tone).
med = np.median(Lc[mask > 0])
sd = np.std(Lc[mask > 0])
shade = np.clip(Lc / med, 0.55, 1.15)
z = np.clip((Lc - med) / sd, -4, 3)                     # fold contrast from the reference
fabric = np.clip(27.0 + 9.5 * z, 6, 62)                 # deep black, folds still readable
rng = np.random.default_rng(7)
grain = cv2.GaussianBlur(rng.normal(0, 1, (H, W)).astype(np.float32), (0, 0), 0.8) * 2.2
fabric = fabric + grain                                  # faint fleece grain so it doesn't read as flat fill
out = np.dstack([fabric * 1.0, fabric * 1.0, fabric * 1.02])

# Front artwork (white), clipped to the front panel: right of the side seam, collar→hem.
if VIEW == 'front':
    art = Image.open(A + 'print_front.png').convert('RGBA')
    size = int(round(800 * ART_SCALE * K))
    art = np.array(art.resize((size, size), Image.LANCZOS)).astype(np.float32) / 255.0
    layer = np.zeros((H, W), np.float32)
    x0, y0 = int(round(ART_X * K)), int(round(ART_Y * K))
    xs, ys = max(0, x0), max(0, y0)
    xe, ye = min(W, x0 + size), min(H, y0 + size)
    layer[ys:ye, xs:xe] = art[ys - y0:ye - y0, xs - x0:xe - x0, 3]
    clip = np.zeros((H, W), np.float32)
    clip[COLLAR_Y * K:HEM_Y * K, SEAM_X * K:] = 1
    clip *= mask
    layer *= clip
    ink = 236.0 * np.clip(shade, 0.82, 1.06) + grain * 1.5  # print follows the fabric folds and grain
    for c in range(3):
        out[..., c] = out[..., c] * (1 - layer) + ink * layer

    # Arabic chest mark (grey, as supplied).
    ar = Image.open(A + 'print_arabic_chest.png').convert('RGBA')
    ar = ar.crop(ar.getbbox())
    arw = AR_W * K
    arh = int(round(arw * ar.height / ar.width))
    ar = np.array(ar.resize((arw, arh), Image.LANCZOS)).astype(np.float32) / 255.0
    ax, ay = AR_CX * K - arw // 2, AR_CY * K - arh // 2
    a = ar[..., 3] * mask[ay:ay + arh, ax:ax + arw]
    for c in range(3):
        region = out[ay:ay + arh, ax:ax + arw, c]
        col = ar[..., c] * 255.0 * np.clip(shade[ay:ay + arh, ax:ax + arw], 0.85, 1.05)
        out[ay:ay + arh, ax:ax + arw, c] = region * (1 - a) + col * a

else:
    # Back dragon artwork (white), centred under the collar.
    bk = Image.open(A + 'print_back_dragon.png').convert('RGBA')
    bk = bk.crop(bk.getbbox())
    bw = BACK_W * K
    bh = int(round(bw * bk.height / bk.width))
    bk = np.array(bk.resize((bw, bh), Image.LANCZOS)).astype(np.float32) / 255.0
    bx, by = W // 2 - bw // 2, BACK_TOP * K
    a = bk[..., 3] * mask[by:by + bh, bx:bx + bw]
    ink = 236.0 * np.clip(shade[by:by + bh, bx:bx + bw], 0.82, 1.06) + grain[by:by + bh, bx:bx + bw] * 1.5
    for c in range(3):
        out[by:by + bh, bx:bx + bw, c] = out[by:by + bh, bx:bx + bw, c] * (1 - a) + ink * a

# Soft-edged cut-out.
core = cv2.erode(mask, np.ones((3, 3), np.uint8))
alpha = cv2.GaussianBlur(core.astype(np.float32), (0, 0), 1.2)   # clean, slightly softened edge
rgba = np.dstack([out.clip(0, 255), alpha * 255]).astype(np.uint8)
ys_, xs_ = np.where(mask > 0)
Image.fromarray(rgba).crop((xs_.min() - 8, ys_.min() - 8, xs_.max() + 9, ys_.max() + 9)).save(A + f'mockup_{VIEW}.png')
print('mockup bbox', xs_.min(), ys_.min(), xs_.max(), ys_.max())
