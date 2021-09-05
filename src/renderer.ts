// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import * as THREE from 'three';

class GameBase {

    private camera: any;
    private scene: any;
    private renderer: any;
    private geometry: any;
    private material: any;
    private mesh: any;
    private isDirectionDown: boolean;

    public init() {
        this.isDirectionDown = false;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
        this.camera.position.z = 3;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.geometry = new THREE.BoxGeometry(1);
        this.material = new THREE.MeshNormalMaterial({ wireframe: false });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        /* event listener on resize */
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
        // this.animate(0);
    }

    private  handleWindowResize() {
        const HEIGHT = window.innerHeight;
        const WIDTH = window.innerWidth;
        this.renderer.setSize(WIDTH, HEIGHT);
        const aspectRatio = WIDTH / HEIGHT;

        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();
    }

    public animate(time: any) {
        if (this.isDirectionDown) {
            this.mesh.position.y -= 0.01;
            this.isDirectionDown = this.mesh.position.y > -0.5
        } else {
            this.mesh.position.y += 0.01;
            this.isDirectionDown = this.mesh.position.y > 0.5
        }

        this.mesh.rotation.y = time * 0.001;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

}

const game = new GameBase();
game.init();