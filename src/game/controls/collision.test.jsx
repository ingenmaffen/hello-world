import { jest } from "@jest/globals";
jest.enableAutomock();

import { initiateColliders, handleCollision } from "./collision.mjs";

const mockPosition = {
    x: 0,
    y: 0,
    z: 0,
};
const mockObjects = [
    {
        name: "mockDefaultBall",
        geometry: {
            computeBoundingSphere: jest.fn(),
            boundingSphere: {
                clone: jest.fn(() => {
                    return {
                        applyMatrix4: jest.fn(),
                    };
                }),
            },
        },
        updateMatrixWorld: jest.fn(),
        position: mockPosition,
    },
    {
        name: "mockCube",
        position: mockPosition,
        otherAttributes: {
            colliderType: "box",
        },
        geometry: {
            computeBoundingBox: jest.fn(),
            boundingBox: {
                clone: jest.fn(() => {
                    return {
                        applyMatrix4: jest.fn(),
                    };
                }),
            },
        },
        updateMatrixWorld: jest.fn(),
        position: mockPosition,
    },
    {
        name: "mockBubeWithInnerSphere",
        position: mockPosition,
        otherAttributes: {
            colliderType: "innerSphere",
        },
        geometry: {
            computeBoundingSphere: jest.fn(),
            parameters: {
                width: 2,
            },
            boundingSphere: {
                clone: jest.fn(() => {
                    return {
                        applyMatrix4: jest.fn(),
                    };
                }),
            },
        },
        updateMatrixWorld: jest.fn(),
    },
];

// initiateColliders
test("initiateColliders", () => {
    initiateColliders(mockObjects);
    expect(mockObjects[0].updateMatrixWorld).toHaveBeenCalled();
    expect(mockObjects[0].geometry.boundingSphere.clone).toHaveBeenCalled();
    expect(mockObjects[1].updateMatrixWorld).toHaveBeenCalled();
    expect(mockObjects[1].geometry.boundingBox.clone).toHaveBeenCalled();
    // expect(mockObjects[2]);
});
