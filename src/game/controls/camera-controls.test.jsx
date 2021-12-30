import { handleCameraMovement, changeCameraDistance, getCameraDistance, setCameraDistance } from "./camera-controls.mjs";
import { jest } from "@jest/globals";

// getCameraDistance
test("getCameraDistance() default value", () => {
  expect(getCameraDistance()).toBe(5);
});

// getCameraDistance
test("setCameraDistance() should set camera distance value", () => {
  setCameraDistance(10);
  expect(getCameraDistance()).toBe(10);
  setCameraDistance(5);
  expect(getCameraDistance()).toBe(5);
});

// changeCameraDistance
test("changeCameraDistance() and then getCameraDistance()", () => {
  changeCameraDistance(1);
  expect(getCameraDistance()).toBe(5.2);
  changeCameraDistance(-1);
  expect(getCameraDistance()).toBe(5);
  changeCameraDistance(-1);
  expect(getCameraDistance()).toBe(4.8);
});

test("changeCameraDistance() to its minimum value and then getCameraDistance()", () => {
  for (let i = 0; i < 25; i++) {
    changeCameraDistance(-1);
  }
  expect(getCameraDistance()).toBe(0.2);
});

// handleCameraMovement
const cameraSpy = jest.fn();
const mockValues = {
  cameraPosition: { x: (-5 * Math.PI) / 8, y: Math.PI / 9 },
  camera: {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    lookAt: cameraSpy
  },
  playerObject: {
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  }
};

test("handleCameraMovement() with default values", () => {
  handleCameraMovement(
    0,
    0,
    mockValues.cameraPosition,
    mockValues.camera,
    mockValues.playerObject
  );
  expect(cameraSpy).toHaveBeenCalled();
  expect(mockValues.cameraPosition).toEqual({ x: (-5 * Math.PI) / 8, y: Math.PI / 9 });
});

test("handleCameraMovement() with y value exceeding max value", () => {
  const yAxisTreshold = Math.PI / 18; // copied from camera-controls.mjs
  const yMaxAngle = Math.PI / 2 - yAxisTreshold; // copied from camera-controls.mjs
  handleCameraMovement(
    0,
    500,
    mockValues.cameraPosition,
    mockValues.camera,
    mockValues.playerObject
  );
  expect(cameraSpy).toHaveBeenCalled();
  expect(mockValues.cameraPosition.y).toBeLessThanOrEqual(yMaxAngle );
});

test("handleCameraMovement() with y value exceeding min value", () => {
  const yAxisTreshold = Math.PI / 18; // copied from camera-controls.mjs
  const yMinAngle = -Math.PI / 2 + yAxisTreshold; // copied from camera-controls.mjs
  handleCameraMovement(
    0,
    -500,
    mockValues.cameraPosition,
    mockValues.camera,
    mockValues.playerObject
  );
  expect(cameraSpy).toHaveBeenCalled();
  expect(mockValues.cameraPosition.y).toBeGreaterThanOrEqual(yMinAngle);
});

test("handleCameraMovement() with x value incrementing", () => {
  for (let i = 0; i < 50; i++ ) {
    handleCameraMovement(
      i * 10,
      0,
      mockValues.cameraPosition,
      mockValues.camera,
      mockValues.playerObject
    );
    expect(mockValues.cameraPosition.x).toBeLessThanOrEqual(2 * Math.PI);
  }
});

// TODO: camera.position values should be checked