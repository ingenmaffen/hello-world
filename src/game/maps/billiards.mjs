import { playBilliardMissionMusic } from "../sounds/music.mjs";

export const sunPosition = {
    x: 0,
    y: 30,
    z: 0,
};

const texturePathBase = "src/assets/textures";
const objectsPathBase = "src/assets/objects";

const tableScale = 5.5;
const yOffset = 0.3 * tableScale;
const tablePosition = {
    x: 0,
    y: -2.1,
    z: 0,
}

const firstBallPosition = {
    x: 25,
    y: 0,
    z: 0
}


/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const billiards = {
    name: "Billiards",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    music: playBilliardMissionMusic,
    cameraDistance: 30,
    missionMode: "destroyObjects",
    maxDistance: {
        x: tablePosition.x + (11.5 * tableScale),
        z: tablePosition.z + (6 * tableScale)
    },
    playerConfig: {
        color: 0xFFFFFF,
        texture: 'none',
        normalMovementDisabled: true,
        yAxisDisabledOnClick: true,
        moveOnClick: true,
    },
    objects: [
        {
            name: "light",
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            position: {
                ...sunPosition,
            },
            otherAttributes: {
                unmovable: true,
                hasLight: true,
                lightColor: 0xE1B779,
                lightIntensity: 3
            },
            constructorParams: `${1}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: 'ball1',
            texture: `${texturePathBase}/2k_earth_daymap.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                ...firstBallPosition
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball2',
            texture: `${texturePathBase}/2k_venus_atmosphere.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 3.5,
                y: 0,
                z: firstBallPosition.z + 2
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball3',
            texture: `${texturePathBase}/2k_mars.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 3.5,
                y: 0,
                z: firstBallPosition.z - 2
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball4',
            texture: `${texturePathBase}/2k_sun.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 7,
                y: 0,
                z: firstBallPosition.z 
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball5',
            texture: `${texturePathBase}/2k_mercury.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 7,
                y: 0,
                z: firstBallPosition.z - 4
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball6',
            texture: `${texturePathBase}/2k_moon.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 7,
                y: 0,
                z: firstBallPosition.z + 4
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball7',
            texture: `${texturePathBase}/2k_jupiter.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 10.5,
                y: 0,
                z: firstBallPosition.z + 2
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball8',
            texture: `${texturePathBase}/2k_neptune.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 10.5,
                y: 0,
                z: firstBallPosition.z - 2
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball9',
            texture: `${texturePathBase}/2k_uranus.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 10.5,
                y: 0,
                z: firstBallPosition.z + 6
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
        {
            name: 'ball10',
            texture: `${texturePathBase}/2k_saturn.jpg`,
            constructorParams: `${2}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            position: {
                x: firstBallPosition.x + 10.5,
                y: 0,
                z: firstBallPosition.z - 6
            },
            otherAttributes: {
                checkIfDestroyed: true
            }
        },
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
                {
                    name: 'hole1',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (12 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (6 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
                {
                    name: 'hole2',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x - (12 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (6 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
                {
                    name: 'hole3',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (12 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (6 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
                {
                    name: 'hole4',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x + (12 * tableScale),
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (6 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
                {
                    name: 'hole5',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x,
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z - (6.75 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
                {
                    name: 'hole6',
                    constructorParams: `${6.5}, ${10}, ${6.5}`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: tablePosition.x,
                        y: tablePosition.y + yOffset,
                        z: tablePosition.z + (6.75 * tableScale)
                    },
                    otherAttributes: {
                        destroysObjects: true
                    }
                },
            ]
        }
    ]
};
