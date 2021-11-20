import * as THREE from "../../../node_modules/three/build/three.module.js";
import { Tween, Easing } from "../../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { playCollisionSound } from "../sounds/sfx.mjs";
import { getPlayerSpeed, updatePlayerSpeed } from "./player-controls.mjs";

let colliders;

export function initiateColliders(objects) {
    colliders = [];
    objects.forEach((mesh) => {
        switch (getMeshColliderType(mesh)) {
            case 'box':
                createBoxCollider(mesh, colliders);
                break;
            case 'innerSphere':
                createSphereColliderForBox(mesh, colliders);
                break;
            default:
                createDefaultCollider(mesh, colliders);
                break;
        }
    });
}

export function handleCollision(player, audio) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    colliders.forEach((object) => {
        if (isPlayerCollidingWithObject(playerCollider, object)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                updatePlayerSpeed(-1);
            } else {
                const vector = getCollisionVector(player, object.mesh);
                playCollisionSound(audio);
                animateMovement(object.mesh, vector, object.collider);
                updateCollider(object.mesh, object.collider);
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
    const playerSize = player.geometry.parameters.radius;
    const objectSize = object.geometry.parameters.radius || object.geometry.parameters.width;
    const vectorScale = (getPlayerSpeed()) * playerSize / objectSize;
    const updatedPlayerSpeed = playerSize / objectSize > 0 ? -1 * objectSize / playerSize : getPlayerSpeed() * objectSize / playerSize;
    updatePlayerSpeed(updatedPlayerSpeed || -1);
    return vector.addScalar(vectorScale);
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
        .onComplete(() => {
            updateCollider(object, collider);
        })
        .start();
}

function updateCollider(mesh, collider) {
    collider.center.x = mesh.position.x;
    collider.center.y = mesh.position.y;
    collider.center.z = mesh.position.z;
}

function isPlayerCollidingWithObject(playerCollider, object) {
    return isObjectBox(object.mesh)
        ? playerCollider.intersectsBox(object.collider)
        : playerCollider.intersectsSphere(object.collider)
}

function isObjectBox(mesh) {
    return mesh && mesh.otherAttributes && mesh.otherAttributes.colliderType === "box";
}

function getMeshColliderType(mesh) {
    return mesh && mesh.otherAttributes && mesh.otherAttributes.colliderType;
}

function createDefaultCollider(mesh, colliders) {
    mesh.geometry.computeBoundingSphere();
    mesh.updateMatrixWorld();
    const collider = mesh.geometry.boundingSphere.clone();
    collider.applyMatrix4(mesh.matrixWorld);
    colliders.push({
        mesh,
        collider,
    });
}

function createSphereColliderForBox(mesh, colliders) {
    const sphereColliderMesh = new THREE.Mesh(
        new THREE.SphereGeometry(mesh.geometry.parameters.width / 2, 16, 16),
        new THREE.MeshBasicMaterial()
    );
    sphereColliderMesh.position.x = mesh.position.x;
    sphereColliderMesh.position.y = mesh.position.y;
    sphereColliderMesh.position.z = mesh.position.z;
    sphereColliderMesh.geometry.computeBoundingSphere();
    sphereColliderMesh.updateMatrixWorld();
    const collider = sphereColliderMesh.geometry.boundingSphere.clone();
    collider.applyMatrix4(sphereColliderMesh.matrixWorld);
    colliders.push({
        mesh,
        collider,
    });
}

function createBoxCollider(mesh, colliders) {
    mesh.geometry.computeBoundingBox();
    mesh.updateMatrixWorld();
    const collider = mesh.geometry.boundingBox.clone();
    collider.applyMatrix4(mesh.matrixWorld);
    colliders.push({
        mesh,
        collider,
    });
}
