import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./snow.png');
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
});

const group = new THREE.Group();

for (let i = 0; i < 10000; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000,
    );
    group.add(sprite);
}

function render() {
    group.children.forEach((sprite) => {
        sprite.position.y -= 0.1;
        if (sprite.position.y < 0) {
            sprite.position.y = 1000;
        }
    });

    requestAnimationFrame(render);
}

render();

export default group;