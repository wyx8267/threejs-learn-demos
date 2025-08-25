import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function init2D(dom: HTMLElement) {
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(50000);
  scene.add(axesHelper);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 1500, 0);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
  scene.add(ambientLight);

  const width = window.innerWidth;
  const height = window.innerHeight - 60;

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100000);
  camera.position.set(0, 10000, 0);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor("lightblue");

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = false;
  // controls.target.set(200, 0, -100);

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();

  dom.append(renderer.domElement);

  window.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight - 60;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  return { scene };
}
