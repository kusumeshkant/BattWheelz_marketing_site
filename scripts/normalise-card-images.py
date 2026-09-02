"""Normalise the client's approved "What you get" card photos for the web.

Two transforms, both of which exist because of how the tile renders:

  * CROP TO 3:2, FROM A PER-IMAGE ANCHOR. `Card.module.css` gives `.mediaBand`
    a fixed `aspect-ratio: 3 / 2` so a row of cards keeps its titles on one
    line. Cropping here rather than leaning on `object-fit: cover` alone means
    we ship only the pixels that are actually visible — the CSS keeps `cover`
    as a belt-and-braces guard if the tile ratio is ever changed.

    The current sources are ALREADY 900x600, so every crop is 0px and every
    anchor is inert. That is a property of this batch, not a rule: the anchors
    stay because they record which edge of each frame must survive, and they
    would bite again the moment a source arrives at a different aspect. The
    values are unchanged from the 2528x1696 batch they were chosen on.

  * RESIZE TO 900px WIDE. `next.config.mjs` sets `images: { unoptimized: true }`
    (forced by `output: "export"` — the Next optimizer needs a server), so there
    is no srcset and ONE file serves every breakpoint. 900px covers the widest
    real tile (~390 CSS px on a large phone, the single-column case) at 2x.
    Also a no-op for this batch, which arrives at exactly that size.

So for THIS batch the script is effectively a PNG -> WebP re-encode. It is still
the right place for the work: the next batch may not arrive pre-sized, and the
crop/resize rules should not have to be rediscovered when it does.

SOURCE HISTORY. The originals were ~2528x1696 renders under
`what_you _get_section Images/`, one folder per card holding several options,
and the client approved one option per card in
`Card_Image_Selection_for_Client_Review.docx`. Those renders carried a sparkle
artefact in the lower right. `live_site_images1/` holds the retouched
replacements with the sparkle removed, already cropped and sized. The approved
option each one descends from is recorded per card in `ORIGIN` below — it is no
longer derivable from the filename, so it is written down rather than lost.

Usage, from the marketing-site root:

    python scripts/normalise-card-images.py
"""
from pathlib import Path

from PIL import Image

SRC = Path(r"D:\projects\batt_wheelz_project\live_site_images1")
DST = Path(__file__).resolve().parent.parent / "src" / "assets" / "cardImages"

# The tile's ratio, from `.mediaBand` in Card.module.css. Keep the two in step:
# a mismatch here is not a crash, it is `object-fit: cover` silently re-cropping
# at render time — the exact thing this script exists to control.
OUT_W, OUT_H = 900, 600  # 3:2
QUALITY = 82

# The vertical crop anchor, as a fraction of the slack being removed:
#   0.0 = keep the TOP of the frame (cut from the bottom)
#   0.5 = centre
#   1.0 = keep the BOTTOM of the frame (cut from the top)
#
# A fraction rather than a pixel offset on purpose: it stays correct if a source
# is ever re-exported at a different size, where a hard-coded offset would not.
#
# Every value below was chosen by looking at the frame, not by rule of thumb.
# card title (EXACTLY as in siteContent.js) -> (source filename, slug, anchor)
SELECTIONS = {
    # The U-lock on the front wheel is the point of the shot and sits at the very
    # bottom; a centred window cut through it. Nothing is lost at the top but
    # shop signage, and the recovery van and walking technician stay in frame.
    "Insurance and recovery": (
        "insurance-and-recovery-no-star.png", "insurance-and-recovery", 1.0,
    ),
    # Bottom-anchored so the scooter sits fully on the ground inside the HUD,
    # with all four panels (route history, trip metrics, geo-fence, range) kept.
    "Live GPS tracking": (
        "live-gps-tracking-no-star.png", "live-gps-tracking", 1.0,
    ),
    # Neutral. At 16:9 this bike could not fit the window and the anchor was
    # buying a full front wheel at the cost of the handlebar stalk; at 3:2 it
    # fits whole, so there is nothing left to trade.
    "Vehicle and battery": (
        "vehicle-and-battery-no-star.png", "vehicle-and-battery", 0.5,
    ),
    # The ONLY top-anchored image. Two people, heads high in the frame — a
    # bottom anchor grazed the left man's hair.
    "Rider support": (
        "rider-support-no-star.png", "rider-support", 0.0,
    ),
    # Bottom-anchored to clear the scooter's front wheel and keep the whole tool
    # tray. The mechanic's gloved hands sit mid-frame and are safe either way.
    "Servicing and maintenance": (
        "servicing-and-maintenance-no-star.png", "servicing-and-maintenance", 1.0,
    ),
    # Neutral, as for Vehicle and battery. Full bike, full front wheel.
    "A rate that cannot move": (
        "a-rate-that-cannot-move-no-star.png", "a-rate-that-cannot-move", 0.5,
    ),
}

# Which client-approved option in Card_Image_Selection_for_Client_Review.docx
# each retouched source descends from. Provenance only — nothing reads this to
# do work, but losing it would make the live images untraceable to an approval.
# (original folder under "what_you _get_section Images", option no., original file)
ORIGIN = {
    "Insurance and recovery": ("Insurance and recovery", 3, "Insurance and recovery 2.png"),
    "Live GPS tracking": ("Live GPS tracking", 4, "Live GPS tracking 3.png"),
    "Vehicle and battery": ("Vehicle and battery", 1, "Vehicle and battery.png"),
    "Rider support": ("Rider_support", 2, "Rider_support 1.png"),
    "Servicing and maintenance": (
        "Servicing and maintenance", 2, "Servicing and maintenance 1.png",
    ),
    "A rate that cannot move": (
        "A_rate_that_cannot_move", 2, "A_rate_that_cannot_move 1.png",
    ),
}


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

    for title, (src_name, slug, anchor) in SELECTIONS.items():
        chosen = SRC / src_name
        if not chosen.is_file():
            raise SystemExit(f"{title}: source not found — {chosen}")

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
            f"{title:28} {sw}x{sh}  anchor {anchor:.2f} ({where:6}) {how}  "
            f"-> {out.name} {out.stat().st_size / 1e3:.0f}KB"
        )


if __name__ == "__main__":
    main()
