"""Normalise the client's approved "What you get" card photos for the web.

The source renders are ~2528x1696 PNGs at 6-9 MB each — roughly 8 MB of pixels
to fill a tile that is never wider than about 390 CSS px. Shipping them as
supplied would be ~45 MB on a page that currently weighs a fraction of that.

Two transforms, both of which exist because of how the tile renders:

  * CROP TO 3:2, FROM A PER-IMAGE ANCHOR. `Card.module.css` gives `.mediaBand`
    a fixed `aspect-ratio: 3 / 2` so a row of cards keeps its titles on one
    line. Cropping here rather than leaning on `object-fit: cover` alone means
    we ship only the pixels that are actually visible — the CSS keeps `cover`
    as a belt-and-braces guard if the tile ratio is ever changed.

    THE TILE RATIO NOW MATCHES THE SOURCES, WHICH IS THE POINT. The band was
    16:9, which is 274px narrower in height than these 2528x1696 renders — and
    two of them (the studio shots) hold a bike taller than a 16:9 window can
    contain, so *something* had to be cut no matter where the window sat. At
    3:2 the sources are 1.4906 against a 1.5 target: 11px of height, 0.65%,
    and the studio bikes fit whole. `A_rate_that_cannot_move` is 2528x1682, a
    hair WIDER than 3:2, so it loses 5px of width instead and nothing vertical.

    A centre crop was the first attempt and the client rejected it: these six
    frames do not share a composition. Four of them put the subject's base
    (wheels, the U-lock, the tool tray) within ~30px of the bottom edge, so a
    centred window shaved it; one is two people whose heads sit near the top.
    Each image therefore carries its own ANCHOR — see `SELECTIONS`. Those
    anchors now move at most 11px rather than 275px, so they barely bite; they
    are kept because they still encode which edge matters per frame, and they
    would matter again immediately if a source were ever re-exported at a
    different aspect.
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

# The tile's ratio, from `.mediaBand` in Card.module.css. Keep the two in step:
# a mismatch here is not a crash, it is `object-fit: cover` silently re-cropping
# at render time — the exact thing this script exists to control.
OUT_W, OUT_H = 900, 600  # 3:2
QUALITY = 82

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".tiff", ".webp"}

# The vertical crop anchor, as a fraction of the slack being removed:
#   0.0 = keep the TOP of the frame (cut from the bottom)
#   0.5 = centre
#   1.0 = keep the BOTTOM of the frame (cut from the top)
#
# A fraction rather than a pixel offset on purpose: it stays correct if a source
# is ever re-exported at a different size, where a hard-coded offset would not.
#
# Every value below was chosen by looking at the frame, not by rule of thumb.
# card title (EXACTLY as in siteContent.js)
#   -> (source folder, option picked, slug, anchor, why)
SELECTIONS = {
    # The U-lock on the front wheel is the point of the shot and sits at the very
    # bottom; a centred window cut through it. Nothing is lost at the top but
    # shop signage, and the recovery van and walking technician stay in frame.
    "Insurance and recovery": (
        "Insurance and recovery", 3, "insurance-and-recovery", 1.0,
    ),
    # Bottom-anchored so the scooter sits fully on the ground inside the HUD.
    # Costs only the garbled "BATWHEEL" title band at the top; all four HUD
    # panels (route history, trip metrics, geo-fence, range) survive.
    "Live GPS tracking": (
        "Live GPS tracking", 4, "live-gps-tracking", 1.0,
    ),
    # NEUTRAL, and that is the whole point of moving to 3:2. At 16:9 this bike
    # was ~1456px tall against a 1422px window: it could not fit, and the 0.80
    # anchor here was buying a full front wheel at the cost of the handlebar
    # stalk. The 3:2 window is 1685px, the bike fits whole with room to spare,
    # so there is nothing left to trade and the anchor goes back to centre.
    "Vehicle and battery": (
        "Vehicle and battery", 1, "vehicle-and-battery", 0.5,
    ),
    # The ONLY top-anchored image. Two people, heads high in the frame — a
    # bottom anchor grazed the left man's hair. What goes instead is their lower
    # legs and empty road, which is ordinary framing for a landscape tile.
    "Rider support": (
        "Rider_support", 2, "rider-support", 0.0,
    ),
    # Bottom-anchored to clear the scooter's front wheel and keep the whole tool
    # tray. The mechanic's gloved hands sit mid-frame and are safe either way;
    # the top of the frame is workshop ceiling and cabinets.
    "Servicing and maintenance": (
        "Servicing and maintenance", 2, "servicing-and-maintenance", 1.0,
    ),
    # The one source that is WIDER than the tile (2528x1682 = 1.5030 vs 1.5), so
    # its 5px crop comes off the width and this vertical anchor is never
    # consulted. Left at centre to say "no vertical opinion" rather than leaving
    # the old 0.85 sitting here looking meaningful. Full bike, full front wheel.
    "A rate that cannot move": (
        "A_rate_that_cannot_move", 2, "a-rate-that-cannot-move", 0.5,
    ),
}


def options(folder: Path):
    """Every image in the folder, oldest first — the review document's ordering."""
    return sorted(
        (p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS),
        key=lambda p: (p.stat().st_mtime, p.name.lower()),
    )


def crop_to_ratio(im: Image.Image, ratio: float, anchor: float) -> Image.Image:
    """Crop to `ratio`, trimming the longer axis from `anchor` (0=top, 1=bottom).

    Horizontal cropping stays centred: none of these sources needs a horizontal
    anchor, and inventing one would be an untested knob.
    """
    w, h = im.size
    if w / h > ratio:
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)
    slack = h - new_h
    top = max(0, min(slack, round(slack * anchor)))
    return im.crop((0, top, w, top + new_h))


def main():
    DST.mkdir(parents=True, exist_ok=True)
    ratio = OUT_W / OUT_H

    for title, (folder_name, pick, slug, anchor) in SELECTIONS.items():
        folder = SRC / folder_name
        files = options(folder)
        if not 1 <= pick <= len(files):
            raise SystemExit(f"{title}: option {pick} requested, {len(files)} available")

        chosen = files[pick - 1]
        out = DST / f"{slug}.webp"

        with Image.open(chosen) as im:
            im = im.convert("RGB")
            sw, sh = im.size
            im = crop_to_ratio(im, ratio, anchor)
            im = im.resize((OUT_W, OUT_H), Image.LANCZOS)
            im.save(out, "WEBP", quality=QUALITY, method=6)

        # Report against the axis actually cropped. A source wider than the tile
        # loses width and never consults the anchor, so printing a vertical
        # split for it would be fiction — and it printed a negative one.
        if sw / sh > ratio:
            how = f"cut {sw - round(sh * ratio):3}px width (anchor unused)"
        else:
            slack = sh - round(sw / ratio)
            top = max(0, min(slack, round(slack * anchor)))
            how = f"cut {top:3}px top / {slack - top:3}px bottom"

        where = {0.0: "top", 0.5: "centre", 1.0: "bottom"}.get(anchor, "weighted")
        print(
            f"{title:28} opt {pick}  anchor {anchor:.2f} ({where:6}) {how}  "
            f"-> {out.name} {out.stat().st_size / 1e3:.0f}KB"
        )


if __name__ == "__main__":
    main()
