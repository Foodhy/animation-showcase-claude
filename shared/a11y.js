const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
let _reduced = mql.matches;

mql.addEventListener('change', (e) => { _reduced = e.matches; });

export function prefersReducedMotion() {
  return _reduced;
}

export function reducedDuration(normalDuration) {
  return _reduced ? 0 : normalDuration;
}

export function setReducedMotion(value) {
  _reduced = value;
  document.documentElement.classList.toggle('reduced-motion', _reduced);
  window.dispatchEvent(new CustomEvent('motion-preference', { detail: { reduced: _reduced } }));
}

export function createMotionToggle(container) {
  const btn = document.createElement('button');
  btn.className = 'motion-toggle';
  btn.setAttribute('aria-label', 'Toggle motion');
  btn.textContent = _reduced ? 'Enable Motion' : 'Disable Motion';
  btn.addEventListener('click', () => {
    setReducedMotion(!_reduced);
    btn.textContent = _reduced ? 'Enable Motion' : 'Disable Motion';
  });
  container.appendChild(btn);
  return btn;
}
