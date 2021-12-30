import { jest } from "@jest/globals";

import { addAmbientLight, initiateScene } from "./scene-loader.mjs";

const mockScene = {
    add: jest.fn()
};

const mockPosition = {
    x: 0,
    y: 0,
    z: 0,
};

const mockMap = {
    name: "testMap", // optional field, helper
    backgroundTexture: "",
    music: jest.fn(),
    cameraDistance: 5,
    driftDecreaseValue: 0.5,
    missionMode: null, // possible values: "destroyObjects", "bowling" 

    // fields needed for static orbital circles
    sunPosition: mockPosition,
    planetArrangement: {
        testObject: {
            distance: 10,
            degree: Math.PI / 18
        }
    },

    /* if the map is set to be played inside a box, it can be used
     * it was used to fix clipping issues on billiards map
     * not mandatory field and any property can be left out
     * (in that case that axis is unlimitedly accessible)
     */
    maxDistance: {
        x: 100,
        y: 100,
        z: 100
    },

    // map specific options for the player
    playerConfig: {
        // texture and coloring options

        /* if texture is set to 'none', it uses the color 
         * TODO: if texture is set to path, use that texture instead of default
         */
        texture: 'none', 
        color: 0xFFFFFF,

        // movement related options
        normalMovementDisabled: false,
        yAxisDisabledOnClick: false,
        moveOnClick: true,
        // retainMomentum: false // currently unused
        clickMoveForce: 0.5,
        canNormalMoveOnXAxis: true
    }, 

    // basic objects (shapes)
    objects: [
        {
            name: "testSphere",
            texture: "",
            position: mockPosition,

            // dynamically set params for creating object
            constructorParams: "10, 32, 32",
            geometry: "SphereGeometry",
            material: "MeshBasicMaterial",
            // materialOptions are used to set object opacity and transparency
            materialOptions: {
                opacity: 1,
                transparent: false
            },
            
            // additional parameters for the object
            otherAttributes: {
                unmovable: true, // sets if object is unmovable
                destroysObjects: true, // on collision destroys other objects, TODO: currently unused

                // parameters if object has light and if has, what color it is
                hasLight: true,
                lightColor: 0xf55607,

                /* collider type, possible values: 
                 * - box: used for unmovable boxes (boundingBox)
                 * - innerSphere: used for movable boxes, a boundingSphere is computed half the size of the box
                 * - no value: default collider is calculated (boundingSphere)
                 */
                colliderType: null,

                // mission related variables
                checkIfDestroyed: true,
                missionObject: false,
            },

            // optional parameter if the object has a ring around itself
            ring: {
                texture: "",
                innerRadius: 1,
                outerRadius: 10,
            },
        },
        {
            name: "testBox",
            texture: "",
            position: mockPosition,
            constructorParams: "2, 2, 2",
            geometry: "BoxGeometry",
            material: "MeshBasicMaterial",
            otherAttributes: {
                colliderType: "box"
            },
        }
    ],

    // custom (imported) objects
    // colliders needed to be set for each one
    // one object can have multiple colliders
    customObjects: [
        {
            name: "testCustomObject",
            pathToFile: "",
            scale: 1,
            position: mockPosition,

            // custom colliders for the object
            colliders: [
                {
                    constructorParams: `2, 6, 2`,
                    geometry: "BoxGeometry",
                    material: "MeshNormalMaterial",
                    // opacity is set to 0 so collider objects are not visiblen
                    materialOptions: {
                        opacity: 0,
                        transparent: true
                    },
                    position: mockPosition
                }
            ]
            
        }
    ]
}

// initiateScene
test("initiateScene()", () => {
    const loadedMap = initiateScene(mockScene, mockMap);
    expect(loadedMap.sceneObjects.length).toBe(3); // 1 BoxGeometry, 1 SphereGeometry and its ring
    expect(mockScene.add).toHaveBeenCalledTimes(8); 
    /* mockScene.add calls: 
     * 1. background
     * 2. testSphere
     * 3. ring for testSphere
     * 4. pointLight for testSphere
     * 5. AmbientLight for testSphere
     * 6. testBox
     * 7. custom collider for testCustomObject
     * 8. orbital circle
     */

});

test("addAmbiendLight()", () => {
    addAmbientLight(mockScene);
    expect(mockScene.add).toHaveBeenCalledTimes(1);
});