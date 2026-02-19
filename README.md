# stealthisdesign — Web Animation Showcase

> **View, explore, and modify any project to your liking** — A curated gallery of web animation demos. All open source — fork and customize.

A curated gallery of **48 self-contained animation demos** covering scroll choreography, 3D/WebGL scenes, View Transitions API, CSS/Canvas effects, and full-page experiences. Built with GSAP, Three.js, Lenis, and modern web standards. Anyone can view each project and modify it to their taste.

**[Live Gallery](http://localhost:5173)** · **[GitHub Repo](https://github.com/Foodhy/animation-showcase-claude)**

---

## Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| **Vite** | 6.1 | Dev server + bundler for complex demos |
| **GSAP** | 3.12 | Scroll-driven animations, timelines, SplitText, ScrambleText, FLIP |
| **Lenis** | 1.1 | Smooth scrolling, integrated with GSAP ticker |
| **Three.js** | 0.171 | 3D scenes, shaders, post-processing (bloom) |
| **View Transitions API** | Native | Page transitions, shared-element morphs |
| **Canvas 2D** | Native | Particle systems, grain, bokeh, waveform effects |

---

## Architecture

This project uses a **hybrid Vite/static approach**:

- **Vite-bundled demos** (38): Have a `.vite-demo` marker file. Use `import` statements for npm packages (GSAP, Three.js, Lenis). Vite auto-discovers them via `vite.config.js`.
- **Static demos** (10): Pure HTML/CSS/JS with no build step. Served directly by Vite's dev server as static files.

```
stealthisdesign/
├── index.html              # Gallery hub — filterable grid of all demos
├── package.json            # Vite + gsap + lenis + three
├── vite.config.js          # Multi-page auto-discovery via .vite-demo markers
├── shared/
│   ├── a11y.js             # prefers-reduced-motion detection + toggle
│   ├── colors.js           # Cinematic dark palette (JS object)
│   ├── motion-tokens.js    # GSAP durations, easings, stagger presets
│   ├── demo-shell.js       # Back-link, motion toggle, info bar injection
│   └── demo-shell.css      # Fixed overlay chrome styles
├── demos/
│   ├── registry.json       # Metadata for all 48 demos
│   ├── 01-scroll-story/    # Each demo: index.html + main.js + styles.css
│   ├── ...
│   ├── 35-gamedev-portfolio/
│   ├── 36-scroll-linked-counters/
│   ├── 37-gradient-text-scroll/
│   ├── 38-parallax-depth-cards/
│   ├── 39-velocity-scroll-effect/
│   ├── 40-svg-workflow-animation/
│   ├── 41-data-dashboard/
│   ├── 42-interactive-case-study/
│   ├── 43-premium-velocity-experience/
│   ├── 44-restaurant-fine-dining/
│   ├── 45-fitness-brand/
│   ├── 46-real-estate/
│   ├── 47-music-platform/
│   └── 48-photography-portfolio/
├── .gitignore
├── README.md
├── CLAUDE.md               # Agent memory for future Claude sessions
├── AGENTS.md               # AI agent instructions
└── skill.md                # Project skill knowledge
```

---

## Demos (48)

### Scroll Animations (11)

| # | Demo | Tech | Bundler |
|---|------|------|---------|
| 01 | **Smooth Scroll Story** | GSAP, Lenis, ScrollTrigger | Vite |
| 02 | **Horizontal Scroll Gallery** | GSAP, Lenis, ScrollTrigger | Vite |
| 03 | **Text Reveal on Scroll** | GSAP, SplitText, ScrollTrigger | Vite |
| 04 | **Pinned Scroll Sections** | GSAP, ScrollTrigger, Pin | Vite |
| 05 | **Card Stack Cascade** | GSAP, ScrollTrigger, Perspective | Vite |
| 06 | **Scroll Progress Indicators** | GSAP, Lenis, SVG | Vite |
| 36 | **Scroll-Linked Number Counters** | GSAP, ScrollTrigger, TextPlugin | Vite |
| 37 | **Gradient Text Hue Shift** | GSAP, ScrollTrigger, CSS Variables | Vite |
| 38 | **Parallax Depth Card Grid** | GSAP, ScrollTrigger, CSS 3D | Vite |
| 39 | **Velocity-Aware Scroll + Speed Lines** | Lenis, GSAP, Canvas 2D | Vite |
| 40 | **SVG Workflow Animation** | GSAP, ScrollTrigger, SVG stroke-dasharray | Vite |

### 3D / WebGL (6)

| # | Demo | Tech | Bundler |
|---|------|------|---------|
| 07 | **Particle Tunnel** | Three.js, Custom Shaders, Bloom | Vite |
| 08 | **3D Product Showcase** | Three.js, PBR Material, Orbit | Vite |
| 09 | **Shader Background** | Three.js, GLSL, Simplex Noise | Vite |
| 10 | **Interactive 3D Mouse Scene** | Three.js, InstancedMesh, Raycaster | Vite |
| 21 | **Scroll Camera Narrative** | Three.js, GSAP, Lenis, ScrollTrigger | Vite |
| 22 | **3D Product Spotlight** | Three.js, GSAP, Lenis, ScrollTrigger | Vite |

### View Transitions (4)

| # | Demo | Tech | Bundler |
|---|------|------|---------|
| 11 | **Card Grid Transition** | View Transitions API, CSS | Static |
| 12 | **Page Routing Transitions** | View Transitions API, SPA Routing | Static |
| 13 | **Theme Transition** | View Transitions API, Clip-Path | Static |
| 14 | **Image Gallery Transitions** | View Transitions API, Crossfade | Static |

### CSS / Canvas (6)

| # | Demo | Tech | Bundler |
|---|------|------|---------|
| 15 | **Bokeh Particle Hero** | Canvas 2D, Mouse Parallax | Static |
| 16 | **Magnetic Cursor** | Spring Physics, Mouse Tracking | Static |
| 17 | **Spotlight Reveal** | CSS Mask, Mouse Tracking | Static |
| 18 | **Noise & Grain Overlay** | SVG Filter, Canvas, CSS | Static |
| 19 | **Staggered Grid Entrance** | IntersectionObserver, CSS Keyframes | Static |
| 20 | **Morphing Blobs** | CSS Border-Radius, SVG Path, Canvas Bezier | Static |

### Full Pages (21)

| # | Demo | Tech | Bundler |
|---|------|------|---------|
| 23 | **Product Landing Page** | Three.js, GSAP, Lenis, SplitText, ScrollTrigger | Vite |
| 24 | **AI Engineer Portfolio** | Canvas 2D, GSAP, ScrambleText, Lenis, ScrollTrigger | Vite |
| 25 | **Travel Editorial** | GSAP, FLIP, Lenis, ScrollTrigger, View Transitions | Vite |
| 26 | **Travel Experience** | Three.js, GSAP, Lenis, ScrollTrigger, ScrambleText | Vite |
| 27 | **Blog Magazine** | GSAP, Lenis, SplitText, View Transitions | Vite |
| 28 | **SaaS Landing Page** | GSAP, Lenis, ScrollTrigger, SplitText | Vite |
| 29 | **E-commerce Shop** | GSAP, FLIP, Lenis, View Transitions, ScrollTrigger | Vite |
| 30 | **Software Engineer Portfolio** | GSAP, Lenis, ScrollTrigger, SplitText | Vite |
| 31 | **UX/UI Designer Portfolio** | GSAP, Lenis, ScrollTrigger, SplitText, View Transitions | Vite |
| 32 | **Tech Lead Portfolio** | Three.js, GSAP, Lenis, ScrollTrigger, SplitText | Vite |
| 33 | **AI Research Engineer Portfolio** | Three.js, GSAP, Lenis, ScrollTrigger, ScrambleText, Canvas 2D | Vite |
| 34 | **Multimedia Engineer Portfolio** | GSAP, FLIP, Canvas 2D, Lenis, ScrollTrigger | Vite |
| 35 | **Game Developer Portfolio** | Canvas 2D, GSAP, Lenis, View Transitions, CSS Animation | Vite |
| 41 | **Data Dashboard** | GSAP, Canvas 2D, ScrollTrigger, Lenis, TextPlugin | Vite |
| 42 | **Interactive Case Study** | GSAP, ScrollTrigger, SVG, FLIP, Lenis | Vite |
| 43 | **Premium Velocity Experience** | Three.js, Lenis, GSAP, Canvas 2D, Velocity | Vite |
| 44 | **Fine Dining Restaurant** | GSAP, SplitText, Lenis, ScrollTrigger, Playfair Display | Vite |
| 45 | **Fitness Brand** | GSAP, Lenis, ScrollTrigger, Barlow Condensed | Vite |
| 46 | **Real Estate — Light Minimal** | GSAP, Lenis, ScrollTrigger, Fraunces, Inter | Vite |
| 47 | **FREQ — Music Platform** | GSAP, Lenis, Canvas 2D, Space Mono | Vite |
| 48 | **Photography Portfolio** | GSAP, Lenis, ScrollTrigger, EB Garamond, Geist Mono | Vite |

---

## Getting Started

```bash
# Install dependencies (uses bun)
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

The gallery opens at `http://localhost:5173`. Click any demo card to view it.

---

## Accessibility

Every demo in this project respects user motion preferences:

- **`prefers-reduced-motion`**: Detected on load via `shared/a11y.js`. All animations disable when the OS preference is set.
- **Motion Toggle**: Each demo includes a "Disable Motion" / "Enable Motion" button (top-right corner) that dispatches a `motion-preference` CustomEvent.
- **Decorative elements**: All canvases and SVGs used for decoration have `aria-hidden="true"`.
- **High contrast**: Text uses `#f0f4fb` on `#070a12` (17.4:1 contrast ratio).
- **Keyboard navigation**: ESC returns to gallery from any demo.

---

## About the Model

### Claude Opus 4.6

This entire project — every HTML file, every JavaScript module, every CSS animation, every GLSL shader — was generated by **Claude Opus 4.6**, Anthropic's most capable AI model.

Claude Opus 4.6 is a frontier AI model built by [Anthropic](https://anthropic.com). It excels at:

- **Code generation**: Writing production-quality code across multiple languages and frameworks
- **Architecture design**: Planning project structures, choosing appropriate patterns, and organizing complex codebases
- **Creative implementation**: Translating high-level design descriptions into working animations, shaders, and interactive experiences
- **Multi-file coordination**: Maintaining consistency across 100+ interconnected files with shared utilities and conventions

The project was built through iterative conversation: the user described the desired animation showcase, and Claude designed the architecture, selected the libraries, wrote all the code, and verified each demo's functionality — entirely through natural language prompts.

No code in this repository was hand-written by a human developer.

---

## License

MIT
