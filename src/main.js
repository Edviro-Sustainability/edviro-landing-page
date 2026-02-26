import * as THREE from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
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
const STORAGE_THEME_KEY = 'edviro-theme';
const DEFAULT_THEME_NAME = 'light';
const STREET_LAMP_FALLBACK_POSITIONS = [
  new THREE.Vector3(-67.31, 15.5, 71.74),
  new THREE.Vector3(-44.8, 15.5, 71.74),
  new THREE.Vector3(-20.78, 15.5, 71.74),
  new THREE.Vector3(19.85, 15.5, 71.74),
  new THREE.Vector3(43.87, 15.5, 71.74),
  new THREE.Vector3(66.38, 15.5, 71.74)
];

document.body.classList.add('is-site-loading');
document.body.classList.add('is-scroll-locked');

function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

try {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
} catch {}

resetScrollPosition();
window.addEventListener('load', resetScrollPosition, { once: true });

const loadingState = {
  windowLoaded: document.readyState === 'complete',
  schoolLoaded: false,
  wiringLoaded: false
};

function markLoadComplete(key) {
  loadingState[key] = true;
  if (loadingState.windowLoaded && loadingState.schoolLoaded && loadingState.wiringLoaded) {
    document.body.classList.remove('is-site-loading');
    siteLoader?.setAttribute('aria-hidden', 'true');
  }
}

if (!loadingState.windowLoaded) {
  window.addEventListener('load', () => markLoadComplete('windowLoaded'), { once: true });
}

const themeConfig = {
  light: {
    sceneColor: 0xf9f0f9, fogColor: 0xf9f0f9, fogDensity: 0.012, floorColor: 0xf9f0f9,
    hemiColor: 0xffffff, hemiGroundColor: 0xcfd8dc, hemiIntensity: 2.0, dirColor: 0xffffff,
    dirIntensity: 1.9, exposure: 1.05, maskWireColor: 0x666666, wireBloomStrength: 0.24,
    streetLampIntensity: 0.0, streetLampColor: 0xffd7ad, streetLampDistance: 16
  },
  dark: {
    sceneColor: 0x050608, fogColor: 0x050608, fogDensity: 0.018, floorColor: 0x3b413d,
    hemiColor: 0x7b899c, hemiGroundColor: 0x020304, hemiIntensity: 0.4, dirColor: 0xffffff,
    dirIntensity: 0.7, exposure: 0.96, maskWireColor: 0x555555, wireBloomStrength: 0.24,
    streetLampIntensity: 0.8, streetLampColor: 0xffd8aa, streetLampDistance: 16
  }
};

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

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);

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
dirLight.position.set(0, 5, 3);
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.castShadow = true;
dirLight.shadow.radius = 20;
dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;
dirLight.shadow.camera.far = 40;
dirLight.shadow.camera.updateProjectionMatrix();
scene.add(hemiLight, dirLight); 

const subjectGroup = new THREE.Group();
scene.add(subjectGroup);

let floor = null;
const floorMaterial = new THREE.MeshStandardMaterial({ color: themeConfig.light.floorColor });
const floorGeometry = new THREE.PlaneGeometry(164, 164);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, -4, 0);
floor.receiveShadow = true;
scene.add(floor);
const grid = new THREE.GridHelper(160, 40, 0x444444, 0x222222);
grid.position.set(0, -3.99, 0);
scene.add(grid);

let schoolModel = null;
let wiringModel = null;
const schoolMeshes = [];
const outlineMeshes = [];
const schoolMaskWireframes = [];
const schoolNoiseOverlays = [];
const streetLampPointLights = [];

const schoolMaskWireframeMaterial = new THREE.LineBasicMaterial({
  color: themeConfig.light.maskWireColor, linewidth: 3, transparent: false, opacity: 1.0,
  toneMapped: false, fog: false, depthTest: false, depthWrite: false
});

const wiringElectricMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(0x167437) },
    uColorHot: { value: new THREE.Color(0x54d36b) },
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
  uNoiseThreshold: { value: 0.2 }, uNoiseSoftness: { value: 0.2 }, uOpacity: { value: 0.9 },
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

const schoolMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const treeMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const woodMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const rimMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
const materialThemeColors = {
  school: { light: 0xffffff, dark: 0xcbcfcb }, windows: { light: 0x71c1cf, dark: 0xfffcc9 },
  tree: { light: 0x44af60, dark: 0x52c878 }, pole: { light: 0xc7c7c7, dark: 0xbbc4cd },
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

function toVertexKey(x, y, z) {
  return `${Math.round(x * 1000)}|${Math.round(y * 1000)}|${Math.round(z * 1000)}`;
}

function extractDisconnectedComponentCenters(geometry) {
  const positionAttribute = geometry?.getAttribute('position');
  if (!positionAttribute || positionAttribute.count < 3) return [];

  const indexAttribute = geometry.index;
  const rawVertexCount = indexAttribute ? indexAttribute.count : positionAttribute.count;
  const triangleCount = Math.floor(rawVertexCount / 3);
  if (triangleCount <= 0) return [];

  const faceVertexKeys = new Array(triangleCount);
  const vertexToFaces = new Map();
  const keyToPosition = new Map();

  for (let faceIndex = 0; faceIndex < triangleCount; faceIndex++) {
    const keys = [];
    for (let corner = 0; corner < 3; corner++) {
      const baseIndex = faceIndex * 3 + corner;
      const vertexIndex = indexAttribute ? indexAttribute.getX(baseIndex) : baseIndex;
      const x = positionAttribute.getX(vertexIndex); const y = positionAttribute.getY(vertexIndex); const z = positionAttribute.getZ(vertexIndex);
      const key = toVertexKey(x, y, z);

      if (!keyToPosition.has(key)) keyToPosition.set(key, new THREE.Vector3(x, y, z));
      if (!vertexToFaces.has(key)) vertexToFaces.set(key, []);
      vertexToFaces.get(key).push(faceIndex);
      keys.push(key);
    }
    faceVertexKeys[faceIndex] = keys;
  }

  const visitedFaces = new Array(triangleCount).fill(false);
  const centers = [];

  for (let startFace = 0; startFace < triangleCount; startFace++) {
    if (visitedFaces[startFace]) continue;

    const stack = [startFace];
    const componentKeys = new Set();
    visitedFaces[startFace] = true;

    while (stack.length > 0) {
      const currentFace = stack.pop();
      for (const key of faceVertexKeys[currentFace]) {
        componentKeys.add(key);
        for (const neighborFace of vertexToFaces.get(key)) {
          if (!visitedFaces[neighborFace]) {
            visitedFaces[neighborFace] = true;
            stack.push(neighborFace);
          }
        }
      }
    }

    if (componentKeys.size === 0) continue;

    const center = new THREE.Vector3();
    for (const key of componentKeys) center.add(keyToPosition.get(key));
    center.multiplyScalar(1 / componentKeys.size);
    centers.push(center);
  }

  return centers.sort((a, b) => a.x - b.x);
}

function createStreetLampLights(lightsMesh) {
  if (!lightsMesh || streetLampPointLights.length > 0) return;

  const extractedCenters = extractDisconnectedComponentCenters(lightsMesh.geometry);
  const centers = (extractedCenters.length >= 6 ? extractedCenters.slice(0, 6) : STREET_LAMP_FALLBACK_POSITIONS).map((center) => center.clone());

  for (const center of centers) {
    const pointLight = new THREE.PointLight(themeConfig.dark.streetLampColor, 0, themeConfig.dark.streetLampDistance, 2);
    pointLight.position.copy(center);
    pointLight.position.y -= 2.0;
    pointLight.visible = false;
    pointLight.castShadow = false;
    lightsMesh.add(pointLight);
    streetLampPointLights.push(pointLight);
  }
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
  themeToggleButton.textContent = `Switch to ${nextThemeName}`;
  themeToggleButton.setAttribute('aria-label', `Switch to ${nextThemeName} mode`);
  themeToggleButton.setAttribute('aria-pressed', themeName === 'dark' ? 'true' : 'false');
}

let currentThemeName = getInitialThemeName();

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
  renderer.toneMappingExposure = theme.exposure;
  wireBloomPass.strength = theme.wireBloomStrength;
  schoolMaskWireframeMaterial.color.set(theme.maskWireColor);
  outlinePass.visibleEdgeColor.set(theme.maskWireColor);
  outlinePass.hiddenEdgeColor.set(theme.maskWireColor);

  applyMaterialTheme(normalizedThemeName);

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

    if (!mesh.name.startsWith("Tree") && !mesh.name.startsWith("Pole") && !mesh.name.startsWith("Trunk")) {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
      const wire = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      const wireOffset = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      
      wire.layers.set(MASK_LAYER); wireOffset.layers.set(MASK_LAYER);
      wire.renderOrder = 1000; wireOffset.renderOrder = 1000;
      wireOffset.scale.setScalar(1.003);
      mesh.add(wire, wireOffset);
      schoolMaskWireframes.push(wire, wireOffset);

      const noiseOverlay = new THREE.Mesh(mesh.geometry, schoolNoiseRevealMaterial);
      noiseOverlay.renderOrder = 950; noiseOverlay.castShadow = false; noiseOverlay.receiveShadow = false;
      mesh.add(noiseOverlay);
      schoolNoiseOverlays.push(noiseOverlay);
    }
    schoolMeshes.push(mesh);
  }
  createStreetLampLights(lightsMesh);
  outlinePass.selectedObjects = [...outlineMeshes];

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

const parallaxSettings = { cameraX: 0.9, cameraY: 0.9, lookAtX: 0, lookAtY: 0, groupX: 0.08, groupY: 0.05 };
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

const scrollState = { progress: 0, cameraOffsetX: 0, cameraOffsetY: 0, cameraOffsetZ: 0, lookAtOffsetX: 0, lookAtOffsetY: 0, lookAtOffsetZ: 0 };
const introAnimState = { progress: 0 };
const introCamera = introState.startCameraPos.clone();
const introLookAt = introState.startLookAt.clone();
const titleIntroState = { offsetX: 0, offsetY: 0, startScale: 2.3, endYOffset: 0 };
const titleIntroAnimState = { progress: 0 };
const introLeadTextLines = gsap.utils.toArray('.text-reveal-line--lead');
const introBrandLine = document.querySelector('.text-reveal-line--brand');
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

  const leadExitDuration = prefersReducedMotion ? 0.36 : 0.75;
  const brandRevealDuration = prefersReducedMotion ? 0.55 : 0.95;

  introLeadTextLines.forEach(line => {
    line.style.animation = 'none';
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  });

  const titleRect = title.getBoundingClientRect();
  title.style.height = `${titleRect.height}px`;
  title.style.display = 'flex';
  title.style.flexDirection = 'column';
  title.style.justifyContent = 'center';

  gsap.timeline({
    defaults: { overwrite: 'auto' },
    onComplete: () => {
      markTextRevealComplete();
      startIntroCameraAnimation();
    }
  })

    .to(introLeadTextLines, {
      opacity: 0,
      filter: 'blur(4px)',
      duration: leadExitDuration,
      ease: 'power2.out'
    })

    .add(() => {
      title.classList.add('is-brand-phase');
      computeTitleIntroStartTransform();
      updateTitleIntroTransform(titleIntroAnimState.progress);
      
      gsap.set(introBrandLine, {
        yPercent: 115,
        opacity: 0,
        filter: 'blur(2px)'
      });
    })

    .to(
      introBrandLine,
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: brandRevealDuration,
        ease: 'power3.out'
      }
    );
}

function bindIntroTextRevealUnlock() {
  if (introLeadTextLines.length === 0) {
    playIntroBrandReveal();
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
  titleIntroState.endYOffset = window.innerWidth <= 768 ? -18 : -30;
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
  duration: prefersReducedMotion ? 0.8 : 1.15, smoothWheel: !prefersReducedMotion, smoothTouch: false
});

lenis.on('scroll', ScrollTrigger.update);
lenis.stop();
lenis.scrollTo(0, { immediate: true, force: true });
bindIntroTextRevealUnlock();
maybeUnlockScroll();

const panels = gsap.utils.toArray('.panel');
const postSecondPanelDuration = Math.max(panels.length - 2, 0);

const cameraScrollTimeline = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: '#content', start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true,
    onUpdate: (self) => { scrollState.progress = self.progress; }
  }
});

cameraScrollTimeline.to(scrollState, {
  cameraOffsetX: -21, cameraOffsetY: -6.0, cameraOffsetZ: -24.0,
  lookAtOffsetX: -32.0, lookAtOffsetY: -30, lookAtOffsetZ: -16,
  duration: 1
});

if (postSecondPanelDuration > 0) {
  cameraScrollTimeline.to(scrollState, {
    cameraOffsetX: -13.5, cameraOffsetY: -1.8, cameraOffsetZ: -7.5,
    lookAtOffsetX: -6.5, lookAtOffsetY: -0.5, lookAtOffsetZ: 1.5,
    duration: postSecondPanelDuration
  });
}

window.addEventListener('resize', () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(window.innerWidth, window.innerHeight);
  outlinePass.setSize(window.innerWidth, window.innerHeight);
  dofPass.setSize(window.innerWidth, window.innerHeight);
  fxaaPass.material.uniforms.resolution.value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));

  updateRenderResolution();
  computeTitleIntroStartTransform();
  updateTitleIntroTransform(titleIntroAnimState.progress);
  ScrollTrigger.refresh();
});

gsap.ticker.lagSmoothing(0);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); 

  wiringElectricMaterial.uniforms.uTime.value = time;
  schoolNoiseUniforms.uTime.value = time;

  schoolNoiseUniforms.uPointerScreenPos.value.set(
    pointerCurrent.x * 0.5 + 0.5,
    pointerCurrent.y * 0.5 + 0.5
  );

  const parallaxX = pointerCurrent.x;
  const parallaxY = pointerCurrent.y;
  const cameraParallaxX = parallaxX * parallaxSettings.cameraX;
  const cameraParallaxY = parallaxY * parallaxSettings.cameraY;
  const lookAtParallaxX = parallaxX * parallaxSettings.lookAtX;
  const lookAtParallaxY = parallaxY * parallaxSettings.lookAtY;

  subjectGroup.position.x = -parallaxX * parallaxSettings.groupX;
  subjectGroup.position.y = -parallaxY * parallaxSettings.groupY;

  if (schoolModel) {
    schoolModel.visible = introCameraStarted;
    const scrollInfluence = introAnimState.progress;
    
    camera.position.set(
      introCamera.x + (scrollState.cameraOffsetX * scrollInfluence) + cameraParallaxX,
      introCamera.y + (scrollState.cameraOffsetY * scrollInfluence) + cameraParallaxY,
      introCamera.z + (scrollState.cameraOffsetZ * scrollInfluence)
    );
    
    camera.lookAt(
      introLookAt.x + (scrollState.lookAtOffsetX * scrollInfluence) + lookAtParallaxX,
      introLookAt.y + (scrollState.lookAtOffsetY * scrollInfluence) + lookAtParallaxY,
      introLookAt.z + (scrollState.lookAtOffsetZ * scrollInfluence)
    );
  } else {
    camera.position.set(
      mapScrollToX(scrollState.progress) + cameraParallaxX,
      0.5 + cameraParallaxY,
      mapScrollToZ(scrollState.progress)
    );
    camera.lookAt(
      introState.endLookAt.x + lookAtParallaxX,
      introState.endLookAt.y + lookAtParallaxY,
      introState.endLookAt.z
    );
  }

  if (schoolNoiseOverlays.length > 0) renderWireMask();
  
  composer.render();
});
