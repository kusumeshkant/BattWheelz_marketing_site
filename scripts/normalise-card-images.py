"""Normalise the client's approved "What you get" card photos for the web.

The source renders are ~2528x1696 PNGs at 6-9 MB each — roughly 8 MB of pixels
to fill a tile that is never wider than about 390 CSS px. Shipping them as
supplied would be ~45 MB on a page that currently weighs a fraction of that.

Two transforms, both of which exist because of how the tile renders:

  * CROP TO 16:9. `Card.module.css` gives `.mediaBand` a fixed `aspect-ratio:
    16 / 9` so a row of cards keeps its titles on one line. The sources are 3:2.
    Cropping here rather than leaning on `object-fit: cover` alone means we ship
    only the pixels that are actually visible — the CSS keeps `cover` as a
    belt-and-braces guard if the tile ratio is ever changed.
  * RESIZE TO 900px WIDE. `next.config.mjs` sets `images: { unoptimized: true }`
    (forced by `output: "export"` — the Next optimizer needs a server), so there
    is no srcset and ONE file serves every breakpoint. 900px covers the widest
    real tile (~390 CSS px on a large phone, the single-column case) at 2x.

Which option the client picked is recorded below as an OPTION NUMBER, not a
filename, and the filename is re-derived with the same ordering the review
document used (oldest mtime first, unsuffixed original = Option 1). That keeps
this script and `Card_Image_Selection_for_Client_Review.docx` provably in sync:
if the ordering logic is ever wrong, it is wrong in both places at once rather
than silently disagreeing.

Usage, from the marketing-site root:

    python scripts/normalise-card-images.py
"""
from pathlib import Path

from PIL import Image

SRC = Path(r"D:\projects\batt_wheelz_project\what_you _get_section Images")
DST = Path(__file__).resolve().parent.parent / "src" / "assets" / "cardImages"

# The tile's ratio, from `.mediaBand` in Card.module.css.
OUT_W, OUT_H = 900, 506  # 16:9
QUALITY = 82

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".tiff", ".webp"}

# card title (EXACTLY as in siteContent.js) -> (source folder, option picked, slug)
SELECTIONS = {
    "Insurance and recovery": ("Insurance and recovery", 3, "insurance-and-recovery"),
    "Live GPS tracking": ("Live GPS tracking", 4, "live-gps-tracking"),
    "Vehicle and battery": ("Vehicle and battery", 1, "vehicle-and-battery"),
    "Rider support": ("Rider_support", 2, "rider-support"),
    "Servicing and maintenance": ("Servicing and maintenance", 2, "servicing-and-maintenance"),
    "A rate that cannot move": ("A_rate_that_cannot_move", 2, "a-rate-that-cannot-move"),
}


def options(folder: Path):
    """Every image in the folder, oldest first — the review document's ordering."""
    return sorted(
        (p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS),
        key=lambda p: (p.stat().st_mtime, p.name.lower()),
    )


def crop_to_ratio(im: Image.Image, ratio: float) -> Image.Image:
    """Centre-crop to `ratio`, trimming only the longer axis.

    A centre crop is right for this set specifically: every render frames the
    bike centrally, so the subject survives and what goes is sky and foreground.
    """
    w, h = im.size
    if w / h > ratio:
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def main():
    DST.mkdir(parents=True, exist_ok=True)
    ratio = OUT_W / OUT_H

    for title, (folder_name, pick, slug) in SELECTIONS.items():
        folder = SRC / folder_name
        files = options(folder)
        if not 1 <= pick <= len(files):
            raise SystemExit(f"{title}: option {pick} requested, {len(files)} available")

        chosen = files[pick - 1]
        out = DST / f"{slug}.webp"

        with Image.open(chosen) as im:
            im = im.convert("RGB")
            src_size = im.size
            im = crop_to_ratio(im, ratio)
            im = im.resize((OUT_W, OUT_H), Image.LANCZOS)
            im.save(out, "WEBP", quality=QUALITY, method=6)

        print(
            f"{title:28} opt {pick}  {chosen.name:34} "
            f"{src_size[0]}x{src_size[1]} {chosen.stat().st_size / 1e6:.1f}MB "
            f"-> {out.name} {OUT_W}x{OUT_H} {out.stat().st_size / 1e3:.0f}KB"
        )


if __name__ == "__main__":
    main()
