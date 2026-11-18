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
- `assets/app/` (Code Camp page only): real demo-mode app screens composited into Apple's product bezels (iPad Pro 13" M5 Space Black
  landscape, iPhone 18 Pro Black portrait), exported at 1x/2x (iPad) and 1x/2x/3x (iPhone), WebP q90, served with
  `srcset`/`sizes`. Apple's raw bezel PNGs are not in this repo (license: download them from Apple).
- `assets/kit/`: printable art from a real saved game (Vet Clinic for Sea Animals), used by the Code Camp page.
- `assets/shots/`: real app screenshots (PretendThat `design/appstore-screens/raw-v3`; the Pick step's `*-talk-*` from `raw-v4`
  `02-talk-sparkle`), unchanged, WebP: iPad at 640/1280,
  iPhone at 300/600/900. The home page draws the device frames in CSS (like the App Store slides) and swaps iPad for
  iPhone below 760px with `<picture>`.
- `assets/print/`: the black-and-white printables of a real game (Pet Hotel) for the home page's Print fan, 260/520.
- `assets/chips/`: the floating chip picture. The hero is `assets/art/hero-nutmeg-wave.svg` (Haylee's art: Nutmeg waving on her
  round stage with props, vector, unedited; the same art is App Store slide 1).
- `assets/pieces/`: real UI pieces cut (crop only) from the App Store slides v3 sources, as the slides float them: Nutmeg's round
  avatar (raw-v3 `02b-chat-with-nutmeg`), the "Play with Nutmeg" bar and the printables row (raw-v3 `07-saved-game-page`), and the
  Pets Check In scene card (`cards-v3`). WebP. The iPhone Pick screen (`assets/shots/iphone-talk-*`) is the red-mic retake
  (raw-v4 `02-talk-sparkle-redmic`).
- Every page (except codecamp/) follows the App Store slides v3 ("Rays" style, `PretendThat/design/appstore-screens/slides-v3`):
  warm cream and white sections, a small coral outlined label chip above each headline (`.step-label` / `.eyebrow`), semibold ink
  headlines with one coral word (`<em>`), soft stage arches behind the devices (sky to sand to cream, faint coral rim), the
  real UI pieces above floating off the device edges with soft shadows, short gray captions.

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
