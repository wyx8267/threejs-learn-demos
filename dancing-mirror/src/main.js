import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import mesh from "./mesh.js";
import { Tween } from "@tweenjs/tween.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

const scene = new THREE.Scene();
scene.add(mesh);

const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(0, 500, 0);
scene.add(directionLight);
directionLight.castShadow = true;
directionLight.shadow.camera.left = -200;
directionLight.shadow.camera.right = 200;
directionLight.shadow.camera.top = 100;
directionLight.shadow.camera.bottom = -100;
directionLight.shadow.camera.near = 0.5;
directionLight.shadow.camera.far = 1000;

// const cameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(cameraHelper);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const rectAreaLight = new THREE.RectAreaLight(0xffffff, 20, 300, 300);
rectAreaLight.position.set(0, 500, 0);
rectAreaLight.rotation.x = -Math.PI / 2;
rectAreaLight.lookAt(0, 0, 0);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const helper = new THREE.AxesHelper(500);
// scene.add(helper);

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(300, 700, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

const r = 400;
const tween = new Tween({ angle: 0 })
  .to({ angle: Math.PI * 2 }, 20000)
  .onUpdate((obj) => {
    const x = r * Math.sin(obj.angle);
    const z = r * Math.cos(obj.angle);
    camera.position.set(x, 200, z);
    camera.lookAt(0, 200, 0);
  })
  .repeat(Infinity)
  .start();

function render(time) {
  tween.update(time);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
