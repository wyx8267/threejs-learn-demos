import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./matcap2.png')

loader.load('./duck.glb', gltf => {
    console.log('\x1b[97m\x1b[41mgltf==>\x1b[0m', gltf);
    mesh.add(gltf.scene);
    gltf.scene.scale.setScalar(3000);
    gltf.scene.position.y = -300;

    gltf.scene.traverse(obj => {
        if (obj.isMesh) {
            obj.material = new THREE.MeshMatcapMaterial({
                color: 'orange',
                matcap: texture
            })
        }
    })
})

export default mesh;