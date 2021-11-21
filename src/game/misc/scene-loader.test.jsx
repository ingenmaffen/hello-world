import { jest } from "@jest/globals";

import { initiateScene } from "./scene-loader.mjs";

const mockScene = {
    add: jest.fn()
};

const mockMap = {
    objects: []
}

// initiateScene
test("initiateScene()", () => {
    initiateScene(mockScene, mockMap);
    // TODO
});