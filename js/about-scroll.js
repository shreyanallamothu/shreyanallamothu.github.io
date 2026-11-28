(function () {
  const intro = document.querySelector('.about-intro');
  const heading = intro.querySelector('.about-heading');
  const phrases = heading.querySelectorAll('span');
  const header = document.querySelector('.site-header');
  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  let frame;

  function render() {
    frame = undefined;
    if (!motion.matches) {
      intro.classList.remove('scroll-reveal');
      return;
    }

    intro.classList.add('scroll-reveal');

    const top = header.offsetHeight + 24;
    const bounds = intro.getBoundingClientRect();
    const travel = bounds.height - heading.offsetHeight;
    const scrolled = Math.max(0, top - bounds.top);
    const secondPhraseStart = travel * 0.5;
    const introTop = bounds.top + window.scrollY;
    const viewportHeight = document.documentElement.clientHeight;
    const openingTop = Math.min(viewportHeight * 0.74, viewportHeight - phrases[0].offsetHeight - 24);
    const firstPhraseStart = Math.max(0, Math.min(secondPhraseStart, openingTop - introTop));

    // Each phrase stays at its starting point until the growing stack reaches it.
    phrases[0].style.setProperty('--phrase-offset', `${Math.min(0, Math.max(scrolled, firstPhraseStart) - travel)}px`);
    phrases[1].style.setProperty('--phrase-offset', `${Math.min(0, Math.max(scrolled, secondPhraseStart) - travel)}px`);
  }

  function schedule() {
    if (frame === undefined) frame = requestAnimationFrame(render);
  }

  render();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  motion.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(header);
})();
