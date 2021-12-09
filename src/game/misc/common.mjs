import { Vector3 } from "../../../node_modules/three/build/three.module.mjs";

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
