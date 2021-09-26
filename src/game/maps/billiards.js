import { playBilliardMissionMusic } from "../sounds/music.js";

export const sunPosition = {
    x: 0,
    y: 0,
    z: 209,
};

const texturePathBase = "src/assets/textures";

/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const billiards = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    music: playBilliardMissionMusic,
    objects: [
        {
            name: "sun",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                ...sunPosition,
            },
            otherAttributes: {
                unmovable: true,
                destroysObjects: true,
                hasLight: true,
                lightColor: 0xE1B779
            },
            constructorParams: `${109}, 64, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        }
    ],
};
