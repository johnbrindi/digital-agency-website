'use strict';

// -- HEADER SCROLL EFFECT --
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// -- MOBILE NAV TOGGLE --
const navToggle = document.getElementById('navToggle');
const navList   = document.getElementById('navList');
navToggle.addEventListener('click', () => navList.classList.toggle('open'));
navList.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => navList.classList.remove('open'))
);

// -- COUNT-UP ANIMATION --
const countEls = document.querySelectorAll('.stat__num[data-count]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = +el.dataset.count;
    const step   = Math.ceil(target / 60);
    let current  = 0;
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 25);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObserver.observe(el));

// -- SCROLL REVEAL --
const revealTargets = [
  '.service-card', '.work-card', '.team-card', '.testi-card',
  '.about__content', '.about__visual', '.hero__content', '.hero__visual'
];
document.querySelectorAll(revealTargets.join(',')).forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// -- PORTFOLIO FILTER --
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity       = match ? '1' : '0.2';
      card.style.transform     = match ? 'scale(1)' : 'scale(0.95)';
      card.style.transition    = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.pointerEvents = match ? 'all' : 'none';
    });
  });
});

// -- CONTACT FORM --
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#43E97B,#38F9D7)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3500);
});

// -- ACTIVE NAV ON SCROLL --
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? '#fff' : '';
  });
}, { passive: true });
