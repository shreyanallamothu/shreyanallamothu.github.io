const cursorCaption = document.getElementById('cursorCaption');

document.querySelectorAll('.photo-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursorCaption.textContent = item.dataset.caption;
    cursorCaption.classList.add('visible');
  });

  item.addEventListener('mousemove', e => {
    cursorCaption.style.left = e.clientX + 'px';
    cursorCaption.style.top = e.clientY + 'px';
  });

  item.addEventListener('mouseleave', () => {
    cursorCaption.classList.remove('visible');
  });
});
