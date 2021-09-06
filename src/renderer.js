import * as THREE from "../node_modules/three/build/three.module.js";
import { handleCamereMovement } from "./game/player-controls.js";

let camera;
let scene; 
let renderer;
var geometry, texture, bgTexture, mesh;
const cameraPosition = { x: 3 * Math.PI / 4, y: 0 };

function init() {

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    scene = new THREE.Scene();
    const bgGeometry = new THREE.SphereGeometry(90, 32, 16);
    bgTexture = new THREE.TextureLoader().load("src/assets/2k_stars_milky_way.jpg");
    const bgMesh = new THREE.Mesh(bgGeometry, new THREE.MeshBasicMaterial({map: bgTexture, side: THREE.DoubleSide}));
    scene.add(bgMesh);

    geometry = new THREE.SphereGeometry(1, 32, 16);
    texture = new THREE.TextureLoader().load("src/assets/2k_earth_daymap.jpg");
    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    scene.add(mesh);

    const moon = new THREE.SphereGeometry(0.25, 32, 16);
    const moonTexture = new THREE.TextureLoader().load("src/assets/2k_moon.jpg");
    const moonMesh = new THREE.Mesh(moon, new THREE.MeshBasicMaterial({map: moonTexture}));
    moonMesh.position.x = 1;
    moonMesh.position.y = 1;
    scene.add(moonMesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // event listener on resize
	window.addEventListener('resize', handleWindowResize);  

    // camera movement
    addEventListener("mousemove", (event) => {
        handleCamereMovement(event.movementX, event.movementY, cameraPosition, camera, mesh);
    });
}

function handleWindowResize() {
	const HEIGHT = window.innerHeight;
	const WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	aspectRatio = WIDTH / HEIGHT;

	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
}

function animate(time) {
    // const spin = time * 0.0005;
    // mesh.rotation.z = Math.PI / 8;
    // mesh.rotation.y = spin;
    // mesh.rotation.z = spin * Math.cos(mesh.rotation.y);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
requestAnimationFrame(animate);