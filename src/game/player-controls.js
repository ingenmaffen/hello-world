import {
    Tween,
    Easing,
} from "../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";

const colliders = [];

export function initiatePlayer(THREE) {
    const texturePathBase = "src/assets/textures";
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const texture = new THREE.TextureLoader().load(
        `${texturePathBase}/2k_earth_daymap.jpg`
    );
    const player = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture })
    );
    return player;
}

export function handleCamereMovement(
    x,
    y,
    cameraPosition,
    camera,
    playerObject
) {
    const distance = 3;
    const cameraSpeed = 0.5;
    const yAxisTreshold = Math.PI / 18;
    const yMinAngle = -Math.PI / 2 + yAxisTreshold;
    const yMaxAngle = Math.PI / 2 - yAxisTreshold;

    cameraPosition.x += (((x * Math.PI) / 180) * cameraSpeed) % (Math.PI * 2);
    cameraPosition.y += (((y * Math.PI) / 180) * cameraSpeed) % (Math.PI / 2);
    cameraPosition.y =
        cameraPosition.y > yMaxAngle ? yMaxAngle : cameraPosition.y;
    cameraPosition.y =
        cameraPosition.y < yMinAngle ? yMinAngle : cameraPosition.y;

    camera.position.x =
        playerObject.position.x +
        Math.cos(cameraPosition.x) * Math.cos(cameraPosition.y) * distance;
    camera.position.y =
        playerObject.position.y + Math.sin(cameraPosition.y) * distance;
    camera.position.z =
        playerObject.position.z +
        Math.cos(cameraPosition.y) * Math.sin(cameraPosition.x) * distance;
    camera.lookAt(playerObject.position);
}

export function handlePlayerMovement(
    pressedKeys,
    clock,
    player,
    cameraPosition,
    camera,
    THREE
) {
    // TODO: move background with player
    const movementSpeed = pressedKeys["shift"] ? 100 : 30; // TODO: movement speeding up to a limit
    const moveDistance = movementSpeed * clock.getDelta();
    const vector = getMovementVector(camera, player, THREE);
    for (let [key, value] of Object.entries(pressedKeys)) {
        switch (key) {
            case "w":
                player.translateX(moveDistance * vector.x);
                player.translateY(moveDistance * vector.y);
                player.translateZ(moveDistance * vector.z);
                break;
            case "s":
                player.translateX(-moveDistance * vector.x);
                player.translateY(-moveDistance * vector.y);
                player.translateZ(-moveDistance * vector.z);
                break;
            case "a":
                player.translateX(moveDistance * vector.z);
                player.translateZ(-moveDistance * vector.x);
                break;
            case "d":
                player.translateX(-moveDistance * vector.z);
                player.translateZ(moveDistance * vector.x);
                break;
        }
    }
    handleCamereMovement(0, 0, cameraPosition, camera, player);
    handleCollision(player, THREE);
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

function handleCollision(player, THREE) {
    player.geometry.computeBoundingSphere();
    player.updateMatrixWorld();
    const playerCollider = player.geometry.boundingSphere.clone();
    playerCollider.applyMatrix4(player.matrixWorld);
    colliders.forEach((object) => {
        if (playerCollider.intersectsSphere(object.collider)) {
            const vector = getCollisionVector(player, object.mesh, THREE);
            animateMovement(object.mesh, vector, object.collider);
            updateCollider(object.mesh, object.collider);
        }
    });
}

function getMovementVector(camera, player, THREE) {
    return new THREE.Vector3(
        player.position.x - camera.position.x,
        player.position.y - camera.position.y,
        player.position.z - camera.position.z
    );
}

function getCollisionVector(player, object, THREE) {
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
