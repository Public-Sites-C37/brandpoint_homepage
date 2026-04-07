# Cross-Machine Setup

How to clone this repo and start editing the Brandpoint homepage on a fresh machine. **Everything you need lives in this repo, including credentials.**

## 1. Clone from the PRIVATE remote only

The repo lives on **two** GitHub remotes:

| Remote | Visibility | Use |
|---|---|---|
| `Brandpoint-C37/home_page` (GitHub Enterprise) | **INTERNAL / private** | Primary — credentials live here |
| `Public-Sites-C37/brandpoint_homepage` | **PUBLIC** | Optional historic mirror — never push credentials here |

Always clone from the private one:

```bash
git clone git@github.com:Brandpoint-C37/home_page.git
cd home_page
```

## 2. Activate the safety hook (one-time, per clone)

A `pre-push` hook in `.githooks/pre-push` blocks any push to a `Public-Sites` URL while `.wp-credentials.env` is in the tree. **You must opt in once per clone:**

```bash
git config core.hooksPath .githooks
```

Verify:

```bash
git config --get core.hooksPath
# Should print: .githooks
```

## 3. Lock down credentials file permissions

`.wp-credentials.env` is committed (the private remote is secure), but make it owner-only on disk anyway:

```bash
chmod 600 .wp-credentials.env
```

Verify the credentials work:

```bash
source .wp-credentials.env
curl -s -u "$WP_USER:$WP_APP_PASSWORD" "$WP_SITE/wp-json/wp/v2/users/me?_fields=id,name" | python3 -m json.tool
# Expect: {"id": 78, "name": "Jake Trippel"}
```

That's it. You can now edit and deploy the homepage from this machine.

## 4. Git remote configuration on this clone

Origin should ONLY push to the private remote. Verify:

```bash
git remote -v
```

You should see:

```
origin  git@github.com:Brandpoint-C37/home_page.git (fetch)
origin  git@github.com:Brandpoint-C37/home_page.git (push)
public  git@github.com:Public-Sites-C37/brandpoint_homepage.git (fetch)
public  git@github.com:Public-Sites-C37/brandpoint_homepage.git (push)
```

If `origin (push)` shows a Public-Sites URL, REMOVE it before pushing anything:

```bash
git remote set-url --delete --push origin git@github.com:Public-Sites-C37/brandpoint_homepage.git
```

**Push rules going forward:**

| Command | Where it goes | Safe with credentials? |
|---|---|---|
| `git push origin main` | Brandpoint-C37 (private) | YES |
| `git push public main` | Public-Sites-C37 (PUBLIC) | **BLOCKED by pre-push hook** |
| `git push --no-verify public main` | Public-Sites-C37 (PUBLIC) | **NEVER — credentials would leak** |

If you ever need to update the public mirror, you must first sanitize the branch (remove `.wp-credentials.env` from history with `git filter-repo` or maintain a separate public branch). **Don't bypass the hook.**

## 5. Files you have available

Everything you need to edit the homepage is in the repo:

| Path | Purpose |
|---|---|
| `index.html` | The page markup (12 sections, hero → footer) |
| `css/styles.css` | All styles (1442 lines, brand tokens, `bp-landing-` prefix, `!important` overrides) |
| `js/main.js` | Scroll reveal, gauge animation, sticky nav, GA4 tracking |
| `assets/images/` | Hero map, native ads, see-our-work, specialty formats |
| `assets/logos/` | Brandpoint logo + 16 outlet + 10 PR agency + 3 specialty logos (deployed versions) |
| `Updates from Brandpoint/` | Original source assets MaDonna sent (logos zips + AI files, PDFs, raw PNGs, email PDFs) |
| `WordPress config/` | Setup guide, site audit, integration research |
| `WordPress config/Implementation/` | SPEC, PLAN, TESTS, image-map.json (local→WP URL mapping) |
| `.memsearch/memory/` | Session freezes — read these for project history |
| `.wp-credentials.env` | WordPress API credentials (committed to private remote only) |
| `.githooks/pre-push` | Safety hook blocking credential leaks to public mirror |

## 6. Live state quick reference

| Fact | Value |
|---|---|
| Live homepage | `https://www.brandpoint.com/` |
| WP page ID | `40991` |
| Slug | `homepage-2026` |
| Template | `elementor_canvas` |
| Theme | Hello Elementor 3.4.7 |
| API base | `https://www.brandpoint.com/wp-json/wp/v2/` |
| Admin user | `jtrippel` (id 78) |
| CDN | Cloudflare via WP Engine, `max-age=600` |
| Old homepage (preserved) | page `39965` at `/brandpoint-jk-draft-6-24/` |

## 7. Common operations

```bash
# Always start a session with:
cd home_page && source .wp-credentials.env

# Read live page content
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/pages/40991?context=edit" | python3 -m json.tool

# Update page content (use your patched JSON in /tmp/payload.json)
curl -s -X POST "$WP_SITE/wp-json/wp/v2/pages/40991" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/payload.json

# Bust Cloudflare cache (re-save page with no changes)
curl -s -X POST "$WP_SITE/wp-json/wp/v2/pages/40991" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"status":"publish"}'

# Upload an image to media library
curl -s -X POST "$WP_SITE/wp-json/wp/v2/media" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Disposition: attachment; filename=\"NAME.png\"" \
  -H "Content-Type: image/png" \
  --data-binary @assets/images/NAME.png

# EMERGENCY ROLLBACK to old homepage
curl -s -X PUT "$WP_SITE/wp-json/wp/v2/settings" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"show_on_front":"page","page_on_front":39965}'
```

## 8. Reading project history

Before starting work on a new machine, read the most recent session freeze in `.memsearch/memory/` — they document everything that's been done, key learnings, and open items:

```bash
ls -t .memsearch/memory/session_freeze_*.md | head -3
```

Recent freezes:
- `session_freeze_20260406_madonna_copy_edits_round3.md` — current state
- `session_freeze_20260401_wordpress_deployment.md` — initial WP deployment
- `session_freeze_20260331_homepage_v2.md` — homepage rebuild
