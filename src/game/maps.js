/* 
 * Mandatory attributes for objects: geometry, constructorParams and material
 */

// TODO: extend map background (geometry, material, optional params)
// TODO: add player params (geometry, material, texture, optional params)

const texturePathBase = "src/assets/textures";

export const solarSystem = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    objects: [
        {
            name: "moon",
            texture: `${texturePathBase}/2k_moon.jpg`,
            position: {
                x: 1,
                y: 1,
                z: 0
            },
            constructorParams: "0.25, 32, 16",
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            geometry: "BoxGeometry",
            constructorParams: "1, 1, 1",
            material: "MeshNormalMaterial",
            name: "testObject",
            position: {
                x: -3,
                y: -3,
                z: 2
            },
            materialOptions: null,
        }
    ]
};
