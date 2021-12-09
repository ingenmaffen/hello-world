import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight
} from "../../node_modules/three/build/three.module.mjs";
import { GLTFLoader } from "./../assets/objects/loader/GLTFLoader.mjs";

import { removeCanvas } from "../game/misc/common.mjs";
import { initMainMenu } from "./main-menu.mjs";

let camera;
let renderer;
let tacoMesh;
let pixelPass;
let scene;
let composer;
const logoDuration = 5000; 

export function initLogoScene() {
    scene = new Scene();
    camera = new PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 10 );
    renderer = new WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( window.innerWidth, window.innerHeight * 0.8 );
    renderer.domElement.id = "logo";
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    camera.position.y = 0.55;

    // composer = new EffectComposer( renderer );
    // composer.addPass( new RenderPass( scene, camera ) );

    // const pixelPass = new ShaderPass( PixelShader );
    // pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
    // pixelPass.uniforms[ "resolution" ].value.multiplyScalar( 0.1 );
    // composer.addPass( pixelPass );

    const loader = new GLTFLoader();
    tacoMesh;
    loader.load( "src/assets/objects/taco_v2.glb", function ( gltf ) {
        tacoMesh = gltf.scene;
        tacoMesh.rotation.x = Math.PI / 6;
        scene.add( tacoMesh );

    });

    scene.add(new AmbientLight(0xAAAAAA, 2));

    window.addEventListener( 'resize', onResize );
    requestAnimationFrame(animateLogo);
    setTimeout(() => {
        removeCanvas();
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animateLogo);
        removeText();
        initMainMenu();
    }, logoDuration);
}

function animateLogo() {
    if (tacoMesh) {
        tacoMesh.rotation.y += 0.01;
    }
    // composer?.render();
    renderer.render(scene, camera);
    requestAnimationFrame(animateLogo);
};

function onResize() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    const aspectRatio = WIDTH / HEIGHT;
    // pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( WIDTH, HEIGHT );
    // pixelPass.uniforms[ "resolution" ].value.multiplyScalar( 0.1 );

    renderer.setSize(WIDTH, HEIGHT * 0.8);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

function removeText() {
    document.getElementById("taco-games-text").remove();
}
