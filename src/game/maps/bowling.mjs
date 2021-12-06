import { playBilliardMissionMusic } from "../sounds/music.mjs";

const texturePathBase = "src/assets/textures";
const objectsPathBase = "src/assets/objects";

const bowlingPinScale = 1;

const firstPinPosition = {
    x: 0,
    y: -1,
    z: 85
}


/*
 * Mandatory attributes for objects: geometry, constructorParams and material
 */
export const bowling = {
    name: "Bowling Alley",
    backgroundTexture: `${texturePathBase}/2k_stars_milky_way.jpg`,
    music: playBilliardMissionMusic,
    playerConfig: {
        color: 0xffffff,
        texture: 'none',
        normalMovementDisabled: true,
        yAxisDisabledOnClick: true,
        moveOnClick: true,
        clickMoveForce: 0.5
    },
    objects: [
        {
            name: "light",
            texture: `${texturePathBase}/2k_sun.jpg`,
            position: {
                x: -150,
                y: 125,
                z: 450
            },
            otherAttributes: {
                unmovable: true,
                hasLight: true,
                lightColor: 0xf55607,
                lightIntensity: 3
            },
            constructorParams: `${109}, 32, 32`,
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
        {
            name: "floor",
            texture: `${texturePathBase}/wooden_floor.png`,
            position: {
                x: 0,
                y: -3,
                z: 45
            },
            otherAttributes: {
                unmovable: true,
                colliderType: 'box',
                repeatTexture: true
            },
            constructorParams: `15, 1, 100`,
            geometry: "BoxGeometry",
            material: "MeshBasicMaterial",
            materialOptions: null,
        },
    ],
    customObjects: [
        {
            name: "pin1",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: firstPinPosition,
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        ...firstPinPosition,
                        y: firstPinPosition.y + 2   
                    }
                }
            ]
        },
        {
            name: "pin2",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x + 1,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 2.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x + 1,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 2.5 
                    }
                }
            ]
        },
        {
            name: "pin3",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x - 1,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 2.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x - 1,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 2.5 
                    }
                }
            ]
        },
        {
            name: "pin4",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x - 2,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x - 2,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 5 
                    }
                }
            ]
        },
        {
            name: "pin5",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 5 
                    }
                }
            ]
        },
        {
            name: "pin4",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x + 2,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x + 2,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 5 
                    }
                }
            ]
        },
        {
            name: "pin7",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x + 3,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 7.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x + 3,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 7.5 
                    }
                }
            ]
        },
        {
            name: "pin8",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x + 1,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 7.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x + 1,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 7.5 
                    }
                }
            ]
        },
        {
            name: "pin9",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x - 1,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 7.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x - 1,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 7.5 
                    }
                }
            ]
        },
        {
            name: "pin10",
            pathToFile: `${objectsPathBase}/bowling_pin.glb`,
            scale: bowlingPinScale,
            position: {
                x: firstPinPosition.x - 3,
                y: firstPinPosition.y,
                z: firstPinPosition.z + 7.5
            },
            otherAttributes: {
                unmovable: false,
                colliderType: 'box',
            },
            colliders: [
                {
                    constructorParams: `1.5, 6, 1.5`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: {
                        x: firstPinPosition.x - 3,
                        y: firstPinPosition.y + 2,
                        z: firstPinPosition.z + 7.5 
                    }
                }
            ]
        }
    ]
};
