import * as THREE from 'three';

const arc = new THREE.EllipseCurve(0, 0, 100, 100, Math.PI / 4, Math.PI / 2);
const pointsList = arc.getPoints(50);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList);

// const material = new THREE.PointsMaterial({
//     color: new THREE.Color('orange'),
//     size: 10,
// })
// const points = new THREE.Points(geometry, material);

// console.log('\x1b[97m\x1b[41mpoints==>\x1b[0m', points);

// export default points;

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange'),
})
const line = new THREE.Line(geometry, material);

console.log('\x1b[97m\x1b[41mline==>\x1b[0m', line);

export default line;