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

// OPTIMIZATION: We assign a specific layer to isolate the mask render 
// without toggling visibility and material states manually.
const MASK_LAYER = 1;

const canvas = document.querySelector('#webgl');
const heroTitle = document.querySelector('.hero-title');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf9f0f9);
scene.fog = new THREE.FogExp2(0xf9f0f9, 0.014);

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
  focus: 10.0,
  aperture: 0.00008
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

const maskRenderTarget = new THREE.WebGLRenderTarget(1, 1, {
  depthBuffer: true
});
maskRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
const renderResolution = new THREE.Vector2();

const hemiLight = new THREE.HemisphereLight('#ffffff', 2);
const dirLight = new THREE.DirectionalLight('#ffffff', 1.9);
dirLight.position.set(0, 5, 3);
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.castShadow = true;
dirLight.shadow.radius = 20;
dirLight.shadow.camera.left = -12;
dirLight.shadow.camera.right = 12;
dirLight.shadow.camera.top = 12;
dirLight.shadow.camera.bottom = -12;
scene.add(hemiLight, dirLight); 

const subjectGroup = new THREE.Group();
scene.add(subjectGroup);

let floor = null;
const floorMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', });
const floorGeometry = new THREE.PlaneGeometry(128, 128);
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

// Removed: schoolMaskFillMaterial (No longer needed thanks to Layers optimization)

const schoolMaskWireframeMaterial = new THREE.LineBasicMaterial({
  color: 0x999999,
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
    uColorBase: { value: new THREE.Color(0x298d4e) },
    uColorHot: { value: new THREE.Color(0x69ef81) },  
    uSpeed: { value: 0.2 },
    uPulse: { value: 2.0 },
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
  uMaskTexture: { value: maskRenderTarget.texture },
  uResolution: { value: renderResolution },
  uTime: { value: 0 },
  uNoiseScale: { value: 0.2 },
  uNoiseSpeed: { value: 0.8 },
  uNoiseThreshold: { value: 0.26 },
  uNoiseSoftness: { value: 0.2 },
  uOpacity: { value: 1.0 },
  uPointerScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
  uPointerRadius: { value: 0.02 },
  uPointerFeather: { value: 0.12 },
  uPointerPeakBoost: { value: 0.3 },
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

      // OPTIMIZATION: Discard immediately if the pixel corresponds to empty space.
      vec3 diff = maskColor - vec3(1.0); // Compare to pure white
      float distSq = dot(diff, diff);    // Avoid length()'s squareroot math early
      
      if (distSq < 0.0001) {
        discard; // Stops FBM and other processing for 90%+ of the screen!
      }

      float contentMask = smoothstep(0.015, 0.08, sqrt(distSq));
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
  startCameraPos: new THREE.Vector3(0, 10, -30),
  endCameraPos: new THREE.Vector3(8, 10, 26),
  startLookAt: new THREE.Vector3(0, 0, -30),
  endLookAt: new THREE.Vector3(0, 0, 0)
};
const introDelay = 1.8;
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2.55;
const introEasePower = 3.4;
const loader = new OBJLoader();

const schoolMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', });
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#90c2b0', });
const treeMaterial = new THREE.MeshStandardMaterial({ color: '#9cf7ad', });
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#c7c7c7', });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#d3a76d', });

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  const modelMeshes = [];
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      modelMeshes.push(child);
    }
  });

  for (const mesh of modelMeshes) {
    const materialMap = {
        Tree: treeMaterial,
        Windows: windowMaterial,
        School: schoolMaterial,
        Trunk: trunkMaterial,
        Lights: poleMaterial,
        NameTop: trunkMaterial,
        CanopyTop: trunkMaterial,
    };
    mesh.material = materialMap[mesh.name] || schoolMaterial;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (mesh.name !== "Tree" && mesh.name !== "Trunk") {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
      const wire = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      const wireOffset = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      
      // OPTIMIZATION: Assign wires strictly to the hidden Mask layer.
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
    if (mesh.name !== "Tree") {
      outlineMeshes.push(mesh);
    }
  }
  outlinePass.selectedObjects = [...outlineMeshes];

  schoolModel.scale.setScalar(0.12);
  schoolModel.position.set(0, -4, 0);

  subjectGroup.add(schoolModel);
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
    
    // OPTIMIZATION: Push wiring model exclusively to the hidden Mask layer.
    child.layers.set(MASK_LAYER); 
  });

  subjectGroup.add(wiringModel);
});

const pointerTarget = new THREE.Vector2(0, 0);
const pointerCurrent = new THREE.Vector2(0, 0);
let isPointerActive = false;

window.addEventListener('pointermove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
  isPointerActive = true;
});

window.addEventListener('pointerleave', () => {
  pointerTarget.set(0, 0);
  isPointerActive = false;
});

const maskBackground = new THREE.Color(0xffffff);

// OPTIMIZATION: Completely refactored this pass to utilize `camera.layers`.
// It requires zero material swapping, no loops over arrays, and avoids rendering the 
// massive base meshes twice just to be hidden by a 0-opacity ghost material.
function renderWireMask() {
  if (!wiringModel || schoolMeshes.length === 0) {
    return;
  }

  const previousBackground = scene.background;
  const previousShadowMapEnabled = renderer.shadowMap.enabled;

  scene.background = maskBackground;
  renderer.shadowMap.enabled = false;
  
  // Isolate processing power to objects ONLY residing on the MASK_LAYER
  camera.layers.set(MASK_LAYER);

  renderer.setRenderTarget(maskRenderTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  // Re-enable primary layer and previous parameters
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
  renderResolution.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  maskRenderTarget.setSize(
    Math.floor(window.innerWidth * pixelRatio),
    Math.floor(window.innerHeight * pixelRatio)
  );
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

  if (schoolModel) {
    schoolModel.visible = elapsed >= introDelay;
    introCamera.lerpVectors(introState.startCameraPos, introState.endCameraPos, introEaseSmoothed);
    introLookAt.lerpVectors(introState.startLookAt, introState.endLookAt, introEaseSmoothed);

    camera.position.x = introCamera.x + mapRange(scrollProgress, 0, 1, 0, 0.5);
    camera.position.y = introCamera.y;
    camera.position.z = introCamera.z + mapRange(scrollProgress, 0, 1, 0, -1.2);
    camera.lookAt(introLookAt);
  } else {
    camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
    camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5);
    camera.lookAt(introState.endLookAt);
  }
  updateTitleIntroTransform(introEaseSmoothed);

  if (schoolNoiseOverlays.length > 0) {
    renderWireMask();
  }
  composer.render();
}

animate();