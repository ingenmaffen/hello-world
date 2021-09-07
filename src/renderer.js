import * as THREE from "../node_modules/three/build/three.module.js";
import { handleCamereMovement, initiatePlayer } from "./game/player-controls.js";

let camera;
let scene; 
let renderer;
let player;
let background;
const cameraPosition = { x: Math.PI / 4, y: 0 };

function init() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    scene = new THREE.Scene();

    const bgGeometry = new THREE.SphereGeometry(90, 32, 16);
    const bgTexture = new THREE.TextureLoader().load("src/assets/2k_stars_milky_way.jpg");
    background = new THREE.Mesh(bgGeometry, new THREE.MeshBasicMaterial({map: bgTexture, side: THREE.DoubleSide}));
    scene.add(background);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    player = initiatePlayer(scene, THREE);
    handleCamereMovement(0, 0, cameraPosition, camera, player);

    // event listener on resize
	window.addEventListener('resize', handleWindowResize);  

    // camera movement
    addEventListener("mousemove", (event) => {
        handleCamereMovement(event.movementX, event.movementY, cameraPosition, camera, player);
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
}

init();
requestAnimationFrame(animate);