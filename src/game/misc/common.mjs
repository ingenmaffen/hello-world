import { Vector3 } from "../../../node_modules/three/build/three.module.mjs";
import { stopMusic } from "../sounds/music.mjs";
import { removeEventListeners } from "./event-listeners.mjs";
import { initMap } from "../main.mjs";
import { removeText } from "./mission-mode.mjs";

let scene;

export function setScene(_scene) {
    scene = _scene;
}

export function decreaseForceValue(value, diff) {
    value -= diff;
    return value < 0 ? 0 : value;
}

export function isNullVector(vector) {
    // TODO: currently it is unusable, because the checks happen at the wrong time during the animation
    return !(vector.x || vector.y || vector.z);
}

export function areVectorsEqual(vector1, vector2) {
    return vector1.x === vector2.x &&
        vector1.y === vector2.y &&
        vector1.z === vector2.z;
}

export function multiplyVector(vector, value) {
    return new Vector3(
        vector.x * value,
        vector.y * value,
        vector.z * value
    );
}

export function getNullVector() {
    return new Vector3(0, 0, 0);
}

export function getEmptyFunction() {
    return () => {};
}

export function getPlayerCollider(player) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    return playerCollider;
}

export function removeObject(object) {
    scene.remove(object);
}

export function removeCanvas() {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.remove();
}

export function appendMenuButton(text, callback, objectClass) {
    const containerDiv = document.createElement("div");
    const button = document.createElement("button");
    const overlay = document.getElementById("menu-block");
    button.classList.add(objectClass);
    button.innerText = text;
    containerDiv.appendChild(button);
    overlay.appendChild(containerDiv);
    button.onclick = callback;
}

export function loadScene(map, autoRotate = false) {
    removeText();
    removeCanvas();
    stopMusic();
    removeEventListeners();
    initMap(map, autoRotate);
}
