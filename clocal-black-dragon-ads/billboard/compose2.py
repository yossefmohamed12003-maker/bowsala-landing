"""Composite a billboard face onto a blank-billboard photo (perspective warp, keeps the
board's own lighting). Usage: compose2.py bg face out_name W H "x1,y1 x2,y2 x3,y3 x4,y4" [lit]"""
import sys, numpy as np, cv2
from PIL import Image
bgp, facep, name, OW, OH, q = sys.argv[1:7]
lit = len(sys.argv) > 7
OW, OH = int(OW), int(OH)
src = Image.open(bgp).convert('RGB')
quad = np.float32([list(map(float, p.split(','))) for p in q.split()])
# fit background to the output aspect (centre crop), then scale to 2x output
sw, sh = src.size; ar = OW / OH
if sw / sh > ar: cw, ch = round(sh * ar), sh
else: cw, ch = sw, round(sw / ar)
ox, oy = (sw - cw) // 2, (sh - ch) // 2
S = (OW * 2) / cw
bg = np.asarray(src.crop((ox, oy, ox + cw, oy + ch)).resize((OW * 2, OH * 2), Image.LANCZOS)).astype(np.float32)
quad = ((quad - [ox, oy]) * S).astype(np.float32)
face = np.asarray(Image.open(facep).convert('RGB')).astype(np.float32)
h, w = face.shape[:2]
M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), quad)
H, W = bg.shape[:2]
warped = cv2.warpPerspective(face, M, (W, H), flags=cv2.INTER_AREA)
mask = cv2.warpPerspective(np.ones((h, w), np.float32), M, (W, H))
L = cv2.GaussianBlur(bg.mean(2), (0, 0), 10)
inside = mask > 0.5
ref = np.percentile(L[inside], 90)
shade = np.clip(L / ref, 0.78 if lit else 0.86, 1.06)[..., None]
warped = cv2.GaussianBlur(warped, (0, 0), 0.9) * shade
if lit:  # lit face glows slightly
    warped = warped * 0.94 + 255 * 0.06 * (shade - 0.78) / 0.28
mask = cv2.GaussianBlur(mask, (0, 0), 0.8)[..., None]
out = bg * (1 - mask) + warped * mask
out += np.random.default_rng(3).normal(0, 2.0, out.shape).astype(np.float32) * mask
img = Image.fromarray(out.clip(0, 255).astype(np.uint8))
img.save(f'exports@2x/{name}.png'); img.resize((OW, OH), Image.LANCZOS).save(f'exports/{name}.png')
print(name, img.size)
