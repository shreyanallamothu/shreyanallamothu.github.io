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

  const tocLinks = document.querySelectorAll('.case-toc a');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const personaGrid = document.querySelector('.persona-grid');
  const personaPrev = document.querySelector('.persona-arrow-prev');
  const personaNext = document.querySelector('.persona-arrow-next');
  if (personaGrid && personaPrev && personaNext) {
    const scrollByCard = (direction) => {
      const card = personaGrid.querySelector('.persona-card');
      const gap = parseFloat(getComputedStyle(personaGrid).gap) || 0;
      const distance = card ? card.getBoundingClientRect().width + gap : personaGrid.clientWidth;
      personaGrid.scrollBy({ left: distance * direction, behavior: 'smooth' });
    };

    personaPrev.addEventListener('click', () => scrollByCard(-1));
    personaNext.addEventListener('click', () => scrollByCard(1));
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

  const cursorCaption = document.getElementById('cursorCaption');
  const copyEmailBtn = document.querySelector('.footer-copy-email');
  if (cursorCaption && copyEmailBtn) {
    const defaultCaption = copyEmailBtn.dataset.caption || 'copy email';

    copyEmailBtn.addEventListener('mouseenter', () => {
      cursorCaption.textContent = defaultCaption;
      cursorCaption.classList.add('visible');
    });

    copyEmailBtn.addEventListener('mousemove', (e) => {
      cursorCaption.style.left = e.clientX + 'px';
      cursorCaption.style.top = e.clientY + 'px';
    });

    copyEmailBtn.addEventListener('mouseleave', () => {
      cursorCaption.classList.remove('visible');
    });

    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyEmailBtn.dataset.email);
      cursorCaption.textContent = 'copied!';
      setTimeout(() => {
        cursorCaption.textContent = defaultCaption;
      }, 1200);
    });
  }
});
