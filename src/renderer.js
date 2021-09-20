import * as THREE from "../node_modules/three/build/three.module.js";
import { update } from "../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { initiatePlayer, handleCamereMovement, handlePlayerMovement, initiateColliders } from "./game/player-controls.js";
import { solarSystem, helperCircles, sunPosition } from "./game/maps.js";
import { initiateScene, initiateSound } from "./game/scene-loader.js";
import { handleInGameMenu } from "./game/in-game-menu.js";
import { playBackgroundMusic } from "./game/music.js";

let camera;
let scene;
let renderer;
let player;
let clock;
let audio;
let isGamePaused = false;
const pressedKeys = {};
const cameraPosition = { x: (-5 * Math.PI) / 8, y: Math.PI / 9 };

function init() {
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100 * 200);

    scene = new THREE.Scene();
    const loadedScene = initiateScene(THREE, scene, solarSystem);
    initiateColliders(loadedScene.sceneObjects);
    audio = initiateSound(THREE, camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.requestPointerLock();

    player = initiatePlayer(THREE);
    scene.add(player);

    handleCamereMovement(0, 0, cameraPosition, camera, player);
    playBackgroundMusic();

    // event listener on resize
    window.addEventListener("resize", handleWindowResize);

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

    addHelpers(); // TODO: circles dynamically calculated from sun-planet distance
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

function animate(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    update(time);
    handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, THREE, audio);
}

init();
requestAnimationFrame(animate);

function addHelpers() {
    helperCircles.forEach((circle) => {
        const geometry = new THREE.TorusGeometry(circle, 0.1, 32, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = sunPosition.x;
        mesh.position.y = sunPosition.y;
        mesh.position.z = sunPosition.z;
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);
    });
}
