import { createMotionToggle } from './a11y.js';

export function initDemoShell({ title, category, tech = [] }) {
  // Back link
  const back = document.createElement('a');
  back.href = '/';
  back.className = 'demo-shell-back';
  back.textContent = '\u2190 Gallery';
  document.body.appendChild(back);

  // Motion toggle
  createMotionToggle(document.body);

  // Info bar
  const info = document.createElement('div');
  info.className = 'demo-shell-info';
  info.innerHTML = `
    <span class="demo-title">${title}</span>
    <span class="demo-tag">${category}</span>
    ${tech.map(t => `<span class="demo-tag">${t}</span>`).join('')}
  `;
  document.body.appendChild(info);

  // Escape key returns to gallery
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.location.href = '/';
  });

  // Load shell styles
  if (!document.querySelector('link[href*="demo-shell.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/shared/demo-shell.css';
    document.head.appendChild(link);
  }
}
