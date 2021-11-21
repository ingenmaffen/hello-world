import * as THREE from "../../../node_modules/three/build/three.module.mjs";

export function initiateSound(camera) {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
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
