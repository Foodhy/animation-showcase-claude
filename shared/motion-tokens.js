export const durations = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.4,
  epic: 2.2,
};

export const easings = {
  smoothOut: 'power2.out',
  snap: 'power4.out',
  elastic: 'elastic.out(1, 0.5)',
  anticipation: 'back.out(1.7)',
  cinematic: 'expo.out',
  bounce: 'bounce.out',
};

export const stagger = {
  fast: { each: 0.04 },
  normal: { each: 0.08 },
  slow: { each: 0.15 },
  cascade: { each: 0.12, from: 'start' },
  center: { each: 0.08, from: 'center' },
};
