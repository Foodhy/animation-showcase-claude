import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

gsap.registerPlugin(ScrollTrigger);

// ── Demo shell ──
initDemoShell({
  title: 'Smooth Scroll Story',
  category: 'scroll',
  tech: ['gsap', 'lenis', 'scrolltrigger'],
});

// ── Lenis smooth scroll ──
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Respect reduced motion ──
const reduced = prefersReducedMotion();

if (reduced) {
  document.documentElement.classList.add('reduced-motion');
}

// ── Listen for toggle ──
window.addEventListener('motion-preference', (e) => {
  document.documentElement.classList.toggle('reduced-motion', e.detail.reduced);
  // Rebuild ScrollTrigger on toggle
  ScrollTrigger.refresh();
});

// ── Parallax layers ──
document.querySelectorAll('.section').forEach((section) => {
  const bg = section.querySelector('.layer-bg');
  const mid = section.querySelector('.layer-mid');

  if (bg && !reduced) {
    gsap.to(bg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  if (mid && !reduced) {
    gsap.to(mid, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
});

// ── Hero section entrance ──
const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

heroTl
  .to('.section-hero .eyebrow', {
    opacity: 1, y: 0, duration: reduced ? 0 : 0.8,
    delay: 0.3,
  })
  .to('.hero-title', {
    opacity: 1, y: 0, duration: reduced ? 0 : 1,
  }, '-=0.5')
  .to('.hero-sub', {
    opacity: 1, y: 0, duration: reduced ? 0 : 0.8,
  }, '-=0.6')
  .to('.scroll-hint', {
    opacity: 1, duration: reduced ? 0 : 0.6,
  }, '-=0.3');

// Set initial positions
if (!reduced) {
  gsap.set('.section-hero .eyebrow', { y: 20 });
  gsap.set('.hero-title', { y: 40 });
  gsap.set('.hero-sub', { y: 30 });
}

// ── Scroll-triggered reveals ──
document.querySelectorAll('.section:not(.section-hero)').forEach((section) => {
  const eyebrow = section.querySelector('.eyebrow');
  const heading = section.querySelector('.reveal-text');
  const body = section.querySelector('.reveal-body');
  const btn = section.querySelector('.btn-back');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    defaults: { ease: 'expo.out' },
  });

  if (eyebrow) {
    gsap.set(eyebrow, { y: reduced ? 0 : 20 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 });
  }

  if (heading) {
    gsap.set(heading, { y: reduced ? 0 : 50 });
    tl.to(heading, { opacity: 1, y: 0, duration: reduced ? 0 : 0.9 }, '-=0.4');
  }

  if (body) {
    gsap.set(body, { y: reduced ? 0 : 30 });
    tl.to(body, { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 }, '-=0.5');
  }

  if (btn) {
    gsap.set(btn, { y: reduced ? 0 : 20 });
    tl.to(btn, { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 }, '-=0.3');
  }
});

// ── Depth cards entrance ──
document.querySelectorAll('.depth-card').forEach((card, i) => {
  if (!reduced) {
    gsap.set(card, { y: 60, scale: 0.9 });
  }

  gsap.to(card, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: reduced ? 0 : 0.8,
    ease: 'back.out(1.4)',
    scrollTrigger: {
      trigger: '.section-depth',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
    delay: i * 0.15,
  });
});

// ── Floating ring rotation (continuous, subtle) ──
if (!reduced) {
  gsap.to('.ring-1', {
    rotation: 360,
    duration: 30,
    ease: 'none',
    repeat: -1,
  });

  gsap.to('.ring-2', {
    rotation: -360,
    duration: 25,
    ease: 'none',
    repeat: -1,
  });
}

// ── Fade scroll hint on scroll ──
ScrollTrigger.create({
  trigger: '.section-hero',
  start: 'top top',
  end: '20% top',
  onUpdate: (self) => {
    gsap.set('.scroll-hint', { opacity: 1 - self.progress * 3 });
  },
});
