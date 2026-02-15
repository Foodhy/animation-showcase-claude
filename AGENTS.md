# AGENTS.md — AI Agent Instructions

## Your Role

You are maintaining and extending a **web animation showcase** project. The project contains 20 self-contained animation demos organized into 4 categories, served via a Vite dev server with a filterable gallery hub.

## Architecture Quick Reference

- **Gallery hub**: `index.html` — renders demo cards from `demos/registry.json`
- **Shared utilities**: `shared/` — a11y, colors, motion tokens, demo shell
- **20 demos**: `demos/{id}/` — each has `index.html` + `main.js` + `styles.css`
- **Two demo types**: Vite-bundled (has `.vite-demo` marker, uses npm imports) and Static (no marker, vanilla JS)
- **Package manager**: `bun` (not npm)

## Rules

1. **Always use shared utilities** — Import from `shared/a11y.js`, `shared/colors.js`, `shared/motion-tokens.js`, `shared/demo-shell.js`. Don't duplicate their functionality.

2. **Always support reduced motion** — Every demo must:
   - Check `prefersReducedMotion()` on load
   - Listen for `motion-preference` CustomEvent
   - Have `.reduced-motion` CSS fallbacks
   - Decorative canvases/SVGs need `aria-hidden="true"`

3. **Always update the registry** — When adding/modifying demos, update `demos/registry.json` with correct metadata.

4. **Follow the file convention** — Every demo needs `index.html`, `main.js`, `styles.css`. Vite demos also need `.vite-demo` marker.

5. **Initialize the demo shell** — Every `main.js` must call:
   ```js
   import { initDemoShell } from '/shared/demo-shell.js';
   import { prefersReducedMotion } from '/shared/a11y.js';
   initDemoShell({ title: '...', category: '...', tech: ['...'] });
   ```

6. **No frameworks** — All demos use vanilla JavaScript with ES modules. The only npm dependencies are GSAP, Lenis, Three.js, and Vite.

## Code Style

- Vanilla JS, ES modules (`type: "module"`)
- CSS custom properties for theming (see `CLAUDE.md` for palette)
- Dark theme: light text on near-black backgrounds
- Font stack: `'Inter', 'SF Pro Display', system-ui, sans-serif`
- Minimal dependencies — prefer native APIs when possible

## Verification

After any change:

```bash
# Start dev server
bun run dev

# Check gallery loads
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/

# Check specific demo
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/demos/{demo-id}/

# Check registry is valid JSON
cat demos/registry.json | python3 -m json.tool > /dev/null
```

## Common Tasks

### Adding a new demo

1. Create `demos/{NN-name}/` with the 3 required files
2. Add `.vite-demo` if it needs npm imports
3. Call `initDemoShell()` in `main.js`
4. Implement reduced-motion support
5. Add entry to `demos/registry.json`
6. Verify at `http://localhost:5173/demos/{id}/`

### Modifying the gallery hub

- Edit `index.html` directly (inline `<style>` and `<script type="module">`)
- Cards are dynamically rendered from `registry.json`
- Filter buttons use `data-filter` attributes matching `category` values

### Updating shared utilities

- Changes to `shared/` affect all demos
- Test multiple demos after modifying shared files
- `a11y.js` dispatches `motion-preference` events — don't break this contract

## Category IDs

- `scroll` — Scroll-driven animations
- `3d` — Three.js/WebGL scenes
- `transitions` — View Transitions API
- `css-canvas` — CSS effects, Canvas 2D, SVG
