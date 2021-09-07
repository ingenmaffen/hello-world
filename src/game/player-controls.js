export function initiatePlayer(scene, THREE) {
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const texture = new THREE.TextureLoader().load("src/assets/2k_earth_daymap.jpg");
    const player = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    scene.add(player);

    // TODO: optional or cheat
    const moon = new THREE.SphereGeometry(0.25, 32, 16);
    const moonTexture = new THREE.TextureLoader().load("src/assets/2k_moon.jpg");
    const moonMesh = new THREE.Mesh(moon, new THREE.MeshBasicMaterial({map: moonTexture}));
    moonMesh.position.x = player.position.x + 1;
    moonMesh.position.y = player.position.y + 1;
    moonMesh.position.z = player.position.z;
    scene.add(moonMesh);

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
