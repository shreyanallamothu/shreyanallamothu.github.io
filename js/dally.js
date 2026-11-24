const objectScene = document.querySelector('.dally-objects');
const dallyObjects = [...objectScene.querySelectorAll('.dally-object-group img')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const clampProgress = (value) => Math.max(0, Math.min(1, value));
let pendingFrame = 0;

function updateObjectScene() {
  pendingFrame = 0;
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const sceneTop = objectScene.getBoundingClientRect().top + scrollTop;
  const animationStart = Math.max(80, sceneTop - viewportHeight * 0.6);
  const progress = reducedMotion.matches
    ? 1
    : clampProgress((scrollTop - animationStart) / (viewportHeight * 0.38));
  const overlap = clampProgress(progress * 2);
  const reveal = clampProgress(progress * 2 - 1);
  const firstLeft = dallyObjects[0].offsetLeft;
  const shifts = dallyObjects.map((item) => (firstLeft - item.offsetLeft) * overlap * 0.3);

  dallyObjects.forEach((item, index) => {
    item.style.setProperty('--object-shift', `${shifts[index]}px`);
  });
  objectScene.style.setProperty('--headline-shift', `${shifts.at(-1)}px`);
  objectScene.style.setProperty('--reveal-opacity', reveal);
  objectScene.style.setProperty('--card-shift', `${(1 - reveal) * 48}px`);
}

function scheduleObjectSceneUpdate() {
  if (!pendingFrame) {
    pendingFrame = window.requestAnimationFrame(updateObjectScene);
  }
}

objectScene.classList.add('dally-scroll-scene');
window.addEventListener('scroll', scheduleObjectSceneUpdate, { passive: true });
window.addEventListener('resize', scheduleObjectSceneUpdate);
reducedMotion.addEventListener('change', scheduleObjectSceneUpdate);
updateObjectScene();
