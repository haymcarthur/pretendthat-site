"""Adds ?v=<hash> to every local image URL so a changed image always loads fresh.

Run from the repo root after changing any image:  python3 scripts/version_assets.py
It rewrites, in every page: <img src>, <img>/<source> srcset entries and <link rel="icon"/"apple-touch-icon"> hrefs; and in
src/site.css: url(...) for local images (then rebuild the CSS). The version is the first 8 hex characters of the
file's SHA-1, so it only changes when the file's content changes. Absolute URLs (https://...) are left alone.
"""
import hashlib, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ["index.html", "pricing/index.html", "support/index.html", "support/thanks/index.html",
         "privacy/index.html", "terms/index.html", "codecamp/index.html"]
IMG = re.compile(r"\.(png|jpe?g|webp|svg|gif|avif|ico)$", re.I)

def versioned(url, base):
    if url.startswith(("http:", "https:", "data:", "//", "#", "mailto:")):
        return url
    path = url.split("?", 1)[0]
    if not IMG.search(path):
        return url
    f = (base / path).resolve()
    if not f.is_file():
        print(f"  missing: {path} (from {base.relative_to(ROOT)})")
        return url
    return f"{path}?v={hashlib.sha1(f.read_bytes()).hexdigest()[:8]}"

def fix_srcset(value, base):
    parts = []
    for item in value.split(","):
        bits = item.strip().split()
        if bits:
            bits[0] = versioned(bits[0], base)
        parts.append(" ".join(bits))
    return ", ".join(parts)

changed = 0
for rel in PAGES:
    f = ROOT / rel
    base = f.parent
    s = f.read_text()
    new = re.sub(r'(<img\b[^>]*?\bsrc=")([^"]+)(")', lambda m: m.group(1) + versioned(m.group(2), base) + m.group(3), s)
    new = re.sub(r'(<(?:img|source)\b[^>]*?\bsrcset=")([^"]+)(")', lambda m: m.group(1) + fix_srcset(m.group(2), base) + m.group(3), new)
    new = re.sub(r'(<link\b[^>]*?\brel="(?:icon|apple-touch-icon)"[^>]*?\bhref=")([^"]+)(")', lambda m: m.group(1) + versioned(m.group(2), base) + m.group(3), new)
    if new != s:
        f.write_text(new); changed += 1
css = ROOT / "src/site.css"
s = css.read_text()
# url() in the source CSS resolves from assets/site.css (the built file), so the base is assets/.
new = re.sub(r"url\(([\"']?)([^)\"']+)\1\)", lambda m: f"url({m.group(1)}{versioned(m.group(2), ROOT / 'assets')}{m.group(1)})", s)
if new != s:
    css.write_text(new); changed += 1
print(f"versioned image URLs in {changed} file(s)")
