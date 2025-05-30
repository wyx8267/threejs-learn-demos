import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshPhongMaterial({
  color: 'orange'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height)

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
controls.enableDamping = true;
controls.mouseButtons = {
  RIGHT: THREE.MOUSE.ROTATE,
  LEFT: THREE.MOUSE.PAN,
}
controls.maxPolarAngle = Math.PI / 2;

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);
