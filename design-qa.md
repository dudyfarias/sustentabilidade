# Design QA

- Source visual truth: `/Users/eduardofariascappia/Downloads/página inicial.png`
- Implementation screenshot: `/Users/eduardofariascappia/sustentabilidade/prototype-1024.png`
- Viewport: 1024 × 900 CSS px, device scale factor 1
- Source pixels: 1024 × 1536
- Implementation pixels: 1024 × 1867 (full page)
- State: home page, filter inactive, search empty

## Full-view comparison evidence

The source and implementation were opened together at the same 1024 px width. The section order, five-column quick navigation, 17-column ODS strip, three-column highlights, CTA and footer match the source hierarchy. The implementation is intentionally somewhat taller because its prototype content and touch targets remain readable without rasterizing the reference.

## Focused comparison evidence

Focused review covered the header, hero, quick-navigation grid, book cover, ODS strip and content cards. The official source logo was reused from the supplied reference; the hero and book are real raster assets. No additional focused crop was needed because all key details remain legible in the full-width 1024 px captures.

## Required fidelity surfaces

- Fonts and typography: Verdana/system typography matches the supplied HTML specification; hierarchy, weights and wrapping are consistent with the reference.
- Spacing and layout rhythm: desktop grid and section rhythm match; mobile collapses without horizontal overflow.
- Colors and tokens: green, neutral surfaces, borders, shadows and dark-green footer are consistent with the reference.
- Image quality and asset fidelity: government mark uses the supplied reference, with dedicated high-resolution map and book imagery.
- Copy and content: headings, navigation, cards, ODS, featured content and footer copy match the supplied specification.

## Comparison history

1. Initial pass: P1 desktop breakpoint collapsed navigation and five cards; P1 hero title wrapped too broadly; P2 page density exceeded the reference.
2. Fixes: retained desktop navigation and five-column grid at 1024 px, constrained hero title and illustration, compacted cards, sections and footer.
3. Post-fix evidence: `prototype-1024.png` shows all desktop sections at 1024 px with no horizontal overflow. Browser metrics report `scrollWidth: 1024`; console errors: none.
4. Responsive pass: initial 390 px capture clipped the fixed-width hero heading.
5. Fix: removed the fixed mobile heading width and reduced mobile display size.

## Interaction verification

- Main search accepts input and submits a prototype state.
- Filter button toggles its active state and feedback toast.
- Primary links provide prototype feedback or open the supplied publication.
- Browser console errors checked: none.

## Follow-up polish

- P3: replace the simplified ODS number tiles with licensed official ODS artwork if the production team receives the asset pack.
- P3: replace the generated map illustration with the original layered artwork if it becomes available.

final result: passed
