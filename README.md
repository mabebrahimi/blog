# بلاگِ علی ابراهیمی

سایتِ استاتیک با **Hugo**؛ همه‌ی ابزارها داخلِ **Docker** اجرا می‌شوند (روی هاست چیزی نصب نمی‌شود).

## ساختار

```
content/          محتوا (Markdown)
  posts/*.md        نوشته‌ها — هر فایل یک پست
  now.md            صفحه‌ی «الان» (داده در frontmatter)
  uses.md           صفحه‌ی «ابزارها»
  about.md          صفحه‌ی «درباره»
layouts/          قالب‌های Hugo (baseof, index, posts/, partials/)
static/           styles.css و main.js
hugo.toml         کانفیگ
public/           خروجیِ بیلد (gitignore — دستی نساز)
```

## دستورها (همه با Docker)

بیلدِ نهایی → داخلِ `public/`:

```bash
docker run --rm -v "$PWD":/src -w /src hugomods/hugo:latest hugo --gc --minify
```

سرورِ توسعه با live-reload روی <http://localhost:1313> :

```bash
docker run --rm -it -v "$PWD":/src -w /src -p 1313:1313 \
  hugomods/hugo:latest hugo server --bind 0.0.0.0
```

پیش‌نمایشِ خروجیِ بیلد (بدونِ Hugo):

```bash
cd public && python3 -m http.server 8080
```

## افزودنِ یک پستِ جدید

یک فایلِ `content/posts/<slug>.md` بساز:

```markdown
---
title: "عنوانِ نوشته"
date: 2026-07-10
category: "محصول"          # محصول | برنامه‌نویسی | هوش مصنوعی
dateFa: "تیر ۱۴۰۵"
readingTime: "۵ دقیقه"
excerpt: "یک جمله خلاصه که در کارت و لیست دیده می‌شود."
---

متنِ نوشته با **Markdown**. عنوان‌ها با `##`، لیست با `-`، نقل‌قول با `>`.
```

جدیدترین پست (بر اساس `date`) خودکار «پستِ ویژه»ی صفحه‌ی اصلی می‌شود و URLش `‎/posts/<slug>/` است.

## به‌روزرسانیِ «الان»

در `content/now.md`، یک آیتمِ جدید به **ابتدای** لیستِ `entries` اضافه کن؛ اولی «الانِ فعلی» می‌شود و بقیه خودکار می‌روند توی تاریخچه.

## نکته‌ها

- **خبرنامه** فعلاً دموی سمتِ کلاینت است (سایت استاتیک است). برای واقعی‌شدن، فرم را به یک سرویس یا فانکشنِ کوچک وصل کن.
- رنگ/فونت/تم در `static/styles.css`؛ متغیرهای تم بالای فایل. اکسنت = تیل.
