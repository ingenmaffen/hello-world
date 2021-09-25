import * as THREE from "../../../node_modules/three/build/three.module.js";
import { handleCamereMovement, getCameraDistance } from "./camera-controls.js";
import { handleCollision } from "./collision.js";

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
    const player = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: texture }));
    player.rotation.z = -25 * DEGREE;
    return player;
}

export function handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio) {
    // TODO: move background with player
    playerSpeed = playerSpeed > maxSpeed ? playerSpeed : playerSpeed + 0.1;
    playerSpeed = isPlayerMoving(pressedKeys) ? playerSpeed : 0;
    const verticalSpeed = playerSpeed / 10;
    const spinSpeed = playerSpeed / 5;
    const moveDistance = playerSpeed * clock.getDelta();
    const vector = getMovementVector(camera, player);
    for (let [key, _value] of Object.entries(pressedKeys)) {
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

export function updatePlayerSpeed(value) {
    playerSpeed = value;
}

export function getPlayerSpeed() {
    return playerSpeed;
}

function isPlayerMoving(pressedKeys) {
    let playerMoving = false;
    for (let [_key, value] of Object.entries(keysEnum)) {
        if (pressedKeys[value]) {
            playerMoving = true;
        }
    }
    return playerMoving;
} 

function getMovementVector(camera, player) {
    const vector =  new THREE.Vector3(
        player.position.x - camera.position.x,
        player.position.y - camera.position.y,
        player.position.z - camera.position.z
    );

    const cDistance = getCameraDistance();
    vector.x /= cDistance / 5;
    vector.y /= cDistance / 5;
    vector.z /= cDistance / 5;

    return vector;
}
