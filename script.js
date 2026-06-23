/* ═══════════════════════════════════════════════
   PORTFOLIO SCRIPT — Sagarika Daripa
═══════════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

/* ── Scroll Progress Bar ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled   = (window.scrollY / docHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

/* ── Back to Top ── */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 80);
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Typing Animation ── */
const typingEl   = document.getElementById('typing-text');
const phrases    = [
  'Senior Ruby on Rails Developer',
  'Full Stack Engineer',
  'SaaS Product Builder',
  'API Design Specialist',
  'ML Enthusiast',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];
  const speed   = isDeleting ? 40 : 80;

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimer = setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimer = setTimeout(type, 400);
      return;
    }
  }
  typingTimer = setTimeout(type, speed);
}

setTimeout(type, 1500);

/* ── Particle Canvas ── */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#FF4FA3', '#FF7EB6', '#FFD6E7', '#6B2D5C', '#cc3380'];
const COUNT  = 80;

class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x   = Math.random() * canvas.width;
    this.y   = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.r   = Math.random() * 2.5 + 0.5;
    this.vx  = (Math.random() - 0.5) * 0.4;
    this.vy  = -(Math.random() * 0.5 + 0.2);
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.pulse = Math.random() * Math.PI * 2;
  }

  update() {
    this.x     += this.vx;
    this.y     += this.vy;
    this.pulse += 0.02;
    this.alpha  = (Math.sin(this.pulse) * 0.2 + 0.3);
    if (this.y < -10) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.color;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particles = Array.from({ length: COUNT }, () => new Particle());

// Connecting lines between close particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 100) * 0.08;
        ctx.strokeStyle = '#FF4FA3';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

let animFrame;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animate);
}
animate();

// Pause animation when hero is off screen (performance)
const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    if (!animFrame) animate();
  } else {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }
}, { threshold: 0 });
heroObserver.observe(heroSection);

/* ── Mouse parallax on particles ── */
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  });
});

/* ── Skill card ripple effect ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const rect   = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,79,163,0.2);
      width: 0; height: 0;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { width: 200px; height: 200px; opacity: 0; }
  }
`;
document.head.appendChild(style);

/* ── Number counter animation for hero stats ── */
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step  = target / 40;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    const nums = document.querySelectorAll('.stat-num');
    nums.forEach(num => {
      const text = num.textContent.trim();
      if (text === '5+') animateCount(num, 5, '+');
      if (text === '3')  animateCount(num, 3);
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
