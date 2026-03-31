# Comprehensive Quality Review Report

**Date:** 2026-03-31
**Scope:** 5 parallel review agents auditing all 9 documents for consistency, alignment, gaps, and code impact
**Reviews performed:**
1. FR ↔ SPEC cross-reference
2. TR ↔ PLAN cross-reference
3. SPEC ↔ TESTS coverage analysis
4. Requirements ↔ Current Codebase impact analysis
5. Brainstorm ↔ Requirements ↔ Implementation alignment

---

## CRITICAL ISSUES (Must Fix Before Implementation)

### QR-01: Publisher reel logo count inconsistent — 17 vs 16
**Found by:** Agents 1, 2, 3, 5
**Impact:** Implementation confusion, wrong animation speed, failed verification

| Document | Value | Correct? |
|---|---|---|
| FR-11.2 header | "17 outlet logos" | WRONG — should be 16 |
| FR-11.3 table | 17 rows (row 17 = Boston Herald, omitted) | Misleading |
| SPEC Expected Behavior | "17 outlet logos" | WRONG — should be 16 |
| SPEC Affected Files | "17 outlets" (in 10+17+3=30) | WRONG — should be 16 (total 29) |
| SPEC AC-12 | "16 outlet logos" | CORRECT |
| PLAN Step 1.4 | "16 logos" | CORRECT |
| PLAN Step 2.11 | "32 img tags (16+16)" | CORRECT |
| TESTS T-12 check 12.4 | "16 unique outlet logos" | CORRECT |
| TR-03.2 | "17 logos" | WRONG — should be 16 |

**Fix:** Standardize to "16" in FR-11.2, SPEC Expected Behavior, SPEC Affected Files, and TR-03.2.

---

### QR-02: Filename normalization inconsistencies — SPEC source names vs PLAN/TESTS target names
**Found by:** Agent 3
**Impact:** Broken image references if filenames don't match

| SPEC Source Name | Expected Normalization | PLAN/TESTS Target | Discrepancy |
|---|---|---|---|
| `Distribution Map-Dots.png` | `distribution-map-dots.png` | `distribution-map.png` | Drops `-dots` |
| `BPTOPTIMIZE326BLU.png` | `bptoptimize326blu.png` | `bpt-optimize-logo.png` | Completely different |
| `See Our Work in Action.png` | `see-our-work-in-action.png` | `see-our-work.png` | Drops `-in-action` |

**Fix:** Either update SPEC to list canonical destination filenames, OR update PLAN/TESTS to use faithful normalizations. Recommend: keep the current semantic names in PLAN/TESTS (they're cleaner) but add a filename mapping table to SPEC constraints section.

---

### QR-03: Absolute vs relative URL contradiction between FR-16.1 and SPEC AC-16
**Found by:** Agent 1
**Impact:** Implementation ambiguity on URL format

- FR-16.1 and SPEC Constraint 5 require absolute URLs: `https://www.brandpoint.com/contact/`
- SPEC AC-16 tests for relative: `/contact/`, `/case-studies/coopervision/`

**Fix:** Update AC-16 to use absolute URLs matching FR-16.1 and Constraint 5.

---

### QR-04: Fixed nav WILL overlap hero — no body offset in codebase
**Found by:** Agent 4
**Impact:** Layout bug on page load — hero content hidden behind nav

Current `body` has zero top padding. A `position: fixed` nav (required to stay visible at all scroll positions) will overlap the hero. `position: sticky` avoids this BUT only works within the flow — the hero would need to be the first flow element after the nav.

**Fix:** Add explicit guidance to PLAN Step 3.1: if using `position: fixed`, add `body { padding-top: [nav-height]px }`. If using `position: sticky`, ensure nav is in the document flow before hero. TR-02.4 acknowledges this but the PLAN step doesn't resolve it.

---

### QR-05: PR agency logo-to-filename mapping is unverified
**Found by:** Agent 4
**Impact:** Wrong alt text on all 10 logos if mapping is incorrect

Files are numbered `PR Agency Logos-01.png` through `10.png`. PLAN assumes 01=FINN Partners, 02=Coyne PR, etc. No manifest file verifies this. The images were viewed during brainstorming analysis and the mapping was confirmed visually, but the PLAN should note this was visually verified.

**Fix:** Add a verification note to PLAN Step 1.3 confirming the mapping was visually verified during brainstorming.

---

## IMPORTANT ISSUES (Should Fix)

### QR-06: `loading="lazy"` requirement in TR-04.2 has no PLAN step
**Found by:** Agent 2
**Impact:** Missing performance attribute on 40+ images

TR-04.2 explicitly requires `loading="lazy"` on all images except hero map. No PLAN step implements this.

**Fix:** Add `loading="lazy"` instruction to PLAN Steps 2.4, 2.10, 2.11, 2.12, 2.13 (all steps adding images below the fold).

---

### QR-07: Absolute URL requirement (TR-08.2) not carried into PLAN nav/footer steps
**Found by:** Agent 2
**Impact:** Developer may use relative URLs in nav/footer

**Fix:** Add explicit note to PLAN Steps 2.1 and 2.13: "All hrefs must use absolute URLs per TR-08.2."

---

### QR-08: `requestAnimationFrame`/debounce for nav scroll listener missing from PLAN
**Found by:** Agent 2
**Impact:** Performance — scroll event fires at 60fps without throttling

**Fix:** Add to PLAN Step 4.1: "Use requestAnimationFrame or debounce for performance per TR-05.2."

---

### QR-09: Second slider will animate at same speed as first if reusing same CSS class
**Found by:** Agents 2, 4
**Impact:** 16 logos scrolling at same speed as 10 logos = visually faster

TR-03.2 and PLAN Step 3.5 both acknowledge this but use inconsistent class names. TR says reuse `.bp-landing-slider-inner`, PLAN introduces `.bp-landing-publisher-slider-inner`.

**Fix:** Standardize on a unique class for the publisher slider (`.bp-landing-publisher-slider-inner`) in both TR-03.2 and PLAN Step 3.5. Calculate animation duration proportionally (25s × 16/10 ≈ 40s).

---

### QR-10: "Meet " plain text prefix not tested in T-08
**Found by:** Agent 3
**Impact:** AC-08 requires it; no test verifies it

**Fix:** Add T-08 check: `8.6 | "Meet " text prefix | Plain text "Meet " appears before logo image in H2`

---

### QR-11: SPEC AC-14 missing "Founded in 1996" and Google Maps link
**Found by:** Agents 3, 5
**Impact:** These FR requirements won't be tested

- FR-14.5 specifies "Founded in 1996. Independently owned." — not in AC-14
- FR-14.2 specifies Google Maps link on address — not in AC-14

**Fix:** Add to AC-14: "; address linked to Google Maps; 'Founded in 1996. Independently owned.' text present"

---

### QR-12: SPEC Expected Behavior mentions 17 outlet logos; AC-12 says 16
**Found by:** Agent 5
**Impact:** Internal SPEC contradiction (subset of QR-01)

**Fix:** Covered by QR-01 resolution.

---

### QR-13: Case study CSS will fight new 2-column layout
**Found by:** Agent 4
**Impact:** Existing centered styles on `.bp-landing-case-study-inner` conflict with grid

Current CSS: `text-align: center` and `max-width: 680px; margin: 0 auto`. These will fight a CSS grid layout.

**Fix:** Add note to PLAN Step 3.6: "Override existing `.bp-landing-case-study-inner` centered styles; remove `text-align: center` and `max-width` on this element when applying grid."

---

### QR-14: Dual `.bp-landing-quote` instances may cause spacing issues
**Found by:** Agent 4
**Impact:** Two `margin-top: 72px` stacking

New quote placeholder and existing SEC-05c quote both use `.bp-landing-quote` class, which has `margin-top: 72px`.

**Fix:** Add note to PLAN Step 3.4: "Consider reducing margin-top on the new quote or using a variant class to avoid double 72px margin stacking."

---

### QR-15: `aria-controls` missing from PLAN Step 4.2
**Found by:** Agent 2
**Impact:** Accessibility gap

TR-05.3 requires both `aria-expanded` and `aria-controls`. PLAN only mentions `aria-expanded`.

**Fix:** Add `aria-controls` to PLAN Step 4.2.

---

### QR-16: FR-07.1 ambiguity — "Meet " prefix left as "or" option
**Found by:** Agent 5
**Impact:** FR doesn't match resolved SPEC/PLAN decision

**Fix:** Update FR-07.1 to remove the "or" option. State definitively: "Prefix with 'Meet ' text before the logo image."

---

### QR-17: Trending Topics blog URL not in any SPEC acceptance criterion
**Found by:** Agent 5
**Impact:** MaDonna-specified form page won't be verified

FR-16.3 lists 3 external pages; none appear in AC-16 or PLAN Step 5.2.

**Fix:** Add to PLAN Step 5.2: "Verify FR-16.3 external pages resolve (contact, resources, blog trending topics)."

---

### QR-18: Package cards have no CTA buttons — T-16 gap is a non-issue
**Found by:** Agent 3 flagged missing package card CTA checks
**Resolution:** The current package cards do NOT have CTA buttons — they are informational cards with feature lists only. No CTA to test. Agent 3's finding is a false positive.

---

## MINOR ISSUES (Nice to Fix)

| ID | Issue | Fix |
|---|---|---|
| QR-19 | Nav scroll shadow behavior not in any AC | Add to AC-01: "background/shadow change on scroll" |
| QR-20 | `object-fit: contain` for logo sliders not in PLAN | Add to Step 3.5 |
| QR-21 | `-webkit-mask-image` Safari prefix not in PLAN | Add to Step 3.5 (already in existing CSS) |
| QR-22 | Hero alt text currently mentions Boston Herald | Update in Step 2.2 |
| QR-23 | `bp-landing-optimize-header` div not mentioned in requirements | No action needed — structurally harmless |
| QR-24 | Case study breakpoint: TR says 480px, PLAN implies 768px | Standardize to 768px (consistent with other sections) |
| QR-25 | `og:image` tag not tested in T-15 | Add check to T-15 |
| QR-26 | FR-05.2 doesn't mention class removal; PLAN correctly adds it | Update FR-05.2 to include class removal |
| QR-27 | Don't apply `bp-landing-reveal` to slider logo images | Add note to PLAN Steps 2.4 and 2.11 |

---

## CONFIRMED ALIGNED (No Issues)

- Section order: consistent across all 9 documents
- All 9 open questions (OQ-01 through OQ-09): resolutions reflected in requirements and spec
- All URLs: consistent across site audit, brainstorm, FR, PLAN
- Social proof heading: confirmed unchanged
- Gauge sub-header text: exact string match across FR, SPEC, TESTS
- Footer link set: complete and consistent
- Value prop and quote placeholders: consistently marked
- No VTT transcript details lost in translation (all 16 changes captured)

---

## Action Summary

| Priority | Count | Action |
|---|---|---|
| CRITICAL | 5 | Must fix before implementation begins |
| IMPORTANT | 12 | Should fix — will cause bugs or test failures |
| MINOR | 9 | Nice to fix — cosmetic or defensive |
| Confirmed OK | 10+ | No action needed |
