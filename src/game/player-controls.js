export function initiatePlayer(THREE) {
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const texture = new THREE.TextureLoader().load("src/assets/2k_earth_daymap.jpg");
    const player = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    return player;
}

export function handleCamereMovement(x, y, cameraPosition, camera, playerObject) {
    const distance = 3;
    const cameraSpeed = 0.5;
    const yAxisTreshold = Math.PI / 18;
    const yMinAngle = -Math.PI / 2 + yAxisTreshold;
    const yMaxAngle = Math.PI / 2 - yAxisTreshold;

    cameraPosition.x += (x * Math.PI / 180 * cameraSpeed) % (Math.PI * 2);
    cameraPosition.y += (y * Math.PI / 180 * cameraSpeed) % (Math.PI / 2);
    cameraPosition.y = cameraPosition.y > yMaxAngle ? yMaxAngle : cameraPosition.y;
    cameraPosition.y = cameraPosition.y < yMinAngle ? yMinAngle : cameraPosition.y;

    camera.position.x = 
        playerObject.position.x + (Math.cos(cameraPosition.x) * Math.cos(cameraPosition.y) * distance);
    camera.position.y = 
        playerObject.position.y + (Math.sin(cameraPosition.y) * distance);  
    camera.position.z = 
        playerObject.position.z + (Math.cos(cameraPosition.y) * Math.sin(cameraPosition.x) * distance);
    camera.lookAt(playerObject.position);
}

export function handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, THREE) {
    // TODO: move background with player
    const movementSpeed = 3; // TODO: movement speeding up to a limit
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
}

function getMovementVector(camera, player, THREE) {
    return new THREE.Vector3(
        player.position.x - camera.position.x,
        player.position.y - camera.position.y,
        player.position.z - camera.position.z);
}

function getDistance(camera, player, THREE) {
    const vCamera = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    const vPlayer = new THREE.Vector3(player.position.x, player.position.y, player.position.z);
    return vCamera.distanceTo(vPlayer);
}