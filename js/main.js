'use strict';

/* ══════════════════════════════════════════════════════
   Veera Annapureddy — Portfolio JavaScript
   Typing effect · Navbar · Animations · Particles
══════════════════════════════════════════════════════ */

/* ── TYPING EFFECT ── */
const strings = [
  'scalable backend systems.',
  'distributed data pipelines.',
  'event-driven architectures.',
  'clean, reliable APIs.',
  'things that matter.',
];
let si = 0, ci = 0, del = false;

function type() {
  const el = document.getElementById('typed');
  if (!el) return;
  const s = strings[si];
  if (!del) {
    el.textContent = s.slice(0, ++ci);
    if (ci === s.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = s.slice(0, --ci);
    if (ci === 0) { del = false; si = (si + 1) % strings.length; }
  }
  setTimeout(type, del ? 45 : 80);
}
setTimeout(type, 900);

/* ── NAVBAR SCROLL ── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 20);
}, { passive: true });

/* ── MOBILE HAMBURGER ── */
const hbtn  = document.getElementById('hamburger');
const nlinks = document.getElementById('nav-links');

if (hbtn && nlinks) {
  hbtn.addEventListener('click', () => {
    const open = nlinks.classList.toggle('open');
    const spans = hbtn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    }
  });

  // Close menu when a nav link is clicked
  nlinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nlinks.classList.remove('open');
      hbtn.querySelectorAll('span').forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    });
  });
}

/* ── SCROLL REVEAL ANIMATIONS ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-anim]').forEach(el => revealObserver.observe(el));

/* ── FLOATING PARTICLES (hero) ── */
const pc = document.getElementById('particles');
if (pc) {
  const cols = [
    'rgba(99,102,241,0.6)',
    'rgba(34,211,238,0.5)',
    'rgba(244,114,182,0.4)',
    'rgba(129,140,248,0.5)',
  ];
  for (let i = 0; i < 28; i++) {
    const p   = document.createElement('div');
    p.className = 'particle';
    const sz  = Math.random() * 4 + 1;
    const col = cols[i % cols.length];
    Object.assign(p.style, {
      width:             sz + 'px',
      height:            sz + 'px',
      left:              Math.random() * 100 + '%',
      background:        col,
      boxShadow:         `0 0 ${sz * 2}px ${col}`,
      animationDuration: (Math.random() * 15 + 8) + 's',
      animationDelay:    (Math.random() * 10) + 's',
    });
    pc.appendChild(p);
  }
}

/* ── COUNT-UP ANIMATION ── */
document.querySelectorAll('[data-count]').forEach(el => {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const end = +el.dataset.count;
      const suf = el.textContent.replace(/\d/g, '');
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + end / 60, end);
        el.textContent = Math.floor(cur) + suf;
        if (cur >= end) clearInterval(t);
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 1 });
  countObserver.observe(el);
});

/* ── CURSOR GLOW (desktop only) ── */
if (!window.matchMedia('(hover: none)').matches) {
  const g = document.createElement('div');
  g.style.cssText = [
    'position:fixed',
    'width:300px',
    'height:300px',
    'border-radius:50%',
    'pointer-events:none',
    'z-index:0',
    'background:radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)',
    'transform:translate(-50%,-50%)',
    'transition:opacity .4s',
    'opacity:0',
  ].join(';');
  document.body.appendChild(g);

  let mx = 0, my = 0, gx = 0, gy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; g.style.opacity = '1'; });
  window.addEventListener('mouseleave', () => { g.style.opacity = '0'; });

  (function anim() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    g.style.left = gx + 'px';
    g.style.top  = gy + 'px';
    requestAnimationFrame(anim);
  })();
}
