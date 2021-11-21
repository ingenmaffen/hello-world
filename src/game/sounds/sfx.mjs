import { AudioListener, AudioLoader, Audio } from "../../../node_modules/three/build/three.module.mjs";

export function initiateSound(camera) {
    const listener = new AudioListener();
    camera.add(listener);
    const sound = new Audio(listener);
    const audioLoader = new AudioLoader();
    return {
        sound,
        audioLoader,
    };
}

export function playCollisionSound(audio) {
    audio.audioLoader.load("src/assets/sounds/clack.wav", function (buffer) {
        audio.sound.setBuffer(buffer);
        audio.sound.setLoop(false);
        audio.sound.setVolume(1);
        audio.sound.play();
    });
}
