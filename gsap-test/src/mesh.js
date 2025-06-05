import * as THREE from 'three';
import gsap from 'gsap';

const geometry = new THREE.BoxGeometry(30, 30, 30);
const material = new THREE.MeshPhongMaterial({
    color: 'orange'
});

const mesh = new THREE.Mesh(geometry, material);

// gsap.to(mesh.position, {
//     x: 300,
//     ease: 'bounce.inOut'
// }).repeat(0);

const tl = gsap.timeline();
tl.to(mesh.position, { x: 300, duration: 2 })
    .to(mesh.rotation, { y: Math.PI / 3, duration: 1 }, '+=3')
    .to(mesh.scale, { x: 2, duration: 1 }, '<')

export default mesh;
