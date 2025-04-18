import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const mesh = new THREE.Group();

loader.load('./horse.gltf', function(gltf){
    mesh.add(gltf.scene);

    gltf.scene.traverse(obj => {
        if(obj.isMesh) {
            console.log('mesh==>', obj);
            if(obj.name === "Cylinder") {
                obj.material.color = new THREE.Color('white')
            } else if (obj.name === 'Cylinder_1') {
                obj.material.color = new THREE.Color('pink')
            }
        }
    })

    const obj = gltf.scene.getObjectByName('Cylinder');
    obj.material = new THREE.MeshBasicMaterial({
        color: 'white',
        wireframe: true
    });
})

export default mesh;