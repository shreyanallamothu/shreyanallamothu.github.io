(function () {
  const collage = document.querySelector('.about-collage');
  if (!collage) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isScattered = window.matchMedia('(min-width: 1401px)').matches;
  if (prefersReducedMotion || !isScattered) return;

  const items = Array.from(collage.querySelectorAll('.photo-item'));
  const collageRect = collage.getBoundingClientRect();
  const centerX = collageRect.width / 2;
  const centerY = collageRect.height / 2;

  items.forEach(item => {
    const dx = centerX - (item.offsetLeft + item.offsetWidth / 2);
    const dy = centerY - (item.offsetTop + item.offsetHeight / 2);

    item.style.transition = 'none';
    item.style.transform = `translate(${dx}px, ${dy}px) scale(0.35) rotate(0deg)`;
    item.style.opacity = '0';
  });

  void collage.offsetHeight;

  requestAnimationFrame(() => {
    items.forEach((item, i) => {
      const delay = i * 0.05;
      item.style.transition = `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.6s ease ${delay}s`;
      item.style.transform = '';
      item.style.opacity = '';
    });

    setTimeout(() => {
      items.forEach(item => {
        item.style.transition = '';
      });
    }, 1600);
  });
})();
