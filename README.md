# Carl Dela Pena — Portfolio

Personal portfolio for Carl Dela Pena. UI/UX designer and frontend engineer, final-year CS + IT student at the University of Auckland. Motion-led, dark-by-default, with a violet accent and a focus on real case studies.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first `@theme`)
- **Animation**: Motion (Framer Motion successor), GSAP available, Lenis smooth scroll
- **3D / Shader**: React Three Fiber + Three.js (custom GLSL gradient hero)
- **Fonts**: Instrument Serif (display), Inter (sans), JetBrains Mono (mono) via `next/font`

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel (free)

1. Initialise git, commit, and push to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "init"
   gh repo create carl-final-portfolio --public --source=. --push
   ```
   (or push manually after creating the repo on github.com)
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Framework is auto-detected as Next.js.
3. Click Deploy. Default URL is `carl-final-portfolio.vercel.app`.
4. Optional custom domain: project settings → domains → add. Vercel handles the SSL cert; just point a CNAME from your registrar.

## Where to put real content

| What | Where |
|---|---|
| Real photos | `public/images/<category>/` (see below) |
| Hero / availability copy | `components/sections/Hero.tsx` |
| About paragraphs + stats | `components/sections/About.tsx` |
| Real projects | `content/projects.ts` (8 case studies live here) |
| Experience timeline | `components/sections/Experience.tsx` |
| Travel + interests | `components/sections/Interests.tsx` |
| Email + LinkedIn | `components/sections/Contact.tsx` |
| Skills marquee | `components/sections/Skills.tsx` |

## Images

Drop images into `public/images/` organised by category:

```
public/images/
  portrait/      # for the About section sticky card
  travel/        # for the Interests travel carousel
  football/      # interests / playground reuse
  projects/      # case study screenshots
  misc/          # everything else
```

Anything in `public/` is served at `/images/...` automatically. Recommended: ~1600px wide, JPEG/WebP, ~85% quality. Compress with [tinypng.com](https://tinypng.com) before committing.

When images are ready, wire them into:
- `About.tsx` — sticky portrait card (currently gradient placeholder)
- `Interests.tsx` — each `travelClips[]` entry can swap the gradient for a `next/image`
- Case study pages — `CaseStudy.tsx` has three placeholder figure slots

## Accessibility & performance

- `prefers-reduced-motion` respected — loader skips, Lenis disables, animations soften.
- Custom cursor hidden on touch devices.
- WebGL canvas capped at `dpr={[1, 1.5]}`.
- Shader is `next/dynamic({ ssr: false })` to keep the server bundle clean.
