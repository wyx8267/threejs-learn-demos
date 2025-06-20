import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from "three/addons/controls/DragControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { MapControls } from "three/addons/controls/MapControls.js";
import mesh from "./mesh.js";

const scene = new THREE.Scene();
scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.set(500, 400, 300);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

// const controls = new FlyControls(camera, renderer.domElement);
// controls.movementSpeed = 100;
// controls.rollSpeed = Math.PI / 10;

// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 100;

const controls = new MapControls(camera, renderer.domElement);

const clock = new THREE.Clock();
function render() {
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);

const box1 = scene.getObjectByName("box");
const box2 = scene.getObjectByName("box2");

// const controls = new DragControls([box1, box2], camera, renderer.domElement);

// controls.addEventListener("dragstart", (e) => {
//   e.object.material.color.set("lightgreen");
// });

// controls.addEventListener("dragend", (e) => {
//   e.object.material.color.set("orange");
// });

// controls.addEventListener('hoveron', e => {
//   e.object.material.wireframe = true;
// })

// controls.addEventListener('hoveroff', e => {
//   e.object.material.wireframe = false;
// })

// const controls = new TransformControls(camera, renderer.domElement);
// controls.attach(box1);
// scene.add(controls.getHelper());
// controls.setMode('scale');
