document.querySelectorAll('.photo-item').forEach(item => {
  const img = item.querySelector('img');
  if (img) img.setAttribute('draggable', 'false');

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  item.addEventListener('pointerdown', (e) => {
    if (getComputedStyle(item).position !== 'absolute') return;

    dragging = true;
    item.setPointerCapture(e.pointerId);
    item.classList.add('dragging');

    startX = e.clientX;
    startY = e.clientY;
    startLeft = item.offsetLeft;
    startTop = item.offsetTop;
  });

  item.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    item.style.left = `${startLeft + (e.clientX - startX)}px`;
    item.style.top = `${startTop + (e.clientY - startY)}px`;
  });

  const stopDrag = () => {
    dragging = false;
    item.classList.remove('dragging');
  };

  item.addEventListener('pointerup', stopDrag);
  item.addEventListener('pointercancel', stopDrag);
});
