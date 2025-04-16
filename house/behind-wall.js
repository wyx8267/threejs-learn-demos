import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(4000, 2000, 100);

const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('lightgrey')
})
const behindWall = new THREE.Mesh(geometry, material);
behindWall.translateY(1150);
behindWall.translateZ(-1450);

export default behindWall;