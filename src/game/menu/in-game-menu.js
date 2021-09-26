import { initMap } from "../main.js";
import { solarSystem } from "../maps/solar-system.js";
import { billiards } from "../maps/billiards.js";
import { stopMusic } from "../sounds/music.js";
import { removeEventListeners } from "../misc/event-listeners.js";

export function handleInGameMenu(menuOpen, unPauseGame) {
    if (!menuOpen) {
        appendOverlay();
        appendButton("Continue", unPauseGame);
        appendButton("Load Map: Solar System", () => {
            debugLoadScene(solarSystem);
            unPauseGame();
        });
        appendButton("Load Map: Billiards", () => {
            debugLoadScene(billiards);
            unPauseGame();
        });
    } else {
        unPauseGame();
    }

    return !menuOpen;
}

function appendOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
}

function appendButton(text, callback) {
    const button = document.createElement("button");
    const overlay = document.getElementById("overlay");
    button.classList.add("continue");
    button.innerText = text;
    overlay.appendChild(button);
    button.onclick = callback;
}

function debugLoadScene(map) {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.remove();
    stopMusic();
    removeEventListeners();
    initMap(map);
}
