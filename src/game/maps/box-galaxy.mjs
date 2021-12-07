import { playEndlessModeMusic } from "../sounds/music.mjs";

const DEGREE = Math.PI / 180;

/* 
 * 0° position sets planets on z-axis (positive way) which is 270°  in a normal coordinate-system,
 * planets' degree attribute is relative to this alignment 
 */
const planetArrangement = {
    mercury: {
        distance: 151,
        degree: - 25 * DEGREE
    },
    venus: {
        distance: 191,
        degree: 10 * DEGREE
    },
    earth: {
        distance: 209,
        degree: 0
    },
    mars: {
        distance: 249,
        degree: - 15 * DEGREE
    },
    jupiter: {
        distance: 349,
        degree: - 95 * DEGREE
    },
    saturn: {
        distance: 449,
        degree: 125 * DEGREE
    },
    uranus: {
        distance: 549,
        degree: - 75 * DEGREE
    },
    neptune: {
        distance: 649,
        degree: 195 * DEGREE
    },
}

const texturePathBase = "src/assets/textures";
const sunPosition = {
    x: 0,
    y: 0,
    z: 0,
};

/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const boxSolarSystem = {
    name: "Box Galaxy",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    music: playEndlessModeMusic,
    planetArrangement,
    sunPosition,
    cameraDistance: 200,
    missionMode: "destroyObjects",
    playerConfig: {
        texturePath: `${texturePathBase}/2k_sun.jpg`,
        destroysObjects: true,
        playerSize: 109,
        hasLight: true,
        lightColor: 0xf55607,
        playerSpeedDiff: 10
    },
    objects: [
        /* {
            name: "sun",
            texture: `${texturePathBase}/2k_sun.jpg`,
            position: {
                ...sunPosition,
            },
            otherAttributes: {
                unmovable: true,
                destroysObjects: true,
                hasLight: true,
                lightColor: 0xf55607,
                colliderType: "box"
            },
            constructorParams: `109, 109, 109`,
            geometry: "BoxGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        }, */
        {
            name: "mercury",
            texture: `${texturePathBase}/2k_mercury.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.mercury.degree) * planetArrangement.mercury.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.mercury.degree) * planetArrangement.mercury.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `2, 2, 2`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "venus",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.venus.degree) * planetArrangement.venus.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.venus.degree) * planetArrangement.venus.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `2, 2, 2`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "earth",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.earth.degree) * planetArrangement.earth.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.earth.degree) * planetArrangement.earth.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `2, 2, 2`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "moon",
            texture: `${texturePathBase}/2k_moon.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.earth.degree) * planetArrangement.earth.distance - 2,
                y: sunPosition.y + 2 ,
                z: sunPosition.z - Math.cos(planetArrangement.earth.degree) * planetArrangement.earth.distance - 2,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `0.25, 0.25, 0.25`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "mars",
            texture: `${texturePathBase}/2k_mars.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.mars.degree) * planetArrangement.mars.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.mars.degree) * planetArrangement.mars.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `2, 2, 2`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "jupiter",
            texture: `${texturePathBase}/2k_jupiter.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.jupiter.degree) * planetArrangement.jupiter.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.jupiter.degree) * planetArrangement.jupiter.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `22, 22, 22`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "saturn",
            texture: `${texturePathBase}/2k_saturn.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.saturn.degree) * planetArrangement.saturn.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.saturn.degree) * planetArrangement.saturn.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `19, 19, 19`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
            ring: {
                texture: `${texturePathBase}/2k_saturn_ring_alpha.png`,
                innerRadius: 0.94,
                outerRadius: 30,
                type: "box"
            },
        },
        {
            name: "uranus",
            texture: `${texturePathBase}/2k_uranus.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.uranus.degree) * planetArrangement.uranus.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.uranus.degree) * planetArrangement.uranus.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `8, 8, 8`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "neptune",
            texture: `${texturePathBase}/2k_neptune.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.neptune.degree) * planetArrangement.neptune.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.neptune.degree) * planetArrangement.neptune.distance,
            },
            otherAttributes: {
                colliderType: "innerSphere",
                checkIfDestroyed: true
            },
            constructorParams: `7.5, 7.5, 7.5`,
            geometry: "BoxGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
    ],
};
