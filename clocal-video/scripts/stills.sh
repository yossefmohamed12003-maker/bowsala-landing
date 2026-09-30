#!/bin/bash
# Render single frames for a quick visual check, then tile them into out/stills/sheet.jpg
# usage: scripts/stills.sh 30 300 900 ...
set -e
cd "$(dirname "$0")/.."
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
OUT=out/stills; mkdir -p "$OUT"; rm -f "${OUT:?}"/*.png
for f in "$@"; do printf -v p "%05d" "$f"; npx remotion still ClocalReel "$OUT/f$p.png" --frame=$f --browser-executable=$B --log=error; done
cd "$OUT"; files=$(ls f*.png); n=$(echo "$files" | wc -l)
args=""; for x in $files; do args="$args -i $x"; done
fc=""; for k in $(seq 0 $((n-1))); do fc="$fc[$k]scale=270:480[v$k];"; done
for k in $(seq 0 $((n-1))); do fc="$fc[v$k]"; done
lay=""; for k in $(seq 0 $((n-1))); do lay="$lay$((k%7*270))_$((k/7*480))|"; done
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${fc}xstack=inputs=$n:layout=${lay%|}:fill=gray" sheet.jpg
echo "sheet: $(pwd)/sheet.jpg"
