# MaDonna Feedback Round 2 — Specification

## Problem Statement

MaDonna Sheehy (Director of Marketing) provided a second round of feedback on the Brandpoint homepage takeover at 5:45 PM on March 31, 2026. Five code changes are required before the page can be shared with editors for final approval. Three additional non-code items were raised (form verification, SEO tag access, training on edits).

**Source:** Email thread "Re: Website requests - brandpoint.com homepage takeover" dated 2026-03-31.

## Expected Behavior

After implementation, the homepage at `index.html` reflects all five content/styling changes requested by MaDonna, with no regressions to existing layout, functionality, or responsiveness.

## Affected Files/Modules

| File | Action | Lines |
|------|--------|-------|
| `index.html` | Remove map caption | Line 50 |
| `index.html` | Replace value prop copy | Line 60 |
| `index.html` | Replace lorem ipsum quote | Lines 221-224 |
| `index.html` | Remove social icons (Facebook, X, YouTube) | Lines 442-450 |
| `css/styles.css` | Remove orphaned `.bp-landing-hero-map-caption` rule | Lines 437-446 |
| `css/styles.css` | Add new scoped rule `.bp-landing-optimize-header .bp-landing-h2` for "Meet" sizing | New rule inserted near line 646 |
| `css/styles.css` | Add responsive overrides for new rule at 1024px and 768px breakpoints | New rules inserted near lines 1254 and 1339 |

**Note:** `index.html` line 193 (the "Meet Brandpoint Optimize" h2) requires no HTML change — AC-4 is CSS-only.

## Acceptance Criteria

**AC-1:** The text "Local, regional, and nationwide premium distribution network" below the distribution map image is removed. The map image itself (which contains this text baked in) remains unchanged. The orphaned `.bp-landing-hero-map-caption` CSS class is also removed.

**AC-2:** The value proposition paragraph (section `#value-prop`) reads exactly:
> "Brandpoint helps PR and marketing professionals with premium content distribution, earned media and measurable reporting. The result = stronger AI visibility, greater reach, actionable insights and a brand that's easier for audiences and AI to find."

**AC-3:** The lorem ipsum placeholder quote (currently between the Optimize feature cards and the AI Visibility section) is replaced with:
> "This report gives me agency what to do next." — Digital Strategy Leader

Using the same HTML entity encoding pattern as existing quotes: `&ldquo;`/`&rdquo;` for smart quotes, `&mdash;` for em-dash in the `<cite>` element.

**AC-4:** In the "Meet Brandpoint Optimize" heading, the word "Meet" visually matches the approximate size of the Brandpoint Optimize logo image beside it. This is achieved by adding a new scoped CSS rule (`.bp-landing-optimize-header .bp-landing-h2`) that increases the h2 font-size from the base 2.25rem to ~2.75rem, with proportional responsive scaling at the 1024px breakpoint (~2.25rem) and 768px breakpoint (~1.75rem), matching the logo image's scaling from 44px to 36px to 28px. The base `.bp-landing-h2` rule must NOT be modified (it affects every h2 on the page).

**AC-5:** In the site footer, only the LinkedIn social icon/link remains. The Facebook (lines 442-444), X/Twitter (lines 445-447), and YouTube (lines 448-450) `<a>` elements are removed. The container `</div>` on line 451, the `<h4>` heading "Social", and the footer column structure remain intact.

## Non-Code Items (informational, no implementation needed)

**NC-1 (Forms):** All form links on the page (`/contact/`, `/solutions/resources/`, blog) point to existing brandpoint.com URLs. They are external links and will remain functional as-is after the homepage swap.

**NC-2 (SEO Tags):** The `<head>` section contains editable `<title>`, `<meta name="description">`, and `og:` tags at lines 6-12 of `index.html`. MaDonna can update these directly in the HTML.

**NC-3 (Training):** MaDonna has requested a walkthrough on making quick copy edits. This is a people task, not a code task.

## Constraints & Edge Cases

- The distribution map image (`assets/images/distribution-map.png`) must NOT be modified — it already contains the "Local, regional..." text baked into the image per Jacob Kuddes' latest version.
- The base `.bp-landing-h2` CSS class (line 126, `font-size: 2.25rem`) must not be changed — it styles every h2 on the page. AC-4 requires a new scoped rule.
- The `.bp-landing-optimize-logo-img` rule sets the logo at 44px desktop, 36px at 1024px, 28px at 768px. The new "Meet" font-size values should scale proportionally.
- Quote text must be reproduced exactly as MaDonna wrote it, including "agency" (not "agency on") — this appears to be her intended wording.
- Removing social icons must not delete the container `</div>` (line 451) or the "Social" `<h4>` heading — only the three `<a>` elements are removed.

## Out of Scope

- Map image redesign (Jacob Kuddes' domain)
- New hero bar asset from Jacob (referenced in earlier email at 3:03 PM — separate task)
- Brand/agency logo colorization (Lisa's earlier request, item 4 from her 12:17 PM email — not re-raised by MaDonna)
- Any changes to pages other than `index.html` and `css/styles.css`
- The training walkthrough for MaDonna (NC-3)
