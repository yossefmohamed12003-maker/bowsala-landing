#!/bin/bash
# One-time setup for a fresh cloud container: node deps + ffmpeg (via pip, no apt needed).
set -e
cd "$(dirname "$0")/.."
npm i --loglevel=error
pip install -q imageio-ffmpeg pymupdf pillow 2>&1 | grep -v WARNING || true
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
ln -sf "$FF" /usr/local/bin/ffmpeg
ffmpeg -version | head -1
