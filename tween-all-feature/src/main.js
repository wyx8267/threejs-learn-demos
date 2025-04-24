import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';

const scene = new THREE.Scene();

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(1000);
scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 600, 800);
camera.lookAt(0, 0, 0);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

const tween = new Tween(mesh.position)
  .to({ x: 600 }, 2000)
  // .easing(Easing.Bounce.Out)
  .easing(Easing.Elastic.Out)
  .repeat(0)
  // .start()

const tween2 = new Tween(mesh.rotation)
  .to({ x: Math.PI / 6 }, 2000)
  .easing(Easing.Quadratic.InOut)
  .repeat(0)
  // .start();

const tweenGroup = new Group();
tweenGroup.add(tween, tween2);

tween2.chain(tween);
tween2.start()

function render() {
  // tween.update();
  // tween2.update();
  tweenGroup.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

