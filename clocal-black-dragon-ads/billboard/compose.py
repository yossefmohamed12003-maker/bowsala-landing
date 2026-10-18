"""Composite the CLOCAL billboard face (exports/billboard-face.png) onto the blank
billboard photo with a perspective warp and the board's own lighting. Output 4:5."""
import numpy as np, cv2
from PIL import Image

S = 2                                   # output scale (2 -> 2160x2700)
bg = Image.open('billboard/bg_billboard_blank.png').convert('RGB').crop((0, 0, 1080, 1338))
k = 1350 / 1338
bg = bg.resize((round(1080 * k), 1350), Image.LANCZOS)
dx = (bg.width - 1080) // 2
bg = bg.crop((dx, 0, dx + 1080, 1350)).resize((1080 * S, 1350 * S), Image.LANCZOS)
bg = np.asarray(bg).astype(np.float32)

# board face corners measured on the blank photo (TL, TR, BR, BL), mapped into the 4:5 frame
quad = np.float32([[116, 288], [963, 288], [966, 564], [115, 567]])
quad = ((quad * k) - [dx, 0]) * S

face = np.asarray(Image.open('exports/billboard-face.png').convert('RGB')).astype(np.float32)
h, w = face.shape[:2]
M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), quad.astype(np.float32))
H, W = bg.shape[:2]
warped = cv2.warpPerspective(face, M, (W, H), flags=cv2.INTER_AREA)
mask = cv2.warpPerspective(np.ones((h, w), np.float32), M, (W, H), flags=cv2.INTER_LINEAR)

# keep the photo's light falloff across the board, and soften to the photo's sharpness
lum = cv2.GaussianBlur(bg.mean(2), (0, 0), 6 * S) / 224.0
shade = np.clip(lum, 0.86, 1.04)[..., None]
warped = cv2.GaussianBlur(warped, (0, 0), 0.6 * S) * shade
mask = cv2.GaussianBlur(mask, (0, 0), 0.5 * S)[..., None]
out = bg * (1 - mask) + warped * mask
rng = np.random.default_rng(3)
out += rng.normal(0, 2.0, out.shape).astype(np.float32) * mask
Image.fromarray(out.clip(0, 255).astype(np.uint8)).save('exports@2x/billboard-not-twice_4x5.png')
Image.fromarray(out.clip(0, 255).astype(np.uint8)).resize((1080, 1350), Image.LANCZOS).save('exports/billboard-not-twice_4x5.png')
print('ok')
