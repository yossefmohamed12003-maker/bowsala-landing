"""Downtown-wall billboard: fit the face to the blank panel's exact pixels, keep the frame and
lamps in front, and relight the face with the blank panel's own light (warm afternoon sun)."""
import numpy as np, cv2
from PIL import Image
OW, OH = 1080, 1920
src = np.asarray(Image.open('billboard/bg_wall.png').convert('RGB')).astype(np.float32)   # 810x1440
S = OW * 2 / src.shape[1]
bg = cv2.resize(src, (OW * 2, OH * 2), interpolation=cv2.INTER_LANCZOS4)
# blank panel = bright, low-chroma pixels inside the rough quad
rough = (np.float32([[255, 72], [598, 142], [606, 1050], [252, 1040]]) * S).astype(np.int32)
roi = np.zeros(bg.shape[:2], np.uint8); cv2.fillPoly(roi, [rough], 1)
L = bg.mean(2); ch = bg.max(2) - bg.min(2)
blank = ((L > 150) & (ch < 40) & (roi > 0)).astype(np.uint8)
blank = cv2.morphologyEx(blank, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
blank = cv2.morphologyEx(blank, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(blank)
blank = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
ff = blank.copy(); cv2.floodFill(ff, np.zeros((ff.shape[0] + 2, ff.shape[1] + 2), np.uint8), (0, 0), 1); blank |= (1 - ff)
# quad from the panel's extreme corners
ys, xs = np.nonzero(blank); P = np.stack([xs, ys], 1).astype(np.float32)
quad = np.float32([P[np.argmin(P[:, 0] + P[:, 1])], P[np.argmax(P[:, 0] - P[:, 1])],
                   P[np.argmax(P[:, 0] + P[:, 1])], P[np.argmin(P[:, 0] - P[:, 1])]])
c = quad.mean(0); quad = c + (quad - c) * 1.012          # overscan a touch so edges are covered
face = np.asarray(Image.open('exports/billboard-face-model-tall.png').convert('RGB')).astype(np.float32)
h, w = face.shape[:2]
M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), quad)
warped = cv2.warpPerspective(face, M, (bg.shape[1], bg.shape[0]), flags=cv2.INTER_AREA)
warped = cv2.GaussianBlur(warped, (0, 0), 0.9)
# relight with the blank's own illumination (normalised), incl. its warm colour cast
light = cv2.GaussianBlur(bg * blank[..., None], (0, 0), 25) / (cv2.GaussianBlur(blank.astype(np.float32), (0, 0), 25)[..., None] + 1e-4)
ref = np.percentile(light[blank > 0].mean(1), 95)
light = np.clip(light / ref, 0.55, 1.08)
tint = np.array([1.03, 1.0, 0.93], np.float32)            # golden-hour warmth
lit = warped * light * tint * 0.97 + 6
a = cv2.GaussianBlur(blank.astype(np.float32), (0, 0), 0.8)[..., None]
out = bg * (1 - a) + lit * a
out += np.random.default_rng(5).normal(0, 2.2, out.shape).astype(np.float32) * a
img = Image.fromarray(out.clip(0, 255).astype(np.uint8))
img.save('exports@2x/billboard-wall-model_9x16.png'); img.resize((OW, OH), Image.LANCZOS).save('exports/billboard-wall-model_9x16.png')
print('quad', (quad / S).round(1).tolist())
