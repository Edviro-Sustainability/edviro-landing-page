import * as THREE from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { Text } from 'troika-three-text';
import './style.css';
import wiringVertexShader from './wiringvertex.glsl?raw';
import wiringFragmentShader from './wiringfragment.glsl?raw';
import maskVertexShader from './maskvertex.glsl?raw';
import maskFragmentShader from './maskfragment.glsl?raw';

gsap.registerPlugin(ScrollTrigger);

const MASK_LAYER = 1;

const canvas = document.querySelector('#webgl');
const title = document.querySelector('.title');
const siteLoader = document.querySelector('#site-loader');
const themeToggleButton = document.querySelector('#theme-toggle');
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
const STORAGE_THEME_KEY = 'edviro-theme';
const DEFAULT_THEME_NAME = 'light';
const STREET_LAMP_POSITIONS = [
  new THREE.Vector3(-67.31, 15.5, 72),
  new THREE.Vector3(-44.8, 15.5, 72),
  new THREE.Vector3(-20.78, 15.5, 72),
  new THREE.Vector3(19.85, 15.5, 72),
  new THREE.Vector3(43.87, 15.5, 72),
  new THREE.Vector3(66.38, 15.5, 72)
];

document.body.classList.add('is-site-loading', 'is-scroll-locked');

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

const loadingState = {
  windowLoaded: document.readyState === 'complete',
  schoolLoaded: false,
  wiringLoaded: false
};
let introRevealQueuedUntilLoad = false;

function isInitialLoadComplete() {
  return loadingState.windowLoaded && loadingState.schoolLoaded && loadingState.wiringLoaded;
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

const themeConfig = {
  light: {
    sceneColor: 0xffffff, fogColor: 0xf2fff9, fogDensity: 0.012, floorColor: 0xf9f0f9,
    hemiColor: 0xffffff, hemiGroundColor: 0xcfd8dc, hemiIntensity: 2.0, dirColor: 0xffffff, dirIntensity: 1.9, exposure: 1.0, wireBloomStrength: 0.2,
    streetLampIntensity: 0.0, streetLampColor: 0x000000, streetLampDistance: 0
  },
  dark: {
    sceneColor: 0x050608, fogColor: 0x050608, fogDensity: 0.016, floorColor: 0x3b413d,
    hemiColor: 0x7b899c, hemiGroundColor: 0x020304, hemiIntensity: 0.4, dirColor: 0xffffff, dirIntensity: 0.4, exposure: 1.0, wireBloomStrength: 0.24,
    streetLampIntensity: 0.8, streetLampColor: 0xffd8aa, streetLampDistance: 16
  }
};

const GREEN_PALETTE = {
  deep: 0x0f8339,
  base: 0x16a34a,
  bright: 0x54d36b,
  soft: 0x86efac
};

const TEAM_MEMBER_CONFIG = [
  { id: 'hursh', labelOffsetX: 220, labelOffsetY: -24 },
  { id: 'tanuj', labelOffsetX: 220, labelOffsetY: 22 },
];

let teamOverlayVisible = false;

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
    const dotY = rect.top + rect.height * 0.6;

    const inwardSign = dotX < window.innerWidth * 0.5 ? 1 : -1;
    const labelX = clamp(dotX + inwardSign * config.labelOffsetX, 130, window.innerWidth - 130);
    const labelY = clamp(dotY + config.labelOffsetY, 90, window.innerHeight - 90);

    card.style.left = `${labelX}px`;
    card.style.top = `${labelY}px`;
    card.style.opacity = '1';
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

const scene = new THREE.Scene();
scene.background = new THREE.Color(themeConfig.light.sceneColor);
scene.fog = new THREE.FogExp2(themeConfig.light.fogColor, themeConfig.light.fogDensity);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 7.5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const composer = new EffectComposer(renderer);
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
composer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const dofPass = new BokehPass(scene, camera, { focus: 12.0, aperture: 0.0001 });
composer.addPass(dofPass);

const pixelRatio = Math.min(window.devicePixelRatio, 2);
const fxaaPass = new ShaderPass(FXAAShader);
fxaaPass.material.uniforms.resolution.value.set(
  1 / (window.innerWidth * pixelRatio),
  1 / (window.innerHeight * pixelRatio)
);
composer.addPass(fxaaPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

const renderResolution = new THREE.Vector2();
const maskComposer = new EffectComposer(renderer);
maskComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
maskComposer.setSize(window.innerWidth, window.innerHeight);
maskComposer.renderToScreen = false;
maskComposer.renderTarget1.texture.colorSpace = THREE.SRGBColorSpace;
maskComposer.renderTarget2.texture.colorSpace = THREE.SRGBColorSpace;

const maskRenderPass = new RenderPass(scene, camera);
maskComposer.addPass(maskRenderPass);

const wireBloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  themeConfig.light.wireBloomStrength,
  0.2, 0.1
);
maskComposer.addPass(wireBloomPass);

const hemiLight = new THREE.HemisphereLight(themeConfig.light.hemiColor, themeConfig.light.hemiGroundColor, themeConfig.light.hemiIntensity);
const dirLight = new THREE.DirectionalLight(themeConfig.light.dirColor, themeConfig.light.dirIntensity);
dirLight.position.set(-6, 10, 12);
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.castShadow = true;
dirLight.shadow.radius = 20;
dirLight.shadow.camera.left = -40;
dirLight.shadow.camera.right = 40;
dirLight.shadow.camera.top = 40;
dirLight.shadow.camera.bottom = -40;
dirLight.shadow.camera.far = 40;
dirLight.shadow.camera.updateProjectionMatrix();
scene.add(hemiLight, dirLight); 

const subjectGroup = new THREE.Group();
scene.add(subjectGroup);

const floorMaterial = new THREE.MeshStandardMaterial({ color: themeConfig.light.floorColor });
const floorGeometry = new THREE.PlaneGeometry(164, 164);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, -4, 0);
floor.receiveShadow = true;
scene.add(floor);
const grid = new THREE.GridHelper(160, 60, 0x666666, 0x333333);
grid.position.set(0, -3.99, 0);
scene.add(grid);

let schoolModel = null;
let wiringModel = null;
const schoolMeshes = [];
const schoolNoiseOverlays = [];
const schoolOutlineMaterials = [];
const streetLampPointLights = [];
const schoolOutlineStyle = {
  thresholdAngle: 36,
  linewidth: 3,
  color: { light: 0x777777, dark: 0x333333 }
};

class ConditionalEdgesGeometry extends THREE.EdgesGeometry {
  constructor(geometry, thresholdAngle = schoolOutlineStyle.thresholdAngle) {
    super(geometry, thresholdAngle);
    this.type = 'ConditionalEdgesGeometry';
  }
}

class ConditionalLineSegmentsGeometry extends LineSegmentsGeometry {
  constructor() {
    super();
    this.type = 'ConditionalLineSegmentsGeometry';
  }

  fromConditionalEdgesGeometry(geometry) {
    return this.fromEdgesGeometry(geometry);
  }
}

const wiringElectricMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(GREEN_PALETTE.deep) },
    uColorHot: { value: new THREE.Color(GREEN_PALETTE.bright) },
    uSpeed: { value: 0.2 },
    uPulse: { value: 1.5 },
  },
  vertexShader: wiringVertexShader,
  fragmentShader: wiringFragmentShader,
  transparent: true, depthWrite: false, blending: THREE.NormalBlending
});

const schoolNoiseUniforms = {
  uMaskTexture: { value: maskComposer.readBuffer.texture }, uResolution: { value: renderResolution },
  uTime: { value: 0 }, uNoiseScale: { value: 0.18 }, uNoiseSpeed: { value: 0.8 },
  uNoiseThreshold: { value: 0.25 }, uNoiseSoftness: { value: 0.2 }, uOpacity: { value: 0.9 },
  uPointerScreenPos: { value: new THREE.Vector2(0.5, 0.5) }, uPointerRadius: { value: 0.016 },
  uPointerFeather: { value: 0.12 }, uPointerPeakBoost: { value: 0.3 }, uPointerStrength: { value: 0.0 }
};

const schoolNoiseRevealMaterial = new THREE.ShaderMaterial({
  uniforms: schoolNoiseUniforms,
  vertexShader: maskVertexShader,
  fragmentShader: maskFragmentShader,
  transparent: true, depthTest: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1
});

const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -25), endCameraPos: new THREE.Vector3(8, 4, 26),
  startLookAt: new THREE.Vector3(0, 0, -30), endLookAt: new THREE.Vector3(0, 0, 0)
};
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introDuration = prefersReducedMotion ? 1.35 : 2.55;
const loader = new OBJLoader();
const keyframeTwoEndLookAtOffset = new THREE.Vector3(-36.0, -18.0, -16.0);
const counterFontUrl = '/Avenir Black.ttf';
let counterMaterial = null;
let counterMesh = null;
let counterTopContextMesh = null;
let counterBottomContextMesh = null;
let counterDemoIntervalId = null;
const counterValueState = {
  value: 400000,
  targetValue: 400000,
  displayValue: 400000,
  lastRenderedValue: null
};
const greenMeshThemeStyle = {
  light: { color: GREEN_PALETTE.base, emissive: 0x000000, emissiveIntensity: 0.0 },
  dark: { color: 0x000000, emissive: GREEN_PALETTE.base, emissiveIntensity: 1.0 }
};
let currentThemeName = getInitialThemeName();

function formatCounterValue(value) {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function applyGreenMeshTheme(material, themeName) {
  if (!material) return;
  const style = greenMeshThemeStyle[themeName] ?? greenMeshThemeStyle.light;
  material.color.set(style.color);
  material.emissive.set(style.emissive);
  material.emissiveIntensity = style.emissiveIntensity;
}

function buildCounterTextMesh(label, fontSize, material, options = {}) {
  const textMesh = new Text();
  textMesh.font = counterFontUrl;
  textMesh.fontSize = fontSize;
  textMesh.text = label;
  textMesh.anchorX = options.anchorX ?? 'center';
  textMesh.anchorY = options.anchorY ?? 'middle';
  textMesh.textAlign = options.textAlign ?? 'center';
  if (Number.isFinite(options.maxWidth)) textMesh.maxWidth = options.maxWidth;
  if (Number.isFinite(options.lineHeight)) textMesh.lineHeight = options.lineHeight;
  if (Number.isFinite(options.letterSpacing)) textMesh.letterSpacing = options.letterSpacing;
  if (options.whiteSpace) textMesh.whiteSpace = options.whiteSpace;
  textMesh.material = material;
  textMesh.frustumCulled = false;
  textMesh.sync();
  return textMesh;
}

function setCounterTextVisibility(isVisible) {
  if (counterMesh) counterMesh.visible = isVisible;
  if (counterTopContextMesh) counterTopContextMesh.visible = isVisible;
  if (counterBottomContextMesh) counterBottomContextMesh.visible = isVisible;
}

function renderCounterValue() {
  if (!counterMesh) return;
  const roundedValue = Math.round(counterValueState.displayValue);
  if (roundedValue === counterValueState.lastRenderedValue) return;
  counterValueState.lastRenderedValue = roundedValue;
  counterMesh.text = formatCounterValue(roundedValue);
  counterMesh.sync();
}

function setCounterValue(nextValue, options = {}) {
  const safeValue = Number.isFinite(nextValue) ? Math.max(0, nextValue) : counterValueState.targetValue;
  const duration = Number.isFinite(options.duration) ? options.duration : 0.82;
  const ease = options.ease ?? 'power2.out';

  counterValueState.value = safeValue;
  counterValueState.targetValue = safeValue;
  gsap.killTweensOf(counterValueState, 'displayValue');
  gsap.to(counterValueState, {
    displayValue: safeValue,
    duration,
    ease,
    onUpdate: renderCounterValue
  });
}

function incrementCounterValue(delta, options = {}) {
  setCounterValue(counterValueState.targetValue + delta, options);
}

// TODO: Hook up counter API

function applyCounterApiPayload(payload, options = {}) {
  const apiValue = Number(payload?.total ?? payload?.count ?? payload?.value);
  if (!Number.isFinite(apiValue)) return;
  setCounterValue(apiValue, options);
}

function startCounterDemo() {
  if (counterDemoIntervalId) return;
  counterDemoIntervalId = window.setInterval(() => {
    const randomIncrement = Math.floor(100 + Math.random() * 100);
    incrementCounterValue(randomIncrement, { duration: 0.74, ease: 'power2.out' });
  }, 1000);
}

function stopCounterDemo() {
  if (!counterDemoIntervalId) return;
  window.clearInterval(counterDemoIntervalId);
  counterDemoIntervalId = null;
}

window.sceneCounter = {
  setValue: setCounterValue,
  increment: incrementCounterValue,
  applyApiPayload: applyCounterApiPayload,
  startDemo: startCounterDemo,
  stopDemo: stopCounterDemo
};

function addCounter() {
  const textMaterial = new THREE.MeshStandardMaterial({
    color: greenMeshThemeStyle.light.color,
    emissive: greenMeshThemeStyle.light.emissive,
    emissiveIntensity: greenMeshThemeStyle.light.emissiveIntensity,
    side: THREE.DoubleSide
  });
  counterMaterial = textMaterial;
  applyGreenMeshTheme(counterMaterial,currentThemeName);

  counterMesh = buildCounterTextMesh(formatCounterValue(counterValueState.displayValue), 1.0, textMaterial);
  counterTopContextMesh = buildCounterTextMesh('OVER', 0.32, textMaterial);
  counterBottomContextMesh = buildCounterTextMesh('SAVED', 0.32, textMaterial);

  const textPosition = introState.endLookAt.clone().add(keyframeTwoEndLookAtOffset);

  counterMesh.position.copy(textPosition);
  counterMesh.position.y = -3.9;
  counterMesh.rotation.x = -Math.PI / 2;

  counterTopContextMesh.position.copy(textPosition);
  counterTopContextMesh.position.y = -3.9;
  counterTopContextMesh.position.z += -1;
  counterTopContextMesh.rotation.x = -Math.PI / 2;

  counterBottomContextMesh.position.copy(textPosition);
  counterBottomContextMesh.position.y = -3.9;
  counterBottomContextMesh.position.z += 1;
  counterBottomContextMesh.rotation.x = -Math.PI / 2;

  setCounterTextVisibility(false);

  subjectGroup.add(counterMesh);
  subjectGroup.add(counterTopContextMesh);
  subjectGroup.add(counterBottomContextMesh);
  renderCounterValue();
  startCounterDemo();
}

addCounter();

const schoolMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const treeMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const woodMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const rimMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const materialThemeColors = {
  school: { light: 0xffffff, dark: 0xcbcfcb }, windows: { light: 0x71c1cf, dark: 0xfffcc9 },
  tree: { light: GREEN_PALETTE.base, dark: GREEN_PALETTE.bright }, pole: { light: 0xc7c7c7, dark: 0xbbc4cd },
  wood: { light: 0xa38764, dark: 0x987a5d }, rim: { light: 0x898f89, dark: 0x8c8e8c }
};
const windowEmission = {
  light: { color: 0x000000, intensity: 0.0 }, dark: { color: 0xffe2b7, intensity: 0.7 }
};

function getInitialThemeName() {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_THEME_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  } catch {}
  return DEFAULT_THEME_NAME;
}

function createStreetLampLights(lightsMesh) {
  if (!lightsMesh || streetLampPointLights.length > 0) return;

  const centers = STREET_LAMP_POSITIONS.map((center) => center.clone());

  for (const center of centers) {
    const pointLight = new THREE.PointLight(themeConfig.dark.streetLampColor, 0, themeConfig.dark.streetLampDistance, 2);
    pointLight.position.copy(center);
    pointLight.position.y -= 2.0;
    pointLight.visible = false;
    pointLight.castShadow = true;
    lightsMesh.add(pointLight);
    streetLampPointLights.push(pointLight);
  }
}

function createSchoolMeshOutline(mesh) {
  if (!mesh?.isMesh || !mesh.geometry) return null;

  const outlineSourceGeometry = mergeVertices(mesh.geometry.clone(), 1e-4);
  const conditionalEdges = new ConditionalEdgesGeometry(outlineSourceGeometry);
  const positionAttribute = conditionalEdges.getAttribute('position');
  if (!positionAttribute || positionAttribute.count === 0) {
    outlineSourceGeometry.dispose();
    conditionalEdges.dispose();
    return null;
  }

  const conditionalLineGeometry = new ConditionalLineSegmentsGeometry();
  conditionalLineGeometry.fromConditionalEdgesGeometry(conditionalEdges);
  outlineSourceGeometry.dispose();
  conditionalEdges.dispose();

  const outlineMaterial = new LineMaterial({
    linewidth: schoolOutlineStyle.linewidth,
    color: schoolOutlineStyle.color[currentThemeName],
    transparent: false,
    opacity: 1.0,
    depthTest: true,
    depthWrite: false,
    fog: true
  });
  outlineMaterial.resolution.set(window.innerWidth, window.innerHeight);

  const outline = new LineSegments2(conditionalLineGeometry, outlineMaterial);
  outline.name = `${mesh.name || 'mesh'}Outline`;
  outline.frustumCulled = false;
  outline.renderOrder = 975;
  outline.layers.mask = mesh.layers.mask;
  mesh.add(outline);

  schoolOutlineMaterials.push(outlineMaterial);
  return outline;
}

function applyMaterialTheme(themeName) {
  schoolMaterial.color.set(materialThemeColors.school[themeName]);
  windowMaterial.color.set(materialThemeColors.windows[themeName]);
  windowMaterial.emissive.set(windowEmission[themeName].color);
  windowMaterial.emissiveIntensity = windowEmission[themeName].intensity;
  treeMaterial.color.set(materialThemeColors.tree[themeName]);
  poleMaterial.color.set(materialThemeColors.pole[themeName]);
  woodMaterial.color.set(materialThemeColors.wood[themeName]);
  rimMaterial.color.set(materialThemeColors.rim[themeName]);
}

function updateThemeToggleButton(themeName) {
  if (!themeToggleButton) return;
  const nextThemeName = themeName === 'dark' ? 'light' : 'dark';
  themeToggleButton.setAttribute('aria-label', `Switch to ${nextThemeName} mode`);
  themeToggleButton.setAttribute('aria-pressed', themeName === 'dark' ? 'true' : 'false');
}

function applyTheme(nextThemeName, options = {}) {
  const normalizedThemeName = nextThemeName === 'dark' ? 'dark' : 'light';
  const shouldPersist = options.persist !== false;
  const theme = themeConfig[normalizedThemeName];

  currentThemeName = normalizedThemeName;
  document.body.dataset.theme = normalizedThemeName;
  scene.background = new THREE.Color(theme.sceneColor);
  if (scene.fog) {
    scene.fog.color.set(theme.fogColor);
    scene.fog.density = theme.fogDensity;
  }
  floorMaterial.color.set(theme.floorColor);
  hemiLight.color.set(theme.hemiColor);
  hemiLight.groundColor.set(theme.hemiGroundColor);
  hemiLight.intensity = theme.hemiIntensity;
  dirLight.color.set(theme.dirColor);
  dirLight.intensity = theme.dirIntensity;
  dirLight.position.z = normalizedThemeName === 'dark' ? 12 : 6;
  renderer.toneMappingExposure = theme.exposure;
  wireBloomPass.strength = theme.wireBloomStrength;

  applyMaterialTheme(normalizedThemeName);
  applyGreenMeshTheme(counterMaterial,normalizedThemeName);
  for (const outlineMaterial of schoolOutlineMaterials) {
    outlineMaterial.color.set(schoolOutlineStyle.color[normalizedThemeName]);
  }

  for (const pointLight of streetLampPointLights) {
    pointLight.color.set(theme.streetLampColor);
    pointLight.intensity = theme.streetLampIntensity;
    pointLight.distance = theme.streetLampDistance;
    pointLight.visible = normalizedThemeName === 'dark';
  }

  updateThemeToggleButton(normalizedThemeName);

  if (shouldPersist) {
    try { window.localStorage.setItem(STORAGE_THEME_KEY, normalizedThemeName); } catch (e) { console.warn(e); }
  }
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    applyTheme(currentThemeName === 'dark' ? 'light' : 'dark');
  });
}
applyTheme(currentThemeName, { persist: false });

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  const modelMeshes = [];
  let lightsMesh = null;
  schoolModel.traverse((child) => {
    if (child.isMesh) modelMeshes.push(child);
  });

  for (const mesh of modelMeshes) {
    const isWireMesh = mesh.name.startsWith("Wire");
    const isTreeMesh = mesh.name.startsWith("Tree");
    const isPoleMesh = mesh.name.startsWith("Pole");
    const isTrunkMesh = mesh.name.startsWith("Trunk");
    const isTreeOrPoleMesh = isTreeMesh || isPoleMesh || isTrunkMesh;
    if (mesh.name === 'Lights') lightsMesh = mesh;

    const materialMap = {
      Windows: windowMaterial, School: schoolMaterial, Lights: poleMaterial,
      Rim: rimMaterial, TopRim: rimMaterial, BottomRim: rimMaterial, NameRim: rimMaterial, Fence: rimMaterial
    };

    mesh.material = isWireMesh ? wiringElectricMaterial :
      isTreeMesh ? treeMaterial :
      isPoleMesh || isTrunkMesh ? woodMaterial : (materialMap[mesh.name] || schoolMaterial);
    
    mesh.castShadow = !isWireMesh;
    mesh.receiveShadow = !isWireMesh;
    if (isWireMesh) mesh.layers.enable(MASK_LAYER);
    if (!isTreeOrPoleMesh) createSchoolMeshOutline(mesh);

    if (!isTreeOrPoleMesh) {
      const noiseOverlay = new THREE.Mesh(mesh.geometry, schoolNoiseRevealMaterial);
      noiseOverlay.renderOrder = 950; noiseOverlay.castShadow = false; noiseOverlay.receiveShadow = false;
      mesh.add(noiseOverlay);
      schoolNoiseOverlays.push(noiseOverlay);
    }
    schoolMeshes.push(mesh);
  }
  createStreetLampLights(lightsMesh);

  schoolModel.scale.setScalar(0.12);
  schoolModel.position.set(0, -4, 0);

  subjectGroup.add(schoolModel);
  applyTheme(currentThemeName, { persist: false });
  markLoadComplete('schoolLoaded');
}, undefined, (error) => {
  console.error('Failed to load school model:', error);
  markLoadComplete('schoolLoaded');
});

loader.load('/wiring.obj', (loadedModel) => {
  wiringModel = loadedModel;
  wiringModel.scale.setScalar(0.12);
  wiringModel.position.set(0, -4, 0);

  wiringModel.traverse((child) => {
    if (!child.isMesh) return;
    child.material = wiringElectricMaterial;
    child.castShadow = false; child.receiveShadow = false;
    child.layers.set(MASK_LAYER); 
  });
  subjectGroup.add(wiringModel);
  markLoadComplete('wiringLoaded');
}, undefined, (error) => {
  console.error('Failed to load wiring:', error);
  markLoadComplete('wiringLoaded');
});

const pointerCurrent = { x: 0, y: 0 };
const pointerXTo = gsap.quickTo(pointerCurrent, 'x', { duration: 0.6, ease: 'power3.out' });
const pointerYTo = gsap.quickTo(pointerCurrent, 'y', { duration: 0.6, ease: 'power3.out' });
const pointerStrengthTo = gsap.quickTo(schoolNoiseUniforms.uPointerStrength, 'value', { duration: 0.6, ease: 'power2.out' });

window.addEventListener('pointermove', (event) => {
  pointerXTo((event.clientX / window.innerWidth) * 2 - 1);
  pointerYTo(-(event.clientY / window.innerHeight) * 2 + 1);
  pointerStrengthTo(1.0);
});

window.addEventListener('pointerleave', () => {
  pointerXTo(0);
  pointerYTo(0);
  pointerStrengthTo(0.0);
});

const parallaxSettings = { cameraX: 0.9, cameraY: 0.9, groupX: 0.08, groupY: 0.05 };
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const NORTH = new THREE.Vector3(0, 0, -1);
const maskBackground = new THREE.Color(0x000000);

function renderWireMask() {
  if (schoolMeshes.length === 0) return;
  const previousBackground = scene.background;
  const previousShadowMapEnabled = renderer.shadowMap.enabled;
  
  scene.background = maskBackground;
  renderer.shadowMap.enabled = false;
  camera.layers.set(MASK_LAYER);
  
  maskComposer.render();
  schoolNoiseUniforms.uMaskTexture.value = maskComposer.readBuffer.texture;
  
  camera.layers.set(0); 
  renderer.shadowMap.enabled = previousShadowMapEnabled;
  scene.background = previousBackground;
}

const scrollState = {
  progress: 0,
  cameraOffsetX: 0, cameraOffsetY: 0, cameraOffsetZ: 0,
  lookAtOffsetX: 0, lookAtOffsetY: 0, lookAtOffsetZ: 0,
  gridDownLock: 0
};
const parallaxScrollState = { multiplier: 1 };
const introAnimState = { progress: 0 };
const introCamera = introState.startCameraPos.clone();
const introLookAt = introState.startLookAt.clone();
const titleIntroState = { offsetX: 0, offsetY: 0, startScale: 2.3, endYOffset: 0 };
const titleIntroAnimState = { progress: 0 };
const introLeadTextLines = gsap.utils.toArray('.text-reveal-line--lead');
const introBrandLine = document.querySelector('.title .text-gradient');
const introSubtitleLine = document.querySelector('.text-reveal-line--subtitle');
const introUnlockState = { cameraIntroDone: false, textRevealDone: false, scrollUnlocked: false };
let introCameraStarted = false;
let introBrandRevealStarted = false;

let lenis = null;

function maybeUnlockScroll() {
  if (!lenis) return;
  if (introUnlockState.scrollUnlocked) return;
  if (!introUnlockState.cameraIntroDone || !introUnlockState.textRevealDone) return;

  introUnlockState.scrollUnlocked = true;
  document.body.classList.remove('is-scroll-locked');
  resetScrollPosition();
  lenis.start();
  lenis.scrollTo(0, { immediate: true, force: true });
  syncInvisiblePanelHeight();
  ScrollTrigger.refresh();
}

function markTextRevealComplete() {
  introUnlockState.textRevealDone = true;
  maybeUnlockScroll();
}

function startIntroCameraAnimation() {
  if (introCameraStarted) return;
  introCameraStarted = true;
  introTl.play(0);
}

function playIntroBrandReveal() {
  if (introBrandRevealStarted) return;
  introBrandRevealStarted = true;

  if (!title || !introBrandLine) {
    markTextRevealComplete();
    startIntroCameraAnimation();
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
      opacity: 0,
      filter: 'blur(4px)',
      duration: leadExitDuration,
      ease: 'power2.out'
    })
    .to({}, { duration: brandRevealDelay })

    .add(() => {
      title.classList.add('is-brand-phase');
      computeTitleIntroStartTransform();
      updateTitleIntroTransform(titleIntroAnimState.progress);
      
      gsap.set(introBrandLine, {
        yPercent: 115,
        opacity: 0,
        filter: 'blur(2px)'
      });

      if (introSubtitleLine) {
        gsap.set(introSubtitleLine, {
          yPercent: 55,
          opacity: 0,
          filter: 'blur(2px)'
        });
      }
    })

    .to(
      introBrandLine,
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: brandRevealDuration,
        ease: 'power3.out',
        onStart: () => {
          gsap.delayedCall(brandToCameraDelay, startIntroCameraAnimation);
        }
      }
    );
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

const mapScrollToZ = gsap.utils.pipe(gsap.utils.clamp(0, 1), gsap.utils.mapRange(0, 1, 7.5, 5.8));
const mapScrollToX = gsap.utils.pipe(gsap.utils.clamp(0, 1), gsap.utils.mapRange(0, 1, 0, 0.5));

function computeTitleIntroStartTransform() {
  if (!title) return;
  const previousTransform = title.style.transform;
  title.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
  const rect = title.getBoundingClientRect();
  title.style.transform = previousTransform;

  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.5;
  titleIntroState.offsetX = window.innerWidth * 0.5 - centerX;
  titleIntroState.offsetY = window.innerHeight * 0.5 - centerY;

  const desiredStartScale = window.innerWidth <= 768 ? 2.15 : 2.8;
  titleIntroState.startScale = desiredStartScale;
  titleIntroState.endYOffset = 0;
}

function updateRenderResolution() {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderResolution.set(Math.floor(window.innerWidth * pixelRatio), Math.floor(window.innerHeight * pixelRatio));
  maskComposer.setPixelRatio(pixelRatio);
  maskComposer.setSize(window.innerWidth, window.innerHeight);
}

updateRenderResolution();
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
    introUnlockState.cameraIntroDone = true;
    maybeUnlockScroll();
  }
});

introTl.to(introAnimState, { progress: 1, duration: introDuration, ease: "power3.inOut" }, 0)
  .to(introCamera, { x: introState.endCameraPos.x, y: introState.endCameraPos.y, z: introState.endCameraPos.z, duration: introDuration, ease: "power3.inOut" }, 0)
  .to(introLookAt, { x: introState.endLookAt.x, y: introState.endLookAt.y, z: introState.endLookAt.z, duration: introDuration, ease: "power3.inOut" }, 0)
  .to(titleIntroAnimState, {
    progress: 1,
    duration: introDuration,
    ease: "power3.inOut",
    onUpdate: () => updateTitleIntroTransform(titleIntroAnimState.progress)
  }, 0);

if (introSubtitleLine) {
  introTl.to(introSubtitleLine, {
    yPercent: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: prefersReducedMotion ? 0.4 : 0.7,
    ease: 'power2.out'
  }, introDuration * 0.4);
}

const setTitleX = title ? gsap.quickSetter(title, 'x', 'px') : null;
const setTitleY = title ? gsap.quickSetter(title, 'y', 'px') : null;
const setTitleScale = title ? gsap.quickSetter(title, 'scale') : null;

if (title) {
  gsap.set(title, {
    transformOrigin: '50% 50%',
    force3D: true
  });
}

function updateTitleIntroTransform(progress) {
  if (!setTitleX || !setTitleY || !setTitleScale) return;
  const p = gsap.utils.clamp(0, 1, progress);
  const x = gsap.utils.interpolate(titleIntroState.offsetX, 0, p);
  const y = gsap.utils.interpolate(titleIntroState.offsetY, titleIntroState.endYOffset, p);
  const scale = gsap.utils.interpolate(titleIntroState.startScale, 1, p);
  setTitleX(x);
  setTitleY(y);
  setTitleScale(scale);
}

updateTitleIntroTransform(titleIntroAnimState.progress);

lenis = new Lenis({
  duration: prefersReducedMotion ? 1.1 : 3.0, smoothWheel: true, smoothTouch: true
});

lenis.on('scroll', ScrollTrigger.update);
lenis.stop();
lenis.scrollTo(0, { immediate: true, force: true });
bindIntroTextRevealUnlock();
maybeUnlockScroll();

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
        const st = cameraScrollTimeline.scrollTrigger;
        const scrollProgress = 0.62 / cameraScrollTimeline.totalDuration();
        const target = st.start + scrollProgress * (st.end - st.start);
        lenis.scrollTo(target, { duration: prefersReducedMotion ? 1.2 : 2.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
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

cameraScrollTimeline.to(scrollState, {
  keyframes: [
    {
      cameraOffsetX: -32.8, cameraOffsetY: -1.64, cameraOffsetZ: -34.44,
      lookAtOffsetX: -42.64, lookAtOffsetY: 0, lookAtOffsetZ: -42.64, gridDownLock: 0,
      duration: 0.82 * CAMERA_SECTION_SCALE,
      ease: 'none'
    },
    {
      cameraOffsetX: -44.0, cameraOffsetY: -1.5, cameraOffsetZ: -42.0,
      lookAtOffsetX: -36.0, lookAtOffsetY: -18.0, lookAtOffsetZ: -16.0, gridDownLock: 1,
      duration: 0.18 * CAMERA_SECTION_SCALE,
      ease: 'sine.out'
    }
  ]
});

cameraScrollTimeline.to(parallaxScrollState, {
  multiplier: 0,
  duration: 0.4 * CAMERA_SECTION_SCALE
}, 0);

if (scrollPhraseWords.length > 0) {
  const phraseWordsStart = 0.05 * CAMERA_SECTION_SCALE;
  const phraseExitStart = 0.4 * CAMERA_SECTION_SCALE;
  const phraseOverlayExitStart = 0.5 * CAMERA_SECTION_SCALE;
  const getPhraseStartYOffset = () => -window.innerHeight * 0.36;

  gsap.set(scrollPhraseOverlay, { autoAlpha: 0 });
  gsap.set(scrollPhraseWords, {
    autoAlpha: 0,
    y: () => getPhraseStartYOffset(),
    scale: prefersReducedMotion ? 1 : 0.92,
    rotateZ: (index) => (index % 2 === 0 ? -2.4 : 2.4),
    force3D: true
  });

  cameraScrollTimeline
    .to(scrollPhraseOverlay, {
      autoAlpha: 1,
      duration: (prefersReducedMotion ? 0.02 : 0.04) * CAMERA_SECTION_SCALE
    }, 0.0)
    .to(scrollPhraseWords, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      duration: (prefersReducedMotion ? 0.045 : 0.075) * CAMERA_SECTION_SCALE,
      ease: 'power3.out',
      stagger: (prefersReducedMotion ? 0.015 : 0.03) * CAMERA_SECTION_SCALE
    }, phraseWordsStart);

  cameraScrollTimeline
    .to(scrollPhraseWords, {
      autoAlpha: 0,
      yPercent: -45,
      scale: prefersReducedMotion ? 1 : 0.95,
      duration: (prefersReducedMotion ? 0.05 : 0.09) * CAMERA_SECTION_SCALE,
      ease: 'power2.in',
      stagger: { each: (prefersReducedMotion ? 0.01 : 0.016) * CAMERA_SECTION_SCALE, from: 'end' }
    }, phraseExitStart)
    .to(scrollPhraseOverlay, {
      autoAlpha: 0,
      duration: (prefersReducedMotion ? 0.03 : 0.05) * CAMERA_SECTION_SCALE
    }, phraseOverlayExitStart);
}

if (sceneCards.length === 3) {
  const cardOverlayStart = 0.25 * CAMERA_SECTION_SCALE;
  const cardStarts = [0.52, 0.62, 0.72].map(v => v * CAMERA_SECTION_SCALE);

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
    const compact = window.innerWidth <= 768;
    const w = window.innerWidth;
    const h = window.innerHeight;
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
    console.log(baseStyle);

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
    autoAlpha: 0,
    filter: 'blur(4px)',
    force3D: true,
    willChange: 'transform, opacity, filter'
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
          { autoAlpha: 1, duration: 0.08 * CAMERA_SECTION_SCALE },
          { autoAlpha: 0, duration: 0.06 * CAMERA_SECTION_SCALE }
        ]
      }, start)
      .to(card, {
        keyframes: [
          { filter: 'blur(0px)', duration: 0.04 * CAMERA_SECTION_SCALE },
          { filter: 'blur(0px)', duration: 0.08 * CAMERA_SECTION_SCALE },
          { filter: 'blur(6px)', duration: 0.06 * CAMERA_SECTION_SCALE }
        ]
      }, start);
  });

  cameraScrollTimeline.to(sceneCardsOverlay, { autoAlpha: 0, duration: 0.06 * CAMERA_SECTION_SCALE }, 0.94 * CAMERA_SECTION_SCALE);
  }

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

if (statsPanel && statsCards.length === 3) {
  const isCompactStatsLayout = () => window.innerWidth <= 980;
  const statsCardEntryOffsets = [
    {
      x: () => (isCompactStatsLayout() ? 0 : -170),
      y: () => (isCompactStatsLayout() ? 62 : 72),
      rotateZ: () => (isCompactStatsLayout() ? 0 : -6)
    },
    {
      x: 0,
      y: () => (isCompactStatsLayout() ? 78 : 102),
      rotateZ: 0
    },
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

  gsap.set(statsCards, {
    autoAlpha: 0,
    force3D: true,
    willChange: 'transform, opacity'
  });

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
      {
        autoAlpha: 0,
        y: () => (window.innerWidth <= 768 ? 34 : 56),
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        duration: 0.2
      },
      "+=0.3"
    );
  }

  const statsCardsStartOffset = prefersReducedMotion ? 0.02 : 0.18;

  statsCards.forEach((card, index) => {
    const entryOffset = statsCardEntryOffsets[index];
    statsCardsTimeline.fromTo(card,
      {
        autoAlpha: 0,
        x: entryOffset.x,
        y: entryOffset.y,
        rotateZ: entryOffset.rotateZ
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotateZ: 0,
        duration: prefersReducedMotion ? 0.12 : 0.3,
        ease: 'none'
      },
      statsCardsStartOffset + (index * (prefersReducedMotion ? 0.02 : 0.09))
    );
  });
}

if (teamPanel) {
  ScrollTrigger.create({
    trigger: teamPanel,
    start: 'top 76%',
    end: 'bottom 18%',
    onToggle: (self) => setTeamOverlayVisible(self.isActive)
  });
}

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
    return 75
      + 28 * Math.sin(p * Math.PI * 3.6 + t * 0.7)
      + 14 * Math.sin(p * Math.PI * 7.2 + t * 1.1)
      + 7  * Math.cos(p * Math.PI * 1.8 + t * 0.4);
  }

  function lightingY(x, t) {
    const p = x / CHART_W;
    return 75
      + 20 * Math.sin(p * Math.PI * 2.4 + t * 0.5)
      + 10 * Math.cos(p * Math.PI * 5.1 + t * 0.8)
      + 5  * Math.sin(p * Math.PI * 8.4 + t * 1.3);
  }

  function equipmentY(x, t) {
    const p = x / CHART_W;
    return 75
      + 15 * Math.sin(p * Math.PI * 4.8 + t * 0.9)
      + 8  * Math.sin(p * Math.PI * 9.6 + t * 1.4)
      + 4  * Math.cos(p * Math.PI * 2.7 + t * 0.6);
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
    const h  = buildPaths(hvacY, t);
    const l  = buildPaths(lightingY, t);
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
    const areaMap  = { hvac: areaHvac,  lighting: areaLighting,  equipment: areaEquipment  };
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
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: updateMeterTilt
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
        duration: 0.55,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: updateMeterTilt,
        onComplete: () => { energyMeterWrapper.style.transform = ''; }
      });
    });
  }
}

const scrollHeight = -29.5; // bigger -> faster, smaller -> slower
cameraScrollTimeline.to(scrollState, {
  cameraOffsetX: -44.0, cameraOffsetY: -1.5, cameraOffsetZ: scrollHeight,
  lookAtOffsetX: -36.0, lookAtOffsetY: 0.0, lookAtOffsetZ: scrollHeight + 26.0,
  gridDownLock: 1,
  duration: postSecondPanelDuration
});

window.addEventListener('resize', () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(window.innerWidth, window.innerHeight);
  dofPass.setSize(window.innerWidth, window.innerHeight);
  wireBloomPass.setSize(window.innerWidth, window.innerHeight);
  fxaaPass.material.uniforms.resolution.value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));
  for (const outlineMaterial of schoolOutlineMaterials) {
    outlineMaterial.resolution.set(window.innerWidth, window.innerHeight);
  }

  updateRenderResolution();
  computeTitleIntroStartTransform();
  updateTitleIntroTransform(titleIntroAnimState.progress);
  syncInvisiblePanelHeight();
  ScrollTrigger.refresh();
});

const teamDriftCards = Array.from(document.querySelectorAll('.team-grid__card[data-member]'));
const teamDriftPhases = [0.0, 2.1];

gsap.ticker.lagSmoothing(0);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);

  if (!prefersReducedMotion) {
    teamDriftCards.forEach((card, i) => {
      const t = time + teamDriftPhases[i];
      const tiltX = Math.sin(t * 0.6) * 3;
      const tiltY = Math.sin(t * 0.8) * 4.5;
      card.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
  }

  wiringElectricMaterial.uniforms.uTime.value = time;
  schoolNoiseUniforms.uTime.value = time;

  schoolNoiseUniforms.uPointerScreenPos.value.set(
    pointerCurrent.x * 0.5 + 0.5,
    pointerCurrent.y * 0.5 + 0.5
  );

  const parallaxX = pointerCurrent.x * parallaxScrollState.multiplier;
  const parallaxY = pointerCurrent.y * parallaxScrollState.multiplier;
  const cameraParallaxX = parallaxX * parallaxSettings.cameraX;
  const cameraParallaxY = parallaxY * parallaxSettings.cameraY;
  const counterAndTeamVisible = scrollState.cameraOffsetX <= -32.5;

  subjectGroup.position.x = -parallaxX * parallaxSettings.groupX;
  subjectGroup.position.y = -parallaxY * parallaxSettings.groupY;
  setCounterTextVisibility(counterAndTeamVisible);

  if (schoolModel) {
    schoolModel.visible = introCameraStarted;
    const scrollInfluence = introAnimState.progress;

    const cameraWorldX = introCamera.x + (scrollState.cameraOffsetX * scrollInfluence) + cameraParallaxX;
    const cameraWorldY = introCamera.y + (scrollState.cameraOffsetY * scrollInfluence) + cameraParallaxY;
    const cameraWorldZ = introCamera.z + (scrollState.cameraOffsetZ * scrollInfluence);
    const lookAtWorldX = introLookAt.x + (scrollState.lookAtOffsetX * scrollInfluence);
    const lookAtWorldY = introLookAt.y + (scrollState.lookAtOffsetY * scrollInfluence);
    const lookAtWorldZ = introLookAt.z + (scrollState.lookAtOffsetZ * scrollInfluence);

    camera.up.copy(WORLD_UP).lerp(NORTH, scrollState.gridDownLock).normalize();
    camera.position.set(cameraWorldX, cameraWorldY, cameraWorldZ);
    camera.lookAt(lookAtWorldX, lookAtWorldY, lookAtWorldZ);
  } else {
    camera.up.copy(WORLD_UP);
    camera.position.set(
      mapScrollToX(scrollState.progress) + cameraParallaxX,
      0.5 + cameraParallaxY,
      mapScrollToZ(scrollState.progress)
    );
    camera.lookAt(
      introState.endLookAt.x,
      introState.endLookAt.y,
      introState.endLookAt.z
    );
  }

  updateTeamCardAnchors();

  if (schoolNoiseOverlays.length > 0) renderWireMask();

  composer.render();
});
