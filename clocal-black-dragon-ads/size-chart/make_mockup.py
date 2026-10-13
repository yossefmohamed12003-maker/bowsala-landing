"""Black Dragon Crewneck flat mockup (front) built from the reference flat-lay.

Recolours the reference garment to black while keeping its own folds/shading,
removes the reference brand's chest embroidery and neck tag, then places the
supplied CLOCAL front artwork and Arabic chest mark where they sit on the real
garment (artwork clipped at the left side seam, Arabic mark on the wearer's left chest).
Output: assets/mockup_front.png (RGBA cut-out).
"""
import sys
import cv2
import numpy as np
from PIL import Image

A = 'assets/'
# Placement (reference px, 1280x1920). Tunable from the command line for iteration.
ART_SCALE = float(sys.argv[1]) if len(sys.argv) > 1 else 1.45   # px per unit of an 800-unit artwork
ART_X = float(sys.argv[2]) if len(sys.argv) > 2 else -391        # artwork origin
ART_Y = float(sys.argv[3]) if len(sys.argv) > 3 else 394
SEAM_X = 292                       # left side seam: front print stops here
COLLAR_Y, HEM_Y = 590, 1338        # print area between collar rib and hem rib
AR_CX, AR_CY, AR_W = 794, 848, 150  # Arabic chest mark centre / width

ref = np.array(Image.open(A + 'ref_crewneck_flat.webp').convert('RGB')).astype(np.float32)
H, W = ref.shape[:2]
r, g, b = ref[..., 0], ref[..., 1], ref[..., 2]
L = 0.299 * r + 0.587 * g + 0.114 * b

# Garment mask: the pink fabric has chroma, the studio background does not; the dark tag is inside.
chroma = r - b
mask = ((chroma > 7) | (L < 140)).astype(np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(mask)
mask = (lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
ff = mask.copy(); h2 = np.zeros((H + 2, W + 2), np.uint8)
cv2.floodFill(ff, h2, (0, 0), 1)
mask = mask | (1 - ff)                                  # fill interior holes

# Remove the reference brand: chest embroidery (bright, low chroma) and the whole neck tag.
fix = np.zeros((H, W), np.uint8)
fix[712:768, 736:836] = 1                               # chest embroidery: whole patch
tag = np.zeros((H, W), np.uint8)
tag[466:510, 606:678] = 1                               # reference brand's woven neck label
src = ref.clip(0, 255).astype(np.uint8)
clean = cv2.inpaint(src, ((fix | tag) * 255).astype(np.uint8), 9, cv2.INPAINT_TELEA).astype(np.float32)
Lc = 0.299 * clean[..., 0] + 0.587 * clean[..., 1] + 0.114 * clean[..., 2]

# Recolour to black fleece, keeping the reference folds (shade relative to the median fabric tone).
med = np.median(Lc[mask > 0])
sd = np.std(Lc[mask > 0])
shade = np.clip(Lc / med, 0.55, 1.15)
z = np.clip((Lc - med) / sd, -4, 3)                     # fold contrast from the reference
fabric = np.clip(27.0 + 8.0 * z, 6, 58)                 # deep black, folds still readable
out = np.dstack([fabric * 1.0, fabric * 1.0, fabric * 1.02])

# Front artwork (white), clipped to the front panel: right of the side seam, collar→hem.
art = Image.open(A + 'print_front.png').convert('RGBA')
size = int(round(800 * ART_SCALE))
art = np.array(art.resize((size, size), Image.LANCZOS)).astype(np.float32) / 255.0
layer = np.zeros((H, W), np.float32)
x0, y0 = int(round(ART_X)), int(round(ART_Y))
xs, ys = max(0, x0), max(0, y0)
xe, ye = min(W, x0 + size), min(H, y0 + size)
layer[ys:ye, xs:xe] = art[ys - y0:ye - y0, xs - x0:xe - x0, 3]
clip = np.zeros((H, W), np.float32)
clip[COLLAR_Y:HEM_Y, SEAM_X:] = 1
clip *= mask
layer *= clip
ink = 236.0 * np.clip(shade, 0.82, 1.06)                # print follows the fabric folds
for c in range(3):
    out[..., c] = out[..., c] * (1 - layer) + ink * layer

# Arabic chest mark (grey, as supplied).
ar = Image.open(A + 'print_arabic_chest.png').convert('RGBA')
ar = ar.crop(ar.getbbox())
arh = int(round(AR_W * ar.height / ar.width))
ar = np.array(ar.resize((AR_W, arh), Image.LANCZOS)).astype(np.float32) / 255.0
ax, ay = AR_CX - AR_W // 2, AR_CY - arh // 2
a = ar[..., 3] * mask[ay:ay + arh, ax:ax + AR_W]
for c in range(3):
    region = out[ay:ay + arh, ax:ax + AR_W, c]
    col = ar[..., c] * 255.0 * np.clip(shade[ay:ay + arh, ax:ax + AR_W], 0.85, 1.05)
    out[ay:ay + arh, ax:ax + AR_W, c] = region * (1 - a) + col * a

# Soft-edged cut-out.
core = cv2.erode(mask, np.ones((3, 3), np.uint8))
alpha = cv2.GaussianBlur(core.astype(np.float32), (5, 5), 0)   # clean, slightly softened edge
rgba = np.dstack([out.clip(0, 255), alpha * 255]).astype(np.uint8)
ys_, xs_ = np.where(mask > 0)
Image.fromarray(rgba).crop((xs_.min() - 4, ys_.min() - 4, xs_.max() + 5, ys_.max() + 5)).save(A + 'mockup_front.png')
print('mockup bbox', xs_.min(), ys_.min(), xs_.max(), ys_.max())
