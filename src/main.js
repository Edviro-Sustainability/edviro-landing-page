import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
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

const hemiLight = new THREE.HemisphereLight('#ffffff', '#0f172a', 0.6);
const keyLight = new THREE.DirectionalLight('#ffffff', 1.35);
keyLight.position.set(6, 8, 7);
const fillLight = new THREE.DirectionalLight('#ffffff', 0.45);
fillLight.position.set(-6, 2, 4);
scene.add(hemiLight, keyLight, fillLight);

const subjectGroup = new THREE.Group();
scene.add(subjectGroup);

const floorGridConfig = {
  bgColor: '#ececec',
  lineColor: '#d2d8d4',
  cellsPerSide: 24,
  lineWidth: 2,
  textureSize: 1024,
  repeatX: 3,
  repeatY: 0.6
};

function createGridTexture(config) {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = config.textureSize;
  canvasEl.height = config.textureSize;
  const ctx = canvasEl.getContext('2d');

  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, config.textureSize, config.textureSize);

  const step = config.textureSize / config.cellsPerSide;
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = config.lineWidth;
  ctx.beginPath();
  for (let i = 0; i <= config.cellsPerSide; i += 1) {
    const p = Math.round(i * step) + 0.5;
    ctx.moveTo(p, 0);
    ctx.lineTo(p, config.textureSize);
    ctx.moveTo(0, p);
    ctx.lineTo(config.textureSize, p);
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvasEl);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(config.repeatX, config.repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

let floor = null;
const floorMaterial = new THREE.MeshStandardMaterial({
  map: createGridTexture(floorGridConfig),
  roughness: 0.9,
  metalness: 0.05
});
const floorGeometry = new THREE.PlaneGeometry(32, 20);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, -3, 8);
scene.add(floor);

let schoolModel = null;
const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -4),
  endCameraPos: new THREE.Vector3(0, -2, 25),
  lookAt: new THREE.Vector3(0, 5, -5),
};
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 3.2;
const loader = new OBJLoader();
const schoolMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  emissive: '#ffffff',
  emissiveIntensity: 0.15,
  roughness: 0.4,
  metalness: 0.15
});

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  schoolModel.traverse((child) => {
    if (child.isMesh) {
      child.material = schoolMaterial;
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
