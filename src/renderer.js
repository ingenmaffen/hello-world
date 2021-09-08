import * as THREE from "../node_modules/three/build/three.module.js";
import { initiatePlayer, handleCamereMovement, handlePlayerMovement } from "./game/player-controls.js";
import { solarSystem } from "./game/maps.js";
import { initiateScene } from "./game/scene-loader.js";

let camera;
let scene; 
let renderer;
let player;
let clock;
const pressedKeys = {};
const cameraPosition = { x: Math.PI / 4, y: 0 };

function init() {
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    scene = new THREE.Scene();
    initiateScene(THREE, scene, solarSystem);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    player = initiatePlayer(THREE);
    scene.add(player);

    handleCamereMovement(0, 0, cameraPosition, camera, player);

    // event listener on resize
	window.addEventListener('resize', handleWindowResize);  

    // camera movement
    addEventListener("mousemove", (event) => {
        handleCamereMovement(event.movementX, event.movementY, cameraPosition, camera, player);
    });

    // player movement
    addEventListener("keydown", (event) => {
        pressedKeys[event.key.toLowerCase()] = true;
    });
  
    addEventListener("keyup", (event) => {
        delete pressedKeys[event.key.toLowerCase()];
    });
}

function handleWindowResize() {
	const HEIGHT = window.innerHeight;
	const WIDTH = window.innerWidth;
	const aspectRatio = WIDTH / HEIGHT;

	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, THREE);
}

init();
requestAnimationFrame(animate);