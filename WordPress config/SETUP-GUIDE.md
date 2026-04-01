# WordPress + Claude Code — Setup Guide

## Step 1: Verify WordPress REST API Access

Run this from Claude Code (or any terminal):

```bash
curl -s "https://brandpoint.com/wp-json/wp/v2/pages?per_page=5" | python3 -m json.tool | head -20
```

**Expected:** JSON array of pages. If you get a 404 or HTML error page, the REST API may be disabled or the site may use a non-standard permalink structure.

If blocked, check:
- `https://brandpoint.com/wp-json/` — should show API index
- `https://brandpoint.com/?rest_route=/wp/v2/pages` — fallback if pretty permalinks disabled

---

## Step 2: Generate Application Password

1. Log into WordPress Admin at `https://brandpoint.com/wp-admin/`
2. Go to **Users → Profile** (or the admin account to use for API access)
3. Scroll to **Application Passwords** section
4. Enter a name: `Claude Code - HavokAI`
5. Click **Add New Application Password**
6. **Copy the generated password immediately** — it's shown once
7. The password format is: `xxxx xxxx xxxx xxxx xxxx xxxx` (spaces are part of it)

---

## Step 3: Store Credentials on HavokAI

Create a credentials file (NOT committed to git):

```bash
# Create the file
cat > ~/dev_c37/home_page/.wp-credentials.env << 'EOF'
WP_SITE="https://brandpoint.com"
WP_USER="madonna"
WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
EOF

# Lock permissions
chmod 600 ~/dev_c37/home_page/.wp-credentials.env
```

**Verify `.gitignore` excludes it:**
```bash
echo ".wp-credentials.env" >> ~/dev_c37/home_page/.gitignore
```

**Load before API calls:**
```bash
source .wp-credentials.env
```

---

## Step 4: Test API Authentication

```bash
source .wp-credentials.env

curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/pages?per_page=3&_fields=id,title,status,link" \
  | python3 -m json.tool
```

**Expected:** JSON array with page IDs, titles, statuses, and URLs. If you get a 401, the credentials are wrong.

---

## Step 5: Push Homepage Content

### 5a: Upload Images First

Each local image must be uploaded to WordPress media library. The returned URL replaces the local path in the HTML.

```bash
source .wp-credentials.env

# Upload an image
curl -s -X POST "$WP_SITE/wp-json/wp/v2/media" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Disposition: attachment; filename=distribution-map.png" \
  -H "Content-Type: image/png" \
  --data-binary @assets/images/distribution-map.png \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['source_url'])"
```

This prints the WordPress URL for the uploaded image. Repeat for each image.

### 5b: Create or Update the Page

```bash
source .wp-credentials.env

# Extract the page body content (between <body> tags, excluding nav/footer if WP theme provides those)
# Then create the page:

curl -s -X POST "$WP_SITE/wp-json/wp/v2/pages" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d "$(python3 -c "
import json
with open('index.html') as f:
    html = f.read()
# You may want to extract just the body content sections
print(json.dumps({
    'title': 'Brandpoint | Premium Content Distribution & AI Visibility Solutions',
    'content': html,
    'status': 'draft',
    'slug': '',
    'meta': {
        'yoast_wpseo_title': 'Brandpoint | Premium Content Distribution & AI Visibility Solutions',
        'yoast_wpseo_metadesc': 'Brandpoint delivers premium paid placements, earned editorial coverage, and measurable AI visibility for brands and agencies.'
    }
}))"
```

### 5c: Update an Existing Page

```bash
PAGE_ID=123  # Replace with actual page ID

curl -s -X PUT "$WP_SITE/wp-json/wp/v2/pages/$PAGE_ID" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"content": "<div>Updated HTML here</div>", "status": "draft"}'
```

---

## Step 6: Verify and Publish

1. Log into WordPress Admin
2. Go to **Pages** → find the draft page
3. Preview it to confirm rendering
4. If using a page builder, verify the HTML renders in the chosen template
5. When satisfied, change status to **Published**

Or publish via API:
```bash
curl -s -X PUT "$WP_SITE/wp-json/wp/v2/pages/$PAGE_ID" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"status": "publish"}'
```

---

## Useful API Commands Reference

```bash
# List all pages
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/pages?per_page=50&_fields=id,title,status,slug,link"

# Get a specific page's content
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/pages/123"

# List media library
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/media?per_page=10&_fields=id,title,source_url"

# Check current user permissions
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE/wp-json/wp/v2/users/me"

# Get site info
curl -s "$WP_SITE/wp-json/"
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| 401 Unauthorized | Bad credentials | Regenerate Application Password |
| 403 Forbidden | User lacks permissions | Ensure admin/editor role |
| 404 Not Found | REST API disabled | Check Settings → Permalinks, re-save |
| 500 Server Error | Server-side issue | Check WP error logs |
| HTML renders as text | Page builder active | Use Classic Editor for this page |
| Images broken | Local paths not replaced | Upload images first, use WP URLs |
| Yoast fields ignored | Yoast REST API disabled | Enable in Yoast → Settings → REST API |

---

## Next Steps After Setup

1. Create `deploy-to-wp.sh` automation script (see `DEPLOY-SCRIPT.md`)
2. Evaluate WordPress MCP servers for native Claude Code integration
3. Set up WP-CLI via SSH if hosting supports it
