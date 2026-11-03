"""Pre-upscale assets/background.jpg to a crisp 2560px wallpaper.

The original is 1024px; letting the browser stretch it to a 1920px window makes it
soft. Instead this script upscales once with Lanczos, applies an unsharp mask and a
small contrast lift, and stores WebP. The browser then *downscales* to the window,
which stays sharp.

    python scripts/make-sharp.py
"""
from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(ROOT, "assets", "background.jpg")
TARGET = os.path.join(ROOT, "assets", "webp", "background-2560.webp")

SIZE = 2560


def main() -> None:
    im = Image.open(SOURCE).convert("RGB")
    big = im.resize((SIZE, SIZE), Image.LANCZOS)
    big = big.filter(ImageFilter.UnsharpMask(radius=1.8, percent=150, threshold=2))
    big = ImageEnhance.Contrast(big).enhance(1.03)
    big.save(TARGET, "WEBP", quality=90, method=6)
    print(f"{TARGET} written: {os.path.getsize(TARGET)} bytes")


if __name__ == "__main__":
    main()
