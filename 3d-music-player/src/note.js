import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { Group, Easing, Tween } from "@tweenjs/tween.js";
import { throttle } from "lodash-es";

function createCanvas() {
  const dpr = window.devicePixelRatio;
  const canvas = document.createElement("canvas");
  const w = (canvas.width = 100 * dpr);
  const h = (canvas.height = 100 * dpr);

  const c = canvas.getContext("2d");
  c.translate(w / 2, h / 2);

  c.moveTo(-20 * dpr, 40 * dpr);
  c.lineTo(-20 * dpr, -10 * dpr);
  c.lineTo(20 * dpr, -10 * dpr);
  c.lineTo(20 * dpr, 30 * dpr);
  c.lineWidth = 10;
  c.lineJoin = "round";
  c.strokeStyle = "yellow";
  c.stroke();

  c.beginPath();
  c.ellipse(15, 50, 15, 20, Math.PI / 2, 0, Math.PI * 2);
  c.fillStyle = "yellow";
  c.fill();

  c.beginPath();
  c.ellipse(-45, 60, 15, 20, Math.PI / 2, 0, Math.PI * 2);
  c.fill();
  return canvas;
}

function createNote() {
  const texture = new THREE.CanvasTexture(createCanvas());
  const material = new THREE.SpriteMaterial({
    map: texture,
  });
  const note = new THREE.Sprite(material);
  note.scale.set(100, 100);
  return note;
}

const group = new THREE.Group();
for (let i = 0; i < 100; i++) {
  const note = createNote();
  const x = -1000 + 2000 * Math.random();
  const y = -1000 + 2000 * Math.random();
  const z = -1000 + 4000 * Math.random();
  note.position.set(x, y, z);
  group.add(note);
}

const simplex = new SimplexNoise();

const tweenGroup = new Group();
let time = 0;
function updatePosition() {
  group.children.forEach((sprite) => {
    const { x, y, z } = sprite.position;
    const x2 = x + simplex.noise(x, time) * 100;
    const y2 = y + simplex.noise(y, time) * 100;
    const z2 = z + simplex.noise(z, time) * 100;

    const tween = new Tween(sprite.position)
      .to({ x: x2, y: y2, z: z2 }, 500)
      .easing(Easing.Quadratic.InOut)
      .repeat(0)
      .start()
      .onComplete(() => {
        tweenGroup.remove(tween);
      });
    tweenGroup.add(tween);
  });
  time++;
}

const updatePosition2 = throttle(updatePosition, 500);

function render() {
  tweenGroup.update();
  updatePosition2();
  requestAnimationFrame(render);
}
render();

export default group;
