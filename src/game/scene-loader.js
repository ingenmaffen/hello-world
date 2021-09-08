export function initiateScene(THREE, scene, map) {
    const bgGeometry = new THREE.SphereGeometry(90, 32, 16);
    const bgTexture = map.backgroundTexture ? new THREE.TextureLoader().load(map.backgroundTexture) : null;
    const background = new THREE.Mesh(bgGeometry, new THREE.MeshBasicMaterial({map: bgTexture, side: THREE.DoubleSide}));
    scene.add(background);
    
    map.objects.forEach(object => {
        const geometry = eval(`new THREE.${object.geometry}(${object.constructorParams})`);
        const texture = object.texture ? new THREE.TextureLoader().load(object.texture) : null;
        const mesh = new THREE.Mesh(geometry, new THREE[object.material]({map: texture, ...object.materialOptions}));
        mesh.position.x = object.position.x;
        mesh.position.y = object.position.y;
        mesh.position.z = object.position.z;
        scene.add(mesh);
    });
}