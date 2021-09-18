/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */

// TODO: extend map background (geometry, material, optional params)
// TODO: add player params (geometry, material, texture, optional params)

const distanceDownScale = 1 / 42; 
const radiusDownScale = 1;
export const sunPosition = {
    x: 0,
    y: 0,
    z: 209,
};

export const helperCircles = [
    151, // mercury
    191, // venus
    209, // earth
    249, // mars
    349, // jupiter
    449, // saturn
    549, // uranus
    649  // neptune
];

const texturePathBase = "src/assets/textures";

export const solarSystem = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    objects: [
        {
            name: "sun",
            texture: `${texturePathBase}/2k_sun.jpg`,
            position: {
                ...sunPosition
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
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 151,
            },
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "venus",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 191,
            },
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
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
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "mars",
            texture: `${texturePathBase}/2k_mars.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 249,
            },
            constructorParams: `${2}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "jupiter",
            texture: `${texturePathBase}/2k_jupiter.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 349,
            },
            constructorParams: `${22}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "saturn",
            texture: `${texturePathBase}/2k_saturn.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 449,
            },
            constructorParams: `${19}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
            ring: {
                // texture: `${texturePathBase}/2k_saturn_ring_alpha.png`,
                innerRadius: 0.94,
                outerRadius: 30,
            }
        },
        {
            name: "uranus",
            texture: `${texturePathBase}/2k_uranus.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 549,
            },
            constructorParams: `${8}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "neptune",
            texture: `${texturePathBase}/2k_neptune.jpg`,
            position: {
                x: sunPosition.x - 0,
                y: sunPosition.y - 0,
                z: sunPosition.z - 649,
            },
            constructorParams: `${7.5}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
    ],
};
