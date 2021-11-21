/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "jsx",
  ],
  extensionsToTreatAsEsm: [".jsx"],
  testEnvironment: "jsdom",
  transform: {},
  coveragePathIgnorePatterns: [
    "node_modules",
    "<rootDir>/src/assets/objects/loader/GLTFLoader.mjs",
],
};
