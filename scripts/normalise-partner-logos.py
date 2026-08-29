"""Normalise the client's partner logos into one uniform 3:1 plate each.

Two problems the raw files have, both visible in a live row:
  * every mark carries its own baked-in margin, so at a fixed CSS height some
    fill their box and others float in the middle of it;
  * aspect ratios run from 6:1 wordmarks to solid squares, so capping by height
    alone renders a square tile a third the optical size of a wordmark.

So each mark is trimmed, then scaled so its AREA is roughly constant, then
centred on a shared 3:1 transparent plate. Every output has the same intrinsic
ratio, which is what lets the stylesheet give every logo one identical box.
"""
from PIL import Image, ImageChops
from collections import Counter
import os

SRC = r"D:/projects/batt_wheelz_project/partner_logo_images/logos"
DST = r"D:/projects/batt_wheelz_project/battwheelz-backend-demo/marketing-site/src/assets/logos"

PLATE_W, PLATE_H = 600, 200
TARGET_AREA = 0.42 * PLATE_W * PLATE_H  # tuned by eye against the live row
MAX_W, MAX_H = 0.98 * PLATE_W, 0.96 * PLATE_H

# lectrix.png carries a stray mark in its top-right corner; crop it before trim.
PRECROP = {"lectrix.png": (0, 24, None, None)}
TRIM_TOLERANCE = {"lectrix.png": 40}


def ground(im):
    """The colour a logo sits on, sampled as the modal pixel of its 1px border.

    Not the top-left pixel: a trimmed mark often has ink in that corner (the D
    of DELHIVERY does), and reading the ground off it flips every downstream
    decision — the tile-padding step ends up padding a white-ground logo with
    black. The border ring is right whether the mark is inset or flush.
    """
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    ring = [px[x, 0] for x in range(w)] + [px[x, h - 1] for x in range(w)]
    ring += [px[0, y] for y in range(h)] + [px[w - 1, y] for y in range(h)]
    return Counter(ring).most_common(1)[0][0]


def trim_once(im, tol):
    if im.mode == "RGBA":
        alpha = im.split()[-1]
        if alpha.getextrema()[0] < 250:
            box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
            return im.crop(box) if box else im
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, ground(im)[:3])
    box = ImageChops.difference(rgb, bg).convert("L").point(lambda v: 255 if v > tol else 0).getbbox()
    return im.crop(box) if box else im


def trim(im, tol):
    """Trim repeatedly while what remains still sits on a near-white ground.

    astranova.png is a white field inside a 1px grey rule: one pass sees the
    grey as the background, removes the rule and stops, leaving the mark
    floating in a square of white that then gets area-scaled down to nothing.
    A second pass finds the real mark.

    The near-white test is what stops this from eating a logo supplied on a
    solid brand-coloured tile (intellicar, bb now, zomato): there the ground IS
    part of the mark, the first pass has already taken the margin off, and a
    further pass would crop into the artwork.
    """
    for _ in range(3):
        before = im.size
        im = trim_once(im, tol)
        if im.size == before:
            break
        r, g, b, a = ground(im)
        near_white = a > 250 and min(r, g, b) >= 225 and max(r, g, b) - min(r, g, b) <= 6
        if not near_white:
            break
    return im


def pad_ground(im):
    """Give a logo supplied on a solid tile a little of its own ground back.

    Trimming a tile logo crops to the ink, which leaves the wordmark flush with
    the tile edge and reads as a badly cut-off image (swiggy was the giveaway).
    A margin in the tile's own colour restores the mark as its designer drew it.
    Transparent and white-ground logos need nothing — the chip is their margin.
    """
    r, g, b, a = ground(im)
    if a < 250 or (min(r, g, b) >= 225 and max(r, g, b) - min(r, g, b) <= 6):
        return im
    pad = max(4, round(0.07 * max(im.size)))
    out = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (r, g, b, a))
    out.alpha_composite(im.convert("RGBA"), (pad, pad))
    return out


def drop_offwhite_ground(im):
    """Key an off-white ground out to transparency.

    A few files (delhivery, instamart) sit on #eee rather than #fff, which on a
    white chip reads as a faint grey card behind the mark. Only near-neutral,
    near-white grounds are touched, so a coloured tile — which is part of the
    mark — is left exactly as supplied.
    """
    bg = ground(im)[:3]
    if max(bg) - min(bg) > 6 or min(bg) < 225 or bg == (255, 255, 255):
        return im
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            cr, cg, cb, ca = px[x, y]
            if abs(cr - bg[0]) <= 8 and abs(cg - bg[1]) <= 8 and abs(cb - bg[2]) <= 8:
                px[x, y] = (255, 255, 255, 0)
    return im


for f in sorted(os.listdir(SRC)):
    im = Image.open(os.path.join(SRC, f)).convert("RGBA")
    if f in PRECROP:
        l, t, r, b = PRECROP[f]
        im = im.crop((l, t, r or im.width, b or im.height))
    im = trim(im, TRIM_TOLERANCE.get(f, 12))
    im = drop_offwhite_ground(im)
    im = pad_ground(im)

    w, h = im.size
    scale = (TARGET_AREA / (w * h)) ** 0.5
    scale = min(scale, MAX_W / w, MAX_H / h)
    im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

    plate = Image.new("RGBA", (PLATE_W, PLATE_H), (0, 0, 0, 0))
    plate.alpha_composite(im, ((PLATE_W - im.width) // 2, (PLATE_H - im.height) // 2))
    out = os.path.splitext(f)[0] + ".png"
    plate.save(os.path.join(DST, out), optimize=True)
    print(f"{f:22} {w}x{h} -> {im.size} on plate  [{out}]")
