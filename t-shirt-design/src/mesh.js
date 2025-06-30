import * as THREE from 'three';
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';

const group = new THREE.Group();

const gltfLoader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('./tshirt.glb', gltf => {
    group.add(gltf.scene);
    gltf.scene.scale.setScalar(1000);

    // gltf.scene.traverse(obj => {
    //     if(obj.isMesh) {
    //         console.log('\x1b[97m\x1b[41mobj==>\x1b[0m', obj);
    //     }
    // })
})

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial({
//     color: 'orange'
// });
// const mesh = new THREE.Mesh(geometry, material);

// group.add(mesh);

export default group;

