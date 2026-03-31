# PLAN.md — Brandpoint Homepage Update v2 Implementation

## Prerequisites

- SPEC.md approved by Jake
- FUNCTIONAL-REQUIREMENTS.md and TECHNICAL-REQUIREMENTS.md reviewed
- All assets from `Updates from Brandpoint/` folder available
- Brandpoint logo sourced for nav/footer

---

## Step 1 — Asset Preparation

### Step 1.1 — Create new asset directories
- **Action:** Create `assets/logos/pr-agency/`, `assets/logos/outlets/`, `assets/logos/specialty/`
- **Verify:** `ls -R assets/logos/` shows 3 new subdirectories

### Step 1.2 — Copy and normalize image assets
- **Action:** Copy all provided images from `Updates from Brandpoint/` to `assets/` with normalized filenames:
  - `Distribution Map-Dots.png` → `assets/images/distribution-map.png`
  - `See Our Work in Action.png` → `assets/images/see-our-work.png`
  - `Native Ads.png` → `assets/images/native-ads.png`
  - `Specialty Formats.png` → `assets/images/specialty-formats.png`
  - `BPTOPTIMIZE326BLU.png` → `assets/images/bpt-optimize-logo.png`
- **Verify:** All 5 images exist in `assets/images/` with correct names

### Step 1.3 — Copy PR agency logos
- **Action:** Copy 10 logos from `Updates from Brandpoint/PR Agency Logos/PR Agency Logos/` to `assets/logos/pr-agency/` with normalized names:
  - `PR Agency Logos-01.png` → `finn-partners.png`
  - `PR Agency Logos-02.png` → `coyne-pr.png`
  - `PR Agency Logos-03.png` → `fleishmanhillard.png`
  - `PR Agency Logos-04.png` → `hill-knowlton.png`
  - `PR Agency Logos-05.png` → `zeno.png`
  - `PR Agency Logos-06.png` → `golin.png`
  - `PR Agency Logos-07.png` → `gci-health.png`
  - `PR Agency Logos-08.png` → `ogilvy.png`
  - `PR Agency Logos-09.png` → `weber-shandwick.png`
  - `PR Agency Logos-10.png` → `carmichael-lynch.png`
- **Note:** Logo-to-filename mapping was visually verified during brainstorming (01=FINN Partners, 02=Coyne PR, 03=FleishmanHillard, 04=Hill+Knowlton, 05=Zeno, 06=Golin, 07=GCI Health, 08=Ogilvy, 09=Weber Shandwick, 10=Carmichael Lynch). Confirm visually before committing.
- **Verify:** 10 files in `assets/logos/pr-agency/`

### Step 1.4 — Copy outlet logos
- **Action:** Copy 16 logos from `Updates from Brandpoint/Outlet Logos/` to `assets/logos/outlets/` with normalized names:
  - `Albany Times Union.png` → `albany-times-union.png`
  - `Baltimore Sun.png` → `baltimore-sun.png`
  - `Chicago Tribune.png` → `chicago-tribune.png`
  - `Connecticut Post.png` → `connecticut-post.png`
  - `Daily News.png` → `daily-news.png`
  - `Daily Press.png` → `daily-press.png`
  - `Houston Chronicle.png` → `houston-chronicle.png`
  - `Los Angeles Times.png` → `los-angeles-times.png`
  - `Miami Herald.png` → `miami-herald.png`
  - `Morning Call.png` → `morning-call.png`
  - `Orlando Sentinel.png` → `orlando-sentinel.png`
  - `San Antonion Express-News.png` → `san-antonio-express-news.png`
  - `San Francisco Chronicle SFGATE.png` → `sf-chronicle-sfgate.png`
  - `Seattle Post Intelligencer.png` → `seattle-pi.png`
  - `Sun Sentinel.png` → `sun-sentinel.png`
  - `The Virginian Pilot.png` → `virginian-pilot.png`
- **Note:** Skip `Outlet Logos/Vector Files/Virginian Pilot.png` (alternate version) — use the main `The Virginian Pilot.png` from the root of `Outlet Logos/`.
- **Verify:** 16 files in `assets/logos/outlets/`

### Step 1.5 — Copy specialty publication logos
- **Action:** Copy 3 logos to `assets/logos/specialty/`:
  - `AP.png` → `ap.png`
  - `USA_Today.png` → `usa-today.png`
  - `The Business Journals.png` → `business-journals.png`
- **Verify:** 3 files in `assets/logos/specialty/`

### Step 1.6 — Source Brandpoint primary logo
- **Action:** Download Brandpoint logo from brandpoint.com (extract from site header) or use the logo from MaDonna's email signature if higher resolution available. Save as `assets/logos/brandpoint-logo.png`
- **Contingency:** If logo extraction fails or yields poor quality, create an SVG text treatment matching the Brandpoint wordmark as a temporary fallback. Do not block nav/footer implementation.
- **Verify:** Logo file exists and renders clearly at nav-appropriate size (~40px height)

### Step 1.7 — Remove deprecated assets
- **Action:** Delete `assets/images/distribution-map.svg` and `assets/logos/placeholder-brand-*.svg` and old `assets/logos/usa-today.svg`, `assets/logos/ap-news.svg`, `assets/logos/business-journals.svg`
- **Verify:** No placeholder or deprecated files remain in `assets/`

---

## Step 2 — HTML Structural Changes (index.html)

### Step 2.1 — Add sticky navigation
- **Action:** Insert `<header class="bp-landing-nav">` BEFORE the hero section with:
  - Brandpoint logo linking to `#`
  - 5 navigation links (Who We Are, Who We Work With, Blog, Editorial Content Library, Contact Us)
  - Contact Us as orange button (`class="bp-landing-btn bp-landing-btn-primary"`)
  - Hamburger toggle button for mobile (hidden on desktop) with `aria-expanded="false"` and `aria-controls="bp-landing-nav-menu"`
  - **All hrefs must use absolute URLs per TR-08.2** (e.g., `https://www.brandpoint.com/who-we-are/`, `https://www.brandpointcontent.com`)
- **Verify:** Nav markup present before `<section id="hero">`; all 5 links have correct absolute hrefs; Contact Us has button classes; aria attributes present

### Step 2.2 — Update hero map image
- **Action:** Change `<img src="assets/images/distribution-map.svg"...>` to `<img src="assets/images/distribution-map.png"...>` with updated alt text: "Brandpoint distribution network map showing premium outlet locations across the United States" (remove any reference to Boston Herald from alt text)
- **Verify:** Image `src` points to new PNG; alt text updated; no reference to old SVG; no mention of Boston Herald

### Step 2.3 — Add value prop section
- **Action:** Insert new `<section id="value-prop">` between hero and social-proof sections
- **Content:** Lorem ipsum paragraph (3-4 sentences) wrapped in `bp-landing-container`
- **Add:** HTML comment `<!-- PLACEHOLDER: MaDonna to provide value prop copy -->`
- **Verify:** New section exists between SEC-01 and SEC-02 in DOM order

### Step 2.4 — Replace social proof logos
- **Action:** Replace all 12 `<img>` tags (6 original + 6 duplicated for loop) in `.bp-landing-slider-inner` with 20 tags (10 real logos + 10 duplicated for loop)
- **Source paths:** `assets/logos/pr-agency/[name].png`
- **Alt text:** Each logo gets alt text with the agency name (e.g., `alt="FINN Partners"`)
- **Note:** Do NOT add `bp-landing-reveal` class to individual slider logo images — they are clipped by `overflow: hidden` and will never trigger the IntersectionObserver. Apply `bp-landing-reveal` only to the section heading.
- **Note:** Add `loading="lazy"` to all logo images (below the fold).
- **Verify:** 20 `<img>` tags in slider inner; all point to `pr-agency/` directory; no placeholder references

### Step 2.5 — Remove prices from packages
- **Action:** Delete all `<p class="bp-landing-package-price bp-price">` elements from all 5 package cards
- **Verify:** No elements with class `bp-price` or `bp-landing-package-price` in HTML; 5 package cards still present with feature lists

### Step 2.6 — Remove "Most Popular" badge
- **Action:** Delete `<span class="bp-landing-badge">Most Popular</span>` from Signature Plus card
- **Action:** Remove `bp-landing-package-featured` class from Signature Plus card's `<div>`
- **Verify:** No "Most Popular" text in HTML; "New" badge still present on Optimize card

### Step 2.7 — Replace Optimize header with logo image
- **Action:** Replace the H2 content `Meet <span class="bp-landing-optimize-logo">Brandpoint <span...>Optimize</span><sup>SM</sup></span>` with:
  ```html
  <h2 class="bp-landing-h2 bp-landing-reveal">Meet <img src="assets/images/bpt-optimize-logo.png" alt="Brandpoint Optimize" class="bp-landing-optimize-logo-img"></h2>
  ```
- **Verify:** Logo image renders in H2; alt text "Brandpoint Optimize" present

### Step 2.8 — Add new quote placeholder
- **Action:** Insert a new `<blockquote>` section between `.bp-landing-optimize-cards` and `.bp-landing-visibility-section`
- **Content:** Lorem ipsum quote with placeholder attribution
- **Add:** HTML comment `<!-- PLACEHOLDER: MaDonna to provide quote copy -->`
- **Style:** Same classes as existing SEC-05c quote (`.bp-landing-quote`)
- **Verify:** New blockquote appears between feature cards and AI Visibility section

### Step 2.9 — Update gauge sub-header text
- **Action:** Change content of `.bp-landing-gauge-subheader` from "Weighted average across AI Visibility, Conversation Depth, and Competitive Ranking" to "Generated by Brandpoint Intelligence proprietary formula"
- **Verify:** New text present; old text gone

### Step 2.10 — Replace customization section images
- **Action (Row 1):** Replace 3 placeholder `<img>` tags in `.bp-landing-custom-logos` with:
  - `<img src="assets/logos/specialty/ap.png" alt="AP News">`
  - `<img src="assets/logos/specialty/usa-today.png" alt="USA Today">`
  - `<img src="assets/logos/specialty/business-journals.png" alt="The Business Journals">`
- **Action (Row 2):** Replace the `.bp-landing-custom-formats-graphic` div (3 SVG format items) with single `<img src="assets/images/specialty-formats.png" alt="Specialty content formats including infographics, video, and print placements">`
- **Action (Row 3):** Replace the `.bp-landing-native-ad-placeholder` div with `<img src="assets/images/native-ads.png" alt="Native advertising examples showing sponsored content on premium publisher sites">`
- **Note:** Add `loading="lazy"` to all images in this section (below the fold).
- **Verify:** All 3 rows show real images; no SVG placeholders remain in SEC-06

### Step 2.11 — Add Premium Publisher Network reel
- **Action:** Insert new `<section id="publisher-network">` between customizations and case-study sections
- **Content:** H2 "Premium Publisher Network", subtitle, slider with 32 `<img>` tags (16 logos + 16 duplicated for loop)
- **Slider structure:** Use `.bp-landing-slider-track` > `.bp-landing-publisher-slider-inner` (unique class for independent animation speed — 16 logos need ~40s duration vs Social Proof's 25s for 10 logos)
- **Note:** Do NOT add `bp-landing-reveal` to individual slider logo images. Apply only to section heading/subtitle.
- **Note:** Add `loading="lazy"` to all outlet logo images (below the fold).
- **Verify:** Section exists between SEC-06 and SEC-07; H2 present; 32 img tags with outlet logo paths

### Step 2.12 — Update case study to 2-column layout
- **Action:** Restructure `.bp-landing-case-study-inner` to a 2-column grid:
  - Left: `<img src="assets/images/see-our-work.png" alt="CooperVision sponsored content placement on SFGate showing eye health article" loading="lazy">`
  - Right: existing H2, text, and link
- **Verify:** Image on left, text on right at desktop; stacks on mobile (at ≤768px)

### Step 2.13 — Add footer
- **Action:** Insert `<footer class="bp-landing-footer">` after SEC-08 (final CTA), before `<script>` tag
- **Content:**
  - Column 1: Brandpoint logo, "An ARAnet Company" (linked to https://www.aranet.io/), address (850 5th St S, Hopkins, MN 55343, linked to Google Maps), phone ((952) 278-0780, linked as `tel:`), email (contact@brandpoint.com, linked as `mailto:`)
  - Column 2: Links heading + 6 links (Careers, Blog, Free Resources, Contact Us, Editorial Content, Privacy Policy)
  - Column 3: Social heading + 4 social links (LinkedIn, Facebook, X, YouTube)
  - Bottom bar: "Founded in 1996. Independently owned." | © Brandpoint 2026 | Privacy Policy | CA Privacy Rights
- **All hrefs must use absolute URLs per TR-08.2** (e.g., `https://www.brandpoint.com/blog/`, `https://www.indeed.com/cmp/Brandpoint-3`, `https://www.brandpointcontent.com`)
- **Verify:** Footer present after final CTA; all links have correct absolute hrefs; address matches "850 5th St S, Hopkins, MN 55343"; Google Maps link on address; "Founded in 1996. Independently owned." text present

### Step 2.14 — Update meta tags
- **Action:** Update `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`
- **Proposed title:** "Brandpoint | Premium Content Distribution & AI Visibility Solutions"
- **Proposed description:** "Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies across the nation's top publisher network."
- **Verify:** All 4 meta elements updated; no reference to "Strategic Distribution Solutions" in meta

---

## Step 3 — CSS Updates (css/styles.css)

### Step 3.1 — Sticky nav styles
- **Action:** Add complete nav styling section:
  - `.bp-landing-nav` — `position: fixed; top: 0; width: 100%; z-index: 1000;` with navy or white background
  - **IMPORTANT:** Add `body { padding-top: [nav-height]px; }` (approx 64-72px) to prevent hero content from being hidden behind the fixed nav on page load. Alternatively, use `position: sticky` which preserves document flow and avoids the offset issue.
  - `.bp-landing-nav-container` — flex layout, max-width, alignment
  - `.bp-landing-nav-logo img` — height constraint (~36-40px)
  - `.bp-landing-nav-links` — flex, gap, alignment
  - `.bp-landing-nav-links a` — font size, weight, color, hover states
  - `.bp-landing-nav-scrolled` — background/shadow change on scroll
  - `.bp-landing-nav-toggle` — hidden on desktop, hamburger icon styling
  - `.bp-landing-nav-open` — mobile menu expanded state
  - Responsive: hamburger at ≤768px, full nav at >768px
- **Verify:** Nav renders correctly at all breakpoints; sticky behavior works

### Step 3.2 — Value prop section styles
- **Action:** Add `.bp-landing-value-prop` styles:
  - Centered text, larger font size (~1.25rem), generous padding
  - Max-width container for readability
  - Background that provides visual separation from hero and social proof
- **Verify:** Section visually distinct; text readable; responsive

### Step 3.3 — Optimize logo image styles
- **Action:** Add `.bp-landing-optimize-logo-img` styles:
  - Appropriate max-width/height for heading context
  - Vertical alignment with "Meet " text
  - Responsive sizing
- **Verify:** Logo renders at appropriate size; doesn't overflow on mobile

### Step 3.4 — New quote placeholder styles
- **Action:** May reuse existing `.bp-landing-quote` styles or add minor variation
- **Note:** The existing `.bp-landing-quote` has `margin-top: 72px`. With two blockquotes using this class (new placeholder + existing SEC-05c), verify the spacing doesn't look excessive. Consider reducing `margin-top` on the new quote or using a variant class (e.g., `.bp-landing-quote-secondary`) with adjusted margins.
- **Verify:** Quote is visually consistent with SEC-05c quote; spacing between sections is balanced

### Step 3.5 — Publisher reel styles
- **Action:** Add `.bp-landing-publisher-network` section styles
- **Action:** Add `.bp-landing-publisher-slider-inner` with its own `@keyframes bp-landing-scroll-publishers` animation at ~40s duration (proportional to 16 logos vs Social Proof's 25s for 10 logos)
- **Action:** Logo images should use `height: 36px; width: auto; object-fit: contain;` for consistent display across varying aspect ratios
- **Action:** Include `-webkit-mask-image` prefix alongside `mask-image` for Safari compatibility on edge-fade effect
- **Verify:** Slider animates independently from social proof slider; seamless loop; logos display at consistent height

### Step 3.6 — Case study 2-column styles
- **Action:** Update `.bp-landing-case-study-inner` to CSS grid (2 columns at desktop, single at mobile)
- **IMPORTANT:** Override existing centered styles — remove `text-align: center` on `.bp-landing-case-study-inner` and `max-width: 680px; margin: 0 auto` on `.bp-landing-case-study-content` which will conflict with the grid layout. Set `text-align: left` on the text column.
- **Action:** Style the case study image (border-radius, shadow, max-width)
- **Responsive:** Stack to single column at ≤768px (consistent with other section breakpoints)
- **Verify:** Image left, text right at ≥768px; stacked at <768px; no centering artifacts from old styles

### Step 3.7 — Footer styles
- **Action:** Add complete footer styling:
  - `.bp-landing-footer` — navy background, white text, padding
  - `.bp-landing-footer-grid` — CSS grid (3 columns desktop → stacked mobile)
  - `.bp-landing-footer-logo` — logo sizing
  - `.bp-landing-footer-links` — list styling, link colors/hovers
  - `.bp-landing-footer-social` — icon sizing, spacing
  - `.bp-landing-footer-bottom` — bottom bar with legal text, flex layout
  - Responsive: stack columns on mobile
- **Verify:** Footer matches brandpoint.com content in new design language; all text readable; responsive

### Step 3.8 — Customization image styles
- **Action:** Update Row 2 and Row 3 image styles — the old SVG grid is replaced with single composite images that need appropriate sizing (max-width, border-radius, shadow)
- **Verify:** All 3 customization rows render cleanly with real images

### Step 3.9 — Cleanup deprecated styles
- **Action:** Remove or comment out CSS for elements that no longer exist:
  - `.bp-landing-package-price`, `.bp-price`, `.bp-landing-price-label` (prices removed)
  - `.bp-landing-package-featured` (featured border removed)
  - `.bp-landing-optimize-logo`, `.bp-landing-optimize-logo-accent`, `.bp-landing-optimize-logo sup` (text treatment replaced by image)
  - `.bp-landing-format-item` styles (SVG format items replaced by composite image)
  - `.bp-landing-native-ad-*` styles (native ad placeholder replaced by composite image)
- **Verify:** No orphaned CSS rules for deleted HTML elements

---

## Step 4 — JavaScript Updates (js/main.js)

### Step 4.1 — Nav scroll detection
- **Action:** Add scroll event listener that toggles `.bp-landing-nav-scrolled` on the nav element when `window.scrollY > 50`
- **Performance:** Use `requestAnimationFrame` to throttle the scroll handler (per TR-05.2)
- **Verify:** Nav background/shadow changes on scroll past threshold; no jank on rapid scroll

### Step 4.2 — Mobile hamburger toggle
- **Action:** Add click handler on `.bp-landing-nav-toggle` that toggles `.bp-landing-nav-open` on `.bp-landing-nav-links`
- **Action:** Close menu on link click and outside click
- **Action:** Toggle `aria-expanded` attribute and update `aria-controls` for accessibility (per TR-05.3)
- **Verify:** Hamburger opens/closes menu on mobile; menu closes after link tap; `aria-expanded` toggles between "true"/"false"

### Step 4.3 — Verify second slider
- **Action:** Ensure publisher network slider animates via CSS (no JS needed if using `@keyframes`)
- **Action:** Verify both sliders animate independently
- **Verify:** Both sliders scroll continuously without interference

---

## Step 5 — Verification

### Step 5.1 — Full acceptance criteria check
- Run through AC-01 through AC-19 from SPEC.md
- Document pass/fail for each
- Fix any failures before proceeding

### Step 5.2 — Link audit
- Verify every nav link resolves (absolute URLs)
- Verify every footer link resolves (absolute URLs)
- Verify every CTA href points to `https://www.brandpoint.com/contact/`
- Verify case study link points to `https://www.brandpoint.com/case-studies/coopervision/`
- Verify FR-16.3 external form pages resolve:
  - https://www.brandpoint.com/contact/
  - https://www.brandpoint.com/solutions/resources/
  - https://www.brandpoint.com/blog/how-to-turn-seasonal-trends-into-meaningful-brand-stories/

### Step 5.3 — Responsive check
- Test at 1440px, 1024px, 768px, 375px
- Verify nav collapse, section stacking, image scaling
- No horizontal scroll at any viewport

### Step 5.4 — Content audit
- All placeholder text clearly marked with HTML comments
- No "Placeholder:" alt text remaining on real images
- All copy unchanged from v1 (except gauge sub-header)

### Step 5.5 — SEO check
- Single H1
- Logical H2/H3 hierarchy
- Updated meta tags
- All images have descriptive alt text

---

## Execution Notes

- **Single pass:** All steps executed sequentially, one commit at the end
- Steps 1.1–1.7 (asset prep) are independent and can be done first as a batch
- Steps 2.1–2.14 (HTML changes) should be done in DOM order (top to bottom) for clarity
- Steps 3.1–3.9 (CSS) can follow HTML changes
- Step 4 (JS) depends on nav HTML being in place
- Step 5 (verification) runs after all changes complete
- If any step deviates from spec, STOP and update SPEC.md before continuing
