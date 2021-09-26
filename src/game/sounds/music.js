import { run, createNsfPlayer } from "../../../node_modules/nsf-player/nsf-player.js";

let ctx;
let nsfPlayer;

export function stopMusic() {
    nsfPlayer.stop();
}

export function playEndlessModeMusic() {
    run();
    ctx = new AudioContext();
    window["ctx"] = ctx;
    nsfPlayer = createNsfPlayer(ctx);
    nsfPlayer.play("src/assets/music/Hello-World.nsf", 0);
}

export function playBilliardMissionMusic() {
    run();
    ctx = new AudioContext();
    window["ctx"] = ctx;
    nsfPlayer = createNsfPlayer(ctx);
    nsfPlayer.play("src/assets/music/Hello-World.nsf", 1);

}