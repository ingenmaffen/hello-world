import { initMap, animate } from "../game/main.mjs";
import { solarSystem } from "../game/maps/solar-system.mjs";

export function initMainMenu() {
    initMap(solarSystem);
    requestAnimationFrame(animate);
}