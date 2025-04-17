import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export const gui = new GUI();

const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('white')
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-Math.PI / 2);
plane.position.y = -50;

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const boxMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color('white') });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

const box2 = box.clone();
box2.position.x = 200;

export const mesh = new THREE.Group();
mesh.add(plane, box, box2);

// export const light = new THREE.PointLight(0xffffff, 1000000);
export const light = new THREE.HemisphereLight(
    new THREE.Color('orange'),
    new THREE.Color('green'),
);
light.position.set(400, 500, 300);
light.lookAt(0, 0, 0);

// const helper = new THREE.PointLightHelper(light, 100);
const helper = new THREE.HemisphereLightHelper(light, 100);
mesh.add(helper);

const f1 = gui.addFolder('半球光');
function onChange(){
    helper.update();
}
f1.add(light.position, 'x').min(10).max(1000).onChange(onChange);
f1.add(light.position, 'y').min(10).max(1000).onChange(onChange);
f1.add(light.position, 'z').min(10).max(1000).onChange(onChange);
f1.add(light, 'intensity', 1, 5).onChange(onChange);
f1.addColor(light, 'color').onChange(onChange);
f1.addColor(light, 'groundColor').onChange(onChange);