import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const loader = new THREE.TextureLoader();
const texture = loader.load('./zhuan.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.TorusGeometry(300, 100);
const material = new THREE.MeshPhysicalMaterial({
    color: 'green',
    sheen: 1,
    sheenRoughness: 1,
    sheenColor: 'white',
    sheenColorMap: texture,
})

const mesh = new THREE.Mesh(geometry, material);

export default mesh;