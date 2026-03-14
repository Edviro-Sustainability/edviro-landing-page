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
const sectionTitleLines = Array.from(document.querySelectorAll('.section-title-line'));
const teamOverlay = document.querySelector('.team-overlay');
const mobileCounterEl = document.querySelector('#mobile-counter');

document.body.classList.add('is-site-loading', 'is-scroll-locked', 'is-mobile-view');

const scrollWrapper = document.createElement('div');
scrollWrapper.id = 'scroll-wrapper';
while (document.body.firstChild) {
  scrollWrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(scrollWrapper);

Object.assign(scrollWrapper.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
});
Object.assign(document.documentElement.style, { overflow: 'hidden', height: '100%' });
Object.assign(document.body.style, { overflow: 'hidden', height: '100%' });

ScrollTrigger.defaults({ scroller: scrollWrapper });
ScrollTrigger.scrollerProxy(scrollWrapper, {
  scrollTop(value) {
    if (arguments.length) { scrollWrapper.scrollTop = value; }
    return scrollWrapper.scrollTop;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});
scrollWrapper.addEventListener('scroll', () => ScrollTrigger.update());

let stableVH = document.documentElement.clientHeight || window.innerHeight;
if (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
  stableVH = Math.max(stableVH, window.screen.height);
}
let lastKnownWidth = window.innerWidth;

function setStableVH() {
  document.documentElement.style.setProperty('--stable-vh', `${stableVH}px`);
}
setStableVH();

const TEAM_INFO = [
  { member: 'hursh', name: 'Hursh Shah', detail: 'Extensive experience in energy systems and data analytics', row: 2 },
  { member: 'tanuj', name: 'Tanuj Siripurapu', detail: 'Deep technical expertise in full-stack software engineering', row: 3 },
];

const teamGridEl = document.querySelector('.team-grid');
if (teamGridEl) {
  for (const info of TEAM_INFO) {
    const div = document.createElement('div');
    div.className = 'team-info-inline';
    div.style.gridColumn = '2';
    div.style.gridRow = String(info.row);
    div.innerHTML = `<span class="team-info-inline__name">${info.name}</span><span class="team-info-inline__detail">${info.detail}</span>`;
    teamGridEl.appendChild(div);
  }
}

if (invisiblePanel) {
  invisiblePanel.style.display = 'none';
}

if (scrollPhraseOverlay && firstPanel) {
  Object.assign(scrollPhraseOverlay.style, {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    width: '100%',
    height: 'auto',
    zIndex: '',
    display: 'flex',
    justifyContent: 'center',
  });
  firstPanel.appendChild(scrollPhraseOverlay);
}

const sceneCardWrappers = [];
if (sceneCardsOverlay && sceneCards.length === 3) {
  const contentEl = document.querySelector('#content');
  const insertRef = statsPanel || teamPanel || joinPanel;

  sceneCards.forEach((card) => {
    Object.assign(card.style, {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      transform: 'none',
      margin: '0 auto',
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'scene-card-flow-wrapper';
    wrapper.appendChild(card);
    if (insertRef) {
      contentEl.insertBefore(wrapper, insertRef);
    } else {
      contentEl.appendChild(wrapper);
    }
    sceneCardWrappers.push(wrapper);
  });

  sceneCardsOverlay.style.display = 'none';

  if (mobileCounterEl && insertRef) {
    const contentEl2 = document.querySelector('#content');
    contentEl2.insertBefore(mobileCounterEl, insertRef);
  }
}

function resetScrollPosition() {
  scrollWrapper.scrollTop = 0;
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
const contentEl = document.querySelector('#content');
if (wireCanvas && contentEl) {
  contentEl.insertBefore(wireCanvas, contentEl.firstChild);
}

const GREEN_BASE = [0x0f / 255, 0x83 / 255, 0x39 / 255]; // #0f8339
const GREEN_HOT  = [0x54 / 255, 0xd3 / 255, 0x6b / 255]; // #54d36b

const WIRE_FREQ = 8;
const WIRE_AMP  = 0.65;
const WIRE_CENTER_X = 0.5;
const WIRE_SPAN = 1.5 * (2 / WIRE_FREQ);

const wireState = { progress: 0 };
let smoothRevealFrac = 0;

let wireOriginDocY = 0;
const WIRE_BUNDLE = [
  { xShift: -0.12, phaseOffset: 0, width: 20 },
  { xShift:  0.0,  phaseOffset: 0, width: 20 },
  { xShift:  0.12, phaseOffset: 0, width: 20 },
];

function recomputeWireParams() {
  const scrollH = Math.max(1, scrollWrapper.scrollHeight);
  wireOriginDocY = 0.35 * stableVH / scrollH;
  const bp = Math.PI / 2 - wireOriginDocY * Math.PI * WIRE_FREQ;
  WIRE_BUNDLE[0].phaseOffset = bp;
  WIRE_BUNDLE[1].phaseOffset = bp - 0.02;
  WIRE_BUNDLE[2].phaseOffset = bp - 0.04;
}

recomputeWireParams();

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function shaderColor(time, wireIndex) {
  const phase = wireIndex * 0.7;
  const flow = ((time * 0.2 + phase) % 1 + 1) % 1;
  const bandA = smoothstep(0, 0.08, flow) * (1 - smoothstep(0.08, 0.26, flow));
  const bandB = smoothstep(0.55, 0.72, flow) * (1 - smoothstep(0.72, 0.9, flow));
  const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + phase);
  const glow = Math.max(bandA, Math.max(bandB, 0.45 * pulse));
  const r = Math.round(GREEN_BASE[0] * 255 + (GREEN_HOT[0] - GREEN_BASE[0]) * 255 * glow);
  const g = Math.round(GREEN_BASE[1] * 255 + (GREEN_HOT[1] - GREEN_BASE[1]) * 255 * glow);
  const b = Math.round(GREEN_BASE[2] * 255 + (GREEN_HOT[2] - GREEN_BASE[2]) * 255 * glow);
  return `rgb(${r},${g},${b})`;
}

function wireX(docY, xShift, phaseOffset) {
  return WIRE_CENTER_X + xShift + WIRE_AMP * Math.sin(docY * Math.PI * WIRE_FREQ + phaseOffset);
}

let wireGeometryDirty = true;
let cachedWirePaths = null;
let cachedRevealFrac = -1;

function resizeWireCanvas() {
  if (!wireCanvas) return;
  recomputeWireParams();
  const dpr = Math.min(devicePixelRatio, 1.5);
  const scrollH = Math.max(1, scrollWrapper.scrollHeight);
  const w = window.innerWidth;
  const wireHeightPx = WIRE_SPAN * scrollH;
  const wireStartPx = 0.35 * stableVH;

  const canvasW = Math.round(w * dpr);
  const canvasH = Math.round(wireHeightPx * dpr);

  wireCanvas.width = canvasW;
  wireCanvas.height = canvasH;
  wireCanvas.style.width = `${w}px`;
  wireCanvas.style.height = `${wireHeightPx}px`;
  wireCanvas.style.top = `${wireStartPx}px`;
  wireGeometryDirty = true;
}

resizeWireCanvas();

let lastScrollHeight = scrollWrapper.scrollHeight;
const contentObserver = new ResizeObserver(() => {
  const newH = scrollWrapper.scrollHeight;
  if (newH !== lastScrollHeight) {
    lastScrollHeight = newH;
    resizeWireCanvas();
  }
});
contentObserver.observe(document.querySelector('#content'));

function computeWirePaths(revealFrac) {
  const W = wireCanvas.width;
  const H = wireCanvas.height;
  const DOC_STEP = 0.0005;
  const wireStart = wireOriginDocY;
  const wireEnd = revealFrac;
  if (wireEnd <= wireStart) return null;

  const firstStep = Math.ceil(wireStart / DOC_STEP);
  const lastStep = Math.floor(wireEnd / DOC_STEP);

  return WIRE_BUNDLE.map(wire => {
    const points = [];
    for (let step = firstStep; step <= lastStep; step++) {
      const docY = step * DOC_STEP;
      const wx = wireX(docY, wire.xShift, wire.phaseOffset);
      const cx = wx * W;
      const cy = ((docY - wireStart) / WIRE_SPAN) * H;
      points.push({ cx, cy, docY });
    }
    return points;
  });
}

function drawWires(time) {
  if (!wireCtx || wireState.progress <= 0) return;
  const W = wireCanvas.width;
  const H = wireCanvas.height;
  const dpr = Math.min(devicePixelRatio, 1.5);

  const scrollY = scrollWrapper.scrollTop || 0;
  const docH = Math.max(1, scrollWrapper.scrollHeight);
  const maxDocScroll = Math.max(1, docH - stableVH);
  const scrollFrac = scrollY / maxDocScroll;
  const maxWireDocY = wireOriginDocY + WIRE_SPAN;
  const scrollDelay = 0.08;
  const delayedScroll = Math.max(0, scrollFrac - scrollDelay) / (1 - scrollDelay);
  const targetRevealFrac = Math.min(wireState.progress * 0.18 + delayedScroll * 0.7, maxWireDocY);

  const lerpSpeed = 0.1;
  smoothRevealFrac += (targetRevealFrac - smoothRevealFrac) * lerpSpeed;
  if (Math.abs(smoothRevealFrac - targetRevealFrac) < 0.0001) smoothRevealFrac = targetRevealFrac;
  const revealFrac = smoothRevealFrac;

  if (wireGeometryDirty || revealFrac !== cachedRevealFrac) {
    cachedWirePaths = computeWirePaths(revealFrac);
    cachedRevealFrac = revealFrac;
    wireGeometryDirty = false;
  }

  if (!cachedWirePaths) return;

  wireCtx.clearRect(0, 0, W, H);

  WIRE_BUNDLE.forEach((wire, i) => {
    const points = cachedWirePaths[i];
    if (!points || points.length < 2) return;

    wireCtx.lineWidth = wire.width * dpr;
    wireCtx.lineCap = 'round';
    wireCtx.lineJoin = 'round';

    wireCtx.strokeStyle = shaderColor(time, i);

    wireCtx.beginPath();
    wireCtx.moveTo(points[0].cx, points[0].cy);
    for (let j = 1; j < points.length - 1; j++) {
      const midX = (points[j].cx + points[j + 1].cx) * 0.5;
      const midY = (points[j].cy + points[j + 1].cy) * 0.5;
      wireCtx.quadraticCurveTo(points[j].cx, points[j].cy, midX, midY);
    }
    const last = points[points.length - 1];
    wireCtx.lineTo(last.cx, last.cy);
    wireCtx.stroke();
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (teamOverlay) {
  teamOverlay.style.display = 'none';
  teamOverlay.setAttribute('aria-hidden', 'true');
}

// --- Intro sequence ---
const introDuration = prefersReducedMotion ? 1.0 : 1.6;
const titleIntroState = { offsetX: 0, offsetY: 0, startScale: 2.15, endYOffset: 0 };
const titleIntroAnimState = { progress: 0 };
const introLeadTextLines = gsap.utils.toArray('.text-reveal-line--lead');
const introBrandLine = document.querySelector('.title .text-gradient');
const introSubtitleLine = document.querySelector('.text-reveal-line--subtitle');
const introUnlockState = { introDone: false, textRevealDone: false, scrollUnlocked: false };
let introCameraStarted = false;
let introBrandRevealStarted = false;

function maybeUnlockScroll() {
  if (introUnlockState.scrollUnlocked) return;
  if (!introUnlockState.introDone || !introUnlockState.textRevealDone) return;
  introUnlockState.scrollUnlocked = true;
  document.body.classList.remove('is-scroll-locked');
  resetScrollPosition();
  syncInvisiblePanelHeight();
  ScrollTrigger.refresh();
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
    duration: prefersReducedMotion ? 0.5 : 1.0,
    ease: 'power3.out',
    stagger: 0.06,
    delay: prefersReducedMotion ? 0.05 : 0.08
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
  const leadHoldDuration = hasLeadIntro ? (prefersReducedMotion ? 0.1 : 0.25) : 0;
  const leadExitDuration = hasLeadIntro ? (prefersReducedMotion ? 0.2 : 0.35) : 0;
  const brandRevealDelay = hasLeadIntro ? 0 : (prefersReducedMotion ? 0.08 : 0.15);
  const brandRevealDuration = prefersReducedMotion ? 0.2 : 0.5;
  const brandToCameraDelay = hasLeadIntro ? (prefersReducedMotion ? 0.02 : 0.1) : 0;

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
  titleIntroState.offsetX = 0;
  titleIntroState.offsetY = -72;
  titleIntroState.startScale = 1;
  titleIntroState.endYOffset = 30;
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
    gsap.to(wireState, {
      progress: 1,
      duration: prefersReducedMotion ? 1.0 : 2.5,
      delay: 0.5,
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
    duration: prefersReducedMotion ? 0.3 : 0.5,
    ease: 'power2.out'
  }, introDuration * 0.35);
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

scrollWrapper.scrollTop = 0;
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
        scrollWrapper.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else {
        const section = navSections[i];
        if (!section) return;
        const top = section.offsetTop;
        scrollWrapper.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
  const vh = stableVH;
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

if (title) {
  gsap.set(title, { autoAlpha: 1 });
  cameraScrollTimeline.to(title, {
    autoAlpha: 0,
    duration: (prefersReducedMotion ? 0.03 : 0.06) * CAMERA_SECTION_SCALE
  }, 0.02 * CAMERA_SECTION_SCALE);
}

if (scrollPhraseOverlay) {
  cameraScrollTimeline.to(scrollPhraseOverlay,
    { autoAlpha: 0, duration: (prefersReducedMotion ? 0.03 : 0.06) * CAMERA_SECTION_SCALE },
    0.02 * CAMERA_SECTION_SCALE
  );
}

if (sceneCardWrappers.length === 3) {
  sceneCards.forEach((card, i) => {
    const direction = i % 2 === 0 ? 1 : -1;
    const xOffset = direction * 120;

    gsap.set(card, { autoAlpha: 0, xPercent: xOffset, force3D: true });

    const startOffset = 65 - i * 5;
    const endOffset = startOffset - 60;
    gsap.to(card, {
      autoAlpha: 1,
      xPercent: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sceneCardWrappers[i],
        start: `top ${startOffset}%`,
        end: `top ${endOffset}%`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}

cameraScrollTimeline.to({}, { duration: postSecondPanelDuration });

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
      force3D: true
    });
  }

  gsap.set(statsCards, { autoAlpha: 0, force3D: true });

  const statsCardsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: statsPanel,
      start: 'top 85%',
      end: 'top 35%',
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

}

// --- Resize ---
let resizeDebounce = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastKnownWidth) {
      lastKnownWidth = currentWidth;
      stableVH = window.innerHeight;
      setStableVH();
    }
    resizeWireCanvas();
    computeTitleIntroStartTransform();
    updateTitleIntroTransform(titleIntroAnimState.progress);
    syncInvisiblePanelHeight();
    ScrollTrigger.refresh();
  }, 100);
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    stableVH = window.innerHeight;
    lastKnownWidth = window.innerWidth;
    setStableVH();
    resizeWireCanvas();
    computeTitleIntroStartTransform();
    updateTitleIntroTransform(titleIntroAnimState.progress);
    syncInvisiblePanelHeight();
    ScrollTrigger.refresh();
  }, 200);
});


// --- Main tick ---
gsap.ticker.lagSmoothing(500, 33);

let lastCounterVisible = false;
gsap.ticker.add((time) => {
  drawWires(time);

  if (mobileCounterEl) {
    const shouldShow = scrollState.progress > 0.28;
    if (shouldShow !== lastCounterVisible) {
      lastCounterVisible = shouldShow;
      mobileCounterEl.classList.toggle('is-visible', shouldShow);
    }
  }
});
