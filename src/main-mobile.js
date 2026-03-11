import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

// --- DOM ---
const wireCanvas = document.querySelector('#webgl');
const wireCtx = wireCanvas ? wireCanvas.getContext('2d') : null;
const title = document.querySelector('.title');
const siteLoader = document.querySelector('#site-loader');
const sceneCardsOverlay = document.querySelector('.scene-cards-overlay');
const sceneCards = sceneCardsOverlay ? Array.from(sceneCardsOverlay.querySelectorAll('.scene-card')) : [];
const scrollPhraseOverlay = document.querySelector('.scroll-phrase');
const scrollPhraseWords = scrollPhraseOverlay ? Array.from(scrollPhraseOverlay.querySelectorAll('.scroll-phrase__word')) : [];
const statsPanel = document.querySelector('.panel--stats');
const statsInsightCard = statsPanel ? statsPanel.querySelector('.insight-card') : null;
const statsCards = statsPanel ? Array.from(statsPanel.querySelectorAll('.stats-card')) : [];
const teamPanel = document.querySelector('.panel--team');
const joinPanel = document.querySelector('.panel--contact');
const invisiblePanel = document.querySelector('.panel.invisible');
const firstPanel = document.querySelector('#content > .panel:first-child');
const joinShowcase = joinPanel ? joinPanel.querySelector('.contact-showcase') : null;
const energyMeterEl = joinPanel ? joinPanel.querySelector('#energy-meter') : null;
const energyMeterWrapper = joinPanel ? joinPanel.querySelector('#energy-meter-wrapper') : null;
const sectionTitleLines = Array.from(document.querySelectorAll('.section-title-line'));
const teamOverlay = document.querySelector('.team-overlay');
const teamCards = teamOverlay ? Array.from(teamOverlay.querySelectorAll('.team-card')) : [];
const teamCardMap = new Map(
  teamCards.map(c => [c.dataset.member, c]).filter(([id]) => id)
);
const mobileCounterEl = document.querySelector('#mobile-counter');

document.body.classList.add('is-site-loading', 'is-scroll-locked', 'is-mobile-view');

function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function forceResetScrollPosition() {
  resetScrollPosition();
  requestAnimationFrame(() => resetScrollPosition());
}

try {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
} catch {}

forceResetScrollPosition();
window.addEventListener('load', forceResetScrollPosition, { once: true });
window.addEventListener('beforeunload', resetScrollPosition);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) forceResetScrollPosition();
});

const loadingState = { windowLoaded: document.readyState === 'complete' };
let introRevealQueuedUntilLoad = false;

function isInitialLoadComplete() {
  return loadingState.windowLoaded;
}

function queueIntroBrandReveal() {
  if (!isInitialLoadComplete()) {
    introRevealQueuedUntilLoad = true;
    return;
  }
  introRevealQueuedUntilLoad = false;
  playIntroBrandReveal();
}

function markLoadComplete(key) {
  loadingState[key] = true;
  if (isInitialLoadComplete()) {
    document.body.classList.remove('is-site-loading');
    siteLoader?.setAttribute('aria-hidden', 'true');
    if (introRevealQueuedUntilLoad) queueIntroBrandReveal();
  }
}

if (!loadingState.windowLoaded) {
  window.addEventListener('load', () => markLoadComplete('windowLoaded'), { once: true });
}
// If page was already complete when script ran, the load event will never fire.
// Defer to next frame so that bindIntroTextRevealUnlock() below can queue the reveal first.
else {
  requestAnimationFrame(() => markLoadComplete('windowLoaded'));
}

function applySiteConfig(config) {
  const stats = config?.stats;
  if (!stats) return;
  const statMap = { schools: stats.schools, districts: stats.districts, usagePoints: stats.usagePoints };
  for (const [key, value] of Object.entries(statMap)) {
    if (value == null) continue;
    const card = document.querySelector(`.stats-card[data-stat="${key}"]`);
    if (card) {
      const valueEl = card.querySelector('.stats-card__value');
      if (valueEl) valueEl.textContent = String(value);
    }
  }
}

fetch('/site-config.json')
  .then(res => res.json())
  .then(applySiteConfig)
  .catch(err => console.warn('Failed to load site config:', err));

// --- Wire Canvas ---

const GREEN_BASE = [0x0f / 255, 0x83 / 255, 0x39 / 255]; // #0f8339
const GREEN_HOT  = [0x54 / 255, 0xd3 / 255, 0x6b / 255]; // #54d36b

const WIRE_DEFS = [
  // Wire 1 — lowest, thickest
  {
    p0: [0.00, 0.52],
    p1: [0.28, 0.82],
    p2: [0.68, 0.80],
    p3: [1.00, 0.56],
    width: 7.5
  },
  // Wire 2 — middle
  {
    p0: [0.00, 0.47],
    p1: [0.28, 0.74],
    p2: [0.68, 0.72],
    p3: [1.00, 0.50],
    width: 6.0
  },
  // Wire 3 — highest
  {
    p0: [0.00, 0.42],
    p1: [0.28, 0.66],
    p2: [0.68, 0.64],
    p3: [1.00, 0.44],
    width: 5.0
  }
];

// Overall wire state animated by GSAP
const wireState = { progress: 0 };

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function shaderColor(px, py, time, W, H) {
  // Map pixel coords to a virtual "world" scale matching the GLSL bands
  const wx = (px / W) * 9;
  const wy = (py / H) * 4;
  const flow = (((wx + wy) * 0.42 - time * 0.2) % 1 + 1) % 1;
  const bandA = smoothstep(0, 0.08, flow) * (1 - smoothstep(0.08, 0.26, flow));
  const bandB = smoothstep(0.55, 0.72, flow) * (1 - smoothstep(0.72, 0.9, flow));
  const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + wy * 2.2);
  const glow = Math.max(bandA, Math.max(bandB, 0.45 * pulse));
  const r = Math.round(GREEN_BASE[0] * 255 + (GREEN_HOT[0] - GREEN_BASE[0]) * 255 * glow);
  const g = Math.round(GREEN_BASE[1] * 255 + (GREEN_HOT[1] - GREEN_BASE[1]) * 255 * glow);
  const b = Math.round(GREEN_BASE[2] * 255 + (GREEN_HOT[2] - GREEN_BASE[2]) * 255 * glow);
  return `rgb(${r},${g},${b})`;
}

function cubicBezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return [
    mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0],
    mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1]
  ];
}

function resizeWireCanvas() {
  if (!wireCanvas) return;
  const dpr = Math.min(devicePixelRatio, 2);
  wireCanvas.width = window.innerWidth * dpr;
  wireCanvas.height = window.innerHeight * dpr;
}

resizeWireCanvas();

function drawWires(time) {
  if (!wireCtx || wireState.progress <= 0) return;
  const W = wireCanvas.width;
  const H = wireCanvas.height;
  const dpr = Math.min(devicePixelRatio, 2);

  wireCtx.clearRect(0, 0, W, H);

  for (const wire of WIRE_DEFS) {
    const p0 = [wire.p0[0] * W, wire.p0[1] * H];
    const p1 = [wire.p1[0] * W, wire.p1[1] * H];
    const p2 = [wire.p2[0] * W, wire.p2[1] * H];
    const p3 = [wire.p3[0] * W, wire.p3[1] * H];

    const N = 80;
    const maxSeg = Math.floor(N * wireState.progress);

    wireCtx.lineWidth = wire.width * dpr;
    wireCtx.lineCap = 'round';

    for (let i = 0; i < maxSeg; i++) {
      const t0 = i / N;
      const t1 = (i + 1) / N;
      const [x0, y0] = cubicBezierPoint(p0, p1, p2, p3, t0);
      const [x1, y1] = cubicBezierPoint(p0, p1, p2, p3, t1);

      wireCtx.strokeStyle = shaderColor(x0, y0, time, W, H);
      wireCtx.beginPath();
      wireCtx.moveTo(x0, y0);
      wireCtx.lineTo(x1, y1);
      wireCtx.stroke();
    }
  }

}

// --- Team card helpers ---
const TEAM_MEMBER_CONFIG = [
  { id: 'hursh', labelOffsetX: 220, labelOffsetY: -24, dotOffsetY: 120 },
  { id: 'tanuj', labelOffsetX: 220, labelOffsetY: 22, dotOffsetY: 0 },
];

let teamOverlayVisible = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resetTeamCards() {
  for (const card of teamCards) {
    card.style.left = '-200vw';
    card.style.top = '-200vh';
    card.style.opacity = '0';
    card.style.visibility = 'hidden';
    const line = card.querySelector('.team-card__line');
    const dot = card.querySelector('.team-card__dot');
    if (line) line.style.opacity = '0';
    if (dot) dot.style.opacity = '0';
  }
}

function setTeamOverlayVisible(isVisible) {
  if (!teamOverlay || teamOverlayVisible === isVisible) return;
  teamOverlayVisible = isVisible;
  teamOverlay.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  gsap.to(teamOverlay, {
    autoAlpha: isVisible ? 1 : 0,
    duration: prefersReducedMotion ? 0.08 : 0.22,
    ease: 'power2.out',
    overwrite: 'auto'
  });
  if (!isVisible) resetTeamCards();
}

function updateTeamCardAnchors() {
  if (!teamOverlayVisible || teamCards.length === 0) return;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  for (const config of TEAM_MEMBER_CONFIG) {
    const card = teamCardMap.get(config.id);
    const gridCard = document.querySelector(`.team-grid__card[data-member="${config.id}"]`);
    if (!card || !gridCard) continue;

    const rect = gridCard.getBoundingClientRect();
    const dotX = rect.left + rect.width * 0.5;
    const dotY = rect.top + rect.height * 0.6 + (config.dotOffsetY || 0);

    const inwardSign = dotX < window.innerWidth * 0.5 ? 1 : -1;
    const labelX = clamp(dotX + inwardSign * config.labelOffsetX, 130, window.innerWidth - 130);
    const labelY = clamp(dotY + config.labelOffsetY, 90, window.innerHeight - 90);

    const isInView = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;

    card.style.left = `${labelX}px`;
    card.style.top = `${labelY}px`;
    card.style.opacity = isInView ? '1' : '0';
    card.style.visibility = 'visible';

    const line = card.querySelector('.team-card__line');
    const dot = card.querySelector('.team-card__dot');
    if (!line || !dot) continue;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const cardLeft = labelX - cardWidth * 0.5;
    const cardTop = labelY - cardHeight * 0.5;
    const localStartX = dotX >= labelX ? cardWidth : 0;
    const localStartY = clamp(dotY - cardTop, 8, cardHeight - 8);
    const startX = cardLeft + localStartX;
    const startY = cardTop + localStartY;
    const dx = dotX - startX;
    const dy = dotY - startY;
    const lineLength = Math.hypot(dx, dy);

    if (lineLength < 2) {
      line.style.opacity = '0';
      dot.style.opacity = '0';
      continue;
    }

    line.style.left = `${localStartX}px`;
    line.style.top = `${localStartY}px`;
    line.style.width = `${lineLength}px`;
    line.style.transform = `translateY(-50%) rotate(${Math.atan2(dy, dx)}rad)`;
    line.style.opacity = '1';

    dot.style.left = `${localStartX + dx}px`;
    dot.style.top = `${localStartY + dy}px`;
    dot.style.opacity = '1';
  }
}

// --- Intro sequence ---
const introDuration = prefersReducedMotion ? 1.35 : 2.55;
const titleIntroState = { offsetX: 0, offsetY: 0, startScale: 2.15, endYOffset: 0 };
const titleIntroAnimState = { progress: 0 };
const introLeadTextLines = gsap.utils.toArray('.text-reveal-line--lead');
const introBrandLine = document.querySelector('.title .text-gradient');
const introSubtitleLine = document.querySelector('.text-reveal-line--subtitle');
const introUnlockState = { introDone: false, textRevealDone: false, scrollUnlocked: false };
let introCameraStarted = false;
let introBrandRevealStarted = false;

let lenis = null;

function maybeUnlockScroll() {
  if (!lenis) return;
  if (introUnlockState.scrollUnlocked) return;
  if (!introUnlockState.introDone || !introUnlockState.textRevealDone) return;
  introUnlockState.scrollUnlocked = true;
  document.body.classList.remove('is-scroll-locked');
  resetScrollPosition();
  lenis.start();
  lenis.scrollTo(0, { immediate: true, force: true });
  syncInvisiblePanelHeight();
  ScrollTrigger.refresh();
  // Animate scroll phrase in after scroll unlocks
  animateScrollPhraseIn();
}

function markTextRevealComplete() {
  introUnlockState.textRevealDone = true;
  maybeUnlockScroll();
}

function animateScrollPhraseIn() {
  if (!scrollPhraseOverlay || scrollPhraseWords.length === 0) return;

  gsap.to(scrollPhraseOverlay, { autoAlpha: 1, duration: 0.01 });
  gsap.to(scrollPhraseWords, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotateZ: 0,
    duration: prefersReducedMotion ? 0.3 : 0.55,
    ease: 'power3.out',
    stagger: prefersReducedMotion ? 0.04 : 0.08,
    delay: prefersReducedMotion ? 0.1 : 0.2
  });
}

function startIntroAnimation() {
  if (introCameraStarted) return;
  introCameraStarted = true;
  introTl.play(0);
}

function playIntroBrandReveal() {
  if (introBrandRevealStarted) return;
  introBrandRevealStarted = true;

  if (!title || !introBrandLine) {
    markTextRevealComplete();
    startIntroAnimation();
    return;
  }

  const hasLeadIntro = introLeadTextLines.length > 0;
  const leadHoldDuration = hasLeadIntro ? (prefersReducedMotion ? 0.15 : 0.45) : 0;
  const leadExitDuration = hasLeadIntro ? (prefersReducedMotion ? 0.26 : 0.5) : 0;
  const brandRevealDelay = hasLeadIntro ? 0 : (prefersReducedMotion ? 0.12 : 0.28);
  const brandRevealDuration = prefersReducedMotion ? 0.26 : 0.8;
  const brandToCameraDelay = hasLeadIntro ? (prefersReducedMotion ? 0.04 : 0.2) : 0;

  if (hasLeadIntro) {
    introLeadTextLines.forEach(line => {
      line.style.animation = 'none';
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    });
    const titleRect = title.getBoundingClientRect();
    title.style.height = `${titleRect.height}px`;
  }

  title.style.display = 'flex';
  title.style.flexDirection = 'column';
  title.style.justifyContent = 'center';

  gsap.timeline({
    defaults: { overwrite: 'auto' },
    onComplete: () => {
      markTextRevealComplete();
    }
  })
    .to({}, { duration: leadHoldDuration })
    .to(introLeadTextLines, {
      opacity: 0, filter: 'blur(4px)',
      duration: leadExitDuration, ease: 'power2.out'
    })
    .to({}, { duration: brandRevealDelay })
    .add(() => {
      title.classList.add('is-brand-phase');
      computeTitleIntroStartTransform();
      updateTitleIntroTransform(titleIntroAnimState.progress);

      gsap.set(introBrandLine, { yPercent: 115, opacity: 0, filter: 'blur(2px)' });
      if (introSubtitleLine) {
        gsap.set(introSubtitleLine, { yPercent: 55, opacity: 0, filter: 'blur(2px)' });
      }
    })
    .to(introBrandLine, {
      yPercent: 0, opacity: 1, filter: 'blur(0px)',
      duration: brandRevealDuration, ease: 'power3.out',
      onStart: () => {
        gsap.delayedCall(brandToCameraDelay, startIntroAnimation);
      }
    });
}

function bindIntroTextRevealUnlock() {
  if (introLeadTextLines.length === 0) {
    queueIntroBrandReveal();
    return;
  }

  const pendingLines = new Set(introLeadTextLines);
  let fallbackTriggered = false;
  const fallbackDelay = prefersReducedMotion ? 1.2 : 3.0;
  const fallbackCall = gsap.delayedCall(fallbackDelay, () => {
    fallbackTriggered = true;
    playIntroBrandReveal();
  });

  const markLineDone = (line) => {
    if (fallbackTriggered) return;
    if (!pendingLines.has(line)) return;
    pendingLines.delete(line);
    if (pendingLines.size === 0) {
      fallbackCall.kill();
      playIntroBrandReveal();
    }
  };

  introLeadTextLines.forEach((line) => {
    line.addEventListener('animationend', () => markLineDone(line), { once: true });
    line.addEventListener('animationcancel', () => markLineDone(line), { once: true });
  });
}

function computeTitleIntroStartTransform() {
  if (!title) return;
  // Mobile: slide from top, no scale
  titleIntroState.offsetX = 0;
  titleIntroState.offsetY = -72;
  titleIntroState.startScale = 1;
  titleIntroState.endYOffset = 0;
}

computeTitleIntroStartTransform();
if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    computeTitleIntroStartTransform();
    updateTitleIntroTransform(titleIntroAnimState.progress);
    syncInvisiblePanelHeight();
    ScrollTrigger.refresh();
  });
}

const introTl = gsap.timeline({
  paused: true,
  onComplete: () => {
    introUnlockState.introDone = true;
    maybeUnlockScroll();
    // Animate wires in after title settles
    gsap.to(wireState, {
      progress: 1,
      duration: prefersReducedMotion ? 0.6 : 1.1,
      ease: 'power2.out'
    });
  }
});

introTl.to(titleIntroAnimState, {
  progress: 1,
  duration: introDuration,
  ease: 'power3.inOut',
  onUpdate: () => updateTitleIntroTransform(titleIntroAnimState.progress)
}, 0);

if (introSubtitleLine) {
  introTl.to(introSubtitleLine, {
    yPercent: 0, opacity: 1, filter: 'blur(0px)',
    duration: prefersReducedMotion ? 0.4 : 0.7,
    ease: 'power2.out'
  }, introDuration * 0.4);
}

if (title) title.style.transformOrigin = '50% 50%';

function updateTitleIntroTransform(progress) {
  if (!title) return;
  const p = gsap.utils.clamp(0, 1, progress);
  const x = gsap.utils.interpolate(titleIntroState.offsetX, 0, p);
  const y = gsap.utils.interpolate(titleIntroState.offsetY, titleIntroState.endYOffset, p);
  title.style.transform = `translate(${x}px, ${y}px)`;
  title.style.opacity = String(gsap.utils.clamp(0, 1, p * 2));
}

updateTitleIntroTransform(titleIntroAnimState.progress);

// Scroll phrase mobile layout is handled via .is-mobile-view CSS class

// Initial state for scroll phrase words
if (scrollPhraseWords.length > 0) {
  gsap.set(scrollPhraseOverlay, { autoAlpha: 0 });
  gsap.set(scrollPhraseWords, {
    autoAlpha: 0,
    y: 24,
    scale: prefersReducedMotion ? 1 : 0.92,
    rotateZ: (index) => (index % 2 === 0 ? -2.4 : 2.4),
    force3D: true
  });
}

// --- Lenis ---
lenis = new Lenis({
  duration: prefersReducedMotion ? 1.1 : 3.0, smoothWheel: true, smoothTouch: true
});

lenis.on('scroll', ScrollTrigger.update);
lenis.stop();
lenis.scrollTo(0, { immediate: true, force: true });
bindIntroTextRevealUnlock();
maybeUnlockScroll();

// --- Nav ---
(function initSiteNav() {
  const navDots = Array.from(document.querySelectorAll('.nav-dot'));
  const navConnectors = Array.from(document.querySelectorAll('.nav-connector'));
  const navTargetIds = ['#services-section', '#about-section', '#team-section', '#contact-section'];
  const navSections = navTargetIds.map(id => document.querySelector(id));
  let activeNavIndex = -1;

  function setActiveNav(idx) {
    if (idx === activeNavIndex) return;
    activeNavIndex = idx;
    navDots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx));
  }

  function triggerFlow(fromIdx, toIdx) {
    if (fromIdx === toIdx) return;
    if (toIdx > fromIdx) {
      for (let i = fromIdx; i < toIdx; i++) {
        const c = navConnectors[i];
        if (!c) continue;
        const delay = (i - fromIdx) * 90;
        setTimeout(() => {
          c.classList.remove('is-flowing-fwd', 'is-flowing-bwd');
          void c.offsetWidth;
          c.classList.add('is-flowing-fwd');
          c.addEventListener('animationend', () => c.classList.remove('is-flowing-fwd'), { once: true });
        }, delay);
      }
    } else {
      for (let i = fromIdx - 1; i >= toIdx; i--) {
        const c = navConnectors[i];
        if (!c) continue;
        const delay = (fromIdx - 1 - i) * 90;
        setTimeout(() => {
          c.classList.remove('is-flowing-fwd', 'is-flowing-bwd');
          void c.offsetWidth;
          c.classList.add('is-flowing-bwd');
          c.addEventListener('animationend', () => c.classList.remove('is-flowing-bwd'), { once: true });
        }, delay);
      }
    }
  }

  navDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (document.body.classList.contains('is-scroll-locked')) return;
      triggerFlow(activeNavIndex >= 0 ? activeNavIndex : i, i);
      setActiveNav(i);
      if (i === 0) {
        lenis.scrollTo(0, { duration: prefersReducedMotion ? 1.2 : 2.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        const section = navSections[i];
        if (!section || !lenis) return;
        lenis.scrollTo(section, { offset: -58, duration: prefersReducedMotion ? 1.2 : 2.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      }
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = navSections.indexOf(entry.target);
        if (idx >= 0) setActiveNav(idx);
      }
    });
  }, { threshold: 0.35 });

  navSections.forEach(s => s && sectionObserver.observe(s));
})();

if (teamOverlay) gsap.set(teamOverlay, { autoAlpha: 0 });
resetTeamCards();

const postSecondPanelDuration = (() => {
  const weightedDuration = (prefersReducedMotion ? 0.8 : 1.25) * (
    (statsPanel ? 1.0 : 0)
    + (teamPanel ? 1.2 : 0)
    + (joinPanel ? 1.4 : 0)
  );
  return weightedDuration > 0 ? weightedDuration : Math.max(gsap.utils.toArray('.panel').length - 2, 0);
})();

const CAMERA_SECTION_SCALE = 3.5;

function syncInvisiblePanelHeight() {
  if (!invisiblePanel || postSecondPanelDuration <= 0) return;
  const vh = window.innerHeight;
  const H1 = firstPanel ? firstPanel.offsetHeight : 0;
  const Hs = statsPanel ? statsPanel.offsetHeight : 0;
  const Ht = teamPanel ? teamPanel.offsetHeight : 0;
  const Hc = joinPanel ? joinPanel.offsetHeight : 0;
  const Hi = Math.max(0, CAMERA_SECTION_SCALE * (Hs + Ht + Hc) / postSecondPanelDuration + vh - H1);
  invisiblePanel.style.height = `${Hi}px`;
}

syncInvisiblePanelHeight();

const scrollState = { progress: 0 };

const cameraScrollTimeline = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: '#content', start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true,
    onUpdate: (self) => { scrollState.progress = self.progress; }
  }
});

// Fade title on scroll
if (title) {
  gsap.set(title, { autoAlpha: 1 });
  cameraScrollTimeline.to(title, {
    autoAlpha: 0,
    duration: (prefersReducedMotion ? 0.03 : 0.06) * CAMERA_SECTION_SCALE
  }, 0.02 * CAMERA_SECTION_SCALE);
}

// Fade wire canvas and scroll phrase on scroll (fromTo so initial state is always 1)
if (wireCanvas) {
  cameraScrollTimeline.fromTo(wireCanvas,
    { opacity: 1 },
    { opacity: 0, duration: 0.18 * CAMERA_SECTION_SCALE },
    0.0
  );
}

if (scrollPhraseOverlay) {
  cameraScrollTimeline.fromTo(scrollPhraseOverlay,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.18 * CAMERA_SECTION_SCALE },
    0.0
  );
}

// Scene cards overlay
if (sceneCards.length === 3) {
  const cardOverlayStart = 0.25 * CAMERA_SECTION_SCALE;
  const cardStarts = [0.52, 0.555, 0.59].map(v => v * CAMERA_SECTION_SCALE);

  const getRootFontSize = () => {
    const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    return Number.isFinite(rootFontSize) ? rootFontSize : 16;
  };

  const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

  const getLegacyCardWidth = (compact) => {
    const rem = getRootFontSize();
    if (compact) return Math.min(12.2 * rem, window.innerWidth * 0.48);
    return clampValue(window.innerWidth * 0.23, 12.8 * rem, 18.2 * rem);
  };

  const adjustXForLegacyMotion = (xValues, scaleValues, legacyWidth) => {
    const legacyHalfWidth = legacyWidth * 0.5;
    return xValues.map((xValue, index) => xValue - ((scaleValues[index] - 1) * legacyHalfWidth));
  };

  const getCardPassStyle = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isPortrait = h > w;
    if (isPortrait) {
      const rem = getRootFontSize();
      const cardW = w <= 540
        ? clampValue(w * 0.88, 15 * rem, 28 * rem)
        : clampValue(w * 0.80, 17 * rem, 34 * rem);
      const cardH = clampValue(h * 0.25, 10 * rem, 16 * rem);
      const gap = rem;
      const navH = 4 * rem;
      const totalH = 3 * cardH + 2 * gap;
      const groupTop = navH + (h - navH - totalH) / 2;
      const cx = -cardW / 2;
      const cy0 = groupTop - h / 2;
      const cy1 = groupTop + (cardH + gap) - h / 2;
      const cy2 = groupTop + 2 * (cardH + gap) - h / 2;
      return {
        startX: [cx, cx, cx], startY: [cy0, cy1, cy2],
        midX: [cx, cx, cx], midY: [cy0, cy1, cy2],
        endX: [cx, cx, cx], endY: [cy0, cy1, cy2],
        startScale: [1, 1, 1], midScale: [1, 1, 1], endScale: [1, 1, 1]
      };
    }
    const compact = w <= 768;
    const baseStyle = {
      startX: [w * -0.255, w * -0.25, w * -0.24],
      startY: [h * -0.23, h * -0.23, h * -0.23],
      midX: [w * -0.16, w * -0.16, w * -0.155],
      midY: [h * -0.167, h * -0.167, h * -0.167],
      endX: [w * 0.1, w * 0.1, w * 0.1],
      endY: [h * 0.056, h * 0.056, h * 0.056],
      startScale: [0.5, 0.5, 0.5],
      midScale: [1.0, 1.0, 1.0],
      endScale: [2.5, 2.8, 3.2]
    };
    const legacyCardWidth = getLegacyCardWidth(compact);
    return {
      ...baseStyle,
      startX: adjustXForLegacyMotion(baseStyle.startX, baseStyle.startScale, legacyCardWidth),
      midX: adjustXForLegacyMotion(baseStyle.midX, baseStyle.midScale, legacyCardWidth),
      endX: adjustXForLegacyMotion(baseStyle.endX, baseStyle.endScale, legacyCardWidth)
    };
  };

  gsap.set(sceneCardsOverlay, { autoAlpha: 0 });
  gsap.set(sceneCards, {
    autoAlpha: 0, filter: 'blur(4px)', force3D: true, willChange: 'transform, opacity, filter'
  });

  cameraScrollTimeline.to(sceneCardsOverlay, { autoAlpha: 1, duration: 0.06 * CAMERA_SECTION_SCALE }, cardOverlayStart);

  sceneCards.forEach((card, i) => {
    const start = cardStarts[i];
    cameraScrollTimeline
      .to(card, {
        keyframes: [
          { x: () => getCardPassStyle().startX[i], y: () => getCardPassStyle().startY[i], scale: () => getCardPassStyle().startScale[i], duration: 0 },
          { x: () => getCardPassStyle().midX[i], y: () => getCardPassStyle().midY[i], scale: () => getCardPassStyle().midScale[i], duration: 0.1 * CAMERA_SECTION_SCALE },
          { x: () => getCardPassStyle().endX[i], y: () => getCardPassStyle().endY[i], scale: () => getCardPassStyle().endScale[i], duration: 0.1 * CAMERA_SECTION_SCALE }
        ]
      }, start)
      .to(card, {
        keyframes: [
          { autoAlpha: 1, duration: 0.04 * CAMERA_SECTION_SCALE },
          { autoAlpha: 1, duration: 0.3 * CAMERA_SECTION_SCALE },
          { autoAlpha: 1, duration: 0.06 * CAMERA_SECTION_SCALE }
        ]
      }, start)
      .to(card, {
        keyframes: [
          { filter: 'blur(0px)', duration: 0.04 * CAMERA_SECTION_SCALE },
          { filter: 'blur(0px)', duration: 0.3 * CAMERA_SECTION_SCALE },
          { filter: 'blur(0px)', duration: 0.06 * CAMERA_SECTION_SCALE }
        ]
      }, start);
  });

  cameraScrollTimeline.to(sceneCardsOverlay, { autoAlpha: 0, duration: 0.06 * CAMERA_SECTION_SCALE }, 0.94 * CAMERA_SECTION_SCALE);
}

cameraScrollTimeline.to({}, { duration: postSecondPanelDuration });

// --- Section title underlines ---
if (sectionTitleLines.length > 0) {
  gsap.set(sectionTitleLines, { '--section-underline-progress': 0 });
  sectionTitleLines.forEach((titleLine) => {
    gsap.to(titleLine, {
      '--section-underline-progress': 1,
      ease: 'none',
      scrollTrigger: {
        trigger: titleLine,
        start: 'top 84%',
        end: 'top 64%',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}

// --- Stats panel ---
if (statsPanel && statsCards.length === 3) {
  const isCompactStatsLayout = () => window.innerWidth <= 980;
  const statsCardEntryOffsets = [
    {
      x: () => (isCompactStatsLayout() ? 0 : -170),
      y: () => (isCompactStatsLayout() ? 62 : 72),
      rotateZ: () => (isCompactStatsLayout() ? 0 : -6)
    },
    { x: 0, y: () => (isCompactStatsLayout() ? 78 : 102), rotateZ: 0 },
    {
      x: () => (isCompactStatsLayout() ? 0 : 170),
      y: () => (isCompactStatsLayout() ? 62 : 72),
      rotateZ: () => (isCompactStatsLayout() ? 0 : 6)
    }
  ];

  if (statsInsightCard) {
    gsap.set(statsInsightCard, {
      autoAlpha: 0,
      y: () => (window.innerWidth <= 768 ? 34 : 56),
      force3D: true,
      willChange: 'transform, opacity'
    });
  }

  gsap.set(statsCards, { autoAlpha: 0, force3D: true, willChange: 'transform, opacity' });

  const statsCardsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: statsPanel,
      start: 'top 68%',
      end: 'top 28%',
      scrub: true,
      invalidateOnRefresh: true
    }
  });

  if (statsInsightCard) {
    statsCardsTimeline.fromTo(
      statsInsightCard,
      { autoAlpha: 0, y: () => (window.innerWidth <= 768 ? 34 : 56) },
      { autoAlpha: 1, y: 0, ease: 'none', duration: 0.2 },
      '+=0.3'
    );
  }

  const statsCardsStartOffset = prefersReducedMotion ? 0.02 : 0.18;
  statsCards.forEach((card, index) => {
    const entryOffset = statsCardEntryOffsets[index];
    statsCardsTimeline.fromTo(card,
      { autoAlpha: 0, x: entryOffset.x, y: entryOffset.y, rotateZ: entryOffset.rotateZ },
      {
        autoAlpha: 1, x: 0, y: 0, rotateZ: 0,
        duration: prefersReducedMotion ? 0.12 : 0.3, ease: 'none'
      },
      statsCardsStartOffset + (index * (prefersReducedMotion ? 0.02 : 0.09))
    );
  });
}

// --- Team panel ---
if (teamPanel) {
  ScrollTrigger.create({
    trigger: teamPanel,
    start: 'top 76%',
    end: 'bottom 18%',
    onToggle: (self) => setTeamOverlayVisible(self.isActive)
  });
}

// --- Contact / energy meter panel ---
if (joinPanel && energyMeterEl) {
  const chartClipRect = energyMeterEl.querySelector('#chart-clip-rect');
  const curveHvac = energyMeterEl.querySelector('#curve-hvac');
  const curveLighting = energyMeterEl.querySelector('#curve-lighting');
  const curveEquipment = energyMeterEl.querySelector('#curve-equipment');
  const areaHvac = energyMeterEl.querySelector('#area-hvac');
  const areaLighting = energyMeterEl.querySelector('#area-lighting');
  const areaEquipment = energyMeterEl.querySelector('#area-equipment');
  const legendItems = Array.from(energyMeterEl.querySelectorAll('.energy-legend-item'));
  const joinTitleLine = joinShowcase ? joinShowcase.querySelector('.section-title-line') : null;

  const CHART_W = 400, CHART_BOTTOM = 160;
  const chartState = { revealed: false, activeCurve: null };

  function hvacY(x, t) {
    const p = x / CHART_W;
    return 75 + 28 * Math.sin(p * Math.PI * 3.6 + t * 0.7) + 14 * Math.sin(p * Math.PI * 7.2 + t * 1.1) + 7 * Math.cos(p * Math.PI * 1.8 + t * 0.4);
  }
  function lightingY(x, t) {
    const p = x / CHART_W;
    return 75 + 20 * Math.sin(p * Math.PI * 2.4 + t * 0.5) + 10 * Math.cos(p * Math.PI * 5.1 + t * 0.8) + 5 * Math.sin(p * Math.PI * 8.4 + t * 1.3);
  }
  function equipmentY(x, t) {
    const p = x / CHART_W;
    return 75 + 15 * Math.sin(p * Math.PI * 4.8 + t * 0.9) + 8 * Math.sin(p * Math.PI * 9.6 + t * 1.4) + 4 * Math.cos(p * Math.PI * 2.7 + t * 0.6);
  }

  function buildPaths(fn, t) {
    const N = 60;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      pts.push({ x: (i / N) * CHART_W, y: fn((i / N) * CHART_W, t) });
    }
    let curve = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
      const yc = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
      curve += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${xc} ${yc}`;
    }
    curve += ` T ${pts[N].x.toFixed(1)} ${pts[N].y.toFixed(1)}`;
    return { curve, area: `${curve} L ${CHART_W} ${CHART_BOTTOM} L 0 ${CHART_BOTTOM} Z` };
  }

  function updateChart(t) {
    const h = buildPaths(hvacY, t);
    const l = buildPaths(lightingY, t);
    const eq = buildPaths(equipmentY, t);
    curveHvac.setAttribute('d', h.curve);
    curveLighting.setAttribute('d', l.curve);
    curveEquipment.setAttribute('d', eq.curve);
    areaHvac.setAttribute('d', h.area);
    areaLighting.setAttribute('d', l.area);
    areaEquipment.setAttribute('d', eq.area);
  }

  function setCurveState(activeCurve) {
    const curveMap = { hvac: curveHvac, lighting: curveLighting, equipment: curveEquipment };
    const areaMap = { hvac: areaHvac, lighting: areaLighting, equipment: areaEquipment };
    for (const key of Object.keys(curveMap)) {
      const isActive = key === activeCurve;
      const isDimmed = activeCurve !== null && !isActive;
      curveMap[key].classList.toggle('chart-curve--active', isActive);
      curveMap[key].classList.toggle('chart-curve--dimmed', isDimmed);
      areaMap[key].classList.toggle('chart-area--active', isActive);
      areaMap[key].classList.toggle('chart-area--dimmed', isDimmed);
    }
    legendItems.forEach((item) => item.classList.toggle('is-active', item.dataset.curve === activeCurve));
  }

  updateChart(0);

  ScrollTrigger.create({
    trigger: joinTitleLine || joinShowcase || joinPanel,
    start: 'top 63%',
    toggleActions: 'play none none reverse',
    onEnter: () => {
      chartState.revealed = true;
      if (chartClipRect) {
        gsap.fromTo(chartClipRect, { attr: { width: 0 } }, { attr: { width: CHART_W }, duration: 1.2, ease: 'power2.inOut' });
      }
    },
    onLeaveBack: () => {
      chartState.revealed = false;
      if (chartClipRect) {
        gsap.to(chartClipRect, { attr: { width: 0 }, duration: 0.4, ease: 'power2.in' });
      }
    }
  });

  legendItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      chartState.activeCurve = item.dataset.curve;
      setCurveState(item.dataset.curve);
    });
    item.addEventListener('mouseleave', () => {
      chartState.activeCurve = null;
      setCurveState(null);
    });
  });

  gsap.ticker.add((time) => {
    if (chartState.revealed) updateChart(prefersReducedMotion ? 0 : time);
  });

  if (!prefersReducedMotion && energyMeterWrapper) {
    let tiltBounds = energyMeterEl.getBoundingClientRect();
    const tiltCenter = { x: 0, y: 0, scale: 1.0 };

    function updateMeterTilt() {
      const nx = Math.max(-1, Math.min(1, tiltCenter.x / (tiltBounds.width / 2)));
      const ny = Math.max(-1, Math.min(1, tiltCenter.y / (tiltBounds.height / 2)));
      energyMeterWrapper.style.transform = `perspective(900px) scale3d(${tiltCenter.scale}, ${tiltCenter.scale}, ${tiltCenter.scale}) rotateX(${-ny * 10}deg) rotateY(${nx * 10}deg)`;
    }

    function applyMeterTilt(e) {
      tiltBounds = energyMeterEl.getBoundingClientRect();
      gsap.to(tiltCenter, {
        x: e.clientX - tiltBounds.x - tiltBounds.width / 2,
        y: e.clientY - tiltBounds.y - tiltBounds.height / 2,
        scale: 1.04,
        duration: 0.35, ease: 'power2.out', overwrite: true, onUpdate: updateMeterTilt
      });
    }

    energyMeterEl.addEventListener('mouseenter', () => {
      tiltBounds = energyMeterEl.getBoundingClientRect();
      document.addEventListener('mousemove', applyMeterTilt);
    });
    energyMeterEl.addEventListener('mouseleave', () => {
      document.removeEventListener('mousemove', applyMeterTilt);
      gsap.to(tiltCenter, {
        x: 0, y: 0, scale: 1.0,
        duration: 0.55, ease: 'power2.out', overwrite: true, onUpdate: updateMeterTilt,
        onComplete: () => { energyMeterWrapper.style.transform = ''; }
      });
    });
  }
}

// --- Resize ---
window.addEventListener('resize', () => {
  resizeWireCanvas();
  computeTitleIntroStartTransform();
  updateTitleIntroTransform(titleIntroAnimState.progress);
  syncInvisiblePanelHeight();
  ScrollTrigger.refresh();
});

// --- Team card drift ---
const teamDriftCards = Array.from(document.querySelectorAll('.team-grid__card[data-member]'));
const teamDriftPhases = [0.0, 2.1];

// --- Main tick ---
gsap.ticker.lagSmoothing(0);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);

  if (!prefersReducedMotion) {
    teamDriftCards.forEach((card, i) => {
      const t = time + teamDriftPhases[i];
      card.style.transform = `perspective(700px) rotateX(${Math.sin(t * 0.6) * 3}deg) rotateY(${Math.sin(t * 0.8) * 4.5}deg)`;
    });
  }

  drawWires(time);
  updateTeamCardAnchors();

  if (mobileCounterEl) {
    mobileCounterEl.classList.toggle('is-visible', scrollState.progress > 0.28);
  }
});
