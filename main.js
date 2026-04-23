/* ============================================================
   MOCKLY — Web Design & Development
   main.js
   ============================================================ */

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Staggered animation for child cards/steps/items
    const children = entry.target.querySelectorAll(
      '.service-card, .process-step, .portfolio-item'
    );

    children.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s, transform 0.6s';

      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      }, 100 + i * 80);
    });
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── NAV: shrink on scroll ── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.height     = '60px';
    nav.style.background = 'rgba(10, 22, 40, 0.92)';
  } else {
    nav.style.height     = '72px';
    nav.style.background = 'rgba(10, 22, 40, 0.75)';
  }
});


/* ── SMOOTH ANCHOR SCROLL (per link interni) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ── CONTACT FORM: validazione email base ── */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const input = contactForm.querySelector('input[type="email"]');
  const btn   = contactForm.querySelector('.btn-primary');

 btn.addEventListener('click', (e) => {
    e.preventDefault();

    const textarea = contactForm.querySelector('textarea');
    const message  = textarea ? textarea.value.trim() : '';
    const email    = input.value.trim();
    const valid    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      input.style.borderColor = '#c042f0';
      input.placeholder       = 'Inserisci un indirizzo valido';
      input.value             = '';
      setTimeout(() => {
        input.style.borderColor = '';
        input.placeholder       = 'La tua email';
      }, 2000);
      return;
    }

    // Successo (placeholder — collegare al backend/servizio email)
    btn.textContent        = 'Inviato ✓';
    btn.style.background   = '#1ec8f0';
    btn.style.pointerEvents = 'none';
    input.value            = '';
    input.placeholder      = 'Grazie! Ti risponderemo presto.';

    setTimeout(() => {
      btn.textContent         = 'Scrivici →';
      btn.style.background    = '';
      btn.style.pointerEvents = '';
      input.placeholder       = 'La tua email';
    }, 3500);
  });
}
