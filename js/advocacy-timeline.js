(() => {
  const items = [...document.querySelectorAll('.timeline-item')];
  if (!items.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const stops = items.map((item) => {
    const stop = document.createElement('div');
    stop.className = 'timeline-stop';
    item.before(stop);
    stop.append(item);
    return stop;
  });
  let queued = false;
  const update = () => {
    queued = false;
    const top = (header ? header.getBoundingClientRect().height : 0) + 16;
    stops.forEach((stop, index) => {
      const height = items[index].getBoundingClientRect().height;
      // Long entries stay in normal flow so all of their text remains readable.
      const pin = !reducedMotion.matches && height <= window.innerHeight - top - 24;
      stop.classList.toggle('is-pinned', pin);
      stop.style.setProperty('--timeline-top', `${top}px`);
      if (pin) {
        stop.style.height = `${height + Math.max(240, window.innerHeight * 0.65)}px`;
      } else {
        stop.style.removeProperty('height');
      }
    });
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  const observer = new ResizeObserver(schedule);
  items.forEach((item) => observer.observe(item));
  if (header) observer.observe(header);
  document.fonts.ready.then(schedule);
  update();
})();
