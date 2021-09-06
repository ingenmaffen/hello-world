import * as THREE from '../node_modules/three/build/three.module.js';

var camera, scene, renderer;
var geometry, texture, bgTexture, mesh;
var isDirectionDown = false;

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 3;

    scene = new THREE.Scene();
    bgTexture = new THREE.TextureLoader().load( "src/assets/2k_stars_milky_way.jpg" );
    scene.background = bgTexture;

    geometry = new THREE.SphereGeometry( 1, 32, 16 );
    texture = new THREE.TextureLoader().load( "src/assets/2k_earth_daymap.jpg" );
    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // event listener on resize
	window.addEventListener('resize', handleWindowResize);  

    // camera movement
    addEventListener("mousemove", (event) => {
        // event.movementX
        // event.movementY
      });
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

    mesh.rotation.y = time * 0.0005;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

init();
requestAnimationFrame( animate );