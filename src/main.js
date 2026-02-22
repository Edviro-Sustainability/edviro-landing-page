import * as THREE from 'three';
import './style.css';

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f172a');
scene.fog = new THREE.Fog('#0f172a', 8, 22);

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

const primary = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.9, 0.28, 120, 16),
  new THREE.MeshStandardMaterial({
    color: '#f97316',
    metalness: 0.35,
    roughness: 0.3
  })
);
primary.position.set(-2.2, 0.8, 0);
subjectGroup.add(primary);

const secondary = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.95, 1),
  new THREE.MeshStandardMaterial({
    color: '#38bdf8',
    metalness: 0.15,
    roughness: 0.15
  })
);
secondary.position.set(2.1, -0.65, -0.3);
subjectGroup.add(secondary);

const tertiary = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({
    color: '#22c55e',
    metalness: 0.2,
    roughness: 0.35
  })
);
tertiary.position.set(0, -1.9, -1.8);
subjectGroup.add(tertiary);

const clock = new THREE.Clock();
let scrollProgress = 0;
let scrollProgressTarget = 0;

const pointer = { x: 0, y: 0 };

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

window.addEventListener('pointermove', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
});

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

  // Section 1 -> 2 transition
  primary.rotation.x = elapsed * 0.3 + mapRange(scrollProgress, 0.0, 0.33, 0, 1.2);
  primary.rotation.y = elapsed * 0.55 + mapRange(scrollProgress, 0.0, 0.33, 0, 1.8);
  primary.position.y = mapRange(scrollProgress, 0.0, 0.33, 0.8, -0.35);

  // Section 2 -> 3 transition
  secondary.rotation.y = elapsed * 0.35 + mapRange(scrollProgress, 0.33, 0.66, 0, 2.4);
  secondary.position.x = mapRange(scrollProgress, 0.33, 0.66, 2.1, -1.4);
  secondary.position.z = mapRange(scrollProgress, 0.33, 0.66, -0.3, 0.7);

  // Section 3 -> 4 transition
  tertiary.rotation.z = elapsed * 0.4 + mapRange(scrollProgress, 0.66, 1.0, 0, 2.1);
  tertiary.position.y = mapRange(scrollProgress, 0.66, 1.0, -1.9, 1.15);
  tertiary.scale.setScalar(mapRange(scrollProgress, 0.66, 1.0, 1, 1.4));

  subjectGroup.rotation.y = pointer.x * 0.12;
  subjectGroup.rotation.x = pointer.y * 0.08;

  camera.position.z = mapRange(scrollProgress, 0, 1, 7.5, 5.8);
  camera.position.x = mapRange(scrollProgress, 0, 1, 0, 0.5);
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
