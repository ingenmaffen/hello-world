import * as THREE from "../../../node_modules/three/build/three.module.js";
import { helperCircles, sunPosition } from "../maps/solar-system.js";

export function initiateScene(scene, map) {
    const sceneObjects = [];
    const background = addBackground(scene, map);

    map.objects.forEach((object) => {
        addObjectToScene(scene, sceneObjects, object);
        addOrbitalCircles(scene);
    });

    return {
        background,
        sceneObjects,
    };
}

function addBackground(scene, map) {
    const bgGeometry = new THREE.SphereGeometry(90 * 200, 32, 16);
    const bgTexture = map.backgroundTexture ? new THREE.TextureLoader().load(map.backgroundTexture) : null;
    const background = new THREE.Mesh(bgGeometry, new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide }));
    scene.add(background);
    return background;
}

function addObjectToScene(scene, sceneObjects, object) {
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
    mesh.otherAttributes = {
        ...object.otherAttributes,
    };
    scene.add(mesh);
    sceneObjects.push(mesh);
    addRingToPlanet(scene, sceneObjects, object);
    addLightToObject(scene, object);
}

function addRingToPlanet(scene, sceneObjects, object) {
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
        scene.add(ring);
        sceneObjects.push(ring);
    }
}

function addOrbitalCircles(scene) {
    helperCircles.forEach((circle) => {
        const geometry = new THREE.TorusGeometry(circle, 0.1, 32, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = sunPosition.x;
        mesh.position.y = sunPosition.y;
        mesh.position.z = sunPosition.z;
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);
    });
}

function addLightToObject(scene, object) {
    if (object.otherAttributes && object.otherAttributes.hasLight) {
        const pointLight = new THREE.PointLight(object.otherAttributes.lightColor, 10, 1000, 5);
        pointLight.position.set(object.position.x, object.position.y, object.position.z);

        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0x666666, 2));
    }
}
