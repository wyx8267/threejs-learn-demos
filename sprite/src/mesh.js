import * as THREE from 'three';

const group = new THREE.Group();

const spriteMaterial = new THREE.SpriteMaterial({
    color: 'orange'
});

const sprite = new THREE.Sprite(spriteMaterial);

group.add(sprite);

const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'lightblue'
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 3;
group.add(mesh);

export default group;

