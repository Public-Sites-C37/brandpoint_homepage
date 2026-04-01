# MaDonna Feedback Round 2 — Implementation Plan

## Prerequisites

- Access to `index.html` and `css/styles.css` in the `home_page` repo
- No build step required — static HTML/CSS site
- Browser available to verify visual changes

## Steps

### Step 1: Remove map caption text
- **Files:** `index.html`
- **Change:** Delete line 50: `<p class="bp-landing-hero-map-caption">Local, regional, and nationwide premium distribution network</p>`
- **Verify:** The map image displays without duplicate text beneath it

### Step 2: Remove orphaned caption CSS
- **Files:** `css/styles.css`
- **Change:** Delete the `.bp-landing-hero-map-caption` rule block at lines 437-446 (the selector and its 8 properties)
- **Verify:** `grep -r "bp-landing-hero-map-caption" .` returns zero results across all files

### Step 3: Update value proposition copy
- **Files:** `index.html`
- **Change:** Replace the `<p>` text inside `#value-prop` section (line 60). Change from:
  ```
  For nearly three decades, Brandpoint has helped the nation's leading brands and agencies earn meaningful visibility through premium content distribution. Our exclusive publisher partnerships, AI-powered optimization, and measurable campaign reporting deliver results you can see — and prove.
  ```
  To:
  ```
  Brandpoint helps PR and marketing professionals with premium content distribution, earned media and measurable reporting. The result = stronger AI visibility, greater reach, actionable insights and a brand that's easier for audiences and AI to find.
  ```
- **Verify:** Value prop section displays the new copy in the browser

### Step 4: Replace lorem ipsum quote with Digital Strategy Leader quote
- **Files:** `index.html`
- **Change:** Replace the blockquote content at lines 221-224. Change from:
  ```html
  <blockquote class="bp-landing-quote bp-landing-quote-secondary bp-landing-reveal">
    <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.&rdquo;</p>
    <cite>&mdash; [Name], [Title]</cite>
  </blockquote>
  ```
  To:
  ```html
  <blockquote class="bp-landing-quote bp-landing-quote-secondary bp-landing-reveal">
    <p>&ldquo;This report gives me agency what to do next.&rdquo;</p>
    <cite>&mdash; Digital Strategy Leader</cite>
  </blockquote>
  ```
  Note: Uses `&ldquo;`/`&rdquo;` for smart quotes and `&mdash;` for em-dash, matching the existing quote pattern at lines 288-291.
- **Verify:** The quote appears between the Optimize feature cards and the AI Visibility section. `grep -i "lorem ipsum" index.html` returns zero results.

### Step 5: Add scoped CSS rule for "Meet" heading sizing
- **Files:** `css/styles.css`
- **Change:** This is a **new rule**, not a modification of an existing one. The base `.bp-landing-h2` (line 126, `font-size: 2.25rem`) must not be changed.

  **5a — Desktop rule:** Insert a new rule after `.bp-landing-optimize-logo-img` (after line 654):
  ```css
  .bp-landing-optimize-header .bp-landing-h2 {
    font-size: 2.75rem;
  }
  ```
  This scoped selector overrides only the Optimize section h2, matching the 44px logo height proportionally.

  **5b — 1024px breakpoint:** Insert a new rule inside the `@media (max-width: 1024px)` block, after `.bp-landing-optimize-logo-img { height: 36px; }` (after line 1254):
  ```css
  .bp-landing-optimize-header .bp-landing-h2 {
    font-size: 2.25rem;
  }
  ```
  Scales proportionally with the logo (36px = 82% of 44px, 2.25rem = 82% of 2.75rem).

  **5c — 768px breakpoint:** Insert a new rule inside the `@media (max-width: 768px)` block, after `.bp-landing-optimize-logo-img { height: 28px; }` (after line 1339):
  ```css
  .bp-landing-optimize-header .bp-landing-h2 {
    font-size: 1.75rem;
  }
  ```
  Scales proportionally with the logo (28px = 64% of 44px, 1.75rem = 64% of 2.75rem).

- **Verify:** "Meet" and the Brandpoint Optimize logo appear as a visually cohesive heading at desktop (1200px+), tablet (1024px), and mobile (768px and below). Other h2 elements on the page (Distribution Packages, Customize your campaign, etc.) remain at their original 2.25rem size.

### Step 6: Remove Facebook, X, and YouTube social icons from footer
- **Files:** `index.html`
- **Change:** Delete only the three `<a>` elements:
  - Facebook: lines 442-444
  - X/Twitter: lines 445-447
  - YouTube: lines 448-450
  
  **Do NOT delete:**
  - Line 451 (`</div>`) — this is the closing tag for `.bp-landing-footer-social-links`
  - Line 437 (`<h4 class="bp-landing-footer-heading">Social</h4>`) — keep the heading for structural consistency
  - Line 438 (`<div class="bp-landing-footer-social-links">`) — keep the container
  
  After deletion, the Social column should contain only the LinkedIn link (lines 439-441).

- **Verify:** Footer shows only the LinkedIn icon. Footer three-column layout (Company Info, Links, Social) remains intact with no visual breakage at desktop and mobile widths. The "Social" heading is visible above the single LinkedIn icon.

## Rollback Plan

All changes are to two tracked files (`index.html`, `css/styles.css`). Rollback via `git checkout HEAD -- index.html css/styles.css`.
