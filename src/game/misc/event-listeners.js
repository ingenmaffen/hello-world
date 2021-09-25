
import { handleInGameMenu } from "../menu/in-game-menu.js";
import { handleCamereMovement, changeCameraDistance } from "../controls/camera-controls.js";

let renderer;
let camera;
let isGamePaused = false;

export function initiateEventListeners(_renderer, _camera, cameraPosition, player, pressedKeys) {
    renderer = _renderer;
    camera = _camera;

    // camera movement
    addEventListener("mousemove", (event) => {
        if (!isGamePaused) {
            handleCamereMovement(event.movementX, event.movementY, cameraPosition, camera, player);
        }
    });

    addEventListener("click", () => {
        if (!isGamePaused) {
            renderer.domElement.requestPointerLock();
        }
    });

    addEventListener("wheel", (event) => {
        changeCameraDistance(event.deltaY);
        handleCamereMovement(0, 0, cameraPosition, camera, player);
    });

    // player movement
    addEventListener("keydown", (event) => {
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
    });

    addEventListener("keyup", (event) => {
        delete pressedKeys[event.key.toLowerCase()];
    });

    // event listener on resize
    window.addEventListener("resize", handleWindowResize);
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
