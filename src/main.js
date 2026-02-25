import * as THREE from 'three';
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

const MASK_LAYER = 1;

const canvas = document.querySelector('#webgl');
const heroTitle = document.querySelector('.hero-title');
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

const themeConfig = {
  light: {
    sceneColor: 0xf9f0f9,
    fogColor: 0xf9f0f9,
    fogDensity: 0.012,
    floorColor: 0xf9f0f9,
    hemiColor: 0xffffff,
    hemiGroundColor: 0xcfd8dc,
    hemiIntensity: 2.0,
    dirColor: 0xffffff,
    dirIntensity: 1.9,
    exposure: 1.05,
    maskWireColor: 0x666666,
    wireBloomStrength: 0.24,
    streetLampIntensity: 0.0,
    streetLampColor: 0xffd7ad,
    streetLampDistance: 16
  },
  dark: {
    sceneColor: 0x050608,
    fogColor: 0x050608,
    fogDensity: 0.018,
    floorColor: 0x090b0f,
    hemiColor: 0x7b899c,
    hemiGroundColor: 0x020304,
    hemiIntensity: 0.4,
    dirColor: 0xffffff,
    dirIntensity: 0.7,
    exposure: 0.96,
    maskWireColor: 0x555555,
    wireBloomStrength: 0.24,
    streetLampIntensity: 0.8,
    streetLampColor: 0xffd8aa,
    streetLampDistance: 16
  }
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(themeConfig.light.sceneColor);
scene.fog = new THREE.FogExp2(themeConfig.light.fogColor, themeConfig.light.fogDensity);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0.5, 7.5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
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

const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);

const dofPass = new BokehPass(scene, camera, {
  focus: 12.0,
  aperture: 0.0001
});
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
  0.2,
  0.1
);
maskComposer.addPass(wireBloomPass);

const hemiLight = new THREE.HemisphereLight(
  themeConfig.light.hemiColor,
  themeConfig.light.hemiGroundColor,
  themeConfig.light.hemiIntensity
);
const dirLight = new THREE.DirectionalLight(
  themeConfig.light.dirColor,
  themeConfig.light.dirIntensity
);
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

let schoolModel = null;
let wiringModel = null;
const schoolMeshes = [];
const outlineMeshes = [];
const schoolMaskWireframes = [];
const schoolNoiseOverlays = [];
const streetLampPointLights = [];

const schoolMaskWireframeMaterial = new THREE.LineBasicMaterial({
  color: themeConfig.light.maskWireColor,
  linewidth: 3,
  transparent: false,
  opacity: 1.0,
  toneMapped: false,
  fog: false,
  depthTest: false,
  depthWrite: false
});

const wiringElectricMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(0x167437) },
    uColorHot: { value: new THREE.Color(0x54d36b) },
    uSpeed: { value: 0.2 },
    uPulse: { value: 1.5 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vWorldPos;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      vec4 mvPosition = viewMatrix * worldPos;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorHot;
    uniform float uSpeed;
    uniform float uPulse;

    varying vec3 vWorldPos;

    void main() {
      float flow = fract((vWorldPos.x + vWorldPos.z) * 0.42 - uTime * uSpeed);
      float bandA = smoothstep(0.0, 0.08, flow) * (1.0 - smoothstep(0.08, 0.26, flow));
      float bandB = smoothstep(0.55, 0.72, flow) * (1.0 - smoothstep(0.72, 0.9, flow));
      float pulse = 0.5 + 0.5 * sin(uTime * uPulse + vWorldPos.y * 2.2);
      float glow = max(max(bandA, bandB), 0.45 * pulse);
      vec3 color = mix(uColorBase, uColorHot, glow);

      gl_FragColor = vec4(color, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending
});

const schoolNoiseUniforms = {
  uMaskTexture: { value: maskComposer.readBuffer.texture },
  uResolution: { value: renderResolution },
  uTime: { value: 0 },
  uNoiseScale: { value: 0.18 },
  uNoiseSpeed: { value: 0.8 },
  uNoiseThreshold: { value: 0.2 },
  uNoiseSoftness: { value: 0.2 },
  uOpacity: { value: 1.0 },
  uPointerScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
  uPointerRadius: { value: 0.016 },
  uPointerFeather: { value: 0.12 },
  uPointerPeakBoost: { value: 0.2 },
  uPointerStrength: { value: 0.0 }
};

const schoolNoiseRevealMaterial = new THREE.ShaderMaterial({
  uniforms: schoolNoiseUniforms,
  vertexShader: /* glsl */ `
    varying vec3 vWorldPos;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D uMaskTexture;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uNoiseScale;
    uniform float uNoiseSpeed;
    uniform float uNoiseThreshold;
    uniform float uNoiseSoftness;
    uniform float uOpacity;
    uniform vec2 uPointerScreenPos;
    uniform float uPointerRadius;
    uniform float uPointerFeather;
    uniform float uPointerPeakBoost;
    uniform float uPointerStrength;

    varying vec3 vWorldPos;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise3d(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      vec3 u = f * f * (3.0 - 2.0 * f);

      float n000 = hash(i + vec3(0.0, 0.0, 0.0));
      float n100 = hash(i + vec3(1.0, 0.0, 0.0));
      float n010 = hash(i + vec3(0.0, 1.0, 0.0));
      float n110 = hash(i + vec3(1.0, 1.0, 0.0));
      float n001 = hash(i + vec3(0.0, 0.0, 1.0));
      float n101 = hash(i + vec3(1.0, 0.0, 1.0));
      float n011 = hash(i + vec3(0.0, 1.0, 1.0));
      float n111 = hash(i + vec3(1.0, 1.0, 1.0));

      float nx00 = mix(n000, n100, u.x);
      float nx10 = mix(n010, n110, u.x);
      float nx01 = mix(n001, n101, u.x);
      float nx11 = mix(n011, n111, u.x);
      float nxy0 = mix(nx00, nx10, u.y);
      float nxy1 = mix(nx01, nx11, u.y);
      return mix(nxy0, nxy1, u.z);
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
        value += noise3d(p) * amplitude;
        p = p * 2.05 + vec3(7.1, 11.7, 3.6);
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      vec3 maskColor = texture2D(uMaskTexture, uv).rgb;
      float maskSignal = max(max(maskColor.r, maskColor.g), maskColor.b);

      if (maskSignal < 0.00001) {
        discard;
      }

      float contentMask = smoothstep(0.03, 0.2, maskSignal);
      float n = fbm(vWorldPos * uNoiseScale + vec3(0.0, uTime * uNoiseSpeed, 0.0));
      float pointerDistance = distance(uv, uPointerScreenPos);
      float pointerRegion = 1.0 - smoothstep(
        uPointerRadius,
        uPointerRadius + uPointerFeather,
        pointerDistance
      );
      float peakedNoise = max(n - (pointerRegion * uPointerPeakBoost * uPointerStrength), 0.0);
      float reveal = 1.0 - smoothstep(
        uNoiseThreshold - uNoiseSoftness,
        uNoiseThreshold + uNoiseSoftness,
        peakedNoise
      );
      float alpha = reveal * contentMask * uOpacity;
      gl_FragColor = vec4(maskColor, alpha);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
  polygonOffsetUnits: -1
});

const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -25),
  endCameraPos: new THREE.Vector3(8, 10, 26),
  startLookAt: new THREE.Vector3(0, 0, -30),
  endLookAt: new THREE.Vector3(0, 0, 0)
};
const introDelay = 1.8;
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2.55;
const introEasePower = 3.4;
const loader = new OBJLoader();

const schoolMaterial = new THREE.MeshStandardMaterial({ color: '#000000', });
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#000000'});
const treeMaterial = new THREE.MeshStandardMaterial({ color: '#000000', });
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#000000', });
const woodMaterial = new THREE.MeshStandardMaterial({ color: '#000000', });
const rimMaterial = new THREE.MeshStandardMaterial({ color: '#000000', });
const materialThemeColors = {
  school: { light: 0xffffff, dark: 0xd7dee4 },
  windows: { light: 0x3e4542, dark: 0xfffcc9 },
  tree: { light: 0x49d46e, dark: 0x52c878 },
  pole: { light: 0xc7c7c7, dark: 0xbbc4cd },
  wood: { light: 0xa38764, dark: 0x987a5d },
  rim: { light: 0x7a8481, dark: 0x8e989f }
};
const windowEmission = {
  light: { color: 0x000000, intensity: 0.0 },
  dark: { color: 0xffe2b7, intensity: 0.75 }
};

function getInitialThemeName() {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_THEME_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    // Ignore blocked storage in private contexts.
  }
  return DEFAULT_THEME_NAME;
}

function toVertexKey(x, y, z) {
  return `${Math.round(x * 1000)}|${Math.round(y * 1000)}|${Math.round(z * 1000)}`;
}

function extractDisconnectedComponentCenters(geometry) {
  const positionAttribute = geometry?.getAttribute('position');
  if (!positionAttribute || positionAttribute.count < 3) {
    return [];
  }

  const indexAttribute = geometry.index;
  const rawVertexCount = indexAttribute ? indexAttribute.count : positionAttribute.count;
  const triangleCount = Math.floor(rawVertexCount / 3);
  if (triangleCount <= 0) {
    return [];
  }

  const faceVertexKeys = new Array(triangleCount);
  const vertexToFaces = new Map();
  const keyToPosition = new Map();

  for (let faceIndex = 0; faceIndex < triangleCount; faceIndex++) {
    const keys = [];
    for (let corner = 0; corner < 3; corner++) {
      const baseIndex = faceIndex * 3 + corner;
      const vertexIndex = indexAttribute ? indexAttribute.getX(baseIndex) : baseIndex;
      const x = positionAttribute.getX(vertexIndex);
      const y = positionAttribute.getY(vertexIndex);
      const z = positionAttribute.getZ(vertexIndex);
      const key = toVertexKey(x, y, z);

      if (!keyToPosition.has(key)) {
        keyToPosition.set(key, new THREE.Vector3(x, y, z));
      }
      if (!vertexToFaces.has(key)) {
        vertexToFaces.set(key, []);
      }
      vertexToFaces.get(key).push(faceIndex);
      keys.push(key);
    }
    faceVertexKeys[faceIndex] = keys;
  }

  const visitedFaces = new Array(triangleCount).fill(false);
  const centers = [];

  for (let startFace = 0; startFace < triangleCount; startFace++) {
    if (visitedFaces[startFace]) {
      continue;
    }

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

    if (componentKeys.size === 0) {
      continue;
    }

    const center = new THREE.Vector3();
    for (const key of componentKeys) {
      center.add(keyToPosition.get(key));
    }
    center.multiplyScalar(1 / componentKeys.size);
    centers.push(center);
  }

  return centers.sort((a, b) => a.x - b.x);
}

function createStreetLampLights(lightsMesh) {
  if (!lightsMesh || streetLampPointLights.length > 0) {
    return;
  }

  const extractedCenters = extractDisconnectedComponentCenters(lightsMesh.geometry);
  const centers = (
    extractedCenters.length >= 6
      ? extractedCenters.slice(0, 6)
      : STREET_LAMP_FALLBACK_POSITIONS
  ).map((center) => center.clone());

  for (const center of centers) {
    const pointLight = new THREE.PointLight(
      themeConfig.dark.streetLampColor,
      0,
      themeConfig.dark.streetLampDistance,
      2
    );
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
  if (!themeToggleButton) {
    return;
  }

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
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, normalizedThemeName);
    } catch (error) {
      console.warn('Failed to persist theme:', error);
    }
  }
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const nextThemeName = currentThemeName === 'dark' ? 'light' : 'dark';
    applyTheme(nextThemeName);
  });
}

applyTheme(currentThemeName, { persist: false });

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  const modelMeshes = [];
  let lightsMesh = null;
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      modelMeshes.push(child);
    }
  });

  for (const mesh of modelMeshes) {
    const isWireMesh = mesh.name.startsWith("Wire");
    const isTreeMesh = mesh.name.startsWith("Tree");
    const isPoleMesh = mesh.name.startsWith("Pole");
    const isTrunkMesh = mesh.name.startsWith("Trunk");
    if (mesh.name === 'Lights') {
      lightsMesh = mesh;
    }

    const materialMap = {
      Windows: windowMaterial,
      School: schoolMaterial,
      Lights: poleMaterial,
      Rim: rimMaterial,
      TopRim: rimMaterial,
      BottomRim: rimMaterial,
      NameRim: rimMaterial,
    };

    mesh.material = isWireMesh ? wiringElectricMaterial :
    isTreeMesh ? treeMaterial :
    isPoleMesh ? woodMaterial :
    isTrunkMesh ? woodMaterial : (materialMap[mesh.name] || schoolMaterial);
    mesh.castShadow = !isWireMesh;
    mesh.receiveShadow = !isWireMesh;

    if (isWireMesh) {
      mesh.layers.enable(MASK_LAYER);
    }

    if (!mesh.name.startsWith("Tree") && !mesh.name.startsWith("Pole") && !mesh.name.startsWith("Trunk")) {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
      const wire = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      const wireOffset = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      
      wire.layers.set(MASK_LAYER);
      wireOffset.layers.set(MASK_LAYER);
      
      wire.renderOrder = 1000;
      wireOffset.renderOrder = 1000;
      wireOffset.scale.setScalar(1.003);
      mesh.add(wire, wireOffset);
      schoolMaskWireframes.push(wire, wireOffset);

      const noiseOverlay = new THREE.Mesh(mesh.geometry, schoolNoiseRevealMaterial);
      noiseOverlay.renderOrder = 950;
      noiseOverlay.castShadow = false;
      noiseOverlay.receiveShadow = false;
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
});

loader.load('/wiring.obj', (loadedModel) => {
  wiringModel = loadedModel;
  wiringModel.scale.setScalar(0.12);
  wiringModel.position.set(0, -4, 0);

  wiringModel.traverse((child) => {
    if (!child.isMesh) {
      return;
    }
    child.material = wiringElectricMaterial;
    child.castShadow = false;
    child.receiveShadow = false;
    
    child.layers.set(MASK_LAYER); 
  });

  subjectGroup.add(wiringModel);
});

const pointerTarget = new THREE.Vector2(0, 0);
const pointerCurrent = new THREE.Vector2(0, 0);
let isPointerActive = false;
const parallaxSettings = {
  cameraX: 0.9,
  cameraY: 0.9,
  lookAtX: 0,
  lookAtY: 0,
  groupX: 0.08,
  groupY: 0.05
};

window.addEventListener('pointermove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
  isPointerActive = true;
});

window.addEventListener('pointerleave', () => {
  pointerTarget.set(0, 0);
  isPointerActive = false;
});

const maskBackground = new THREE.Color(0x000000);

function renderWireMask() {
  if (schoolMeshes.length === 0) {
    return;
  }

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

const clock = new THREE.Clock();
let scrollProgress = 0;
let scrollProgressTarget = 0;
const introCamera = new THREE.Vector3();
const introLookAt = new THREE.Vector3();
let introEaseSmoothed = 0;
const titleIntroState = {
  offsetX: 0,
  offsetY: 0,
  startScale: 2.3
};

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp01((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

function getIntroEase(elapsed) {
  const introProgress =
    introDuration === 0 ? 1 : clamp01((elapsed - introDelay) / introDuration);
  const eased = 1 - Math.pow(1 - introProgress, introEasePower);
  return eased * eased * (3 - 2 * eased);
}

function computeTitleIntroStartTransform() {
  if (!heroTitle) {
    return;
  }

  const previousTransform = heroTitle.style.transform;
  heroTitle.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
  const rect = heroTitle.getBoundingClientRect();
  heroTitle.style.transform = previousTransform;

  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.5;
  titleIntroState.offsetX = window.innerWidth * 0.5 - centerX;
  titleIntroState.offsetY = window.innerHeight * 0.5 - centerY;
  titleIntroState.startScale = window.innerWidth <= 768 ? 1.85 : 2.35;
}

function updateTitleIntroTransform(introEase) {
  if (!heroTitle) {
    return;
  }

  const translateX = titleIntroState.offsetX * (1 - introEase);
  const translateY = titleIntroState.offsetY * (1 - introEase);
  const scale = THREE.MathUtils.lerp(titleIntroState.startScale, 1, introEase);

  heroTitle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
}

function updateScrollTarget() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgressTarget = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
}

function updateRenderResolution() {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  const width = Math.floor(window.innerWidth * pixelRatio);
  const height = Math.floor(window.innerHeight * pixelRatio);
  renderResolution.set(
    width,
    height
  );
  maskComposer.setPixelRatio(pixelRatio);
  maskComposer.setSize(window.innerWidth, window.innerHeight);
}

updateRenderResolution();
updateScrollTarget();
computeTitleIntroStartTransform();
if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    computeTitleIntroStartTransform();
  });
}

window.addEventListener('scroll', updateScrollTarget, { passive: true });

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
  fxaaPass.material.uniforms.resolution.value.set(
    1 / (window.innerWidth * pixelRatio),
    1 / (window.innerHeight * pixelRatio)
  );

  updateRenderResolution();
  updateScrollTarget();
  computeTitleIntroStartTransform();
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;
  const introEaseTarget = getIntroEase(elapsed);
  const introBlend = 1.0 - Math.exp(-7.5 * delta);
  introEaseSmoothed += (introEaseTarget - introEaseSmoothed) * introBlend;

  wiringElectricMaterial.uniforms.uTime.value = elapsed;
  schoolNoiseUniforms.uTime.value = elapsed;
  pointerCurrent.lerp(pointerTarget, isPointerActive ? 0.12 : 0.08);
  schoolNoiseUniforms.uPointerScreenPos.value.set(
    pointerCurrent.x * 0.5 + 0.5,
    pointerCurrent.y * 0.5 + 0.5
  );
  schoolNoiseUniforms.uPointerStrength.value = isPointerActive ? 1.0 : 0.0;
  scrollProgress += (scrollProgressTarget - scrollProgress) * 0.08;
  const parallaxX = pointerCurrent.x;
  const parallaxY = pointerCurrent.y;
  const cameraParallaxX = parallaxX * parallaxSettings.cameraX;
  const cameraParallaxY = parallaxY * parallaxSettings.cameraY;
  const lookAtParallaxX = parallaxX * parallaxSettings.lookAtX;
  const lookAtParallaxY = parallaxY * parallaxSettings.lookAtY;

  subjectGroup.position.x = -parallaxX * parallaxSettings.groupX;
  subjectGroup.position.y = -parallaxY * parallaxSettings.groupY;

  if (schoolModel) {
    schoolModel.visible = elapsed >= introDelay;
    introCamera.lerpVectors(introState.startCameraPos, introState.endCameraPos, introEaseSmoothed);
    introLookAt.lerpVectors(introState.startLookAt, introState.endLookAt, introEaseSmoothed);

    camera.position.x = introCamera.x + mapRange(scrollProgress, 0, 1, 0, 0.5) + cameraParallaxX;
    camera.position.y = introCamera.y + cameraParallaxY;
    camera.position.z = introCamera.z + mapRange(scrollProgress, 0, 1, 0, -1.2);
    camera.lookAt(
      introLookAt.x + lookAtParallaxX,
      introLookAt.y + lookAtParallaxY,
      introLookAt.z
    );
  } else {
    camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
    camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5) + cameraParallaxX;
    camera.position.y = 0.5 + cameraParallaxY;
    camera.lookAt(
      introState.endLookAt.x + lookAtParallaxX,
      introState.endLookAt.y + lookAtParallaxY,
      introState.endLookAt.z
    );
  }
  updateTitleIntroTransform(introEaseSmoothed);

  if (schoolNoiseOverlays.length > 0) {
    renderWireMask();
  }
  composer.render();
}

animate();
