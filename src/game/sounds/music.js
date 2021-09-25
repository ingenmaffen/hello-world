import { run, createNsfPlayer } from "../../../node_modules/nsf-player/nsf-player.js";

export function playBackgroundMusic() {
    run();
    const ctx = new AudioContext();
    window["ctx"] = ctx;
    const nsfPlayer = createNsfPlayer(ctx);
    nsfPlayer.play("src/assets/music/Hello-World.nsf", 0);
}
