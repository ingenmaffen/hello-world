import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GLTFLoader } from "../../assets/objects/loader/GLTFLoader.js";

const debugCustomColliders = true;

export function initiateScene(scene, map) {
    const sceneObjects = [];
    const customColliders = [];
    const background = addBackground(scene, map);

    map.objects.forEach((object) => {
        addObjectToScene(scene, sceneObjects, object);
        if (map.sunPosition && map.planetArrangement) {
            addOrbitalCircles(scene, map.sunPosition, map.planetArrangement);
        }
    });

    if (map.customObjects) {
        map.customObjects.forEach((object) => {
            loadCustomObject(scene, customColliders, object)
        });
    }

    return {
        background,
        sceneObjects,
        customColliders
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
    if (object?.otherAttributes?.repeatTexture) {
        // TODO: fix texture repeat
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    }
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
        const ringGeometry = object.ring.type === "box" ?
            new THREE.TorusGeometry(object.ring.outerRadius, object.ring.innerRadius, 4, 4) :
            new THREE.TorusGeometry(object.ring.outerRadius, object.ring.innerRadius, 16, 100);
        const ringTexture = object.ring.texture ? new THREE.TextureLoader().load(object.ring.texture) : null;
        ringTexture.rotation = Math.PI / 2;
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

function addOrbitalCircles(scene, sunPosition, planetArrangement) {
    for (let [key, value] of Object.entries(planetArrangement)) {
        const geometry = new THREE.TorusGeometry(value.distance, 0.1, 32, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = sunPosition.x;
        mesh.position.y = sunPosition.y;
        mesh.position.z = sunPosition.z;
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);
    }
}

function addLightToObject(scene, object) {
    if (object.otherAttributes && object.otherAttributes.hasLight) {
        const lightIntensity = object.otherAttributes.lightIntensity || 10;
        const pointLight = new THREE.PointLight(object.otherAttributes.lightColor, lightIntensity, 1000, 5);
        pointLight.position.set(object.position.x, object.position.y, object.position.z);

        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0x666666, 2));
    }
}

function loadCustomObject(scene, customColliders, object) {
    const loader = new GLTFLoader();
    loader.load(object.pathToFile, (gltf) => {
        gltf.scene.scale.x = object.scale;
        gltf.scene.scale.y = object.scale;
        gltf.scene.scale.z = object.scale;

        gltf.scene.position.x = object.position.x;
        gltf.scene.position.y = object.position.y;
        gltf.scene.position.z = object.position.z;

        scene.add(gltf.scene);
    });

    object.colliders.forEach(colliderObject => {
        if (debugCustomColliders) {
            colliderObject.materialOptions.opacity = 1;
            colliderObject.materialOptions.wireframe = true;
        }
        colliderObject.otherAttributes = object.otherAttributes;
        addObjectToScene(scene, customColliders, colliderObject);
    });
}
