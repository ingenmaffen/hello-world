import { jest } from "@jest/globals";

import { initiatePlayer } from "./player-controls.mjs";

const mockScene = {
    add: jest.fn()
}

// initiatePlayer
test("initiatePlayer()", () => {
    expect(initiatePlayer({ color: '#000000' }, mockScene)).not.toBeNull();
})