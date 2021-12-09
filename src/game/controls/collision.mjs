import { Vector3, Mesh, SphereGeometry, MeshBasicMaterial } from "../../../node_modules/three/build/three.module.mjs";
import { playCollisionSound } from "../sounds/sfx.mjs";
import { getPlayerSpeed, setPlayerSpeed, getMaxSpeed, resetPlayer } from "./player-controls.mjs";
import { decreaseForceValue, multiplyVector, isNullVector, getEmptyFunction, getNullVector, getPlayerCollider, removeObject } from "../misc/common.mjs";
import { checkMissionObjective } from "../misc/mission-mode.mjs";
import { animate } from "../misc/animations.mjs";

let colliders = [];
let mapMaxColliders;
let driftDecreaseValue = 0.5;

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

export function setMapMaxColliders(value) {
    mapMaxColliders = value;
}

export function setDriftDecreaseValue(value) {
    driftDecreaseValue = value || 0.5;
}

export function handleCollision(player, audio) {
    const playerCollider = getPlayerCollider(player);
    colliders.forEach((object) => {
        if (isObjectColliding(playerCollider, object)) {
            if (player.destroysObjects) {
                animateDestroyObject(object.mesh);
                if (object.mesh.otherAttributes) {  
                    object.mesh.otherAttributes.destroyed = true;
                }
                checkMissionObjective();
            }
            else if (object.mesh.otherAttributes && object.mesh.otherAttributes.unmovable) {
                playCollisionSound(audio);
                setPlayerSpeed(-1);
            } 
            else {
                const vector = getCollisionVectorWithAdaptivePlayerSpeed(player, object.mesh);
                playCollisionSound(audio);
                animateObjectNormalMovement(object.mesh, multiplyVector(vector, Math.abs(getPlayerSpeed())), object.collider, audio);
                // animateObjectDrift(object.mesh, multiplyVector(vector, Math.abs(getPlayerSpeed())), object.collider, getPlayerSpeed(), audio);
                updateCollider(object.mesh, object.collider);
            }
        }
    });
}

export function handleDriftCollision(player, vector, audio) {
    const playerCollider = getPlayerCollider(player);
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

function handleObjectDriftCollision(driftingObject, objectCollider, vector, audio) {
    let updatedVector;
    colliders.forEach(object => {
        if (driftingObject !== object.mesh && isObjectColliding(objectCollider, object)) {
            if (object.mesh.otherAttributes && object.mesh.otherAttributes.destroysObjects) {
                // TODO: fix (object currently fly out of the table on destroy)
                driftingObject.otherAttributes.destroyed = true;
                checkMissionObjective();
                updatedVector = multiplyVector(vector, 0);
                animateDestroyObject(driftingObject);
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

function getUpdatedVectorForObjectCollision(vector, collisionVector) {
    // TODO: implement updated collision vector stuff
}

function getUpdatedCollisionVectorForTable(vector) {
    // TODO: make calculations better
    const angle = Math.atan(vector.x / vector.z);
    const hypotenuse = vector.x / Math.sin(angle);
    return new Vector3(
        hypotenuse * Math.cos(Math.PI - angle),
        0,
        hypotenuse * Math.sin(Math.PI - angle),
    )
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
    const preAnimationCallback = () => {
        if (object?.otherAttributes?.parentObject?.mesh) {
            animateObjectDrift(object.otherAttributes.parentObject.mesh, vector, null, force, sfxAudio);
        }
    };
    let movementVector = vector;
    const fromVector3 = getNullVector();
    const toVector3 = multiplyVector(vector, force / getMaxSpeed());
    const animationDuration = 5;
    const onUpdateCallback = (coords) => {
        if (coords) {
            const distancePerFrame = force / 5;
            object.position.x += coords.x * distancePerFrame;
            object.position.y += coords.y * distancePerFrame;
            object.position.z += coords.z * distancePerFrame;
            object.rotation.x += Math.atan(coords.x / coords.z);
            object.rotation.z += Math.atan(coords.z / coords.x);
        }
        if (collider) {
            updateCollider(object, collider);
        }
    };
    const onCompleteCallback = () => {
        force = decreaseForceValue(force, driftDecreaseValue);
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
    };
    animate(preAnimationCallback, fromVector3, toVector3, animationDuration, onUpdateCallback, onCompleteCallback);
}

function animateObjectNormalMovement(object, toVector3, collider, sfxAudio) {
    const force = 0.05;
    const preAnimationCallback = getEmptyFunction();
    const fromVector3 = getNullVector();
    const animationDuration = 300;
    const onUpdateCallback = (coords) => {
        if (coords) {
            object.position.x += coords.x * force;
            object.position.y += coords.y * force;
            object.position.z += coords.z * force;
            object.rotation.x += Math.cos(coords.x) * Math.pow(force, 1.5);
            object.rotation.z += Math.sin(coords.z) * Math.pow(force, 1.5);
        }
        handleObjectDriftCollision(object, collider, toVector3, sfxAudio);
        updateCollider(object, collider);
    };
    const onCompleteCallback = () => {
        updateCollider(object, collider);
    };
    animate(preAnimationCallback, fromVector3, toVector3, animationDuration, onUpdateCallback, onCompleteCallback);
}

function animateDestroyObject(object) {
    removeObject(object);
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
        new SphereGeometry(mesh.geometry.parameters.height / 2, 16, 16),
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
    const axes = ['x', 'z'];
    if (mapMaxColliders) {
        axes.forEach(axis => {
            if (mapMaxColliders[axis] && 
                Math.abs(object.position[axis]) > mapMaxColliders[axis]) {
                    const sign = object.position[axis] / Math.abs(object.position[axis]);
                    object.position[axis] = sign * (mapMaxColliders[axis] - 3); 
            }
        });
    }
    if (mapMaxColliders?.y === 0) {
        object.position.y = 0;
    } 
    updateCollider(object, collider);
}
 