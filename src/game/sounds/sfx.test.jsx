import { jest } from "@jest/globals";

import { initiateSound, playCollisionSound } from "./sfx.mjs";

const mockCamera = {
    add: jest.fn()
};

const mockAudio = {
    audioLoader: {
        load: jest.fn()
    }
};

const mockaudioContext = jest.fn(() => {
    return {
        createGain: jest.fn(() => {
            return {
                connect: jest.fn()
            }
        })
    }
});

beforeEach(() => {
    window.AudioContext = mockaudioContext;
});

// initiateSound
test("initiateSound()", () => {
    expect(initiateSound(mockCamera)).toMatchObject({ sound: {}, audioLoader: {}});
    expect(mockCamera.add).toHaveBeenCalled();
});

// playCollisionSound
test("playCollisionSound()", () => {
    playCollisionSound(mockAudio);
    expect(mockAudio.audioLoader.load).toHaveBeenCalled();
});