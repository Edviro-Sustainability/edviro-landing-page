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
scene.background = new THREE.Color('#ececec');

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

const hemiLight = new THREE.HemisphereLight('#ffffff', '#0f172a', 0.6);
const dirLight = new THREE.DirectionalLight('#ffffff', 0.8);
dirLight.position.set(5, 10, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
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
const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -4),
  endCameraPos: new THREE.Vector3(0, -2, 25),
  lookAt: new THREE.Vector3(0, 5, -5),
};
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 3.2;
const loader = new OBJLoader();

const schoolMaterial = new THREE.MeshStandardMaterial({ emissive: '#ffffff', emissiveIntensity: 0.2, });

const windowFrameMaterial = new THREE.MeshStandardMaterial({ emissive: '#d9d9d9', emissiveIntensity: 0.15, });

const windowMaterial = new THREE.MeshPhysicalMaterial({ emissive: '#d7d7d7', emissiveIntensity: 0.06 });

const windows = [
  "Cube.024", "Cube.025", "Cube.026",
  "Cube.013", "Cube.014", "Cube.015",
  "Cube.046", "Plane"
];

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      if (windows.includes(child.name)) {
        child.material = windowMaterial;
      } else if (child.name === "Cube.038") {
        child.material = windowFrameMaterial;
      } else {
        child.material = schoolMaterial;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  schoolModel.scale.setScalar(0.2);
  schoolModel.position.set(0, 1.8, 0);
  
  subjectGroup.add(schoolModel);
});

const clock = new THREE.Clock();
let scrollProgress = 0;
let scrollProgressTarget = 0;

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
  updateScrollTarget();
});

function animate() {

  const elapsed = clock.getElapsedTime();
  scrollProgress += (scrollProgressTarget - scrollProgress) * 0.08;

  if (schoolModel) {
    const introProgress = introDuration === 0 ? 1 : clamp01(elapsed / introDuration);
    const introEase = 1 - Math.pow(1 - introProgress, 3);
    const introCamera = new THREE.Vector3().lerpVectors(
      introState.startCameraPos,
      introState.endCameraPos,
      introEase
    );

    camera.position.x = introCamera.x + mapRange(scrollProgress, 0, 1, 0, 0.5);
    camera.position.y = introCamera.y;
    camera.position.z = introCamera.z + mapRange(scrollProgress, 0, 1, 0, -1.2);
    camera.lookAt(introState.lookAt);
  } else {
    camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
    camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5);
  }

  composer.render();
  requestAnimationFrame(animate);
}

animate();
