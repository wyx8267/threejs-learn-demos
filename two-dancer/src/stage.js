import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const stage = new THREE.Group();

loader.load("./stage.glb", (gltf) => {
    console.log('\x1b[97m\x1b[41mgltf==>\x1b[0m', gltf);
    stage.add(gltf.scene);
    gltf.scene.scale.set(50, 50, 50);

    gltf.scene.traverse(obj => {
        obj.receiveShadow = true;
    })
})

function loadDancer(callback, z, angle) {
    loader.load("./Michelle.glb", gltf => {
        callback(gltf.scene);

        gltf.scene.traverse(obj => {
            obj.castShadow = true;
        })

        stage.add(gltf.scene);
        gltf.scene.scale.set(300, 300, 300);
        gltf.scene.position.z = z;
        gltf.scene.rotateY(angle);

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const clipAction = mixer.clipAction(gltf.animations[0]);
        clipAction.play();

        const clock = new THREE.Clock();
        function render() {
            const delta = clock.getDelta();
            mixer.update(delta);
            requestAnimationFrame(render);
        }
        render();
    })
}

loadDancer(dancer => { }, 200, Math.PI);
loadDancer(dancer => {
    dancer.traverse(obj => {
        if (obj.isMesh) {
            obj.material = obj.material.clone();
            obj.material.color.set('orange');
        }
    })
}, -200, 0);

export default stage;