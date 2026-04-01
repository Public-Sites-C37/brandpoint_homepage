# MaDonna Feedback Round 2 — Test Plan

## Test Cases

### TC-1: Map caption removed → AC-1
- **Setup:** Open `index.html` in browser
- **Action:** Scroll to hero section with the distribution map
- **Expected:** No text caption appears below the map image. The map image itself (which has "Local, regional, and nationwide premium distribution network" baked in) displays normally.

### TC-2: No orphaned CSS or HTML references → AC-1
- **Setup:** Run search across codebase
- **Action:** `grep -r "bp-landing-hero-map-caption" .`
- **Expected:** Zero results — no references in HTML or CSS

### TC-3: Value prop copy updated → AC-2
- **Setup:** Open `index.html` in browser
- **Action:** Scroll to the value proposition section below the hero
- **Expected:** Text reads exactly: "Brandpoint helps PR and marketing professionals with premium content distribution, earned media and measurable reporting. The result = stronger AI visibility, greater reach, actionable insights and a brand that's easier for audiences and AI to find."

### TC-4: Lorem ipsum replaced with Digital Strategy Leader quote → AC-3
- **Setup:** Open `index.html` in browser
- **Action:** Scroll to the Meet Brandpoint Optimize section, find the first blockquote (above the AI Visibility gauge)
- **Expected:** Quote reads: "This report gives me agency what to do next." with attribution "— Digital Strategy Leader". Smart quotes and em-dash render correctly.

### TC-5: No lorem ipsum remains → AC-3
- **Setup:** Run search
- **Action:** `grep -i "lorem ipsum" index.html`
- **Expected:** Zero results

### TC-6: Quote HTML encoding matches existing pattern → AC-3
- **Setup:** Inspect `index.html` source
- **Action:** Compare the new blockquote (lines 221-224) with the existing Agency Leader quote (lines 288-291)
- **Expected:** Both use `&ldquo;`/`&rdquo;` for smart quotes and `&mdash;` in the `<cite>` element

### TC-7: "Meet" matches Brandpoint Optimize styling at desktop → AC-4
- **Setup:** Open `index.html` in browser at desktop width (1200px+)
- **Action:** Scroll to "Meet Brandpoint Optimize" heading
- **Expected:** "Meet" appears at a visually proportional size to the Brandpoint Optimize logo beside it — reads as one cohesive heading, not mismatched sizes. "Meet" renders at 2.75rem.

### TC-8: "Meet" responsive scaling → AC-4
- **Setup:** Open `index.html` in browser, resize to tablet (1024px) and mobile (768px)
- **Action:** Check "Meet Brandpoint Optimize" heading at each breakpoint
- **Expected:** At 1024px, "Meet" scales to ~2.25rem (matching logo at 36px). At 768px, "Meet" scales to ~1.75rem (matching logo at 28px).

### TC-9: Other h2 elements unaffected → AC-4
- **Setup:** Open `index.html` in browser at desktop width
- **Action:** Inspect the h2 elements for "Distribution Packages", "Customize your campaign", "Premium Publisher Network", and other sections
- **Expected:** All remain at the base `font-size: 2.25rem` from `.bp-landing-h2`. Only the Optimize section h2 is larger.

### TC-10: Only LinkedIn remains in footer → AC-5
- **Setup:** Open `index.html` in browser
- **Action:** Scroll to footer, inspect social icons area
- **Expected:** Only the LinkedIn icon/link is present. No Facebook, X/Twitter, or YouTube icons visible.

### TC-11: LinkedIn link functional → AC-5
- **Setup:** Open `index.html` in browser
- **Action:** Click the LinkedIn icon in the footer
- **Expected:** Opens `https://www.linkedin.com/company/brandpoint/` in a new tab

### TC-12: Footer layout intact → AC-5
- **Setup:** Open `index.html` at desktop and mobile widths
- **Action:** Inspect footer grid layout
- **Expected:** Three-column footer layout (Company Info, Links, Social) remains properly structured with no visual gaps or collapsed columns. The "Social" `<h4>` heading is visible above the single LinkedIn icon.

### TC-13: Footer social container HTML intact → AC-5
- **Setup:** Inspect `index.html` source
- **Action:** Verify the `<div class="bp-landing-footer-social-links">` container and its closing `</div>` are both present
- **Expected:** Container opening tag (line 438) and closing tag (line 451 before edits) both intact, wrapping only the LinkedIn `<a>` element

## Regression Tests

### RT-1: Hero section unchanged
- **Action:** Verify hero headline, descriptor paragraph, CTA button, and map image all render correctly
- **Expected:** No changes to any hero content except the removed caption

### RT-2: Existing Agency Leader quote unchanged
- **Action:** Scroll to the quote below the AI Visibility section (lines 288-291)
- **Expected:** "We're constantly being asked by our clients, 'what's the ROI?'..." quote with "— Agency Leader" attribution remains intact

### RT-3: Navigation links functional
- **Action:** Click each nav link (Who We Are, Who We Work With, Blog, Editorial Content Library, Contact Us)
- **Expected:** All links navigate to correct brandpoint.com pages

### RT-4: Form links functional
- **Action:** Click "Contact Us" CTA buttons and "Request a Demo" buttons
- **Expected:** All navigate to `https://www.brandpoint.com/contact/`
