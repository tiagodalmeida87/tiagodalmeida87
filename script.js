/* ============================================================
   TIAGO ALMEIDA — PORTFÓLIO
   script.js — Interações, animações e efeitos
   ============================================================ */

// ── Cursor personalizado ─────────────────────────────────────
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }
});

// Seguidor suave (RAF loop)
function animateFollower() {
  if (cursorFollower) {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Ativa efeito hover no cursor para links e botões
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('active');
    cursorFollower?.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('active');
    cursorFollower?.classList.remove('active');
  });
});


// ── Navbar: scroll + links ativos ───────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Adiciona classe .scrolled após 50px
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Destaca o link ativo baseado na seção visível
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    if (window.scrollY > 600) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  }
});


// ── Hamburger Menu (mobile) ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu?.classList.toggle('open');
});

// Fecha menu ao clicar em um link
navLinksMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinksMenu?.classList.remove('open');
  });
});


// ── Back to top ──────────────────────────────────────────────
document.getElementById('backTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── Typewriter effect ────────────────────────────────────────
const phrases = [
  'Analista de Dados',
  'Em transição para Engenharia de Dados',
  'SQL | Python | ETL',
  'Power BI | Data Pipelines',
  'Transformando dados em valor',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingSpeed = 75;

const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  if (!typewriterEl) return;

  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2200; // pausa no final da frase
    } else {
      typingSpeed = 75 + Math.random() * 40; // variação natural
    }
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // pausa antes da próxima frase
    } else {
      typingSpeed = 40;
    }
  }

  setTimeout(typeWriter, typingSpeed);
}

typeWriter();


// ── Partículas flutuantes no Hero ────────────────────────────
const particlesContainer = document.getElementById('hero-particles');

const dataSymbols = [
  '{ }', '[ ]', 'SQL', 'ETL', 'df', 'plt', 'pd', '</>',
  '01', '∑', '→', '↗', '◈', '▲', '◆', '⬡', '0x', 'fn()',
];

function createParticle() {
  if (!particlesContainer) return;

  const p = document.createElement('div');
  p.className = 'particle';

  const size     = 6 + Math.random() * 10;
  const isSymbol = Math.random() > 0.5;

  if (isSymbol) {
    p.textContent  = dataSymbols[Math.floor(Math.random() * dataSymbols.length)];
    p.style.cssText = `
      position: absolute;
      font-family: 'JetBrains Mono', monospace;
      font-size: ${7 + Math.random() * 6}px;
      color: rgba(56, 189, 248, ${0.1 + Math.random() * 0.25});
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 10}s;
      border-radius: 0;
    `;
  } else {
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(56, 189, 248, ${0.04 + Math.random() * 0.12});
      border: 1px solid rgba(56, 189, 248, ${0.05 + Math.random() * 0.15});
      left: ${Math.random() * 100}%;
      animation-duration: ${10 + Math.random() * 18}s;
      animation-delay: ${Math.random() * 12}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
  }

  particlesContainer.appendChild(p);

  // Remove e recria partícula ao terminar animação
  p.addEventListener('animationend', () => {
    p.remove();
    createParticle();
  });
}

// Cria partículas iniciais
const PARTICLE_COUNT = 30;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  setTimeout(createParticle, Math.random() * 5000);
}


// ── AOS (Animate On Scroll) — implementação leve ─────────────
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.aosDelay ? parseInt(el.dataset.aosDelay) : 0;

        setTimeout(() => {
          el.classList.add('aos-visible');
        }, delay);

        aosObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

aosElements.forEach(el => aosObserver.observe(el));


// ── Animação das barras de skill ──────────────────────────────
const pillFills = document.querySelectorAll('.pill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

pillFills.forEach(fill => skillObserver.observe(fill));


// ── Smooth scroll para links internos ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── Efeito parallax suave no hero ────────────────────────────
const heroGrid = document.querySelector('.hero-grid');

window.addEventListener('scroll', () => {
  if (heroGrid) {
    const scrolled = window.scrollY;
    heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});


// ── Tilt 3D leve nos cards de projeto ────────────────────────
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const tiltX  = dy * -5;
    const tiltY  = dx *  6;

    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(.16,1,.3,1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s linear';
  });
});


// ── Contador animado nas stats do hero ───────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start    = performance.now();

  if (isNaN(target)) {
    // Para valores não numéricos (ex: "∞"), apenas exibe
    el.textContent = target + suffix;
    return;
  }

  function update(currentTime) {
    const elapsed  = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = Math.floor(eased * target);
    el.textContent = value + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(update);
}

const heroStats = document.querySelector('.hero-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
      const text   = el.textContent.trim();
      const number = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');

      if (!isNaN(number)) {
        animateCounter(el, number, suffix);
      }
    });
  }
}, { threshold: 0.5 });

if (heroStats) statsObserver.observe(heroStats);


// ── Efeito de glitch no nome (hero) ao hover ─────────────────
const heroName = document.querySelector('.hero-name');

heroName?.addEventListener('mouseenter', () => {
  heroName.style.animation = 'none';

  let iterations = 0;
  const chars    = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01';
  const original = heroName.innerHTML;
  const nameEl   = heroName.querySelector('.name-accent');
  const nameText = nameEl ? nameEl.textContent : '';

  if (!nameEl || !nameText) return;

  const interval = setInterval(() => {
    nameEl.textContent = nameText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (i < iterations) return nameText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    iterations += 1 / 3;
    if (iterations >= nameText.length) {
      clearInterval(interval);
      nameEl.textContent = nameText;
    }
  }, 40);
});


// ── Log de boas-vindas no console ────────────────────────────
console.log(
  '%c👋 Olá, dev curioso!\n%cEste portfólio foi construído com HTML, CSS e JavaScript puro.\nConheça os projetos de Tiago Almeida em:\nhttps://github.com/tiagodalmeida87',
  'color: #38bdf8; font-family: monospace; font-size: 14px; font-weight: bold;',
  'color: #94a3b8; font-family: monospace; font-size: 12px;'
);
