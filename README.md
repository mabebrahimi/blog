# Ali Ebrahimi — Blog

A personal blog built with **Hugo** (Persian, right‑to‑left). All tooling runs in
**Docker**, so nothing needs to be installed on the host.

## Structure

```
content/          content (Markdown)
  posts/*.md         blog posts — one file per post
  now.md             the "Now" page (data lives in front matter)
  uses.md            the "Uses" page
  about.md           the "About" page
layouts/          Hugo templates (baseof, index, posts/, partials/)
static/           styles.css and main.js
hugo.toml         site config
public/           build output (git‑ignored — never edit by hand)
```

## Commands (all via Docker)

Build the site into `public/`:

```bash
docker run --rm -v "$PWD":/src -w /src hugomods/hugo:latest hugo --gc --minify
```

Dev server with live reload at <http://localhost:1313>:

```bash
docker run --rm -it -v "$PWD":/src -w /src -p 1313:1313 \
  hugomods/hugo:latest hugo server --bind 0.0.0.0
```

Preview the built output without Hugo:

```bash
cd public && python3 -m http.server 8080
```

## Adding a post

Create a file at `content/posts/<slug>.md`. The filename becomes the URL
(`/posts/<slug>/`), so keep it lowercase with hyphens.

```markdown
---
title: "The Persian title of the post"
date: 2026-07-15
category: "محصول"          # محصول | برنامه‌نویسی | هوش مصنوعی
dateFa: "تیر ۱۴۰۵"
readingTime: "۵ دقیقه"
excerpt: "One‑line summary shown on the home card and in the list."
---

The body, written in **Markdown**. Headings with `##`, lists with `-`,
block quotes with `>`.
```

Notes:

- The newest post (by `date`) automatically becomes the **featured** card on the
  home page; the rest fall into the list below it.
- `date` (Gregorian) is used only for **ordering**. What readers see is `dateFa`.

## Updating the "Now" page

In `content/now.md`, add a new item to the **top** of the `entries` list. The first
item becomes the current "now"; the others automatically move into the history
timeline.

## Deploying and updating

Push changes to publish (once a deploy pipeline is set up):

```bash
git add -A
git commit -m "post: <title>"
git push
```

## Notes

- **Newsletter** is currently a client‑side demo (this is a static site). To make it
  real, wire the form to a service or a small function.
- Colors, fonts, and theme live in `static/styles.css`; the theme variables are at
  the top of the file. The accent color is teal.
