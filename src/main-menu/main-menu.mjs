import { initMap, animate, autoRotateBackground } from "../game/main.mjs";
import { appendMenuButton, loadScene } from "../game/misc/common.mjs";

// maps
import { background } from "../game/maps/main-menu-background.mjs";
import { solarSystem } from "../game/maps/solar-system.mjs";
import { boxSolarSystem } from "../game/maps/box-galaxy.mjs";
import { billiards } from "../game/maps/billiards.mjs";
import { bowling } from "../game/maps/bowling.mjs";

export function initMainMenu() {
    initMap(background, true);
    requestAnimationFrame(animate);
    autoRotateBackground();
    loadMainMenu();
    addTitle();
}

export function removeMenuBlock() {
    document.getElementById("menu-block")?.remove();
}

function addMenuBlock() {
    const div = document.createElement("div");
    div.id = "menu-block";
    document.body.appendChild(div);
}

function addTitle() {
    const div = document.createElement("div");
    div.innerHTML = "Hello, World!";
    div.id = "title";
    document.body.appendChild(div);
}

function removeTitle() {
    document.getElementById("title").remove();
}

function loadMainMenu() {
    removeMenuBlock();
    addMenuBlock();

    const buttons = [
        {
            text: "Levels",
            callback: () => {
                loadLevelsMenu();
            }
        },
        {
            text: "Exit",
            callback: () => {
                window.close();
            }
        }
    ];

    buttons.forEach(button => {
        appendMenuButton(button.text, button.callback);
    });
}

function loadLevelsMenu() {
    removeMenuBlock();
    addMenuBlock();

    const buttons = [
        {
            text: "Solar System",
            callback: () => {
                removeMenuBlock();
                removeTitle();
                loadScene(solarSystem);
            }
        },
        {
            text: "Box Galaxy",
            callback: () => {
                removeMenuBlock();
                removeTitle();
                loadScene(boxSolarSystem);
            }
        },
        {
            text: "Billiards",
            callback: () => {
                removeMenuBlock();
                removeTitle();
                loadScene(billiards);
            }
        },
        {
            text: "Bowling",
            callback: () => {
                removeMenuBlock();
                removeTitle();
                loadScene(bowling);
            }
        },
        {
            text: "Back",
            callback: () => {
                loadMainMenu();
            }
        }
    ];

    buttons.forEach(button => {
        appendMenuButton(button.text, button.callback);
    });
}
