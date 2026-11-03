"""Compose assets/webp/wide.webp (1920x1080) from assets/background.jpg.

The square original stays sharp in the centre. Both sides are filled with a SHARP
mirror of the picture's edge strips (a reflection is continuous at the seam, so no
blur or blend is needed). The far edges get a light darkening.

Run with the bundled Python:

    python scripts/make-wide.py
"""
from __future__ import annotations

import os

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(ROOT, "assets", "background.jpg")
TARGET = os.path.join(ROOT, "assets", "webp", "wide.webp")

W, H = 1920, 1080
EDGE = 120


def main() -> None:
    im = Image.open(SOURCE).convert("RGB")
    w = int(round(im.width * H / im.height))
    sharp = im.resize((w, H), Image.LANCZOS)
    cx = (W - w) // 2

    canvas = Image.new("RGB", (W, H), (5, 8, 15))
    canvas.paste(sharp, (cx, 0))

    left = sharp.crop((0, 0, cx, H)).transpose(Image.FLIP_LEFT_RIGHT)
    right = sharp.crop((w - cx, 0, w, H)).transpose(Image.FLIP_LEFT_RIGHT)
    canvas.paste(left, (0, 0))
    canvas.paste(right, (cx + w, 0))

    edge = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ed = ImageDraw.Draw(edge)
    for x in range(EDGE):
        a = int(120 * (1 - x / EDGE))
        ed.line([(x, 0), (x, H)], fill=(4, 7, 14, a))
        ed.line([(W - 1 - x, 0), (W - 1 - x, H)], fill=(4, 7, 14, a))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), edge).convert("RGB")

    canvas.save(TARGET, "WEBP", quality=92, method=6)
    print(f"{TARGET} written: {os.path.getsize(TARGET)} bytes")


if __name__ == "__main__":
    main()
