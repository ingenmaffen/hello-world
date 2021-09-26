

// TODO: extend map background (geometry, material, optional params)
// TODO: add player params (geometry, material, texture, optional params)
const DEGREE = Math.PI / 180;

export const sunPosition = {
    x: 0,
    y: 0,
    z: 209,
};

/* 
 * 0° position sets planets on z-axis (positive way) which is 270°  in a normal coordinate-system,
 * planets' degree attribute is relative to this alignment 
 */
export const planetArrangement = {
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

/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const solarSystem = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    objects: [
        {
            name: "sun",
            texture: `${texturePathBase}/2k_sun.jpg`,
            position: {
                ...sunPosition,
            },
            otherAttributes: {
                unmovable: true,
                destroysObjects: true,
                hasLight: true,
                lightColor: 0xf55607
            },
            constructorParams: `${109}, 64, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "mercury",
            texture: `${texturePathBase}/2k_mercury.jpg`,
            position: {
                x: sunPosition.x - Math.sin(planetArrangement.mercury.degree) * planetArrangement.mercury.distance,
                y: sunPosition.y - 0,
                z: sunPosition.z - Math.cos(planetArrangement.mercury.degree) * planetArrangement.mercury.distance,
            },
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
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
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
        {
            name: "moon",
            texture: `${texturePathBase}/2k_moon.jpg`,
            position: {
                x: -2,
                y: 2,
                z: -2,
            },
            constructorParams: `${0.25}, 32, 16`,
            geometry: "SphereGeometry",
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
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
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
            constructorParams: `${22}, 32, 16`,
            geometry: "SphereGeometry",
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
            constructorParams: `${19}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
            ring: {
                texture: `${texturePathBase}/2k_saturn_ring_alpha.png`,
                innerRadius: 0.94,
                outerRadius: 30,
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
            constructorParams: `${8}, 32, 16`,
            geometry: "SphereGeometry",
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
            constructorParams: `${7.5}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshStandardMaterial",
            materialOptions: null,
        },
    ],
};
