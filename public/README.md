# /public — assets to add

| File | Purpose | Status |
|---|---|---|
| `Javin_Ahuja_Resume.pdf` | Every résumé button | ✅ present (copied from Desktop — replace when you update it) |
| `headshot.jpg` | Hero photo. Square, ≥640×640, face centered. After adding, set `headshot: '/headshot.jpg'` in `content/portfolio.ts`. | ⬜ missing (monogram renders instead) |
| `projects/<slug>.png` | Project card covers, 1600×900. Set `projects[].image`. | ⬜ optional (generated gradient covers used) |
| `projects/<slug>-1.png` | Screenshot gallery images. Set `projects[].screenshots`. | ⬜ optional |
| `logos/<company>.svg` | Company logos in the timeline. Set `experience[].logo`. | ⬜ optional (initials tiles used) |

The favicon and the 1200×630 social card are **generated** from `app/icon.tsx` and
`app/opengraph-image.tsx` — no files needed.
