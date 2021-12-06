import * as THREE from "../../node_modules/three/build/three.module.mjs";
import { update } from "../../node_modules/@tweenjs/tween.js/dist/tween.esm.mjs";
import { initiatePlayer, handlePlayerMovement, setBackgroundMeshForPlayerMovement } from "./controls/player-controls.mjs";
import { initiateColliders, setMapMaxColliders } from "./controls/collision.mjs";
import { handleCameraMovement, setCameraDistance } from "./controls/camera-controls.mjs";
import { solarSystem } from "./maps/solar-system.mjs"; // TODO: remove, load main menu
import { boxSolarSystem } from "./maps/box-galaxy.mjs"; // TODO: debug
import { billiards } from "./maps/billiards.mjs"; // TODO: debug
import { bowling } from "./maps/bowling.mjs"; // TODO: debug
import { endless } from "./maps/endless.mjs" // TODO: debug
import { initiateScene } from "./misc/scene-loader.mjs";
import { initiateSound } from "./sounds/sfx.mjs";
import { setVolume, initiateNsfPlayer } from "./sounds/music.mjs";
import { initiateEventListeners, getIsGamePaused } from "./misc/event-listeners.mjs";
import { initiateEndlessMode } from "./misc/endless-mode.mjs";

let camera;
let scene;
let renderer;
let player;
let clock;
let audio;
let cameraPosition;
const pressedKeys = {};

export function initMap(map) {
    cameraPosition = { x: (-5 * Math.PI) / 8, y: Math.PI / 9 }
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100 * 200);

    scene = new THREE.Scene();
    const loadedScene = initiateScene(scene, map);
    initiateColliders(loadedScene.sceneObjects);
    setMapMaxColliders(map.maxDistance);
    audio = initiateSound(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.requestPointerLock();

    player = initiatePlayer(map.playerConfig, scene);

    setCameraDistance(map.cameraDistance || 5);

    handleCameraMovement(0, 0, cameraPosition, camera, player);
    initiateNsfPlayer();
    setVolume(0.25);
    map.music();

    initiateEventListeners(renderer, camera, cameraPosition, player, pressedKeys, audio);

    if (map.endless) {
        setBackgroundMeshForPlayerMovement(loadedScene.background);
        initiateEndlessMode();
    }
}

function animate(time) {
    if (!getIsGamePaused()) {
        renderer.render(scene, camera);
        update(time);
        handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio);
    }
    requestAnimationFrame(animate);
}

initMap(endless);
requestAnimationFrame(animate);