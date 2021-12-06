import { solarSystem } from "./solar-system.mjs";
import { playEndlessModeMusic } from "../sounds/music.mjs";

export const endless = {
    ...solarSystem,
    name: "Endless",
    music: playEndlessModeMusic,
    endless: true
}
