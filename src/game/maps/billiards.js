import { playBilliardMissionMusic } from "../sounds/music.js";

export const sunPosition = {
    x: 0,
    y: 30,
    z: 0,
};

const texturePathBase = "src/assets/textures";
const objectsPathBase = "src/assets/objects";

const tableScale = 5;
const yOffset = 0.3 * tableScale;
const tablePosition = {
    x: 0,
    y: -2.1,
    z: 0,
}


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
                lightColor: 0xE1B779,
                lightIntensity: 3
            },
            constructorParams: `${1}, 6${0.8  * tableScale}, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        }
    ],
    customObjects: [
        {
            name: "table",
            pathToFile: `${objectsPathBase}/billiards.glb`,
            scale: tableScale,
            position: tablePosition,
            otherAttributes: {
                unmovable: true,
                colliderType: 'box'
            },
            colliders: [
                {
                    name: 'base',
                    constructorParams: `${23 * tableScale}, 10, ${12 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x,
                        y: tablePosition.y - tableScale,
                        z: tablePosition.z
                    }
                },
                {
                    name: 'side1',
                    constructorParams: `${10.6 * tableScale}, ${0.8  * tableScale}, ${2.25 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (5.9 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (7.01 * tableScale)
                    }
                },
                {
                    name: 'side2',
                    constructorParams: `${10.6 * tableScale}, ${0.8  * tableScale}, ${2.25 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (5.9 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (7.01 * tableScale)
                    }
                },
                {
                    name: 'side3',
                    constructorParams: `${10.6 * tableScale}, ${0.8  * tableScale}, ${2.25 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (5.9 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (7.01 * tableScale)
                    }
                },
                {
                    name: 'side4',
                    constructorParams: `${10.6 * tableScale}, ${0.8  * tableScale}, ${2.25 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (5.9 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (7.01 * tableScale)
                    }
                },
                {
                    name: 'side_inner1',
                    constructorParams: `${1.15 * tableScale}, ${0.8  * tableScale}, ${1 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x,
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (7.65 * tableScale)
                    }
                },
                {
                    name: 'side_inner2',
                    constructorParams: `${1.15 * tableScale}, ${0.8  * tableScale}, ${1 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x,
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (7.65 * tableScale)
                    }
                },
                {
                    name: 'side5',
                    constructorParams: `${2.25 * tableScale}, ${0.8  * tableScale}, ${10.6 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (12.8 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z 
                    }
                },
                {
                    name: 'side6',
                    constructorParams: `${2.25 * tableScale}, ${0.8  * tableScale}, ${10.6 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (12.8 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z 
                    }
                },
                {
                    name: 'corner_1_1',
                    constructorParams: `${2.75 * tableScale}, ${0.8  * tableScale}, ${1.3 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (12.6 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (7.5 * tableScale)
                    }
                },
                {
                    name: 'corner_1_2',
                    constructorParams: `${1.3 * tableScale}, ${0.8  * tableScale}, ${2.75 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (13.3 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (6.7 * tableScale)
                    }
                },
                {
                    name: 'corner_2_1',
                    constructorParams: `${2.75 * tableScale}, ${0.8  * tableScale}, ${1.3 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (12.6 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (7.5 * tableScale)
                    }
                },
                {
                    name: 'corner_2_2',
                    constructorParams: `${1.3 * tableScale}, ${0.8  * tableScale}, ${2.75 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (13.3 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (6.7 * tableScale)
                    }
                },
                {
                    name: 'corner_3_1',
                    constructorParams: `${2.75 * tableScale}, ${0.8  * tableScale}, ${1.3 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (12.6 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (7.5 * tableScale)
                    }
                },
                {
                    name: 'corner_3_2',
                    constructorParams: `${1.3 * tableScale}, ${0.8  * tableScale}, ${2.75 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (13.3 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (6.7 * tableScale)
                    }
                },
                {
                    name: 'corner_4_1',
                    constructorParams: `${2.75 * tableScale}, ${0.8  * tableScale}, ${1.3 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (12.6 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (7.5 * tableScale)
                    }
                },
                {
                    name: 'corner_4_2',
                    constructorParams: `${1.3 * tableScale}, ${0.8  * tableScale}, ${2.75 * tableScale}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (13.3 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (6.7 * tableScale)
                    }
                },
            ]
        }
    ]
};
