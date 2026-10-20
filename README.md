# Karampinis · Clear Route

A Greek, responsive website proposal based on the selected “01 — Καθαρή Πορεία” direction.

This is an unofficial presentation preview, not the driving school's official website. It deliberately uses `noindex, nofollow`. No analytics, cookies, contact submission, booking, payments, or backend are included. Phone links and the external Maps link are real.

## Preview and validation

No build or package installation is required.

```sh
python -m http.server 4173 --directory site --bind 127.0.0.1
node scripts/check.mjs
node scripts/check.mjs https://chanturia.github.io/karampinis/
```

GitHub Actions publishes only `site/` to Pages. Research, generated concepts, local QA screenshots and reports remain outside the published site and are ignored by Git.

## Asset provenance

Business identity, contact details, services and original photography were researched on 20 October 2026.

- Official site: https://www.karampinis.gr/
- School gallery: https://www.karampinis.gr/features.html
- Logo, unchanged: https://www.karampinis.gr/images/logo-karampinis.png
- Classroom: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal4.jpg
- School exterior: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal1.jpg
- Teaching engine: https://www.karampinis.gr/images/yootheme/widgetkit/gallery/gal6.jpg
- Noto Sans: Google Fonts; SIL Open Font License included in `site/assets/fonts/OFL.txt`.
- Vehicle icons: [Phosphor Icons](https://github.com/phosphor-icons/core), duotone `car-profile`, `motorcycle`, and `truck`, embedded as SVG symbols with a tighter viewBox. MIT licence included in `site/assets/licenses/phosphor-icons-MIT.txt`.
- Other UI icons and decorative path: inline SVG, authored for this site.

Photographs are format-converted/resized WebP copies of the official images. No people, vehicles, premises, or outcomes have been generated or fabricated. The logo and photographs belong to their respective rights holders; public availability does not establish a reuse licence. The owner must approve their use and confirm they represent the current school before an official launch.

## Content to confirm before an official launch

Current category/service availability, school hours, vehicles, instructor information, pricing and included costs, current documentation requirements, photo rights and the final copy. Published hours conflict across sources, so this preview asks visitors to call instead. There are no invented ratings, success rates, testimonials, prices, awards, or guarantees.

Category cards and FAQs use native expandable details. The mobile menu supports Escape and focus restoration; navigation, telephone, Maps and FAQ content remain available without JavaScript.
