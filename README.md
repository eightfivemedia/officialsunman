# officialsunman.com

Marketing site for **Sun-Man** — the first Black action figure with his own
storyline, created in 1985 by Yla Eason and reintroduced by Mattel as part of
Masters of the Universe.

Built with Next.js 15 (App Router), React 19, Tailwind CSS and TypeScript.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/                 routes, metadata, sitemap + robots
components/          UI
lib/
  data.ts            hand-maintained site content (nav, timeline, retailers)
  press.ts           generated — press articles
  videos.ts          generated — YouTube videos
  gallery.ts         generated — gallery images
  seo.ts             canonical origin, routes, JSON-LD
public/img/          all imagery (nothing is hotlinked)
assets-src/          source masters the shipped assets are derived from
tools/               asset + content pipelines
```

## Content pipelines

Content comes from Webflow CSV exports. Both scripts download every image
locally — the site never hotlinks a remote host.

```bash
python3 tools/import-content.py       # press, videos, gallery -> lib/*.ts
python3 tools/process-hero-frames.py  # hero turnaround -> public/img/hero-turn
```

`import-content.py` reads the CSV exports from `~/Downloads` and writes both the
data files and the optimised WebP images.

`process-hero-frames.py` keys the white backdrop out of the turnaround footage
and exports the scroll-scrubbed frame sequence. See the docstring for why that
source is preferred over the alpha master.

## Notes

- **Images are local.** The original Webflow CDN blocks hotlinking (403 on every
  asset), so everything is downloaded and re-encoded at import time.
- **Nothing depends on JS to be visible.** Scroll reveals hide content only
  behind a `.js` class set at runtime, so a hydration failure can't leave a
  section blank.
- **`SITE_URL` in `lib/seo.ts`** is the single source of truth for canonicals,
  the sitemap, robots and structured data.

---

Site designed by [EightFive Media](https://eightfivemedia.com).
