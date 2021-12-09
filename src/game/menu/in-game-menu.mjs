import { initMap } from "../main.mjs";
import { stopMusic } from "../sounds/music.mjs";
import { removeEventListeners, setIsGamePaused } from "../misc/event-listeners.mjs";
import { setVolumeInstantly, getMusicVolume } from "../sounds/music.mjs";
import { removeCanvas } from "../misc/common.mjs";

// maps
import { solarSystem } from "../maps/solar-system.mjs";
import { billiards } from "../maps/billiards.mjs";
import { boxSolarSystem } from "../maps/box-galaxy.mjs";
import { bowling } from "../maps/bowling.mjs";

let renderer;
const buttons = [
    {
        text: "Continue",
        callback: unPauseGame,
        cssClass: "continue"
    },
    {
        text: "Load Map: Solar System",
        callback: () => {
            debugLoadScene(solarSystem);
            unPauseGame();
        },
        cssClass: "other-button"
    },
    {
        text: "Load Map: Box Galaxy",
        callback: () => {
            debugLoadScene(boxSolarSystem);
            unPauseGame();
        },
        cssClass: "other-button"
    },
    {
        text: "Load Map: Billiards",
        callback: () => {
            debugLoadScene(billiards);
            unPauseGame();
        },
        cssClass: "other-button"
    },
    {
        text: "Load Map: Bowling",
        callback: () => {
            debugLoadScene(bowling);
            unPauseGame();
        },
        cssClass: "other-button"
    }
];

export function handleInGameMenu(menuOpen, _renderer) {
    renderer = _renderer;
    if (!menuOpen) {
        pauseGame();
    } else {
        unPauseGame();
    }
    return !menuOpen;
}

function pauseGame() {
    setVolumeInstantly(getMusicVolume() / 5);
    appendOverlay();
    buttons.forEach(button => {
        appendButton(button.text, button.callback, button.cssClass);
    });
}

function unPauseGame() {
    setVolumeInstantly(getMusicVolume());
    setIsGamePaused(false);
    renderer.domElement.requestPointerLock();
    removeOverlay();
}

function appendOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.remove();
    }
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
    removeCanvas();
    stopMusic();
    removeEventListeners();
    initMap(map);
}
