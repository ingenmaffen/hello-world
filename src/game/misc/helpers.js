import { helperCircles, sunPosition } from "../maps/solar-system.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

export function addHelpers(scene) {
    helperCircles.forEach((circle) => {
        const geometry = new THREE.TorusGeometry(circle, 0.1, 32, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = sunPosition.x;
        mesh.position.y = sunPosition.y;
        mesh.position.z = sunPosition.z;
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);
    });
}
