#!/bin/bash
# Full render → loudness-normalise to -14 LUFS (TikTok) → two-pass encode under 30 MB
# so the final file can be sent through the chat (30 MB upload limit).
set -e
cd "$(dirname "$0")/.."
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
COMP=${1:-ClocalReel}
mkdir -p out
npx remotion render "$COMP" out/raw.mp4 --browser-executable=$B --codec=h264 --crf=16 --log=error

# Two-pass loudnorm: measure, then apply linearly.
M=$(ffmpeg -hide_banner -i out/raw.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -hide_banner -loglevel error -y -i out/raw.mp4 -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):linear=true,aresample=48000" \
  -c:a aac -b:a 256k -movflags +faststart out/clocal-reel.mp4
rm out/raw.mp4

# Size the video bitrate so the file lands at ~27 MB whatever the duration.
DUR=$(ffmpeg -hide_banner -i out/clocal-reel.mp4 2>&1 | grep -oE 'Duration: [0-9:.]+' | awk -F'[: ]' '{print $3*3600+$4*60+$5}')
VBR=$(python3 -c "print(min(8000, int(27*8*1024/$DUR - 260)))")
P=out/pass
ffmpeg -hide_banner -loglevel error -y -i out/clocal-reel.mp4 -c:v libx264 -preset slow -b:v ${VBR}k -pass 1 -passlogfile $P -an -f null /dev/null
ffmpeg -hide_banner -loglevel error -y -i out/clocal-reel.mp4 -c:v libx264 -preset slow -b:v ${VBR}k -maxrate $((VBR*5/3))k -bufsize $((VBR*2))k \
  -pass 2 -passlogfile $P -pix_fmt yuv420p -profile:v high -c:a copy -movflags +faststart out/clocal-reel-final.mp4
rm -f $P*
ls -la out/clocal-reel.mp4 out/clocal-reel-final.mp4
