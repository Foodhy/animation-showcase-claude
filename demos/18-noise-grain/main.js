import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

initDemoShell({ title: 'Noise & Grain Overlay', category: 'css-canvas', tech: ['svg-filter', 'canvas', 'css'] });

let reduced = prefersReducedMotion();
if (reduced) document.documentElement.classList.add('reduced-motion');

// Refs
const noiseOverlay = document.getElementById('noise-overlay');
const scanlinesOverlay = document.getElementById('scanlines-overlay');
const vignetteOverlay = document.querySelector('.vignette-overlay');
const grainCanvas = document.getElementById('grain-canvas');
const grainCtx = grainCanvas.getContext('2d');

// Canvas grain — tiny resolution, scaled up with pixelated rendering
const GRAIN_SIZE = 128;
grainCanvas.width = GRAIN_SIZE;
grainCanvas.height = GRAIN_SIZE;

let grainRAF;
let grainFrame = 0;

function renderGrain() {
  grainFrame++;
  // Only update every 3 frames for flickering effect
  if (grainFrame % 3 === 0) {
    const imageData = grainCtx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;     // R
      data[i+1] = v;   // G
      data[i+2] = v;   // B
      data[i+3] = 255; // A
    }
    grainCtx.putImageData(imageData, 0, 0);
  }
  grainRAF = requestAnimationFrame(renderGrain);
}

if (!reduced) {
  renderGrain();
}

// Toggle controls
function setupToggle(id, overlay) {
  const checkbox = document.getElementById(id);
  const update = () => overlay.classList.toggle('off', !checkbox.checked);
  checkbox.addEventListener('change', update);
  update();
}

setupToggle('tog-noise', noiseOverlay);
setupToggle('tog-grain', grainCanvas.parentElement);
setupToggle('tog-scanlines', scanlinesOverlay);
setupToggle('tog-vignette', vignetteOverlay);

// Motion preference
window.addEventListener('motion-preference', (e) => {
  reduced = e.detail.reduced;
  document.documentElement.classList.toggle('reduced-motion', reduced);
  if (reduced) {
    cancelAnimationFrame(grainRAF);
  } else {
    renderGrain();
  }
});
