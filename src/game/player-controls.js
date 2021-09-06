export function handleCamereMovement(x, y, cameraPosition, camera, playerObject) {
    const distance = 3;
    const cameraSpeed = 0.5;
    cameraPosition.x += (x * Math.PI / 180 * cameraSpeed) % (Math.PI * 2);
    cameraPosition.y += y * Math.PI / 180 * cameraSpeed;
    cameraPosition.y = cameraPosition.y > Math.PI / 2 ? Math.PI / 2 : cameraPosition.y;
    cameraPosition.y = cameraPosition.y < -Math.PI / 2 ? -Math.PI / 2 : cameraPosition.y;

    camera.position.x = playerObject.position.x + Math.cos(cameraPosition.x) * distance;  
    camera.position.z = playerObject.position.z +  Math.sin(cameraPosition.x) * distance;
    camera.position.y = playerObject.position.y + Math.sin(cameraPosition.y) * distance;  
    camera.position.z = playerObject.position.z +  Math.cos(cameraPosition.y) * distance;
    camera.lookAt(playerObject.position);
}

