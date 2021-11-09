import { handleInGameMenu } from "../menu/in-game-menu.js";
import { handleCamereMovement, changeCameraDistance } from "../controls/camera-controls.js";
import { buildUpMovementOnMouseDown, movePlayerOnMouseUp } from "../controls/player-controls.js"

let renderer;
let camera;
let cameraPosition;
let player;
let pressedKeys;
let isGamePaused = false;

export function initiateEventListeners(_renderer, _camera, _cameraPosition, _player, _pressedKeys) {
    renderer = _renderer;
    camera = _camera;
    cameraPosition = _cameraPosition;
    player = _player;
    pressedKeys = _pressedKeys;

    // camera movement
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("wheel", handleScroll);

    // player movement
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // event listener on resize
    window.addEventListener("resize", handleWindowResize);
}

export function removeEventListeners() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("click", handleClick);
    window.removeEventListener("wheel", handleScroll);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("resize", handleWindowResize);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
}

function unPauseGame() {
    isGamePaused = false;
    renderer.domElement.requestPointerLock();

    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.remove();
    }
}

function handleWindowResize() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    const aspectRatio = WIDTH / HEIGHT;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
    if (!isGamePaused) {
        handleCamereMovement(event.movementX, event.movementY, cameraPosition, camera, player);
    }
}

function handleClick(event) {
    if (!isGamePaused) {
        renderer.domElement.requestPointerLock();
    }
}

function handleScroll(event) {
    changeCameraDistance(event.deltaY);
    handleCamereMovement(0, 0, cameraPosition, camera, player);
}

function handleKeyDown(event) {
    if (event.key === "Escape") {
        document.exitPointerLock();

        isGamePaused = handleInGameMenu(isGamePaused, unPauseGame);

        if (!isGamePaused) {
            renderer.domElement.requestPointerLock();
        }
    }

    if (!isGamePaused) {
        pressedKeys[event.key.toLowerCase()] = true;
    }
}

function handleKeyUp(event) {
    delete pressedKeys[event.key.toLowerCase()];
}

function handleMouseDown(event) {
    if (!isGamePaused) {
        buildUpMovementOnMouseDown();
    }
}

function handleMouseUp(event) {
    if (!isGamePaused) {
        movePlayerOnMouseUp();
    }
}
