/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */

// TODO: extend map background (geometry, material, optional params)
// TODO: add player params (geometry, material, texture, optional params)

const distanceDownScale = 1 / 42; 
const radiusDownScale = 1;

const texturePathBase = "src/assets/textures";

export const solarSystem = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    objects: [
        {
            name: "sun",
            texture: `${texturePathBase}/2k_sun.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: 23387 * distanceDownScale,
            },
            constructorParams: `${109 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "mercury",
            texture: `${texturePathBase}/2k_mercury.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: 13668 * distanceDownScale,
            },
            constructorParams: `${0.38 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "venus",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: 6435 * distanceDownScale,
            },
            constructorParams: `${0.95 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "moon",
            texture: `${texturePathBase}/2k_moon.jpg`,
            position: {
                x: 42 * distanceDownScale,
                y: 42 * distanceDownScale,
                z: 0 * distanceDownScale,
            },
            constructorParams: `${0.27 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "mars",
            texture: `${texturePathBase}/2k_mars.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: -11736 * distanceDownScale,
            },
            constructorParams: `${0.53 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "jupiter",
            texture: `${texturePathBase}/2k_jupiter.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: -93745 * distanceDownScale,
            },
            constructorParams: `${11 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "saturn",
            texture: `${texturePathBase}/2k_saturn.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: -191353 * distanceDownScale,
            },
            constructorParams: `${9.14 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
            ring: {
                texture: `${texturePathBase}/2k_saturn_ring_alpha.png`,
                innerRadius: 0.94,
                outerRadius: 15,
            }
        },
        {
            name: "uranus",
            texture: `${texturePathBase}/2k_uranus.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: -404397 * distanceDownScale,
            },
            constructorParams: `${4 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "neptune",
            texture: `${texturePathBase}/2k_neptune.jpg`,
            position: {
                x: 0 * distanceDownScale,
                y: 0 * distanceDownScale,
                z: -650869 * distanceDownScale,
            },
            constructorParams: `${3.86 * radiusDownScale}, 32, 16`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
    ],
};
