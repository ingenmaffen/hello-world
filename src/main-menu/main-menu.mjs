import { initMap, autoRotateBackground } from "../game/main.mjs";
import { appendMenuButton, loadScene } from "../game/misc/common.mjs";
import { getLanguageKeys } from "../game/misc/i18n/language-service.mjs";

// maps
import { background } from "../game/maps/main-menu-background.mjs";
import { solarSystem } from "../game/maps/solar-system.mjs";
import { boxSolarSystem } from "../game/maps/box-galaxy.mjs";
import { billiards } from "../game/maps/billiards.mjs";
import { bowling } from "../game/maps/bowling.mjs";

const languageKeys = getLanguageKeys();

export function initMainMenu() {
    initMap(background, true);
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
            text: languageKeys.LEVELS,
            callback: () => {
                loadLevelsMenu();
                appendRightSideTextbox();
            }
        },
        {
            text: languageKeys.CREDITS,
            callback: () => {
                loadCreditsMenu();
            }
        },
        {
            text: languageKeys.EXIT,
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
            text: languageKeys.SOLAR_SYSTEM_TITLE,
            callback: () => {
                loadLevel(solarSystem);
            },
            hoverCallback: () => {
                setRightSideText(languageKeys.SOLAR_SYSTEM_DESC)
            },
            hoverEndCallback: removeRightSideText
        },
        {
            text: languageKeys.BOX_GALAXY_TITLE,
            callback: () => {
                loadLevel(boxSolarSystem);
            },
            hoverCallback: () => {
                setRightSideText(languageKeys.BOX_GALAXY_DESC)
            },
            hoverEndCallback: removeRightSideText
        },
        {
            text: languageKeys.BILLIARDS_TITLE,
            callback: () => {
                loadLevel(billiards);
            },
            hoverCallback: () => {
                setRightSideText(languageKeys.BILLIARDS_DESC)
            },
            hoverEndCallback: removeRightSideText
        },
        {
            text: languageKeys.BOWLING_TITLE,
            callback: () => {
                loadLevel(bowling);
            },
            hoverCallback: () => {
                setRightSideText(languageKeys.BOWLING_DESC)
            },
            hoverEndCallback: removeRightSideText
        },
        {
            text: languageKeys.BACK,
            callback: () => {
                loadMainMenu();
                removeTexts();
            }
        }
    ];

    buttons.forEach(button => {
        appendMenuButton(button.text, button.callback, button.hoverCallback, button.hoverEndCallback);
    });
}

function loadLevel(level) {
    removeTexts();
    removeMenuBlock();
    removeTitle();
    loadScene(level);
}

function loadCreditsMenu() {
    removeMenuBlock();
    addMenuBlock();

    const buttons = [
        {
            text: languageKeys.BACK,
            callback: () => {
                loadMainMenu();
                removeTexts();
            }
        }
    ];

    buttons.forEach(button => {
        appendMenuButton(button.text, button.callback);
    });

    appendCreditsTexts()
}

function appendRightSideTextbox() {
    const rightText = document.createElement("div");
    rightText.id = "right-side-text";
    document.body.appendChild(rightText);
}

function setRightSideText(text) {
    const textbox = document.getElementById("right-side-text");
    if (textbox) {
        textbox.innerHTML = text;
    }
}

function removeRightSideText() {
    const textbox = document.getElementById("right-side-text");
    if (textbox) {
        textbox.innerHTML = "";
    }
}

function appendCreditsTexts() {
    const leftText = document.createElement("div");
    leftText.id = "left-side-text";
    leftText.innerHTML = languageKeys.CREDITS_LEFT_SIDE;
    document.body.appendChild(leftText);

    const rightText = document.createElement("div");
    rightText.id = "right-side-text";
    rightText.innerHTML = languageKeys.CREDITS_RIGHT_SIDE;
    document.body.appendChild(rightText);
}

function removeTexts() {
    document.getElementById("left-side-text")?.remove();
    document.getElementById("right-side-text")?.remove();
}
