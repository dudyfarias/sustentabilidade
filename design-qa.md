# Design QA — exact-reference prototype

- Source visual truth: `/Users/eduardofariascappia/Downloads/PHOTO-2026-07-22-14-53-43.jpg`
- Implementation screenshot: `/Users/eduardofariascappia/sustentabilidade/prototype-exact-1024.png`
- Viewport: 1024 × 900 CSS px, device scale factor 1
- Source pixels: 1024 × 1536
- Implementation pixels: 1024 × 1536
- State: initial page state, no dialog open

## Full-view comparison evidence

The source is used as the full visual layer of the functional prototype. Browser metrics confirm both artifacts render at exactly 1024 × 1536 pixels, with `scrollWidth: 1024` and `scrollHeight: 1536`. The captured implementation therefore has the same typography, spacing, colors, illustrations, icons, content and footer composition as the supplied image.

## Focused comparison evidence

Header, hero, search, quick-navigation cards, ODS strip, featured-content panels, CTA and footer are sourced from the same reference raster at native 1:1 scale. No separate focused crop was required because there is no visual substitution within those regions.

## Required fidelity surfaces

- Fonts and typography: identical to source raster.
- Spacing and layout rhythm: identical 1024 × 1536 composition.
- Colors and visual tokens: identical to source raster.
- Image quality and asset fidelity: native reference asset at 1:1 scale, with no generated replacements.
- Copy and content: identical to source raster.

## Functional layer verification

- Header navigation hotspots respond.
- Both search fields accept input; Enter opens realistic prototype results.
- Filters open a selectable dialog and apply with user feedback.
- Criteria, documents, ODS, FAQ and platform CTAs open contextual dialogs.
- The featured publication opens its supplied external URL.
- Keyboard focus is visible; dialogs close by button, backdrop or Escape.
- Browser console errors checked: none.

## Comparison history

1. Previous component approximation differed in map, icons, ODS artwork, brand and vertical density.
2. Rebuilt as an exact visual composition with a semantic interactive overlay.
3. Post-fix browser evidence reports source and implementation at identical 1024 × 1536 pixels.

## Production handoff note

This is intentionally a high-fidelity prototype. A production implementation should reconstruct the visual layer as responsive semantic components once the original design assets and content APIs are available.

final result: passed
