# Karampinis · Clear Route

A Greek, responsive website proposal based on the selected “01 — Καθαρή Πορεία” direction.

This is an unofficial presentation preview, not the driving school's official website. It deliberately uses `noindex, nofollow`. No analytics, cookies, contact submission, booking, payments, or backend are included. Phone links and the external Maps link are real.

## Preview and validation

No package installation or framework is required. Native Node.js generates the
24 static HTML pages from the shared layout and content.

```sh
node scripts/build.mjs
python -m http.server 4173 --directory site --bind 127.0.0.1
node scripts/check.mjs
node scripts/check.mjs https://chanturia.github.io/karampinis/
```

GitHub Actions publishes only `site/` to Pages. Research, generated concepts, local QA screenshots and reports remain outside the published site and are ignored by Git.

## Editing pages

- `content/home.html`: selected homepage content, preserving the approved vehicle icons.
- `content/icons.svg`: shared SVG symbols.
- `content/pages.mjs`: copy for the thirteen licence/preparation and five service pages.
- `scripts/build.mjs`: shared header/footer, index pages, school, Test Driver, contact and detail layouts.
- `site/assets/styles.css`: original selected style.
- `site/assets/pages.css`: multi-page layouts and responsive dropdown navigation.
- `content/sources.md`: every old-menu destination mapped to its new page, source URLs and content decisions.

After editing, run the build and checker, and commit the generated `site/*.html`
along with their sources. CI regenerates the pages and rejects stale output.
The checker covers all 24 pages, every menu destination, cross-page anchors,
assets and image alternatives. With a URL argument it also compares all live
files with the committed bytes.

## Asset provenance

Business identity, contact details, services and original photography were researched on 20 October 2026.

- Official site: https://www.karampinis.gr/
- School gallery: https://www.karampinis.gr/features.html
- Logo, unchanged: https://www.karampinis.gr/images/logo-karampinis.png
- Classroom: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal4.jpg
- School exterior: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal1.jpg
- Teaching engine: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal6.jpg
- Additional gallery images: `gal2.jpg` (frontage), `gal3.jpg` (reception),
  `gal5.jpg` (waiting area), `gal7.jpg` (road lesson), `gal8.jpg` (signs), under the same gallery URL.
- Noto Sans: Google Fonts; SIL Open Font License included in `site/assets/fonts/OFL.txt`.
- Vehicle icons: custom SVG redraws of the car, motorcycle and truck in the user-selected homepage mockup, using blue outlines without background tiles.
- Other UI icons and decorative path: inline SVG, authored for this site.

Photographs are format-converted/resized WebP copies of the official images. No people, vehicles, premises, or outcomes have been generated or fabricated. The logo and photographs belong to their respective rights holders; public availability does not establish a reuse licence. The owner must approve their use and confirm they represent the current school before an official launch.

## Content to confirm before an official launch

Current category/service availability, school hours, vehicles, instructor information, pricing and included costs, current documentation requirements, photo rights and the final copy. Published hours conflict across sources, so this preview asks visitors to call instead. There are no invented ratings, success rates, testimonials, prices, awards, or guarantees.

Category cards now link to dedicated pages. FAQs and menu disclosures use native
details. The mobile menu supports Escape, scrollable submenus and focus restoration;
navigation, telephone, Maps and FAQ content remain available without JavaScript.
Test Driver opens the existing independent platform at https://testdriver.gr/.
