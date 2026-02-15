import * as THREE from 'three';
import { initDemoShell } from '/shared/demo-shell.js';
import { prefersReducedMotion } from '/shared/a11y.js';

initDemoShell({ title: 'Interactive 3D Scene', category: '3d', tech: ['three.js', 'instanced-mesh', 'raycaster'] });

let reduced = prefersReducedMotion();
if (reduced) document.documentElement.classList.add('reduced-motion');
window.addEventListener('motion-preference', (e) => { reduced = e.detail.reduced; });

// Config
const GRID = 20; // 20x20 = 400 spheres
const SPACING = 0.6;
const REPULSION_RADIUS = 3;
const REPULSION_FORCE = 0.08;
const SPRING = 0.04;
const DAMPING = 0.88;

// Scene
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#030510');

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 8, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0x222244, 0.8));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);
const pointLight = new THREE.PointLight(0x86e8ff, 2, 20);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

// Instanced mesh
const geo = new THREE.SphereGeometry(0.15, 16, 16);
const mat = new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0.3 });
const count = GRID * GRID;
const mesh = new THREE.InstancedMesh(geo, mat, count);
scene.add(mesh);

// Particle state
const dummy = new THREE.Object3D();
const color = new THREE.Color();
const particles = [];
const halfGrid = (GRID - 1) * SPACING / 2;

for (let i = 0; i < GRID; i++) {
  for (let j = 0; j < GRID; j++) {
    const x = i * SPACING - halfGrid;
    const z = j * SPACING - halfGrid;
    particles.push({
      homeX: x, homeZ: z,
      x, y: 0, z,
      vx: 0, vy: 0, vz: 0,
    });
  }
}

// Mouse → 3D plane intersection
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const mouseWorld = new THREE.Vector3();

document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Color palette
const coldColor = new THREE.Color('#86e8ff');
const warmColor = new THREE.Color('#ff40d6');

// Animate
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Raycast mouse to ground plane
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(intersectPlane, mouseWorld);

  for (let i = 0; i < count; i++) {
    const p = particles[i];

    if (!reduced) {
      // Distance from mouse
      const dx = p.x - mouseWorld.x;
      const dz = p.z - mouseWorld.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Repulsion
      if (dist < REPULSION_RADIUS && dist > 0.01) {
        const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FORCE;
        p.vx += (dx / dist) * force;
        p.vz += (dz / dist) * force;
        p.vy += force * 0.5; // push up too
      }

      // Spring back to home
      p.vx += (p.homeX - p.x) * SPRING;
      p.vz += (p.homeZ - p.z) * SPRING;
      p.vy += (0 - p.y) * SPRING;

      // Damping
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.vz *= DAMPING;

      // Integrate
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
    }

    // Update instance
    dummy.position.set(p.x, p.y, p.z);
    const scale = 1 + p.y * 0.8; // scale with height
    dummy.scale.setScalar(Math.max(scale, 0.3));
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    // Color by distance from mouse
    const dist = Math.sqrt(
      (p.x - mouseWorld.x) ** 2 + (p.z - mouseWorld.z) ** 2
    );
    const t2 = Math.min(dist / REPULSION_RADIUS, 1);
    color.copy(warmColor).lerp(coldColor, t2);
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  // Subtle camera sway
  if (!reduced) {
    camera.position.x = Math.sin(t * 0.15) * 0.5;
    camera.lookAt(0, 0, 0);
  }

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('beforeunload', () => { geo.dispose(); mat.dispose(); renderer.dispose(); });
