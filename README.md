# SPCTA Industrial — Next.js + TypeScript + Framer Motion

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack
- **Next.js 15** — App Router
- **TypeScript** — strict mode
- **Framer Motion 11** — all scroll animations
- **CSS Modules** — component-scoped styles

## Project Structure
```
src/
├── app/
│   ├── layout.tsx      # Root layout + Sora font
│   ├── page.tsx        # Page composition
│   └── globals.css     # Brand tokens + global styles
├── components/
│   ├── ui/
│   │   ├── SiteHeader.tsx      # Sticky nav with scroll state
│   │   └── SiteHeader.module.css
│   └── sections/
│       ├── Hero.tsx            # Hero with canvas energy lines
│       ├── Hero.module.css
│       └── Sections.tsx        # All other sections
├── hooks/
│   └── useEnergyCanvas.ts      # Canvas particle animation hook
└── lib/
    └── animations.ts           # Framer Motion variants
```

## Animations
All scroll animations use Framer Motion `whileInView` with `once: true`.

Variants defined in `src/lib/animations.ts`:
- `fadeUp` — default section content
- `heroTitle` — hero headline with skew
- `stagger` / `staggerFast` — grid children
- `cardItem` — individual cards
- `slideLeft` / `slideRight` — two-column sections
- `scaleIn` — pull quotes and highlights

## Energy Line Canvas
The `useEnergyCanvas` hook runs a `requestAnimationFrame` loop drawing
bezier particle streams on a `<canvas>` positioned over each background image.
Flow paths are defined per-section in `src/hooks/useEnergyCanvas.ts`.

## Build
```bash
npm run build
npm start
```
