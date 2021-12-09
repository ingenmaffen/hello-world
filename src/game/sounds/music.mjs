import { run, createNsfPlayer } from "../../../node_modules/nsf-player/nsf-player.js";

let ctx;
let nsfPlayer;
let musicVolume = 1;

export function initiateNsfPlayer() {
    run();
    ctx = new AudioContext();
    window["ctx"] = ctx;
    nsfPlayer = createNsfPlayer(ctx);
}

export function stopMusic() {
    nsfPlayer.stop();
}

export function getMusicVolume() {
    return musicVolume;
}

export function setVolumeValue(value) {
    musicVolume = value;
}

export function setVolumeInstantly(value) {
    nsfPlayer.setVolumeValue(value);
    nsfPlayer.updateVolume();
}

export function playEndlessModeMusic() {
    nsfPlayer.play("src/assets/music/Hello-World.nsf", 0);
}

export function playBilliardMissionMusic() {
    nsfPlayer.play("src/assets/music/Hello-World.nsf", 1);
}
