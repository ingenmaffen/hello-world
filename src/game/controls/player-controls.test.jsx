import { jest } from "@jest/globals";

import { 
    initiatePlayer, 
    getPlayerSpeed, 
    setPlayerSpeed, 
    handlePlayerMovement, 
    buildUpMovementOnMouseDown, 
    movePlayerOnMouseUp 
} from "./player-controls.mjs";

const mockScene = {
    add: jest.fn()
}

const mockClock = {
    getDelta: jest.fn(() => 1)
}

const mockCameraPosition = {
    x: 0,
    y: 0,
};

const mockCamera = {
    position: {
        x: 0,
        y: 0,
        z: -5,
    },
    lookAt: jest.fn()
};

// initiatePlayer
test("initiatePlayer() with default settings", () => {
    const player = {
        geometry: {
            type: "SphereGeometry",
            parameters: {
                radius: 2
            }
        },
        material: {
            map: {
                image: {}
            }
        },
    };
    expect(initiatePlayer({ color: '#000000' }, mockScene)).toMatchObject(player);
    expect(mockScene.add).toHaveBeenCalledTimes(1);
});

test("initiatePlayer() with no texture", () => {
    const player = {
        geometry: {
            type: "SphereGeometry",
            parameters: {
                radius: 2
            }
        },
        material: {
            map: null
        },
    };
    expect(initiatePlayer({ color: '#000000', texture: 'none' }, mockScene)).toMatchObject(player);
    expect(mockScene.add).toHaveBeenCalledTimes(1);
});

test("initiatePlayer() with click controls", () => {
    initiatePlayer({ color: '#000000', moveOnClick: true }, mockScene);
    expect(mockScene.add).toHaveBeenCalledTimes(2); // it adds the arrow as well as the player
});

// getPlayerSpeed
test("getPlayerSpeed()", () => {
    expect(getPlayerSpeed()).toBe(0);
});

// setPlayerSpeed
test("setPlayerSpeed()", () => {
    expect(getPlayerSpeed()).toBe(0);
    setPlayerSpeed(10);
    expect(getPlayerSpeed()).toBe(10);
});

// handlePlayerMovement
test("handlePlayerMovement() with default movement disabled", () => {
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000', normalMovementDisabled: true }, mockScene);
    handlePlayerMovement({ "w": true }, null, player, null, null, null);
    expect(getPlayerSpeed()).toBe(0);
});

// handlePlayerMovement
test("handlePlayerMovement() with moving forward", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.z).toBe(0);
    handlePlayerMovement({ "w": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.x).toBe(0);
    expect(player.position.z).toBeGreaterThan(0);
});

test("handlePlayerMovement() with moving backward", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.z).toBe(0);
    handlePlayerMovement({ "s": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.x).toBe(0);
    expect(player.position.z).toBeLessThan(0);
});

test("handlePlayerMovement() with moving right", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.x).toBe(0);
    handlePlayerMovement({ "d": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.z).toBe(0);
    expect(player.position.x).toBeLessThan(0);
});

test("handlePlayerMovement() with moving left", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.x).toBe(0);
    handlePlayerMovement({ "a": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.z).toBe(0);
    expect(player.position.x).toBeGreaterThan(0);
});

test("handlePlayerMovement() with moving up", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.y).toBe(0);
    handlePlayerMovement({ " ": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.y).toBeGreaterThan(0);
});

test("handlePlayerMovement() with moving down", () => {
    mockCamera.position.x = mockCamera.position.y = 0;
    mockCamera.position.z = -5;
    setPlayerSpeed(0);
    const player = initiatePlayer({ color: '#000000' }, mockScene);
    expect(player.position.y).toBe(0);
    handlePlayerMovement({ "shift": true }, mockClock, player, mockCameraPosition, mockCamera, null);
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    expect(player.position.y).toBeLessThan(0);
});

// buildUpMovementOnMouseDown
xtest("buildUpMovementOnMouseDown()", () => {
    setPlayerSpeed(0);
    buildUpMovementOnMouseDown();
    expect(getPlayerSpeed()).toBeGreaterThan(0);
    // TODO: fix buildUpMovementOnMouseDown tests
});

// movePlayerOnMouseUp
xtest("movePlayerOnMouseUp()", () => {
    movePlayerOnMouseUp(); 
    // TODO: fix movePlayerOnMouseUp tests
});

// TODO: handlePlayerMovement with canNormalMoveOnXAxis and backgroundMesh
// TODO: handlePlayerMovement with moving backgroundMesh (setBackgroundMeshForPlayerMovement)
// TODO: getMaxSpeed()
// TODO: resetPlayer()
