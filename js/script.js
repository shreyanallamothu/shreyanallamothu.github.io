document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const editableHero = document.querySelector('.editable-hero');
  if (editableHero) {
    const defaultHTML = editableHero.innerHTML;

    editableHero.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });

    editableHero.addEventListener('blur', () => {
      if (!editableHero.textContent.trim()) {
        editableHero.innerHTML = defaultHTML;
      }
    });
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      const note = form.querySelector('.form-note');
      if (note) note.textContent = "Thanks — I'll get back to you soon!";
    });
  }
});
