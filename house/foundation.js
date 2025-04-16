import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(4000, 300, 3000);
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('grey')
})
const foundation = new THREE.Mesh(geometry, material);
foundation.translateY(10);

export default foundation;