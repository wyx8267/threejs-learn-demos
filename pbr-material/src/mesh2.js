import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const textureCube = new THREE.CubeTextureLoader()
    .setPath('./mountain/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry = new THREE.DodecahedronGeometry(300);
const material = new THREE.MeshPhysicalMaterial({
    color: 'blue',
    metalness: 0,
    roughness: 0.5,
    envMap: textureCube,
    transmission: 0.9,
    ior: 1.8
})

const gui = new GUI();
gui.addColor(material, 'color');
gui.add(material, 'transmission', 0, 1);
gui.add(material, 'ior', 1, 2.33);

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
