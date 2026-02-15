# CLAUDE.md — Agent Memory

This file provides context for future Claude sessions working on this project.

## Project Overview

**libs-genclaude** is a web animation showcase with 22 self-contained demos across 4 categories: scroll animations, 3D/WebGL, View Transitions, and CSS/Canvas effects. It serves as a reference library of animation techniques.

## Architecture

### Hybrid Vite/Static

- **Vite-bundled demos**: Contain a `.vite-demo` marker file. Use ES module `import` for npm packages (GSAP, Three.js, Lenis). Auto-discovered by `vite.config.js`.
- **Static demos**: No marker file. Pure HTML/CSS/JS, no imports. Served as-is by Vite dev server.
- Both types are accessible at `/demos/{demo-id}/`

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | Gallery hub — filterable demo grid with ambient canvas bg |
| `vite.config.js` | Multi-page Vite config, auto-discovers `.vite-demo` folders |
| `demos/registry.json` | Metadata for all 22 demos (id, title, category, tech, status) |
| `shared/a11y.js` | `prefersReducedMotion()`, `setReducedMotion()`, `createMotionToggle()` |
| `shared/colors.js` | `palette` object with all color tokens |
| `shared/motion-tokens.js` | GSAP `durations`, `easings`, `stagger` presets |
| `shared/demo-shell.js` | `initDemoShell()` — injects back-link, motion toggle, info bar |
| `shared/demo-shell.css` | Styles for the demo shell overlay elements |

### Demo File Structure

Every demo follows this pattern:
```
demos/{id}/
├── index.html      # Page markup, links to styles.css + demo-shell.css
├── main.js         # Logic, imports initDemoShell + prefersReducedMotion
├── styles.css      # Demo-specific styles
└── .vite-demo      # (optional) Marker for Vite bundling
```

## Package Manager

**Use `bun`**, not `npm`. The system has bun at `/Users/gregoryinnovo/.bun/bin/bun`.

```bash
bun install          # Install deps
bun run dev          # Start Vite dev server on :5173
bun run build        # Production build to dist/
```

## How to Add a New Demo

1. Create `demos/{NN-demo-name}/` with `index.html`, `main.js`, `styles.css`
2. If the demo needs npm imports (GSAP, Three.js, Lenis), create a `.vite-demo` marker file
3. In `main.js`, always:
   ```js
   import { initDemoShell } from '/shared/demo-shell.js';
   import { prefersReducedMotion } from '/shared/a11y.js';
   initDemoShell({ title: 'Demo Title', category: 'category-id', tech: ['tech-tags'] });
   ```
4. Always support `prefers-reduced-motion`:
   - Check `prefersReducedMotion()` on load
   - Listen for `window.addEventListener('motion-preference', handler)`
   - Add `.reduced-motion` CSS class handling
5. Add entry to `demos/registry.json` with all required fields
6. Verify with `bun run dev` — demo should be accessible at `/demos/{id}/`

## Color Palette

```
--bg: #070a12          --text: #f0f4fb
--panel: #121a2b       --muted: #8a95a8
--border: #263249      --accent: #86e8ff
--accent-warm: #ffcc66 --neon-pink: #ff40d6
                       --neon-purple: #ae52ff
```

## Integration Patterns

### GSAP + Lenis (scroll demos)
```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Three.js (3D demos)
```js
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
```

### View Transitions (transition demos)
```js
const supportsVT = typeof document.startViewTransition === 'function';
if (supportsVT && !prefersReducedMotion()) {
  document.startViewTransition(() => updateDOM());
} else {
  updateDOM();
}
```

## Categories

- `scroll` — GSAP + Lenis scroll-driven animations (6 demos)
- `3d` — Three.js WebGL scenes (6 demos)
- `transitions` — View Transitions API (4 demos)
- `css-canvas` — Pure CSS + Canvas 2D effects (6 demos)

## Dependencies

- `vite` ^6.1.0 (dev)
- `gsap` ^3.12.7
- `lenis` ^1.1.18
- `three` ^0.171.0
