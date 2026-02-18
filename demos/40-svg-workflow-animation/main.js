import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

gsap.registerPlugin(ScrollTrigger);

initDemoShell({ title: 'SVG Workflow Animation', category: 'scroll', tech: ['gsap', 'scrolltrigger', 'svg', 'stroke-dasharray'] });

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const reduced = prefersReducedMotion();
if (reduced) document.documentElement.classList.add('reduced-motion');

// Hero entrance
if (!reduced) {
  gsap.set('.hero .eyebrow', { opacity: 0, y: 20 });
  gsap.set('.hero h1', { opacity: 0, y: 40 });
  gsap.set('.hero .subtitle', { opacity: 0, y: 25 });

  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .to('.hero .eyebrow', { opacity: 1, y: 0, duration: 0.7, delay: 0.3 })
    .to('.hero h1', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('.hero .subtitle', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
}

// SVG path drawing — core technique
const connectLines = document.querySelectorAll('.connect-line');

connectLines.forEach((path) => {
  const length = path.getTotalLength();

  // Set up stroke-dasharray for drawing effect
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });

  if (!reduced) {
    // Draw the line as user scrolls through the workflow section
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.workflow-section',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1.5,
      },
    });
  } else {
    // Show immediately for reduced motion
    gsap.set(path, { strokeDashoffset: 0 });
  }
});

// Node reveals — staggered sequentially as scroll progresses
const nodeOrder = [
  { id: '#node-1', label: '#label-1', delay: 0 },
  { id: '#node-2', label: '#label-2', delay: 0.15 },
  { id: '#node-3a', label: '#label-3a', delay: 0.25 },
  { id: '#node-3b', label: '#label-3b', delay: 0.25 },
  { id: '#node-4', label: '#label-4', delay: 0.4 },
];

nodeOrder.forEach(({ id, label, delay }) => {
  const node = document.querySelector(id);
  const labelEl = document.querySelector(label);
  if (!node) return;

  if (!reduced) {
    gsap.to(node, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.workflow-section',
        start: `top ${70 - delay * 20}%`,
        toggleActions: 'play none none reverse',
      },
    });

    if (labelEl) {
      gsap.to(labelEl, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.workflow-section',
          start: `top ${68 - delay * 20}%`,
          toggleActions: 'play none none reverse',
        },
      });
      gsap.set(labelEl, { x: 10 });
    }
  } else {
    gsap.set(node, { opacity: 1 });
    if (labelEl) gsap.set(labelEl, { opacity: 1 });
  }
});

// Colour pulse on nodes after reveal (ambient animation)
if (!reduced) {
  ScrollTrigger.create({
    trigger: '.workflow-section',
    start: 'top 30%',
    onEnter: () => {
      const circles = document.querySelectorAll('.node circle');
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          r: 40,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    },
  });
}

// Details section reveals
document.querySelectorAll('.details-section h2, .details-section h3, .details-section p, .details-section ol').forEach((el) => {
  if (!reduced) {
    gsap.set(el, { opacity: 0, y: 20 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
    });
  }
});

document.querySelectorAll('.details-section ol li').forEach((li, i) => {
  if (!reduced) {
    gsap.set(li, { opacity: 0, x: -15 });
    gsap.to(li, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'expo.out',
      delay: i * 0.08,
      scrollTrigger: { trigger: li, start: 'top 75%', toggleActions: 'play none none reverse' },
    });
  }
});

// Motion preference listener
window.addEventListener('motion-preference', (e) => {
  if (e.detail.reduced) {
    gsap.globalTimeline.paused(true);
  } else {
    gsap.globalTimeline.paused(false);
  }
});
