export function initiateScene(THREE, scene, map) {
    const sceneObjects = [];

    const bgGeometry = new THREE.SphereGeometry(90 * 200, 32, 16);
    const bgTexture = map.backgroundTexture ? new THREE.TextureLoader().load(map.backgroundTexture) : null;
    const background = new THREE.Mesh(bgGeometry, new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide }));
    scene.add(background);

    map.objects.forEach((object) => {
        const geometry = eval(`new THREE.${object.geometry}(${object.constructorParams})`);
        const texture = object.texture ? new THREE.TextureLoader().load(object.texture) : null;
        const mesh = new THREE.Mesh(
            geometry,
            new THREE[object.material]({
                map: texture,
                ...object.materialOptions,
            })
        );
        mesh.position.x = object.position.x;
        mesh.position.y = object.position.y;
        mesh.position.z = object.position.z;
        if (object.ring) {
            const ringGeometry = new THREE.TorusGeometry(object.ring.outerRadius, object.ring.innerRadius, 16, 100);
            const ringTexture = object.ring.texture ? new THREE.TextureLoader().load(object.ring.texture) : null;
            const ring = new THREE.Mesh(
                ringGeometry,
                new THREE.MeshBasicMaterial({
                    map: ringTexture,
                    side: THREE.DoubleSide,
                })
            );
            ring.position.x = object.position.x;
            ring.position.y = object.position.y;
            ring.position.z = object.position.z;
            ring.rotation.x = Math.PI / 2;
            ring.rotation.y = Math.PI / 4;
            const planetGroup = new THREE.Group();
            planetGroup.add(mesh);
            planetGroup.add(ring);
            scene.add(planetGroup);
            sceneObjects.push(mesh);
            sceneObjects.push(ring);
        } else {
            scene.add(mesh);
            sceneObjects.push(mesh);
        }
    });

    return {
        background,
        sceneObjects,
    };
}

export function initiateSound(THREE, camera) {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    return {
        sound,
        audioLoader,
    };
}
