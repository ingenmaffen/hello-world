import * as THREE from "../../node_modules/three/build/three.module.js";
import { update } from "../../node_modules/@tweenjs/tween.js/dist/tween.esm.js";
import { initiatePlayer, handlePlayerMovement, initiateColliders } from "./controls/player-controls.js";
import { handleCamereMovement } from "./controls/camera-controls.js";
import { solarSystem } from "./maps/solar-system.js";
import { initiateScene } from "./misc/scene-loader.js";
import { playBackgroundMusic } from "./sounds/music.js";
import { initiateSound } from "./sounds/sfx.js";
import { addHelpers } from "./misc/helpers.js";
import { initiateEventListeners } from "./misc/event-listeners.js";

let camera;
let scene;
let renderer;
let player;
let clock;
let audio;
const pressedKeys = {};
const cameraPosition = { x: (-5 * Math.PI) / 8, y: Math.PI / 9 };

function init() {
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100 * 200);

    scene = new THREE.Scene();
    const loadedScene = initiateScene(scene, solarSystem);
    initiateColliders(loadedScene.sceneObjects);
    audio = initiateSound(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.requestPointerLock();

    player = initiatePlayer();
    scene.add(player);

    handleCamereMovement(0, 0, cameraPosition, camera, player);
    playBackgroundMusic();

    initiateEventListeners(renderer, camera, cameraPosition, player, pressedKeys);

    addHelpers(scene); // TODO: circles dynamically calculated from sun-planet distance
}

function animate(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    update(time);
    handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio);
}

init();
requestAnimationFrame(animate);
