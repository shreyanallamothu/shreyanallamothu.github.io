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

const materialsSection = document.querySelector('.dally-materials-section');
const materialButtons = [...materialsSection.querySelectorAll('.dally-materials button')];

function selectMaterial(selected) {
  materialButtons.forEach((button) => {
    const isSelected = button === selected;
    button.setAttribute('aria-pressed', String(isSelected));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !isSelected;
  });
}

materialButtons.forEach((button) => {
  button.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') selectMaterial(button);
  });
  button.addEventListener('focus', () => selectMaterial(button));
  button.addEventListener('click', () => selectMaterial(button));
});

const setupSteps = document.querySelector('.dally-setup-steps');
let activeStep;

function showSetupStep(step) {
  if (step === activeStep) return;

  if (activeStep) {
    activeStep.querySelector('.dally-step-animation').remove();
    activeStep.setAttribute('aria-pressed', 'false');
    activeStep = null;
  }

  if (!step) return;

  const animation = new Image();
  animation.className = 'dally-step-animation';
  animation.alt = '';
  animation.src = step.dataset.animation;
  step.querySelector('.dally-phone').append(animation);
  step.setAttribute('aria-pressed', 'true');
  activeStep = step;
}

setupSteps.querySelectorAll('.dally-step-toggle').forEach((step) => {
  step.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') showSetupStep(step);
  });
  step.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && activeStep === step) showSetupStep(null);
  });
  step.addEventListener('click', (event) => {
    if (event.pointerType !== 'mouse' || event.detail === 0) {
      showSetupStep(activeStep === step ? null : step);
    }
  });
});

if ('IntersectionObserver' in window) {
  const stepObserver = new IntersectionObserver((entries) => {
    if (!entries.some(({ isIntersecting }) => isIntersecting)) return;

    const grid = setupSteps.getBoundingClientRect();
    const centerX = grid.left + grid.width / 2;
    const centerY = grid.top + grid.height / 2;
    const steps = [...setupSteps.children];
    const bounds = steps.map((step) => step.getBoundingClientRect());

    steps.forEach((step, index) => {
      const { left, top, width, height } = bounds[index];
      step.style.setProperty('--step-start-x', `${centerX - left - width / 2}px`);
      step.style.setProperty('--step-start-y', `${centerY - top - height / 2}px`);
      step.style.setProperty('--step-delay', `${index * 50}ms`);
      step.classList.add('dally-step-enter');
    });
    stepObserver.disconnect();
  }, { threshold: 0.15 });

  stepObserver.observe(setupSteps);
}
