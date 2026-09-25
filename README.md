# Chad Mortensen — Product Design Leadership Portfolio

A portfolio of product strategy, design leadership, and measurable outcomes across health tech, eCommerce, and omnichannel experiences.

**Live site:** [uxtips.com](https://uxtips.com)

## About

This site presents the work and leadership approach of Chad Mortensen, a product design leader with 25+ years of experience. It combines in-depth case studies with principles for building strong teams, raising design quality, and connecting human-centered design to business strategy.

The portfolio is also a working product: responsive, content-driven, and built to support ongoing iteration.

## What’s Included

- Four case studies covering product vision, fulfillment strategy, registry growth, and design leadership
- Career experience spanning Brightside Health, Etsy, Walmart, and Sam’s Club
- Leadership principles and the value design can bring across an organization
- A weather-aware hero that adapts its imagery to current conditions in Portland, Oregon
- A reusable case-study component library and portfolio design system
- A local-only MDX editor for updating case-study content
- An interactive UX tip generator

## Featured Case Studies

| Case study | Organization | Route |
| --- | --- | --- |
| Turning Fragmented Growth Efforts Into a Shared Product Vision | Brightside Health | [View case study](https://uxtips.com/case-study-3) |
| Turning Fulfillment Roadmaps Into a Shared Strategy | Etsy | [View case study](https://uxtips.com/case-study-2) |
| Leading a Rapid Registry Turnaround That Increased Quality Creations by 28% | Walmart | [View case study](https://uxtips.com/case-study-1) |
| How I Lead: Raising Quality, Growing People, and Scaling Design | Leadership examples | [View examples](https://uxtips.com/case-study-4) |

## Experience Highlights

The portfolio includes leadership work across:

- **Brightside Health** — Head of Product Design
- **Etsy** — Director of Product Design for Fulfillment, Search, and Ads
- **Walmart eCommerce** — Senior design leadership across fulfillment, grocery delivery, consumables, registry, and fashion
- **Sam’s Club** — Mobile apps, in-store digital tools, and B2B experiences

## Technology

- React 18 and TypeScript
- Vite with SWC
- React Router
- Tailwind CSS
- shadcn/ui and Radix UI
- MDX for case-study content
- MDXEditor for local visual editing
- TanStack Query
- Lucide icons
- Open-Meteo for current Portland weather
- Cloudflare configuration for deployment

Routes and case-study pages are lazy-loaded to keep the initial experience focused and lightweight.

## Project Structure

```text
content/
  case-studies/        MDX source files for portfolio stories

data/
  hero-weather-backgrounds.json
  ux-tips.json

public/
  img/                 Portfolio and case-study media

src/
  components/          Homepage sections and shared UI
    case-study/        Reusable case-study layouts and content blocks
    ui/                shadcn/ui primitives
  pages/               Portfolio, case-study, editor, and design-system routes
  App.tsx               Application routes and providers

vite.config.ts         Vite, MDX, and local editor configuration
wrangler.jsonc         Cloudflare configuration
```

## Run Locally

### Prerequisites

- Node.js
- npm

### Setup

```sh
git clone https://github.com/chadmortensen/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server on port 8080 |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Editing Case Studies

Case-study content lives in `content/case-studies/` as MDX. It can be edited directly or through the visual editor available during local development:

```text
http://localhost:8080/case-study-1/edit
http://localhost:8080/case-study-2/edit
http://localhost:8080/case-study-3/edit
http://localhost:8080/case-study-4/edit
```

The editor reads and writes the source MDX files through a development-only Vite endpoint restricted to local requests. Editor routes are excluded from production builds.

## Design System

A living component and style reference is available at:

- Local: [http://localhost:8080/ds](http://localhost:8080/ds)
- Production: [https://uxtips.com/ds](https://uxtips.com/ds)

It documents the visual language, UI primitives, typography, feedback patterns, and reusable case-study sections used throughout the portfolio.

## Approach

The site is built with the same principles represented in the work:

- Start with empathy and clear intent
- Connect design decisions to product and business outcomes
- Make complex information understandable
- Build reusable systems without losing craft
- Use technology—including AI-assisted tools—thoughtfully and with human judgment

---

Designed and built by [Chad Mortensen](https://uxtips.com).
