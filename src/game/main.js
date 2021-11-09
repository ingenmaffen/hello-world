import * as THREE from "../../node_modules/three/build/three.module.js";
import { update } from "../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { initiatePlayer, handlePlayerMovement } from "./controls/player-controls.js";
import { initiateColliders } from "./controls/collision.js";
import { handleCamereMovement } from "./controls/camera-controls.js";
import { solarSystem } from "./maps/solar-system.js"; // TODO: remove, load main menu
import { billiards } from "./maps/billiards.js"; // TODO: debug
import { bowling } from "./maps/bowling.js"; // TODO: debug
import { initiateScene } from "./misc/scene-loader.js";
import { initiateSound } from "./sounds/sfx.js";
import { setVolume, initiateNsfPlayer } from "./sounds/music.js";
import { initiateEventListeners } from "./misc/event-listeners.js";

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
    audio = initiateSound(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.requestPointerLock();

    player = initiatePlayer(map.playerConfig, scene);

    handleCamereMovement(0, 0, cameraPosition, camera, player);
    initiateNsfPlayer();
    setVolume(0.5);
    map.music();

    initiateEventListeners(renderer, camera, cameraPosition, player, pressedKeys);
}

function animate(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    update(time);
    handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio);
}

initMap(bowling);
requestAnimationFrame(animate);