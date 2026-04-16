# Claude Code — Access Guide (GitHub + WordPress)

This document records exactly how a Claude Code session gains access to this repo on GitHub and to the Brandpoint WordPress REST API. It's written so that **any future session** (any user, any machine) can reproduce the setup without guessing.

For a broader cross-machine setup doc (remotes, hooks, push rules), see [CROSS-MACHINE-SETUP.md](CROSS-MACHINE-SETUP.md). This file is the **short access-only** reference.

---

## 1. GitHub access

### Repo URL used in this session
```
https://github.com/brandpoint/home_page.git
```
(HTTPS, private GitHub repo. `CROSS-MACHINE-SETUP.md` also references an alternate SSH URL `git@github.com:Brandpoint-C37/home_page.git` — both point at the same work; use whichever matches your existing GitHub auth.)

### Clone into a fresh working directory
If the target directory is empty, clone directly into it with a trailing `.`:
```bash
git clone https://github.com/brandpoint/home_page.git .
```
Otherwise clone into a new subfolder:
```bash
git clone https://github.com/brandpoint/home_page.git
cd home_page
```

### Verify
```bash
git status          # expect: On branch main, nothing to commit
git remote -v       # expect: origin -> https://github.com/brandpoint/home_page.git
git log --oneline -5
```

### Activate the pre-push safety hook (once per clone)
```bash
git config core.hooksPath .githooks
```
This blocks accidental pushes of credentials to any "Public-Sites" URL. See `.githooks/pre-push`.

---

## 2. WordPress REST API access

### Credentials file
Credentials live in `.wp-credentials.env` at the repo root. **This file is intentionally committed** — the repo is private and the pre-push hook prevents the creds from reaching a public mirror. Do NOT add it to `.gitignore`.

Format:
```env
WP_SITE="https://www.brandpoint.com"
WP_USER="<your-wp-username>"
WP_APP_PASSWORD="<your-wp-application-password>"
```

### Switching the active WP user
If the repo was last used by a different person (e.g., jtrippel) and you want Claude to act as you, overwrite `.wp-credentials.env` with your own WordPress **Application Password** (generated at `https://www.brandpoint.com/wp-admin/profile.php` → "Application Passwords"). Commit the change so the next session on another machine inherits it.

Current active user (as of 2026-04-16): `msheehy` (MaDonna Sheehy, WP user id 49).

### Load credentials and test auth
```bash
source .wp-credentials.env
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/users/me?_fields=id,name,slug" \
  -w "\n---\nHTTP %{http_code}\n"
```
Expect: HTTP 200 and a JSON body with your user `id`, `name`, and `slug`.

### Common authenticated calls
```bash
# Read the live homepage (page id 40991)
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/pages/40991?context=edit"

# Update the homepage (payload is JSON body)
curl -s -X POST "$WP_SITE/wp-json/wp/v2/pages/40991" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/payload.json

# Upload an image
curl -s -X POST "$WP_SITE/wp-json/wp/v2/media" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Disposition: attachment; filename=\"NAME.png\"" \
  -H "Content-Type: image/png" \
  --data-binary @assets/images/NAME.png
```

See `CROSS-MACHINE-SETUP.md` §7 for the full operation cheat-sheet (cache bust, emergency rollback, etc.).

---

## 3. Session start checklist (copy/paste)

```bash
cd "<path-to-repo>"
git status
source .wp-credentials.env
curl -s -u "$WP_USER:$WP_APP_PASSWORD" "$WP_SITE/wp-json/wp/v2/users/me?_fields=id,name" -w "\nHTTP %{http_code}\n"
```

Three green signals and you're ready to work:
1. `git status` → clean working tree on `main`
2. `source` → no error
3. curl → HTTP 200 with your WP user info

---

## 4. Session log

| Date | User | Machine | Clone URL | WP user verified |
|---|---|---|---|---|
| 2026-04-16 | MaDonna Sheehy | Windows (`C:\Users\MaDonnaSheehy\...\Brandpoint.com Homepage`) | `https://github.com/brandpoint/home_page.git` | `msheehy` (id 49) — HTTP 200 |
