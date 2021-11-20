import { getCameraDistance } from "./camera-controls.mjs";

test('getCameraDistance', () => {
  expect(getCameraDistance()).toBe(5);
});