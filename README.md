# pretendthat.app

The marketing site for PretendThat. Plain static HTML on GitHub Pages: no build runs on the server.

## Styles

`assets/site.css` is generated from `src/site.css` with Tailwind CSS + daisyUI and is **committed**, so GitHub Pages
serves it as a plain file. After changing `src/site.css` or any page's classes, rebuild and commit the result:

```sh
npm install          # once (exact versions are pinned in package.json / package-lock.json)
npm run build:css    # writes a minified assets/site.css
npm run watch:css    # rebuilds on save while editing
```

The brand theme (`pretendthat`, light only) is defined in `src/site.css` from the app's colors
(NutmegCore `BrandPalette.swift`). Fonts: Poppins from Google Fonts (headings 600, body 400/500).

## Shared header and footer

Every page's header and footer sit between `<!-- SHARED:HEADER -->` / `<!-- SHARED:FOOTER -->` markers. Edit them in
`scripts/shared.py`, then run `python3 scripts/shared.py` to write them into all pages.

## Preview locally

```sh
python3 -m http.server 8743   # then open http://localhost:8743/
```

## Images

- `assets/art/`: vector art (logos, app icon, the two Nutmeg illustrations, prop art). Keep it vector.
- `assets/app/`: real demo-mode app screens composited into Apple's product bezels (iPad Pro 13" M5 Space Black
  landscape, iPhone 18 Pro Black portrait), exported at 1x/2x (iPad) and 1x/2x/3x (iPhone), WebP q90, served with
  `srcset`/`sizes`. Apple's raw bezel PNGs are not in this repo (license: download them from Apple).
- `assets/kit/`: printable art from a real saved game (Vet Clinic for Sea Animals), used for the Print and Play
  sections.

## App Store link

Set `APP_STORE_URL` in `assets/site.js` when the app is live; until then the badges say "Coming soon".

## Libraries

- Tailwind CSS 4.3.3 (`tailwindcss`, `@tailwindcss/cli`), MIT, build-time only
- daisyUI 5.7.50, MIT, build-time only
- Poppins (Google Fonts), SIL Open Font License 1.1

**Cache busting:** every page links `assets/site.css?v=<hash>`. After rebuilding the CSS, bump the version in all pages
(the first 8 characters of `shasum assets/site.css`), or visitors may get the old cached stylesheet for up to 10 minutes.

**Image cache busting:** every local image URL (`<img src>`, `srcset`, icon links, and `url()` in `src/site.css`) carries
`?v=<first 8 characters of the file's SHA-1>`. After adding or changing any image, run `python3 scripts/version_assets.py`
(`scripts/shared.py` runs it too), then rebuild the CSS if `src/site.css` changed. A changed image gets a new URL, so
browsers never show the old cached copy.
