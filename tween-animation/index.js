import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh from './mesh.js';
import {Tween, Easing} from '@tweenjs/tween.js';

const scene = new THREE.Scene();

scene.add(mesh);

const pointLight = new THREE.DirectionalLight(0xffffff);
pointLight.position.set(100, 300, 200);
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 50, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

// const tween = new Tween(mesh.position)
//     .to({x: 100, y: 100}, 2000)
//     .easing(Easing.Quadratic.InOut)
//     .start();

const r = 50;
const tween = new Tween({angle: 0})
    .to({angle: 2 * Math.PI}, 5000)
    .onUpdate(function(obj){
        camera.position.x = r * Math.cos(obj.angle);
        camera.position.z = r * Math.sin(obj.angle);
        camera.lookAt(0, 0, 0);
    })
    .easing(Easing.Quadratic.InOut)
    .repeat(Infinity)
    .start()

function render(time) {
    tween.update(time);
    // if(mesh.position.x < 100){
    //     mesh.position.x += 1;
    //     mesh.position.y += 1;
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
