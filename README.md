# Javin Ahuja — Portfolio

A recruiter-optimized personal site: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion. Dark by default, fully static, all content driven from **one file**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender of every route
npm start
```

---

## 1. Edit one file

Everything — metadata, nav, sections, schema.org, sitemap, OG image — is generated from
[`content/portfolio.ts`](content/portfolio.ts). You should never need to touch a component
to change content.

| Field | Drives |
|---|---|
| `site.url` | Canonical URLs, sitemap, robots, schema.org. **Change this after your first deploy.** |
| `name`, `initials`, `title`, `subtitle` | Nav, hero, footer, favicon, OG card |
| `headline` | Hero H1 — the last two words get the gradient treatment |
| `valueProp` | Hero paragraph + `<meta description>` + OG description |
| `rotating` | Rotating line under the hero headline |
| `availability` | The green "open to roles" pill |
| `headshot` | `''` renders a monogram; set to `'/headshot.jpg'` after adding the file to `/public` |
| `resume` | Every résumé button, including the floating one |
| `socials` | Hero icons, contact list, footer, command palette, schema.org `sameAs` |
| `stats`, `whyHire` | The 10-second recruiter row + animated counters |
| `skills` | Skills section, hero ticker, SEO keywords |
| `experience` | Timeline (expandable cards) |
| `projects` | Project cards, architecture modals, `/projects/<slug>` case studies, sitemap |
| `education`, `certifications`, `achievements`, `testimonials`, `posts` | Their sections. **Delete an array to remove its block.** |
| `contact.formEndpoint` | Contact form target; empty falls back to a `mailto:` handoff |

### Placeholders to replace

Search the file for `TODO`. Currently:

- `site.url` — your real domain
- `projects[].links.github` — exact repo URLs (all default to your profile)
- `certifications` — one placeholder cert
- `achievements[2]` — placeholder hackathon entry
- `testimonials` — placeholder quote (ask a manager; delete the array until you have one)
- `posts[].href` — link to real posts, or delete the array
- `education[0].gpa` — add if it helps you
- `contact.formEndpoint` — Formspree/Basin endpoint
- `headshot` — add `/public/headshot.jpg`, then set the field

---

## 2. Structure

```
app/
  layout.tsx              Metadata, OG/Twitter tags, schema.org JSON-LD, theme script, chrome
  page.tsx                Section order
  globals.css             Design tokens (light + dark), glass/card/button primitives
  not-found.tsx           Custom 404
  icon.tsx                Generated favicon (monogram on gradient)
  opengraph-image.tsx     Generated 1200×630 social card
  robots.ts / sitemap.ts  SEO files
  projects/[slug]/page.tsx  Statically generated case-study pages
components/
  Nav.tsx                 Glass nav, scroll-spy pill, mobile sheet, skip link
  Chrome.tsx              Scroll progress, animated cursor, loading screen, back-to-top, résumé FAB
  CommandPalette.tsx      ⌘K palette + global shortcuts (G/L/E/R/T/?)
  ThemeToggle.tsx         Dark/light with localStorage persistence + no-flash inline script
  Aurora.tsx              Animated gradient background
  ArchitectureDiagram.tsx Data-driven flow diagram
  Footer.tsx
  sections/               Hero, Experience, Projects, Skills, About, Education, More, Contact
  ui/                     Section, Reveal, Counter, Modal, Icon
content/portfolio.ts      ← all content
lib/utils.ts
public/                   Résumé PDF, headshot, project images
```

## 3. Interactions

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Command palette (sections, projects, links, actions) |
| `G` / `L` / `E` | GitHub / LinkedIn / Email |
| `R` | Résumé · `T` Theme · `?` Shortcuts |

Plus: expandable experience cards, architecture modals, screenshot galleries, tilting
project cards, animated counters, testimonial carousel, scroll progress, back-to-top,
and a résumé button pinned on every screen.

## 4. Performance & accessibility

- Every route is prerendered static HTML (`npm run build` shows `○`/`●` only) — no server work at request time.
- ~103 kB shared JS; framer-motion is the only runtime dependency.
- Colors are CSS variables, so theme switching costs no re-render.
- `prefers-reduced-motion` disables every animation, the cursor, and smooth scroll.
- Semantic landmarks, skip link, focus-visible rings, `aria-expanded`/`aria-modal`, focus-trapped dialogs, labeled icon buttons.
- The animated cursor only mounts on `pointer: fine` devices.

Run Lighthouse against the **production** server (`npm run build && npm start`), not `next dev`.

## 5. Deploy

### Vercel (recommended)

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). No env
vars, no build config — the defaults are correct.

After the domain is live:
1. Set `site.url` in `content/portfolio.ts` to that domain and redeploy (fixes canonical URLs, sitemap, OG).
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
3. Check the social card at [opengraph.xyz](https://www.opengraph.xyz).

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

Netlify auto-detects Next.js. Build command `npm run build`, no publish dir override needed.

### Static export (GitHub Pages, S3, Cloudflare Pages)

Everything is already static except the image optimizer. Add to `next.config.mjs`:

```js
output: 'export',
images: { unoptimized: true },
```

Then `npm run build` writes `out/`. Note: `next/image` optimization and the generated
favicon/OG route still work with `output: 'export'`, but remote image optimization does not.

### Custom domain

Point an `A` record to your host, or `CNAME` `www` → `cname.vercel-dns.com`. Add the domain
in the host dashboard, then update `site.url`.

## 6. Before you send this to a recruiter

- [ ] Add `/public/headshot.jpg` and set `headshot`
- [ ] Replace every `TODO` in `content/portfolio.ts`
- [ ] Confirm `/public/Javin_Ahuja_Resume.pdf` is your latest résumé
- [ ] Set `site.url`, redeploy, verify the OG card
- [ ] Add project screenshots to `/public/projects` and set `projects[].image` / `screenshots`
- [ ] Get one real testimonial
- [ ] Lighthouse the production build on mobile

---

Built with Next.js, Tailwind CSS, and Framer Motion.
