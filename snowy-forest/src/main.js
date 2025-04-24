import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mountainside from './mountainside.js';
import loadTree from './tree.js';
import snow from './snow.js';

const scene = new THREE.Scene();

scene.add(mountainside);
scene.add(snow)

// loadTree(tree => {
//     scene.add(tree);
// })

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.position.set(1000, 1000, 1000);
directionLight.position.set(1000, 2000, 1000);
directionLight.castShadow = true;
directionLight.shadow.camera.left = -2000;
directionLight.shadow.camera.right = 2000;
directionLight.shadow.camera.top = 2000;
directionLight.shadow.camera.bottom = -2000;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 10000;
scene.add(directionLight);

// const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(cameraHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(300, 300, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

let angle = 0;
let r = 1000;
function render() {
  angle += 0.01;
  camera.position.x = r * Math.cos(angle);
  camera.position.z = r * Math.sin(angle);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

renderer.setClearColor(new THREE.Color('darkblue'))
document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
