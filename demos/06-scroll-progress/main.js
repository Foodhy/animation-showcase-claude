import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

gsap.registerPlugin(ScrollTrigger);

initDemoShell({ title: 'Scroll Progress Indicators', category: 'scroll', tech: ['gsap', 'scrolltrigger', 'svg'] });

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const reduced = prefersReducedMotion();
if (reduced) document.documentElement.classList.add('reduced-motion');

// Refs
const topFill = document.querySelector('.progress-top-fill');
const circleFill = document.querySelector('.progress-circle .fill');
const pctText = document.getElementById('progress-pct');
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('.section');
const circumference = 2 * Math.PI * 20; // r=20

// Overall page progress
ScrollTrigger.create({
  trigger: document.body,
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    const p = self.progress;

    // Top bar
    topFill.style.transform = `scaleX(${p})`;

    // Circle
    const offset = circumference * (1 - p);
    circleFill.style.strokeDashoffset = offset;

    // Percentage text
    pctText.textContent = `${Math.round(p * 100)}%`;
  },
});

// Per-section triggers for dots
sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveDot(i),
    onEnterBack: () => setActiveDot(i),
  });
});

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// Dot click → scroll to section
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.section, 10);
    const target = sections[idx];
    if (target) {
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    }
  });
});

// Intro animation
if (!reduced) {
  gsap.set('.section[data-index="0"] .eyebrow', { opacity: 0, y: 20 });
  gsap.set('.section[data-index="0"] h1', { opacity: 0, y: 40 });
  gsap.set('.section[data-index="0"] .body-text', { opacity: 0, y: 25 });

  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .to('.section[data-index="0"] .eyebrow', { opacity: 1, y: 0, duration: 0.7, delay: 0.3 })
    .to('.section[data-index="0"] h1', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('.section[data-index="0"] .body-text', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
}

// Section content reveals
sections.forEach((section, i) => {
  if (i === 0) return;
  const h = section.querySelector('h2');
  const p = section.querySelector('.body-text');

  if (!reduced && h) {
    gsap.set(h, { opacity: 0, y: 40 });
    gsap.to(h, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
      scrollTrigger: { trigger: section, start: 'top 70%' } });
  }
  if (!reduced && p) {
    gsap.set(p, { opacity: 0, y: 25 });
    gsap.to(p, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: section, start: 'top 65%' } });
  }
});
