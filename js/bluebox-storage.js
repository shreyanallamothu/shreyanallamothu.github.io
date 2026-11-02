// Progress from the initial notes to the architecture as the reader scrolls.
(() => {
  const sequence = document.querySelector('.bluebox-architecture');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!sequence) return;
  let queued = false;
  const update = () => {
    queued = false;
    sequence.classList.toggle('is-animated', !reducedMotion.matches);
    if (reducedMotion.matches) return;
    const header = document.querySelector('.site-header');
    const top = (header ? header.getBoundingClientRect().height : 94) + 16;
    sequence.style.setProperty('--diagram-top', `${top}px`);
    const bounds = sequence.getBoundingClientRect();
    const stage = sequence.querySelector('.bluebox-architecture-stage');
    const distance = Math.max(1, bounds.height - stage.getBoundingClientRect().height);
    const position = Math.max(0, Math.min(1, (top - bounds.top) / distance));
    // Hold the notes first, crossfade, then hold the finished architecture.
    const progress = Math.max(0, Math.min(1, (position - 0.2) / 0.6));
    sequence.style.setProperty('--diagram-progress', progress);
  };
  const scheduleUpdate = () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  reducedMotion.addEventListener('change', scheduleUpdate);
  update();
})();
