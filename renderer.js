import * as THREE from './node_modules/three/build/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;
var isDirectionDown = false;

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 3;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    geometry = new THREE.BoxGeometry( 1 );
    material = new THREE.MeshNormalMaterial( { wireframe: false } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    /* event listener on resize */
	window.addEventListener('resize', handleWindowResize);  
}

function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	aspectRatio = WIDTH / HEIGHT;

	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
}

function animate( time ) {
    if(isDirectionDown ) {
        mesh.position.y -= 0.01;
        isDirectionDown = mesh.position.y > -0.5
    } else {
        mesh.position.y += 0.01;
        isDirectionDown = mesh.position.y > 0.5
    }

    mesh.rotation.y = time * 0.001;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

init();
requestAnimationFrame( animate );