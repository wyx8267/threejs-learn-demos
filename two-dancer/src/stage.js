import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';

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

loadDancer(dancer => {
    dancer.name = 'dancer1';
    dancer.traverse(obj => {
        obj.target = dancer
    })
    const ele = document.getElementById('dialog');
    const obj = new CSS2DObject(ele);
    dancer.add(obj);
    obj.position.set(1, 0, 0);
    ele.style.display = 'block';
    setTimeout(() => {
        ele.textContent = '谁叫你还搞不清楚我跟你的差别';
    }, 5000);

}, 200, Math.PI);
loadDancer(dancer => {
    dancer.name = 'dancer2';
    dancer.traverse(obj => {
        obj.target = dancer
    })
    const ele = document.getElementById('dialog2');
    const obj = new CSS2DObject(ele);
    ele.style.display = 'block';
    dancer.add(obj);
    obj.position.set(1, 0, 0);
    setTimeout(() => {
        ele.textContent = '超人没空给你给你安慰';
    }, 8000);


    dancer.traverse(obj => {
        if (obj.isMesh) {
            obj.material = obj.material.clone();
            obj.material.color.set('orange');
        }
    })
}, -200, 0);

export default stage;