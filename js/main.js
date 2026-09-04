// Theme toggle
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const setPressed = () => {
    toggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
  };
  setPressed();

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    setPressed();
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Experience cards — click title or diagram to expand
(function () {
  document.querySelectorAll('.case.tl-item').forEach((card) => {
    const btn = card.querySelector('.case__toggle');
    const diagram = card.querySelector('.case__diagram-wrap');
    const toggle = () => {
      const open = card.classList.toggle('is-open');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    if (btn) btn.addEventListener('click', toggle);
    if (diagram) diagram.addEventListener('click', toggle);
  });
})();

// Live São Paulo clock
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);
  el.textContent = `[ ${parts} ]`;
}
updateClock();
setInterval(updateClock, 15000);

// Scroll reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ericsson diagram — hub lights up only when the small dot arrives
(function () {
  if (reduceMotion) return;
  const svg = document.getElementById('ericssonDot') && document.getElementById('ericssonDot').closest('svg');
  const dot = document.getElementById('ericssonDot');
  const hub = document.getElementById('ericssonHub');
  if (!svg || !dot || !hub) return;

  const HUB_X = 191, HUB_Y = 110, THRESHOLD = 10;

  function tick() {
    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width > 0) {
      const scaleX = svgRect.width / 300;
      const scaleY = svgRect.height / 220;
      const r = dot.getBoundingClientRect();
      const dotX = (r.left + r.width / 2 - svgRect.left) / scaleX;
      const dotY = (r.top + r.height / 2 - svgRect.top) / scaleY;
      const dist = Math.hypot(dotX - HUB_X, dotY - HUB_Y);
      if (dist < THRESHOLD) {
        hub.style.fill = 'var(--teal)';
        hub.style.r = '9.5';
      } else {
        hub.style.fill = '';
        hub.style.r = '';
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// Signal waveform — bars light up as the traveling dots pass over them
(function () {
  if (reduceMotion) return;
  const wrap = document.querySelector('.about__signal');
  const svg = wrap && wrap.querySelector('svg');
  const dotWine = document.getElementById('signalDotWine');
  const dotBlue = document.getElementById('signalDotBlue');
  if (!svg || !dotWine || !dotBlue) return;

  const bars = Array.from(wrap.querySelectorAll('.signal-bar')).map((bar) => ({
    el: bar,
    x: parseFloat(bar.getAttribute('x1')),
  }));
  const THRESHOLD = 40;

  function dotX(dot, svgRect, scale) {
    const r = dot.getBoundingClientRect();
    return (r.left + r.width / 2 - svgRect.left) / scale;
  }

  function tick() {
    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width > 0) {
      const scale = svgRect.width / 1000;
      const wineX = dotX(dotWine, svgRect, scale);
      const blueX = dotX(dotBlue, svgRect, scale);
      bars.forEach(({ el, x }) => {
        const dw = Math.abs(x - wineX);
        const db = Math.abs(x - blueX);
        if (dw < THRESHOLD && dw <= db) {
          el.style.stroke = 'var(--wine)';
        } else if (db < THRESHOLD) {
          el.style.stroke = 'var(--blue)';
        } else {
          el.style.stroke = '';
        }
      });
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// Ambient drifting dots — decorative, cheap CSS-driven motion
(function () {
  const field = document.getElementById('ambient');
  if (!field || reduceMotion) return;
  const COUNT = 10;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.setProperty('--dx', `${(Math.random() * 160 - 80).toFixed(0)}px`);
    dot.style.setProperty('--dy', `${(Math.random() * 160 - 80).toFixed(0)}px`);
    dot.style.animationDuration = `${(16 + Math.random() * 14).toFixed(1)}s`;
    dot.style.animationDelay = `${(-Math.random() * 20).toFixed(1)}s`;
    frag.appendChild(dot);
  }
  field.appendChild(frag);
})();

// Cursor accent dot — desktop / hover-capable pointers only
(function () {
  const dot = document.getElementById('cursorDot');
  if (!dot || reduceMotion || !window.matchMedia('(hover: hover)').matches) return;

  let active = false;
  window.addEventListener('mousemove', (e) => {
    dot.style.setProperty('--cx', `${e.clientX}px`);
    dot.style.setProperty('--cy', `${e.clientY}px`);
    if (!active) { dot.classList.add('is-active'); active = true; }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('is-active');
    active = false;
  });

  const HOVER_TARGETS = 'a, button, .aperture-nodes circle, .case__diagram-wrap';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_TARGETS)) dot.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_TARGETS)) dot.classList.remove('is-hovering');
  });
})();

// Side nav — highlight the section currently in view
(function () {
  const dots = document.querySelectorAll('.side-nav__dot');
  if (!dots.length) return;

  const items = Array.from(dots)
    .map((dot) => ({ dot, section: document.getElementById(dot.dataset.section) }))
    .filter((item) => item.section);
  if (!items.length) return;

  const setActive = (id) => {
    dots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.section === id));
  };

  const update = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      setActive(items[items.length - 1].dot.dataset.section);
      return;
    }
    const centerY = window.innerHeight / 2;
    let current = items[0];
    items.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= centerY) current = item;
    });
    setActive(current.dot.dataset.section);
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
