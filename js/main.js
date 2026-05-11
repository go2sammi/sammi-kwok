// ===== Navbar scroll + active link =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
});

// ===== Mobile menu =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ===== Contact form =====
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(e.target) });
    const data = await res.json();
    if (data.success) {
      btn.textContent = 'Sent!';
      e.target.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
    } else {
      btn.textContent = 'Error – try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error – try again';
    btn.disabled = false;
  }
});

// ===== Works filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems  = document.querySelectorAll('.work-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workItems.forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
  });
});

// ===== Lightbox =====
const lightbox        = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxTitle   = document.getElementById('lightboxTitle');
const lightboxBody    = document.getElementById('lightboxBody');

function openLightbox(src, type, title) {
  lightboxTitle.textContent = title;
  lightboxBody.innerHTML = '';

  if (type === 'image') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    lightboxBody.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.src = src; video.controls = true; video.autoplay = true;
    video.style.cssText = 'max-width:100%;max-height:75vh;';
    lightboxBody.appendChild(video);
  } else if (type === 'youtube') {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    lightboxBody.appendChild(iframe);
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    lightboxBody.appendChild(iframe);
  }

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxBody.innerHTML = '';
  document.body.style.overflow = '';
}

workItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item.dataset.src, item.dataset.type, item.dataset.title));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== Scroll fade-in =====
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.skill-category, .timeline-item, .award-card').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});
