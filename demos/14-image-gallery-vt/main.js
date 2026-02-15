import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

initDemoShell({ title: 'Image Gallery Transitions', category: 'transitions', tech: ['view-transitions-api', 'crossfade'] });

const supportsVT = typeof document.startViewTransition === 'function';
const heroImage = document.getElementById('hero-image');
const heroNumber = document.getElementById('hero-number');
const heroLabel = document.getElementById('hero-label');
const thumbs = document.querySelectorAll('.thumb');

let currentIndex = 0;

function selectImage(index) {
  if (index === currentIndex) return;

  const thumb = document.querySelector(`.thumb[data-index="${index}"]`);
  if (!thumb) return;

  const hue = thumb.dataset.hue;
  const label = thumb.dataset.label;
  const num = String(index + 1).padStart(2, '0');

  const updateDOM = () => {
    heroImage.style.setProperty('--hue', hue);
    heroNumber.textContent = num;
    heroLabel.textContent = label;

    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    currentIndex = index;
  };

  if (supportsVT && !prefersReducedMotion()) {
    document.startViewTransition(updateDOM);
  } else {
    updateDOM();
  }
}

// Click handlers
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    selectImage(parseInt(thumb.dataset.index, 10));
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    selectImage(Math.min(currentIndex + 1, thumbs.length - 1));
  } else if (e.key === 'ArrowLeft') {
    selectImage(Math.max(currentIndex - 1, 0));
  }
});
