# Technical Requirements — Brandpoint Homepage Update v2

**Document:** TR-v2
**Date:** 2026-03-31
**Companion:** FUNCTIONAL-REQUIREMENTS.md (FR-v2)

---

## TR-01: Technology Stack

### TR-01.1: Constraints (Unchanged from v1)
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- No JavaScript frameworks (React, Vue, etc.)
- No build tools or preprocessors
- Must be self-contained and WordPress-pasteable
- Google Fonts (Inter) loaded via CDN

### TR-01.2: CSS Architecture
- All classes prefixed with `bp-landing-` (established in v1)
- CSS custom properties for brand tokens (established in v1)
- New sections must follow existing naming convention
- New custom properties only if needed for new design tokens

### TR-01.3: File Structure (Current → Updated)
```
home_page/
├── index.html                          # Single page (modify)
├── css/
│   └── styles.css                      # All styles (modify)
├── js/
│   └── main.js                         # Interactions (modify)
├── assets/
│   ├── images/
│   │   ├── distribution-map.svg        # DELETE (replaced)
│   │   ├── distribution-map.png        # NEW (from Distribution Map-Dots.png)
│   │   ├── see-our-work.png            # NEW (from See Our Work in Action.png)
│   │   ├── native-ads.png              # NEW (from Native Ads.png)
│   │   ├── specialty-formats.png       # NEW (from Specialty Formats.png)
│   │   └── bpt-optimize-logo.png       # NEW (from BPTOPTIMIZE326BLU.png)
│   └── logos/
│       ├── placeholder-brand-*.svg     # DELETE (replaced by real logos)
│       ├── usa-today.svg               # DELETE (replaced by PNG)
│       ├── ap-news.svg                 # DELETE (replaced by PNG)
│       ├── business-journals.svg       # DELETE (replaced by PNG)
│       ├── brandpoint-logo.png         # NEW (site logo for nav/footer)
│       ├── pr-agency/                  # NEW directory
│       │   ├── finn-partners.png
│       │   ├── coyne-pr.png
│       │   ├── fleishmanhillard.png
│       │   ├── hill-knowlton.png
│       │   ├── zeno.png
│       │   ├── golin.png
│       │   ├── gci-health.png
│       │   ├── ogilvy.png
│       │   ├── weber-shandwick.png
│       │   └── carmichael-lynch.png
│       ├── outlets/                    # NEW directory
│       │   ├── albany-times-union.png
│       │   ├── baltimore-sun.png
│       │   ├── chicago-tribune.png
│       │   ├── connecticut-post.png
│       │   ├── daily-news.png
│       │   ├── daily-press.png
│       │   ├── houston-chronicle.png
│       │   ├── los-angeles-times.png
│       │   ├── miami-herald.png
│       │   ├── morning-call.png
│       │   ├── orlando-sentinel.png
│       │   ├── san-antonio-express-news.png
│       │   ├── sf-chronicle-sfgate.png
│       │   ├── seattle-pi.png
│       │   ├── sun-sentinel.png
│       │   └── virginian-pilot.png
│       └── specialty/                  # NEW directory
│           ├── ap.png
│           ├── usa-today.png
│           └── business-journals.png
├── SPEC.md                             # UPDATE
├── PLAN.md                             # UPDATE
├── TESTS.md                            # UPDATE
└── ...
```

---

## TR-02: Sticky Navigation

### TR-02.1: HTML Structure
```
<header class="bp-landing-nav">
  <div class="bp-landing-nav-container">
    <a class="bp-landing-nav-logo" href="#">
      <img src="assets/logos/brandpoint-logo.png" alt="Brandpoint">
    </a>
    <nav class="bp-landing-nav-links">
      <a href="...">Who We Are</a>
      <a href="...">Who We Work With</a>
      <a href="...">Blog</a>
      <a href="...">Editorial Content Library</a>
      <a href="..." class="bp-landing-btn bp-landing-btn-primary">Contact Us</a>
    </nav>
    <button class="bp-landing-nav-toggle"><!-- hamburger --></button>
  </div>
</header>
```

### TR-02.2: CSS Behavior
- `position: sticky; top: 0; z-index: 1000;`
- Background: navy or white with blur backdrop
- Add `box-shadow` or border-bottom on scroll via JS (`.bp-landing-nav-scrolled` class)
- Transition for background/shadow change

### TR-02.3: Mobile Hamburger
- Hidden on desktop (≥768px), visible on mobile
- Toggles slide-down or slide-out menu
- JS: Toggle `.bp-landing-nav-open` class on nav links container
- Accessible: `aria-expanded`, `aria-controls` attributes

### TR-02.4: Content Offset
- `body` or hero section needs top padding/margin equal to nav height to prevent content overlap
- OR use `position: sticky` (which doesn't require offset)

---

## TR-03: New Sections — HTML/CSS Patterns

### TR-03.1: Value Prop Section
- New `<section id="value-prop" class="bp-landing-section bp-landing-value-prop">`
- Centered text container, `max-width: 800px`
- Scroll-reveal animation (`.bp-landing-reveal`)

### TR-03.2: Premium Publisher Network Reel
- New `<section id="publisher-network" class="bp-landing-section bp-landing-publisher-network">`
- Reuse existing slider pattern from Social Proof (`.bp-landing-slider-track` / `.bp-landing-slider-inner`)
- Use unique class `.bp-landing-publisher-slider-inner` with its own `@keyframes` animation at ~40s duration (16 logos vs Social Proof's 25s for 10 logos — proportional speed)
- Duplicate logos for seamless loop (same technique as SEC-02)

### TR-03.3: Footer
- New `<footer class="bp-landing-footer">`
- CSS Grid: 2 or 3 columns (logo+address | links | social)
- Bottom bar: flexbox row for copyright + legal links
- Social icons: inline SVG or font icons (no external icon library dependency)

---

## TR-04: Asset Pipeline

### TR-04.1: Image Copying
- Copy provided PNGs from `Updates from Brandpoint/` to `assets/` with normalized filenames (lowercase, hyphens, no spaces)
- Do NOT modify the source files in `Updates from Brandpoint/`

### TR-04.2: Image Optimization Considerations
- Large PNGs (Native Ads 1.6MB, Specialty Formats 1MB) should be noted for future optimization
- For this conceptual build: use as-provided, note optimization as a follow-up for production
- All images need `loading="lazy"` except hero map (above the fold)

### TR-04.3: Logo Consistency
- PR agency logos: all PNGs with transparent backgrounds, varying dimensions
- Outlet logos: PNGs, some have white backgrounds (Albany Times Union)
- Slider CSS should handle varying aspect ratios with consistent height and `object-fit: contain`

---

## TR-05: JavaScript Updates

### TR-05.1: Scroll Reveal
- New sections need `.bp-landing-reveal` class — existing IntersectionObserver in `main.js` will pick them up automatically
- No new JS needed for reveal animations

### TR-05.2: Nav Scroll Detection
- Add scroll listener to toggle `.bp-landing-nav-scrolled` class
- Debounce or use `requestAnimationFrame` for performance
- Threshold: add class after scrolling past ~50px

### TR-05.3: Mobile Nav Toggle
- Add click handler for hamburger button
- Toggle `.bp-landing-nav-open` on nav links container
- Close menu on link click (for single-page behavior)
- Close menu on outside click

### TR-05.4: Second Logo Slider
- Existing CSS keyframe animation handles the first slider
- Second slider (publisher network) needs its own animation or reuses the same keyframe with different duration
- Both sliders must animate independently

---

## TR-06: Responsive Requirements

### TR-06.1: Breakpoints (Unchanged)
- 1440px: Desktop
- 1024px: Tablet landscape
- 768px: Tablet portrait (nav collapses to hamburger)
- 480px: Mobile

### TR-06.2: New Section Responsive Behavior
| Section | Desktop | Tablet | Mobile |
|---|---|---|---|
| Nav | Logo + 5 links + CTA inline | Same or condensed | Hamburger menu |
| Value Prop | Centered, max-width 800px | Same | Full width, smaller padding |
| Publisher Reel | Full-width slider | Same | Same (slider works at all sizes) |
| Case Study (updated) | 2 columns (image left, text right) | 2 columns | Stacked (image top, text bottom) |
| Footer | 3 columns | 2 columns | Stacked single column |

---

## TR-07: SEO Technical

### TR-07.1: Meta Tags to Update
```html
<title>Brandpoint | Premium Content Distribution & AI Visibility Solutions</title>
<meta name="description" content="Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies across the nation's top publisher network.">
<meta property="og:title" content="Brandpoint | Premium Content Distribution & AI Visibility Solutions">
<meta property="og:description" content="Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies across the nation's top publisher network.">
```

### TR-07.2: Alt Text Requirements
- Every `<img>` must have descriptive `alt` attribute
- No placeholder prefixes in final version
- Logo alt text: company/publication name
- Composite images: describe what the image shows in context

### TR-07.3: Heading Hierarchy
```
H1: "Premium paid placements..." (hero — unchanged, single H1)
  H2: Value Prop (if heading needed)
  H2: "Trusted by the nation's top brands and agencies"
  H2: "Distribution Packages"
  H2: (CTA band — no heading needed)
  H2: "Meet Brandpoint Optimize" (now logo image with alt text)
    H3: Feature card titles
    H3: "Measure your AI Visibility over time"
  H2: "Customize your campaign..."
    H3: Specialty Publications / Formats / Amplification
  H2: "Premium Publisher Network"
  H2: "See our work in action"
  H2: "Ready to get your brand in front of millions?"
```

---

## TR-08: WordPress Compatibility

### TR-08.1: Self-Contained Markup
- All CSS in `css/styles.css` (or inline `<style>` block for WP insertion)
- All JS in `js/main.js` (or inline `<script>` for WP insertion)
- All `bp-landing-` prefixed to avoid WP theme conflicts
- No external dependencies beyond Google Fonts

### TR-08.2: Nav/Footer Consideration
- Since this is becoming the actual homepage, the nav and footer we build will REPLACE WordPress theme nav/footer
- Our nav/footer must be fully functional standalone
- All links must use absolute URLs (https://www.brandpoint.com/...) since this may be served from a different domain during development

---

## TR-09: Browser Support
- Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- CSS `position: sticky` — supported in all modern browsers
- IntersectionObserver — supported in all modern browsers
- CSS `mask-image` — supported with `-webkit-` prefix for Safari
- No IE11 support required
