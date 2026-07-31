#!/usr/bin/env python3
"""Export the hero turnaround frames.

Only the first TURN source frames are exported, so the figure makes a partial
turn as the hero scrolls rather than rotating all the way round.

Source: ~/Downloads/sunman-turn-white.mp4 — the figure on a white studio
backdrop. This is used in preference to the alpha (ProRes 4444) master because
it is a far sharper render: face detail measures ~490 at hero size versus ~130
for the alpha version.

The white backdrop is keyed to transparency rather than left opaque, so the
sunburst shows through behind the figure. Two properties make this clean:

  * the backdrop is neutral grey/white while the figure is saturated, so an
    RGB-distance key separates them even though they are only ~7 luma levels
    apart at the brightest;
  * after keying, the RGB left under the transparent pixels is ~249 (near
    white), so browser scaling cannot bleed a dark halo — the failure mode that
    plagued the alpha master, whose transparent regions were black.

Usage: python3 tools/process-hero-frames.py
"""
import glob, os, shutil, subprocess
from PIL import Image

SRC    = os.path.expanduser("~/Downloads/sunman-turn-white.mp4")
CROP   = "1900:2004:944:116"   # union bbox of the figure across the clip, padded
HEIGHT = 1900                  # covers a full-height hero at 2x without upscaling
TURN   = 50                    # only the first N source frames -> a partial turn
EVERY  = 2                     # keep every Nth of those (121 frames total in source)
KEY    = "0xFAFAFA:0.13:0.06"  # colour:similarity:blend
OUT    = "public/img/hero-turn"

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    subprocess.run([
        "ffmpeg", "-v", "error", "-i", SRC, "-vf",
        f"crop={CROP},colorkey={KEY},scale=-2:{HEIGHT},"
        f"select='lt(n\\,{TURN})*not(mod(n\\,{EVERY}))'",
        "-vsync", "0", "-c:v", "libwebp", "-lossless", "0",
        "-quality", "86", "-compression_level", "6",
        f"{OUT}/t%02d.webp", "-y",
    ], check=True)
    files = sorted(glob.glob(f"{OUT}/*.webp"))
    total = sum(os.path.getsize(p) for p in files)
    im = Image.open(files[0])
    print(f"  {len(files)} frames, {total/1048576:.1f} MB, {im.size}")
    print(f"  -> set HERO_TURN in lib/data.ts to "
          f"count: {len(files)}, width: {im.size[0]}, height: {im.size[1]}")

if __name__ == "__main__":
    main()
