import * as THREE from 'three';

function createCanvas(text) {
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio;
    const w = canvas.width = 500 * dpr;
    const h = canvas.height = 300 * dpr;

    const c = canvas.getContext('2d');
    c.translate(w / 2, h / 2);
    c.fillStyle = "#ffffff";
    c.font = "normal " + 300 * dpr + "px 微软雅黑";
    c.textBaseline = "middle";
    c.textAlign = "center";
    c.fillText(text, 0, 0);
    return canvas;
}

const texture = new THREE.CanvasTexture(createCanvas('aaaasd'));

const spriteMaterial = new THREE.SpriteMaterial({
    map: texture
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(500, 300);
export default sprite;
