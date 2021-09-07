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
