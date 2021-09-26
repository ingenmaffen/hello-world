
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { Tween, Easing } from "../../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { playCollisionSound } from "../sounds/sfx.js";
import { updatePlayerSpeed, getPlayerSpeed } from "./player-controls.js";

const colliders = [];

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

export function handleCollision(player, audio) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    colliders.forEach((object) => {
        if (playerCollider.intersectsSphere(object.collider)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                updatePlayerSpeed(-1);
            } else {
                // console.log(player)
                // console.log(object.collider.radius);
                const vector = getCollisionVector(player, object.mesh);
                playCollisionSound(audio);
                animateMovement(object.mesh, vector, object.collider);
                updateCollider(object.mesh, object.collider);
                updatePlayerSpeed(-1); // TODO: slowing down should relate how big was the object that was hit
            }
        }
    });
}

function getCollisionVector(player, object) {
    const vector = new THREE.Vector3(
        object.position.x - player.position.x,
        object.position.y - player.position.y,
        object.position.z - player.position.z
    );
    // const playerSpeed = getPlayerSpeed();
    // vector.x = 1 / vector.x * playerSpeed;
    // vector.y = 1 / vector.y * playerSpeed;
    // vector.z = 1 / vector.z * playerSpeed;
    return vector;
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
