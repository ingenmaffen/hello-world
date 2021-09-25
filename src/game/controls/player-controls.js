import * as THREE from "../../../node_modules/three/build/three.module.js";
import { Tween, Easing } from "../../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { handleCamereMovement, getCameraDistance } from "./camera-controls.js";
import { playCollisionSound } from "../sounds/sfx.js";

const colliders = [];
const DEGREE = Math.PI / 180;
let playerSpeed = 0;
let maxSpeed = 30;

const keysEnum = {
    "FORWARD": "w",
    "BACKWARD": "s",
    "LEFT": "a",
    "RIGHT": "d",
    "UP": " ",
    "DOWN": "shift"
}

export function initiatePlayer() {
    const texturePathBase = "src/assets/textures";
    const geometry = new THREE.SphereGeometry(2, 32, 16);
    const texture = new THREE.TextureLoader().load(`${texturePathBase}/2k_earth_daymap.jpg`);
    const player = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
    player.rotation.z = -25 * DEGREE;
    return player;
}

export function handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio) {
    // TODO: move background with player
    // TODO: maybe fix spinning (it's funny enough this way)
    playerSpeed = playerSpeed > maxSpeed ? playerSpeed : playerSpeed + 0.1;
    playerSpeed = isPlayerMoving(pressedKeys) ? playerSpeed : 0;
    const verticalSpeed = 3;
    const spinSpeed = playerSpeed / 5;
    const moveDistance = playerSpeed * clock.getDelta();
    const vector = getMovementVector(camera, player);
    const cDistance = getCameraDistance();
    vector.x /= cDistance / 5;
    vector.y /= cDistance / 5;
    vector.z /= cDistance / 5;
    for (let [key, value] of Object.entries(pressedKeys)) {
        switch (key) {
            case keysEnum.FORWARD:
                player.rotation.x += spinSpeed * DEGREE * vector.z;
                player.rotation.z += spinSpeed * DEGREE * vector.x;
                player.position.x += moveDistance * vector.x;
                player.position.y += moveDistance * vector.y;
                player.position.z += moveDistance * vector.z;
                break;
            case keysEnum.BACKWARD:
                player.rotation.x +=  spinSpeed * -DEGREE * vector.z;
                player.rotation.z +=  spinSpeed * DEGREE * vector.x;
                player.position.x += -moveDistance * vector.x;
                player.position.y += -moveDistance * vector.y;
                player.position.z += -moveDistance * vector.z;
                break;
            case keysEnum.LEFT:
                player.rotation.y += spinSpeed * -DEGREE;
                player.position.x += moveDistance * vector.z;
                player.position.z += -moveDistance * vector.x;
                break;
            case keysEnum.RIGHT:
                player.rotation.y += spinSpeed * DEGREE;
                player.position.x += -moveDistance * vector.z;
                player.position.z += moveDistance * vector.x;
                break;
            case keysEnum.UP:
                player.position.y += verticalSpeed;
                break;
            case keysEnum.DOWN:
                player.position.y += -verticalSpeed;
                break;
        }
    }
    handleCamereMovement(0, 0, cameraPosition, camera, player);
    handleCollision(player, audio);
}

export function initiateColliders(objects) {
    objects.forEach((mesh) => {
        mesh.geometry.computeBoundingSphere();
        mesh.updateMatrixWorld();
        const collider = mesh.geometry.boundingSphere.clone();
        collider.applyMatrix4(mesh.matrixWorld);
        colliders.push({
            mesh,
            collider,
        });
    });
}

function handleCollision(player, audio) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    colliders.forEach((object) => {
        if (playerCollider.intersectsSphere(object.collider)) {
            console.log(player)
            console.log(object.collider.radius);
            const vector = getCollisionVector(player, object.mesh);
            playCollisionSound(audio);
            animateMovement(object.mesh, vector, object.collider);
            updateCollider(object.mesh, object.collider);
        }
    });
}

function isPlayerMoving(pressedKeys) {
    return pressedKeys[keysEnum.FORWARD] || pressedKeys[keysEnum.BACKWARD] || pressedKeys[keysEnum.LEFT] || pressedKeys[keysEnum.RIGHT];
} 

function getMovementVector(camera, player) {
    return new THREE.Vector3(
        player.position.x - camera.position.x,
        player.position.y - camera.position.y,
        player.position.z - camera.position.z
    );
}

function getCollisionVector(player, object) {
    return new THREE.Vector3(
        object.position.x - player.position.x,
        object.position.y - player.position.y,
        object.position.z - player.position.z
    );
}

function animateMovement(object, vector, collider) {
    const force = 0.05;
    const coords = { x: 0, y: 0, z: 0 };
    new Tween(coords)
        .to({ ...vector }, 300)
        .easing(Easing.Quadratic.InOut)
        .onUpdate((coords) => {
            if (coords) {
                object.position.x += coords.x * force;
                object.position.y += coords.y * force;
                object.position.z += coords.z * force;
                object.rotation.x += Math.cos(coords.x) * Math.pow(force, 1.5);
                // object.rotation.y += Math.cos(coords.y) * Math.pow(force, 2);
                object.rotation.z += Math.sin(coords.z) * Math.pow(force, 1.5);
            }
            updateCollider(object, collider);
        })
        .start();
}

function updateCollider(mesh, collider) {
    collider.center.x = mesh.position.x;
    collider.center.y = mesh.position.y;
    collider.center.z = mesh.position.z;
}
