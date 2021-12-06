import { Vector3, Mesh, SphereGeometry, MeshBasicMaterial } from "../../../node_modules/three/build/three.module.mjs";
import { Tween, Easing } from "../../../node_modules/@tweenjs/tween.js/dist/tween.esm.mjs";
import { playCollisionSound } from "../sounds/sfx.mjs";
import { getPlayerSpeed, setPlayerSpeed, getMaxSpeed } from "./player-controls.mjs";

let colliders = [];
let mapMaxColliders;
let missionObjects = [];

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
    setMissionObjects(objects);
}

export function setMapMaxColliders(value) {
    mapMaxColliders = value;
}

export function multiplyVector(vector, value) {
    return new Vector3(
        vector.x * value,
        vector.y * value,
        vector.z * value
    );
}

export function decreaseForceValue(value) {
    value -= 0.5;
    return value < 0 ? 0 : value;
}

export function handleCollision(player, audio) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    colliders.forEach((object) => {
        if (isObjectColliding(playerCollider, object)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                setPlayerSpeed(-1);
            } else {
                const vector = getCollisionVectorWithAdaptivePlayerSpeed(player, object.mesh);
                playCollisionSound(audio);
                animateMovement(object.mesh, vector, object.collider);
                updateCollider(object.mesh, object.collider);
            }
        }
    });
}

export function handleDriftCollision(player, vector, audio) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    let updatedVector;
    colliders.forEach((object) => {
        if (isObjectColliding(playerCollider, object)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.destroysObjects) {
                resetPlayer(player);
                updatedVector = multiplyVector(vector, 0);
            }
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                updatedVector = getUpdatedCollisionVectorForTable(vector);
            } else {
                const collisionVector = getCollisionVector(player, object.mesh);
                playCollisionSound(audio);
                animateObjectDrift(object.mesh, collisionVector, object.collider, getPlayerSpeed(), audio);
                updatedVector = getUpdatedVectorForObjectCollision(vector, collisionVector);
            }
        }
    });
    return updatedVector || vector;
}

export function isNullVector(vector) {
    // TODO: currently it is unusable, because the checks happen at the wrong time during the animation
    return !(vector.x || vector.y || vector.z);
}

function resetPlayer(player) {
    player.position.x = 0;
    player.position.y = 0;
    player.position.z = 0;
    setPlayerSpeed(0);
}


function getUpdatedVectorForObjectCollision(vector, collisionVector) {
    // TODO: implement updated collision vector stuff
}

function getUpdatedCollisionVectorForTable(vector) {
    // TODO: make calculations better
    // TODO: extend to work with y axis as well
    const angle = Math.atan(vector.x / vector.z);
    const hypotenuse = vector.x / Math.sin(angle);
    return new Vector3(
        hypotenuse * Math.cos(Math.PI - angle),
        0,
        hypotenuse * Math.sin(Math.PI - angle),
    )
}

function handleObjectDriftCollision(driftingObject, objectCollider, vector, audio) {
    let updatedVector;
    colliders.forEach(object => {
        if (driftingObject !== object.mesh && isObjectColliding(objectCollider, object)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.destroysObjects) {
                // TODO: fix (object currently fly out of the table on destroy)
                driftingObject.otherAttributes.destroyed = true;
                checkMissionObjective();
                updatedVector = multiplyVector(vector, 0);
                animateDestroyObject(driftingObject, objectCollider, object.mesh);
            }
            else if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                updatedVector = getUpdatedCollisionVectorForTable(vector);
            } else {
                const collisionVector = getCollisionVector(driftingObject, object.mesh);
                playCollisionSound(audio);
                animateObjectDrift(object.mesh, collisionVector, object.collider, getPlayerSpeed(), audio);
                updatedVector = getUpdatedVectorForObjectCollision(vector, collisionVector);
            }
        }
    });
    return updatedVector || vector;
}

function getCollisionVector(player, object) {
    return new Vector3(
        object.position.x - player.position.x,
        object.position.y - player.position.y,
        object.position.z - player.position.z
    );
}

function getCollisionVectorWithAdaptivePlayerSpeed(player, object) {
    const vector = new Vector3(
        object.position.x - player.position.x,
        object.position.y - player.position.y,
        object.position.z - player.position.z
    );
    const playerSize = player.geometry.parameters.radius;
    const objectSize = object.geometry.parameters.radius || object.geometry.parameters.width;
    const vectorScale = (getPlayerSpeed()) * playerSize / objectSize;
    const updatedPlayerSpeed = playerSize < objectSize ? -1 * objectSize / playerSize : getPlayerSpeed() * objectSize / playerSize;
    setPlayerSpeed(updatedPlayerSpeed || -1);
    return multiplyVector(vector, vectorScale);
}

function animateObjectDrift(object, vector, collider, force, sfxAudio) {
    if (object?.otherAttributes?.parentObject) {
        animateObjectDrift(object.otherAttributes.parentObject, vector, null, force, sfxAudio);
    }
    let movementVector = vector;
    new Tween({ x: 0, y: 0, z: 0 })
        .to({ ...multiplyVector(vector, force / getMaxSpeed()) }, 5)
        .onUpdate((coords) => {
            if (coords) {
                const distancePerFrame = force / 5;
                object.position.x += coords.x * distancePerFrame;
                object.position.y += coords.y * distancePerFrame;
                object.position.z += coords.z * distancePerFrame;
                object.rotation.x += Math.cos(coords.x);
                object.rotation.z += Math.sin(coords.z);
            }
            if (collider) {
                updateCollider(object, collider);
            }
        })
        .onComplete(() => {
            force = decreaseForceValue(force);
            if (force && collider) {
                movementVector = handleObjectDriftCollision(object, collider, vector, sfxAudio);
                handleMapMaxCollider(object, collider);
                if (!isNullVector(movementVector)) {
                    animateObjectDrift(object, movementVector, collider, force, sfxAudio);
                }
            }
            if (collider) {
                updateCollider(object, collider);
            }
        })
        .start();
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

function animateDestroyObject(object, collider, destinationObject) {
    new Tween({...object.position})
        .to({ ...destinationObject.position }, 50)
        .easing(Easing.Quadratic.InOut)
        .onUpdate((coords) => {
            if (coords) {
                object.position.x += coords.x;
                object.position.y += coords.y;
                object.position.z += coords.z;
            }
        })
        .onComplete(() => {
            updateCollider(object, collider);
        })
        .start();

}

function setMissionObjects(objects) {
    objects
        .filter(object => object?.otherAttributes?.checkIfDestroyed)
        .forEach(object => {
            missionObjects.push(object);
    });
}

function checkMissionObjective() {
    const objectsDone = missionObjects.filter(object => object.otherAttributes.destroyed);
    if (missionObjects.length === objectsDone.length) {
        // TODO: mission end screen -> back to the menu or restart
        // TODO: add sound effect
        // TODO: maybe some confetti effect
        console.log("Mission Complete!");
    }
}

function updateCollider(mesh, collider) {
    collider.center.x = mesh.position.x;
    collider.center.y = mesh.position.y;
    collider.center.z = mesh.position.z;
}

function isObjectColliding(object, collider) {
    return isObjectBox(collider.mesh)
        ? object.intersectsBox(collider.collider)
        : object.intersectsSphere(collider.collider)
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
    const sphereColliderMesh = new Mesh(
        new SphereGeometry(mesh.geometry.parameters.width / 2, 16, 16),
        new MeshBasicMaterial()
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

function handleMapMaxCollider(object, collider) {
    const axes = ['x', 'y', 'z'];
    if (mapMaxColliders) {
        axes.forEach(axis => {
            if (mapMaxColliders[axis] && 
                Math.abs(object.position[axis]) > mapMaxColliders[axis]) {
                    const sign = object.position[axis] / Math.abs(object.position[axis]);
                    object.position[axis] = sign * (mapMaxColliders[axis] - 3); 
            }
        });
    }
    updateCollider(object, collider);
}
 