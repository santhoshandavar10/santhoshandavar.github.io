// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.classList.remove('open');
  });
});

// Profile photo fallback
const heroPhoto = document.getElementById('heroPhoto');
const heroFallback = document.getElementById('heroFallback');
if (heroPhoto) {
  if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
    heroFallback.classList.add('hidden');
  } else {
    heroPhoto.addEventListener('load', () => heroFallback.classList.add('hidden'));
    heroPhoto.addEventListener('error', () => {
      heroPhoto.style.display = 'none';
      heroFallback.style.display = 'flex';
    });
  }
}

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.08 }
);
document.querySelectorAll([
  '.project-card', '.timeline-content', '.contact-item', '.contact-form',
  '.about-text', '.skills-wrap', '.edu-card', '.certs-card',
  '.expertise-card', '.hero-stats'
].join(',')).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  observer.observe(el);
});

// Contact form → mailto
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Hi Santhosh,\n\nName: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:santhoshandavar2@gmail.com?subject=${subject}&body=${body}`;
  note.textContent = 'Opening your email client…';
  setTimeout(() => { note.textContent = ''; form.reset(); }, 3000);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          const active = a.getAttribute('href') === `#${e.target.id}`;
          a.classList.toggle('nav-active', active);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));
