import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import './style.css';

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#dddddd');

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

const ambientLight = new THREE.AmbientLight('#ffffff', 0.45);
const keyLight = new THREE.DirectionalLight('#ffffff', 1.15);
keyLight.position.set(4, 5, 5);
scene.add(ambientLight, keyLight);

const subjectGroup = new THREE.Group();
scene.add(subjectGroup);

let schoolModel = null;
const introState = {
  startCameraPos: new THREE.Vector3(0, 10, -4),
  endCameraPos: new THREE.Vector3(0, -2, 25),
  lookAt: new THREE.Vector3(0, 5, -10),
};
const introDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 3.2;
const loader = new OBJLoader();

loader.load('/school.obj', (loadedModel) => {
  schoolModel = loadedModel;
  
  schoolModel.scale.setScalar(0.2);
  schoolModel.position.set(0, 0, 0);
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
