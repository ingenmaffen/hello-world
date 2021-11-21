import { jest } from "@jest/globals";
jest.enableAutomock();

import { initiateColliders, handleCollision } from "./collision.mjs";
import { getPlayerSpeed, setPlayerSpeed } from "./player-controls.mjs";

const mockPosition = {
    x: 0,
    y: 0,
    z: 0,
};

const mockCloneFunction = jest.fn(() => {
    return {
        center: mockPosition,
        applyMatrix4: jest.fn(),
    }
});

const mockObjects = [
    {
        name: "mockDefaultBall",
        geometry: {
            parameters: {
                radius: 20,
            },
            computeBoundingSphere: jest.fn(),
            boundingSphere: {
                clone: mockCloneFunction,
            },
        },
        updateMatrixWorld: jest.fn(),
        position: mockPosition,
        otherAttributes: {
            unmovable: true
        }
    },
    {
        name: "mockCube",
        position: mockPosition,
        otherAttributes: {
            colliderType: "box",
        },
        geometry: {
            computeBoundingBox: jest.fn(),
            parameters: {
                width: 1,
            },
            boundingBox: {
                clone: mockCloneFunction,
            },
        },
        updateMatrixWorld: jest.fn(),
        position: mockPosition,
    },
    {
        name: "mockCubeWithInnerSphere",
        position: mockPosition,
        otherAttributes: {
            colliderType: "innerSphere",
        },
        geometry: {
            computeBoundingSphere: jest.fn(),
            parameters: {
                width: 5,
            },
            boundingSphere: {
                clone: mockCloneFunction,
            },
        },
        updateMatrixWorld: jest.fn(),
    },
];

const mockPlayer = {
    updateMatrixWorld: jest.fn(),
    position: mockPosition,
    geometry: {
        computeBoundingSphere: jest.fn(),
        parameters: {
            radius: 2,
        },
        boundingSphere: {
            clone: jest.fn(() => {
                return {
                    applyMatrix4: jest.fn(),
                    intersectsBox: jest.fn(() => true),
                    intersectsSphere: jest.fn(() => true),
                };
            }),
        },
    },
};

const mockAudio = {
    audioLoader: {
        load: jest.fn()
    }
};

// initiateColliders
test("initiateColliders", () => {
    initiateColliders(mockObjects);
    expect(mockObjects[0].updateMatrixWorld).toHaveBeenCalled();
    expect(mockObjects[0].geometry.boundingSphere.clone).toHaveBeenCalled();
    expect(mockObjects[1].updateMatrixWorld).toHaveBeenCalled();
    expect(mockObjects[1].geometry.boundingBox.clone).toHaveBeenCalled();
    // expect(mockObjects[2]);
});

// handleCollision
test("handleCollision", () => {
    initiateColliders(mockObjects);
    handleCollision(mockPlayer, mockAudio);
    expect(mockAudio.audioLoader.load).toHaveBeenCalledTimes(3);
    expect(getPlayerSpeed()).toBeLessThanOrEqual(0);
});

test("handleCollision with unmovable object", () => {
    setPlayerSpeed(30);
    initiateColliders([mockObjects[0]]);
    handleCollision(mockPlayer, mockAudio);
    expect(mockAudio.audioLoader.load).toHaveBeenCalledTimes(1);
    expect(getPlayerSpeed()).toBe(-1);
});

test("handleCollision with small object", () => {
    setPlayerSpeed(5);
    initiateColliders([mockObjects[1]]);
    handleCollision(mockPlayer, mockAudio);
    expect(mockAudio.audioLoader.load).toHaveBeenCalledTimes(1);
    expect(getPlayerSpeed()).toBeGreaterThanOrEqual(0);
});

test("handleCollision with big object", () => {
    setPlayerSpeed(5);
    initiateColliders([mockObjects[2]]);
    handleCollision(mockPlayer, mockAudio);
    expect(mockAudio.audioLoader.load).toHaveBeenCalledTimes(1);
    expect(getPlayerSpeed()).toBeLessThanOrEqual(0);
});
