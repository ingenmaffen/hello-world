import { areVectorsEqual } from "./common.mjs";
import { resetPlayer } from "../controls/player-controls.mjs";

let missionMode;
let missionObjects = [];
let bowlingScore = [];
let missionOver = false;

export function setMissionMode(_missionMode) {
    missionMode = _missionMode;
}

export function setMissionObjects(objects) {
    missionObjects = [];
    bowlingScore = [];
    missionOver = false;
    switch (missionMode) {
        case "destroyObjects":
            objects
                .filter(object => object?.otherAttributes?.checkIfDestroyed)
                .forEach(object => {
                    missionObjects.push(object);
            });
            break;
        case "bowling":
            objects
                .filter(object => object?.otherAttributes?.missionObject)
                .forEach(object => {
                    missionObjects.push(object);
            });
            break;
    }
}

export function handleMissionModeEvents(moveCount, player) {
    if (missionMode === "bowling") {
        resetPlayer(player);
        if (moveCount % 2 === 0) {
            const movedPins = missionObjects.filter(
                object => !areVectorsEqual(object.otherAttributes.parentObject.mesh.position, object.otherAttributes.defaultPosition)
            );
            bowlingScore.push(movedPins.length);
            checkMissionObjective();

            if (!missionOver) {
                addText("Resetting pins, please wait...");
                setTimeout(() => {
                    if (!missionOver) {
                        removeText();
                    }
                    resetBowlingPins();
                }, 3000);
            }
        }
    }
}

export function checkMissionObjective() {
    if (!missionOver) {
        switch (missionMode) {
            case "destroyObjects":
                // TODO: there is an issue during the billiards level where objects randomly disappear without being destroyed
                // console.log(missionObjects.map(object => object.otherAttributes));
                const objectsDone = missionObjects.filter(object => object.otherAttributes.destroyed);
                if (missionObjects.length === objectsDone.length) {
                    handleMissionComplete();
                }
                break;
            case "bowling": {
                if (bowlingScore.length >= 5) {
                    const missionCompleteTreshHold = bowlingScore.filter(value => value >= 9);
                    if (missionCompleteTreshHold.length === bowlingScore.length) {
                        handleMissionComplete();
                    }
                    else {
                        handleMissionFailed();
                    }
                }
            }
        }
    }
}

export function removeText() {
    document.getElementById("center-text")?.remove();
}

function addText(text) {
    removeText();
    const div = document.createElement("div");
    div.innerHTML = text;
    div.id = "center-text";
    document.body.appendChild(div);
}

function handleMissionComplete() {
    // TODO: mission end screen -> back to the menu or restart
    // TODO: add sound effect
    // TODO: maybe some confetti effect
    addText("Mission Complete!");
    missionOver = true;
}

function handleMissionFailed() {
    // TODO: mission end screen -> back to the menu or restart
    // TODO: add sound effect
    // TODO: add monochrome effect
    addText("Mission Failed!");
    missionOver = true;
}

function resetBowlingPins() {
    missionObjects.forEach(pin => {
        pin.position.x = pin.otherAttributes.defaultPosition.x;
        pin.position.y = pin.otherAttributes.defaultPosition.y;
        pin.position.z = pin.otherAttributes.defaultPosition.z;
        pin.rotation.x = 0;
        pin.rotation.y = 0;
        pin.rotation.z = 0;
        pin.otherAttributes.parentObject.mesh.position.x = pin.otherAttributes.defaultPosition.x;
        pin.otherAttributes.parentObject.mesh.position.y = pin.otherAttributes.defaultPosition.y;
        pin.otherAttributes.parentObject.mesh.position.z = pin.otherAttributes.defaultPosition.z;
        pin.otherAttributes.parentObject.mesh.rotation.x = 0;
        pin.otherAttributes.parentObject.mesh.rotation.y = 0;
        pin.otherAttributes.parentObject.mesh.rotation.z = 0;
    });
}