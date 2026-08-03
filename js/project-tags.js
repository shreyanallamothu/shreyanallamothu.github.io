const cursorCaption = document.getElementById('cursorCaption');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursorCaption.textContent = card.dataset.caption || '';
    cursorCaption.classList.add('visible');
  });

  card.addEventListener('mousemove', e => {
    cursorCaption.style.left = e.clientX + 'px';
    cursorCaption.style.top = e.clientY + 'px';
  });

  card.addEventListener('mouseleave', () => {
    cursorCaption.classList.remove('visible');
  });
});
