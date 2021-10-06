import { playBilliardMissionMusic } from "../sounds/music.js";

export const sunPosition = {
    x: 0,
    y: 30,
    z: 0,
};

const texturePathBase = "src/assets/textures";
const objectsPathBase = "src/assets/objects";

/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const billiards = {
    name: "Solar System",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    music: playBilliardMissionMusic,
    customObjects: [
        {
            name: "table",
            pathToFile: `${objectsPathBase}/billiards.glb`,
            scale: 10,
            position: {
                x: 0,
                y: -22,
                z: 0
            },
            colliders: []
        }
    ],
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
                lightColor: 0xE1B779,
                lightIntensity: 3
            },
            constructorParams: `${1}, 64, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        }
    ],
};
