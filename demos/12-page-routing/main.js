import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

initDemoShell({ title: 'Page Routing Transitions', category: 'transitions', tech: ['view-transitions-api', 'spa-routing'] });

const supportsVT = typeof document.startViewTransition === 'function';
const pages = ['home', 'about', 'work', 'contact'];
let currentPage = 'home';
let currentIndex = 0;

const navLinks = document.querySelectorAll('.nav-link');

function navigateTo(pageName) {
  if (pageName === currentPage) return;

  const newIndex = pages.indexOf(pageName);
  const goingForward = newIndex > currentIndex;

  const updateDOM = () => {
    // Hide current page
    document.getElementById(`page-${currentPage}`).classList.remove('active');

    // Show new page
    document.getElementById(`page-${pageName}`).classList.add('active');

    // Update nav
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    currentPage = pageName;
    currentIndex = newIndex;
  };

  if (supportsVT && !prefersReducedMotion()) {
    // Set direction class for CSS animation direction
    document.documentElement.classList.toggle('nav-back', !goingForward);

    document.startViewTransition(updateDOM);
  } else {
    updateDOM();
  }
}

// Nav click handlers
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// Handle hash-based navigation
function handleHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  if (pages.includes(hash)) {
    navigateTo(hash);
  }
}

window.addEventListener('hashchange', handleHash);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    const next = pages[Math.min(currentIndex + 1, pages.length - 1)];
    navigateTo(next);
    window.location.hash = next;
  } else if (e.key === 'ArrowLeft') {
    const prev = pages[Math.max(currentIndex - 1, 0)];
    navigateTo(prev);
    window.location.hash = prev;
  }
});
