import { setIsGamePaused, removeEventListeners } from "../misc/event-listeners.mjs";
import { setVolumeInstantly, getMusicVolume, stopMusic } from "../sounds/music.mjs";
import { appendMenuButton, removeCanvas } from "../misc/common.mjs";
import { removeMenuBlock, initMainMenu } from "../../main-menu/main-menu.mjs";
import { removeText } from "../misc/mission-mode.mjs";


let renderer;
const buttons = [
    {
        text: "Continue",
        callback: unPauseGame
    },
    {
        text: "Exit to Main Menu",
        callback: () => {
            setIsGamePaused(false);
            removeText();
            removeOverlay();
            removeCanvas();
            stopMusic();
            removeEventListeners();
            initMainMenu();
        }
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
        appendMenuButton(button.text, button.callback, button.cssClass);
    });
}

function unPauseGame() {
    removeMenuBlock();
    setVolumeInstantly(getMusicVolume());
    setIsGamePaused(false);
    renderer.domElement.requestPointerLock();
    removeOverlay();
}

function appendOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    const menuBlock = document.createElement("div");
    menuBlock.id = "menu-block";
    document.body.appendChild(overlay);
    document.body.appendChild(menuBlock);
}

function removeOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.remove();
    }
}
