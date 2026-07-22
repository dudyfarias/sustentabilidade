# Design QA — semantic component implementation

- Source visual truth: `/Users/eduardofariascappia/Downloads/PHOTO-2026-07-22-14-53-43.jpg`
- Implementation screenshot: `/Users/eduardofariascappia/sustentabilidade/prototype-real-site.png`
- Mobile screenshot: `/Users/eduardofariascappia/sustentabilidade/prototype-real-mobile.png`
- Desktop viewport: 1024 px wide, device scale factor 1
- Mobile viewport: 390 × 844 CSS px, device scale factor 1
- State: initial page state

## Architecture evidence

The implementation contains real semantic elements: header, six-link navigation, search form, five quick-navigation articles, ODS section, three highlight articles, FAQ buttons, CTA and footer. Browser inspection confirms there are no full-page visual overlays or hotspot elements. The supplied reference is not rendered as a page background.

## Full-view comparison evidence

Reference and implementation were opened together at 1024 px. The implementation reproduces the reference hierarchy, proportions, green/neutral palette, hero composition, five-column navigation grid, ODS artwork, three-column highlights, CTA and dark footer. Its native content height is approximately 1,548 px, within 12 px of the 1,536 px reference.

## Required fidelity surfaces

- Fonts and typography: real Arial/system text with matching hierarchy, weight and wrapping.
- Spacing and layout rhythm: 930 px content frame, compact desktop rhythm and matching section order.
- Colors and tokens: green, white, neutral borders and dark-green footer follow the reference.
- Image quality and asset fidelity: only discrete editorial artwork is rasterized: government marks, hero map, quick-navigation illustrations, book cover, ODS strip and CTA illustration.
- Copy and content: all visible labels, headings, descriptions and document names match the source.

## Functional verification

- Navigation scrolls to real page sections.
- Search returns a visible result status and honors selected filters.
- Filter panel toggles and maintains checkbox state.
- FAQ items open accessible native dialogs with answers.
- Document download controls open a clear prototype state.
- About-platform CTA opens a native dialog.
- External publication link remains available.
- The ODS section contains 17 independent links plus the Agenda 2030 wheel; each goal opens its matching ONU Brasil page.
- All 18 ODS elements fit the desktop row without overflow and remain horizontally navigable on small screens.
- Desktop and mobile have no horizontal overflow.
- Browser console errors checked: none.
- The three featured "Ver todos" actions open functional internal pages with search, filters, details and FAQ accordions.

## Comparison history

1. Removed the rejected full-page reference image and all hotspot overlays.
2. Restored semantic HTML/CSS components and real interaction state.
3. Replaced approximated editorial artwork with individual source assets.
4. Corrected the desktop header row, FAQ native styling, hero artwork crop and footer mark.
5. Verified desktop, mobile, search, filters and FAQ after fixes.
6. Replaced the single ODS strip with official individual ONU Brasil assets and validated all 17 destinations.

## Follow-up polish

- P3: replace cropped editorial assets with original transparent/source files when the design team supplies them.
- P3: connect search, documents and criteria to production APIs in the implementation phase.

final result: passed
