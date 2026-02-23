import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import './style.css';

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
scene.background = null;

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

const backgroundUniforms = {
  uTime: { value: 0 },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: backgroundUniforms,
  side: THREE.BackSide,
  depthWrite: false,
  vertexShader: /* glsl */ `
    varying vec3 vWorldDir;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldDir = normalize(worldPos.xyz - cameraPosition);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec3 vWorldDir;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }

    float noise2d(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));

      float x1 = mix(a, b, f.x);
      float x2 = mix(c, d, f.x);
      return mix(x1, x2, f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.55;
      mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

      v += a * noise2d(p);
      p = rot * p * 2.02;
      a *= 0.5;

      v += a * noise2d(p);
      return v;
    }

    void main() {
      vec2 uv = normalize(vWorldDir).xy;
      uv.x *= uResolution.x / uResolution.y;

      float t = uTime * 0.01;
      vec2 flow = vec2(t, -t * 0.72);

      float n = fbm(uv * 0.1 + flow);
      n += 0.3 * fbm((uv + vec2(1.7, -2.1)) * 4.5 - flow * 1.8);
      n *= 0.78;

      float bandCount = 18.0;
      float contour = fract(n * bandCount);
      float distToLine = abs(contour - 0.5);

      float aa = max(fwidth(n * bandCount), 0.0015);
      float lineWidth = 0.020;
      float line = 1.0 - smoothstep(lineWidth - aa, lineWidth + aa, distToLine);

      vec3 base = vec3(240.0/255.0);

      vec3 ink = vec3(0.7,0.2,0.7);

      vec3 color = base - ink * line * 0.32;

      gl_FragColor = vec4(color, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
});

const backgroundDome = new THREE.Mesh(new THREE.SphereGeometry(55, 32, 24), backgroundMaterial);
backgroundDome.frustumCulled = false;
scene.add(backgroundDome);

const composer = new EffectComposer(renderer);
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
composer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.1,
  0.7,
  0.82
);
composer.addPass(bloomPass);

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

const lens = new THREE.Mesh(new THREE.SphereGeometry(0.25, 96, 96), lensMaterial);
scene.add(lens);

const hemiLight = new THREE.HemisphereLight('#ffffff', '#0f172a', 0.6);
const dirLight = new THREE.DirectionalLight('#ffffff', 0.8);
dirLight.position.set(5, 10, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(512, 512);
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
const floorGeometry = new THREE.PlaneGeometry(32, 20);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, -3, 8);
floor.receiveShadow = true;
scene.add(floor);

let schoolModel = null;
const schoolMeshes = [];
const schoolWireframes = [];
const wireMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(0x0c4e24) },
    uColorHot: { value: new THREE.Color(0x3ffd84) },
    uSpeed: { value: 0.6 },
    uPulse: { value: 3.0 },
    uOpacity: { value: 1.0 }
  },
  vertexShader: /* glsl */ `
    attribute float lineDistance;
    varying float vLineDistance;

    void main() {
      vLineDistance = lineDistance;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
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

    varying float vLineDistance;

    void main() {
      float flow = fract(vLineDistance * 0.32 - uTime * uSpeed);
      float currentBand = smoothstep(0.0, 0.12, flow) * (1.0 - smoothstep(0.12, 0.45, flow));
      float pulse = 0.55 + 0.45 * sin(uTime * uPulse + vLineDistance * 0.18);
      float glow = max(currentBand, 0.35 * pulse);
      vec3 color = mix(uColorBase, uColorHot, glow);
      float alpha = (0.2 + 0.8 * glow) * uOpacity;

      gl_FragColor = vec4(color, alpha);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
  transparent: true,
  opacity: 1,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});
const maskMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0,
  depthWrite: false
});

const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -4),
  endCameraPos: new THREE.Vector3(0, -2, 25),
  lookAt: new THREE.Vector3(0, 5, -5)
};
const introDelay = 0.8;
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 3.2;
const loader = new OBJLoader();

const schoolMaterial = new THREE.MeshStandardMaterial({ emissive: '#ffffff', emissiveIntensity: 0.2 });

const windowFrameMaterial = new THREE.MeshStandardMaterial({ emissive: '#d9d9d9', emissiveIntensity: 0.15 });

const windowMaterial = new THREE.MeshPhysicalMaterial({ emissive: '#d7d7d7', emissiveIntensity: 0.06 });

const windows = [
  'Cube.024', 'Cube.025', 'Cube.026',
  'Cube.013', 'Cube.014', 'Cube.015',
  'Cube.046', 'Plane', 'Cylinder'
];

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      if (windows.includes(child.name)) {
        child.material = windowMaterial;
      } else if (child.name === 'Cube.038') {
        child.material = windowFrameMaterial;
      } else {
        child.material = schoolMaterial;
      }
      child.castShadow = true;
      child.receiveShadow = true;

      const edges = new THREE.EdgesGeometry(child.geometry, 15);
      const wire = new THREE.LineSegments(edges, wireMaterial);
      wire.computeLineDistances();
      wire.visible = false;
      child.add(wire);

      schoolMeshes.push(child);
      schoolWireframes.push(wire);
    }
  });

  schoolModel.scale.setScalar(0.2);
  schoolModel.position.set(0, 1.8, 0);

  subjectGroup.add(schoolModel);
});

const pointerTarget = new THREE.Vector2(0, 0);
const pointerCurrent = new THREE.Vector2(0, 0);

window.addEventListener('pointermove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('pointerleave', () => {
  pointerTarget.set(0, 0);
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
  if (!schoolModel || schoolMeshes.length === 0) {
    return;
  }

  const previousBackground = scene.background;
  scene.background = maskBackground;
  lens.visible = false;
  backgroundDome.visible = false;

  for (const mesh of schoolMeshes) {
    previousMaterials.set(mesh, mesh.material);
    mesh.material = maskMaterial;
  }

  for (const wire of schoolWireframes) {
    wire.visible = true;
  }

  renderer.setRenderTarget(maskRenderTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  for (const mesh of schoolMeshes) {
    mesh.material = previousMaterials.get(mesh);
  }

  for (const wire of schoolWireframes) {
    wire.visible = false;
  }

  previousMaterials.clear();
  lens.visible = true;
  backgroundDome.visible = true;
  scene.background = previousBackground;
}

const clock = new THREE.Clock();
let scrollProgress = 0;
let scrollProgressTarget = 0;
const introCamera = new THREE.Vector3();

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp01((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
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
  backgroundUniforms.uResolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  maskRenderTarget.setSize(
    Math.floor(window.innerWidth * pixelRatio),
    Math.floor(window.innerHeight * pixelRatio)
  );
}

autoUpdateLensResolution();
updateScrollTarget();

window.addEventListener('scroll', updateScrollTarget, { passive: true });

window.addEventListener('resize', () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(window.innerWidth, window.innerHeight);
  bloomPass.setSize(window.innerWidth, window.innerHeight);
  fxaaPass.material.uniforms.resolution.value.set(
    1 / (window.innerWidth * pixelRatio),
    1 / (window.innerHeight * pixelRatio)
  );

  autoUpdateLensResolution();
  updateScrollTarget();
});

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  wireMaterial.uniforms.uTime.value = elapsed;
  backgroundUniforms.uTime.value = elapsed;
  scrollProgress += (scrollProgressTarget - scrollProgress) * 0.08;

  if (schoolModel) {
    schoolModel.visible = elapsed >= introDelay;
    const introProgress =
      introDuration === 0 ? 1 : clamp01((elapsed - introDelay) / introDuration);
    const introEase = 1 - Math.pow(1 - introProgress, 3);
    introCamera.lerpVectors(introState.startCameraPos, introState.endCameraPos, introEase);

    camera.position.x = introCamera.x + mapRange(scrollProgress, 0, 1, 0, 0.5);
    camera.position.y = introCamera.y;
    camera.position.z = introCamera.z + mapRange(scrollProgress, 0, 1, 0, -1.2);
    camera.lookAt(introState.lookAt);
  } else {
    camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
    camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5);
  }

  backgroundDome.position.copy(camera.position);
  updateLensPosition();
  renderWireMask();
  composer.render();
}

animate();
