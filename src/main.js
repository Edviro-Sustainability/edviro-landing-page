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
outlinePass.edgeStrength = 4.0;
outlinePass.edgeGlow = 0.0;
outlinePass.edgeThickness = 1.5;
outlinePass.pulsePeriod = 0.0;
outlinePass.visibleEdgeColor.set(0x000000);
outlinePass.hiddenEdgeColor.set(0x000000);
composer.addPass(outlinePass);

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   0.1,
//   0.7,
//   0.82
// );
// composer.addPass(bloomPass);

const dofPass = new BokehPass(scene, camera, {
  focus: 10.0,
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

const maskRenderTarget = new THREE.WebGLRenderTarget(1, 1, {
  depthBuffer: true
});
maskRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;

const lensVertexShader = /* glsl */ `
void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const lensFragmentShader = /* glsl */ `
uniform vec2 winResolution;
uniform sampler2D uTexture;

void main() {
  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const lensUniforms = {
  uTexture: { value: maskRenderTarget.texture },
  winResolution: { value: new THREE.Vector2() }
};

const lensMaterial = new THREE.ShaderMaterial({
  vertexShader: lensVertexShader,
  fragmentShader: lensFragmentShader,
  uniforms: lensUniforms,
  transparent: true,
  depthTest: false,
  depthWrite: false
});

const lens = new THREE.Mesh(new THREE.SphereGeometry(0.25, 64, 64), lensMaterial);
lens.scale.setScalar(0.001);
lens.visible = false;
scene.add(lens);

const hemiLight = new THREE.HemisphereLight('#ffffff', 2);
const dirLight = new THREE.DirectionalLight('#ffffff', 1.9);
dirLight.position.set(0, 5, 3);
dirLight.shadow.mapSize.set(1024,1024);
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
const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.9,
  metalness: 0.05
});
const floorGeometry = new THREE.PlaneGeometry(128,128);
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
const schoolMaskFillMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0,
  depthWrite: false
});
const schoolMaskWireframeMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff
});
const wiringElectricMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(0x0c4e24) },
    uColorHot: { value: new THREE.Color(0x3ffd84) },
    uSpeed: { value: 0.75 },
    uPulse: { value: 3.0 },
    uOpacity: { value: 1.0 }
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
    uniform float uOpacity;

    varying vec3 vWorldPos;

    void main() {
      float flow = fract((vWorldPos.x + vWorldPos.z) * 0.28 - uTime * uSpeed);
      float band = smoothstep(0.0, 0.14, flow) * (1.0 - smoothstep(0.14, 0.5, flow));
      float pulse = 0.5 + 0.5 * sin(uTime * uPulse + vWorldPos.y * 1.8);
      float glow = max(band, 0.35 * pulse);
      vec3 color = mix(uColorBase, uColorHot, glow);
      float alpha = (0.25 + 0.75 * glow) * uOpacity;

      gl_FragColor = vec4(color, alpha);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -20),
  endCameraPos: new THREE.Vector3(8,10,26),
  lookAt: new THREE.Vector3(0, 0, 0)
};
const introDelay = 1.8;
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2.55;
const introEasePower = 3.4;
const loader = new OBJLoader();

const schoolMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.32,
  metalness: 0.0,
  emissive: '#ffffff',
  emissiveIntensity: 0.12
});

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  const modelMeshes = [];
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      modelMeshes.push(child);
    }
  });

  for (const mesh of modelMeshes) {
    mesh.material = schoolMaterial;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (mesh.name !== "Tree") {
      const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
      const wire = new THREE.LineSegments(edges, schoolMaskWireframeMaterial);
      wire.visible = false;
      mesh.add(wire);
      schoolMaskWireframes.push(wire);
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
  wiringModel.visible = false;

  wiringModel.traverse((child) => {
    if (!child.isMesh) {
      return;
    }
    child.material = wiringElectricMaterial;
    child.castShadow = false;
    child.receiveShadow = false;
  });

  subjectGroup.add(wiringModel);
});

const pointerTarget = new THREE.Vector2(0, 0);
const pointerCurrent = new THREE.Vector2(0, 0);
const hoverRaycaster = new THREE.Raycaster();
const hoverPointer = new THREE.Vector2(0, 0);
let isPointerActive = false;
let isHoveringSchool = false;
let wasHoveringSchool = false;
let lensScaleCurrent = 0.0;
let lensScaleTarget = 0.0;

window.addEventListener('pointermove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
  hoverPointer.copy(pointerTarget);
  isPointerActive = true;
});

window.addEventListener('pointerleave', () => {
  pointerTarget.set(0, 0);
  hoverPointer.set(0, 0);
  isPointerActive = false;
  isHoveringSchool = false;
});

const cameraDirection = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const cameraUp = new THREE.Vector3();
const lensPosition = new THREE.Vector3();

function updateLensPosition() {
  pointerCurrent.lerp(pointerTarget, 0.1);

  const distanceFromCamera = 2.2;
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const halfHeight = Math.tan(vFov * 0.5) * distanceFromCamera;
  const halfWidth = halfHeight * camera.aspect;

  camera.getWorldDirection(cameraDirection).normalize();
  cameraUp.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
  cameraRight.copy(cameraDirection).cross(cameraUp).normalize();

  lensPosition
    .copy(camera.position)
    .addScaledVector(cameraDirection, distanceFromCamera)
    .addScaledVector(cameraRight, pointerCurrent.x * halfWidth)
    .addScaledVector(cameraUp, pointerCurrent.y * halfHeight);

  lens.position.copy(lensPosition);
}

const maskBackground = new THREE.Color(0x000000);
const previousMaterials = new Map();

function renderWireMask() {
  if (!wiringModel || schoolMeshes.length === 0) {
    return;
  }

  const previousBackground = scene.background;
  const previousLensVisible = lens.visible;
  const previousWiringVisible = wiringModel.visible;
  const previousFloorVisible = floor ? floor.visible : false;
  const previousShadowMapEnabled = renderer.shadowMap.enabled;
  scene.background = maskBackground;
  lens.visible = false;
  wiringModel.visible = true;
  if (floor) {
    floor.visible = false;
  }
  renderer.shadowMap.enabled = false;

  for (const mesh of schoolMeshes) {
    previousMaterials.set(mesh, mesh.material);
    mesh.material = schoolMaskFillMaterial;
  }
  for (const wire of schoolMaskWireframes) {
    wire.visible = true;
  }

  renderer.setRenderTarget(maskRenderTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  for (const wire of schoolMaskWireframes) {
    wire.visible = false;
  }
  for (const mesh of schoolMeshes) {
    mesh.material = previousMaterials.get(mesh);
  }
  previousMaterials.clear();

  wiringModel.visible = previousWiringVisible;
  lens.visible = previousLensVisible;
  if (floor) {
    floor.visible = previousFloorVisible;
  }
  renderer.shadowMap.enabled = previousShadowMapEnabled;
  scene.background = previousBackground;
}

const clock = new THREE.Clock();
let scrollProgress = 0;
let scrollProgressTarget = 0;
const introCamera = new THREE.Vector3();
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
  return 1 - Math.pow(1 - introProgress, introEasePower);
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

function autoUpdateLensResolution() {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  lensUniforms.winResolution.value.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  maskRenderTarget.setSize(
    Math.floor(window.innerWidth * pixelRatio),
    Math.floor(window.innerHeight * pixelRatio)
  );
}

autoUpdateLensResolution();
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

  autoUpdateLensResolution();
  updateScrollTarget();
  computeTitleIntroStartTransform();
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;
  const introEaseTarget = getIntroEase(elapsed);
  const introBlend = 1.0 - Math.exp(-11.0 * delta);
  introEaseSmoothed += (introEaseTarget - introEaseSmoothed) * introBlend;
  if (introEaseTarget > 0.999 && introEaseSmoothed > 0.997) {
    introEaseSmoothed = 1;
  }

  wiringElectricMaterial.uniforms.uTime.value = elapsed;
  scrollProgress += (scrollProgressTarget - scrollProgress) * 0.08;

  if (schoolModel) {
    schoolModel.visible = elapsed >= introDelay;
    introCamera.lerpVectors(introState.startCameraPos, introState.endCameraPos, introEaseSmoothed);

    camera.position.x = introCamera.x + mapRange(scrollProgress, 0, 1, 0, 0.5);
    camera.position.y = introCamera.y;
    camera.position.z = introCamera.z + mapRange(scrollProgress, 0, 1, 0, -1.2);
    camera.lookAt(introState.lookAt);
  } else {
    camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
    camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5);
  }
  updateTitleIntroTransform(introEaseSmoothed);

  if (schoolMeshes.length > 0 && isPointerActive) {
    hoverRaycaster.setFromCamera(hoverPointer, camera);
    isHoveringSchool = hoverRaycaster.intersectObjects(schoolMeshes, false).length > 0;
  } else {
    isHoveringSchool = false;
  }

  if (isHoveringSchool && !wasHoveringSchool) {
    pointerCurrent.copy(pointerTarget);
    updateLensPosition();
  }

  lensScaleTarget = isHoveringSchool ? 1.0 : 0.0;
  const growSpeed = 12.0;
  const shrinkSpeed = 9.0;
  const blend = 1.0 - Math.exp(-(lensScaleTarget > lensScaleCurrent ? growSpeed : shrinkSpeed) * delta);
  lensScaleCurrent += (lensScaleTarget - lensScaleCurrent) * blend;
  lens.scale.setScalar(Math.max(lensScaleCurrent, 0.001));
  lens.visible = lensScaleCurrent > 0.01;

  if (isHoveringSchool) {
    updateLensPosition();
  }
  wasHoveringSchool = isHoveringSchool;
  if (lensScaleCurrent > 0.01 || lensScaleTarget > 0.01) {
    renderWireMask();
  }
  composer.render();
}

animate();
