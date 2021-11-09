import { initMap } from "../main.js";
import { stopMusic } from "../sounds/music.js";
import { removeEventListeners } from "../misc/event-listeners.js";

// maps
import { solarSystem } from "../maps/solar-system.js";
import { billiards } from "../maps/billiards.js";
import { boxSolarSystem } from "../maps/box-galaxy.js";
import { bowling } from "../maps/bowling.js";

export function handleInGameMenu(menuOpen, unPauseGame) {
    if (!menuOpen) {
        appendOverlay();
        appendButton("Continue", unPauseGame, "continue");
        appendButton("Load Map: Solar System", () => {
            debugLoadScene(solarSystem);
            unPauseGame();
        }, "other-button");
        appendButton("Load Map: Box Galaxy", () => {
            debugLoadScene(boxSolarSystem);
            unPauseGame();
        }, "other-button");
        appendButton("Load Map: Billiards", () => {
            debugLoadScene(billiards);
            unPauseGame();
        }, "other-button");
        appendButton("Load Map: Bowling", () => {
            debugLoadScene(bowling);
            unPauseGame();
        }, "other-button");
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

function appendButton(text, callback, objectClass) {
    const containerDiv = document.createElement("div");
    const button = document.createElement("button");
    const overlay = document.getElementById("overlay");
    button.classList.add(objectClass);
    button.innerText = text;
    containerDiv.appendChild(button);
    overlay.appendChild(containerDiv);
    button.onclick = callback;
}

function debugLoadScene(map) {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.remove();
    stopMusic();
    removeEventListeners();
    initMap(map);
}
