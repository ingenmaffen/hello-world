import {
    SphereGeometry,
    TextureLoader,
    MeshStandardMaterial,
    Mesh,
    Vector3,
    CylinderGeometry,
    Group,
    MeshBasicMaterial,
} from "../../../node_modules/three/build/three.module.mjs";
import { handleCameraMovement, getCameraDistance } from "./camera-controls.mjs";
import { handleCollision, handleDriftCollision } from "./collision.mjs";
import { addAmbientLight } from "../misc/scene-loader.mjs";
import { decreaseForceValue, isNullVector, multiplyVector, getNullVector } from "../misc/common.mjs";
import { handleMissionModeEvents } from "../misc/mission-mode.mjs";
import { animate } from "../misc/animations.mjs";

const DEGREE = Math.PI / 180;
let playerSpeed = 0;
let momentum = 0; // click speed
let maxSpeed = 30;
let isMouseHeldDown = false;
let mouseHoldArrow;
let backgroundMesh;
let isAnimationRunning = false;
let clickMoveCount = 0;
let playerSpeedBuildUp = 0.1;

// map specific modifiers
let yAxisDisabledOnClick = false;
let normalMovementDisabled = false;
let clickMoveForce = 1;
let canNormalMoveOnXAxis = false;

// unlockables
let moveOnClick = false;

const keysEnum = {
    FORWARD: "w",
    BACKWARD: "s",
    LEFT: "a",
    RIGHT: "d",
    UP: " ",
    DOWN: "shift",
};

export function initiatePlayer(playerConfig, scene) {
    clickMoveCount = 0;
    const playerSize = playerConfig?.playerSize || 2;
    const texturePathBase = "src/assets/textures";
    const texturePath = playerConfig?.texturePath || `${texturePathBase}/2k_earth_daymap.jpg`;
    const geometry = new SphereGeometry(playerSize, 32, 16);
    const texture =
        playerConfig?.texture === "none" ? null : new TextureLoader().load(texturePath);
    const player = new Mesh(geometry, new MeshStandardMaterial({ map: texture, color: playerConfig?.color }));
    player.rotation.z = -25 * DEGREE;

    //setup modifiers
    normalMovementDisabled = playerConfig?.normalMovementDisabled;
    yAxisDisabledOnClick = playerConfig?.yAxisDisabledOnClick;
    moveOnClick = playerConfig?.moveOnClick;
    clickMoveForce = playerConfig?.clickMoveForce || clickMoveForce;
    canNormalMoveOnXAxis = playerConfig?.canNormalMoveOnXAxis;
    playerSpeedBuildUp = playerConfig?.playerSpeedDiff || 0.1;
    player.destroysObjects = playerConfig?.destroysObjects;

    scene.add(player);

    if (playerConfig?.hasLight) {
        addAmbientLight(scene);
    }

    if (moveOnClick) {
        mouseHoldArrow = initiatePlayerMouseMovementHelper(scene);
    }
    return player;
}

export function setBackgroundMeshForPlayerMovement(background) {
    backgroundMesh = background;
}

export function handlePlayerMovement(pressedKeys, clock, player, cameraPosition, camera, audio) {
    if (!normalMovementDisabled) {
        handleNormalMovement(pressedKeys, clock, player, cameraPosition, camera, audio);
    }
    if (canNormalMoveOnXAxis) {
        handleOnlyXMovement(pressedKeys, clock, player, cameraPosition, camera, audio);
    }
    if (backgroundMesh) {
        updateBackgroundPosition(player);
    }
}

export function buildUpMovementOnMouseDown(player, camera) {
    isMouseHeldDown = true;
    if (moveOnClick && !isAnimationRunning) {
        momentum = momentum > maxSpeed ? momentum : momentum + playerSpeedBuildUp;
        updateMouseMoveArrow(momentum, player, camera);
        setTimeout(() => {
            if (isMouseHeldDown) {
                buildUpMovementOnMouseDown(player, camera);
            }
        }, 0);
    }
}

export function movePlayerOnMouseUp(player, camera, cameraPosition, sfxAudio) {
    isMouseHeldDown = false;
    if (moveOnClick && !isAnimationRunning) {
        clickMoveCount++;
        playerSpeed += momentum * clickMoveForce;
        momentum = 0;
        updateMouseMoveArrow(0, player, camera);
        handlePlayerDriftMovement(camera, player, cameraPosition, sfxAudio);
    }
}

export function setPlayerSpeed(value) {
    playerSpeed = value;
}

export function getPlayerSpeed() {
    return playerSpeed;
}

export function getMaxSpeed() {
    return maxSpeed;
}

export function resetPlayer(player) {
    player.position.x = 0;
    player.position.y = 0;
    player.position.z = 0;
    setPlayerSpeed(0);
}

function handleNormalMovement(pressedKeys, clock, player, cameraPosition, camera, audio) {
    playerSpeed = playerSpeed > maxSpeed ? playerSpeed : playerSpeed + playerSpeedBuildUp;
    playerSpeed = isPlayerMoving(pressedKeys) ? playerSpeed : 0;
    const verticalSpeed = playerSpeed / 10;
    const spinSpeed = playerSpeed / 5;
    const moveDistance = playerSpeed * clock.getDelta();
    const vector = getMovementVector(camera, player);
    for (let [key, _value] of Object.entries(pressedKeys)) {
        switch (key) {
            case keysEnum.FORWARD:
                player.rotation.x += spinSpeed * DEGREE * vector.z;
                player.rotation.z += spinSpeed * DEGREE * vector.x;
                player.position.x += moveDistance * vector.x;
                player.position.y += moveDistance * vector.y;
                player.position.z += moveDistance * vector.z;
                break;
            case keysEnum.BACKWARD:
                player.rotation.x += spinSpeed * -DEGREE * vector.z;
                player.rotation.z += spinSpeed * DEGREE * vector.x;
                player.position.x += -moveDistance * vector.x;
                player.position.y += -moveDistance * vector.y;
                player.position.z += -moveDistance * vector.z;
                break;
            case keysEnum.LEFT:
                player.rotation.y += spinSpeed * -DEGREE;
                player.position.x += moveDistance * vector.z;
                player.position.z += -moveDistance * vector.x;
                break;
            case keysEnum.RIGHT:
                player.rotation.y += spinSpeed * DEGREE;
                player.position.x += -moveDistance * vector.z;
                player.position.z += moveDistance * vector.x;
                break;
            case keysEnum.UP:
                player.position.y += verticalSpeed;
                break;
            case keysEnum.DOWN:
                player.position.y += -verticalSpeed;
                break;
        }
    }
    handleCameraMovement(0, 0, cameraPosition, camera, player);
    handleCollision(player, audio);
}

function handleOnlyXMovement(pressedKeys, clock, player, cameraPosition, camera, audio) {
    const moveDistance = 5 * clock.getDelta();
    const spinSpeed = 1;
    const vector = getMovementVector(camera, player);
    for (let [key, _value] of Object.entries(pressedKeys)) {
        switch (key) {
            case keysEnum.FORWARD:
                player.rotation.x += spinSpeed * DEGREE * vector.z;
                player.rotation.z += spinSpeed * DEGREE * vector.x;
                player.position.x += moveDistance * vector.x;
                break;
            case keysEnum.BACKWARD:
                player.rotation.x += spinSpeed * -DEGREE * vector.z;
                player.rotation.z += spinSpeed * DEGREE * vector.x;
                player.position.x += -moveDistance * vector.x;
                break;
            case keysEnum.LEFT:
                player.rotation.y += spinSpeed * -DEGREE;
                player.position.x += moveDistance * vector.z;
                break;
            case keysEnum.RIGHT:
                player.rotation.y += spinSpeed * DEGREE;
                player.position.x += -moveDistance * vector.z;
                break;
        }
    }
    handleCameraMovement(0, 0, cameraPosition, camera, player);
}

function handlePlayerDriftMovement(camera, player, cameraPosition, sfxAudio) {
    const vector = getMovementVector(camera, player);
    if (yAxisDisabledOnClick) {
        vector.y = 0;
    }
    animatePlayerDrift(vector, player, camera, cameraPosition, sfxAudio);
}

function animatePlayerDrift(vector, player, camera, cameraPosition, sfxAudio) {
    let movementVector = vector;
    const preAnimationCallback = () => {
        isAnimationRunning = true;
    };
    const fromVector3 = getNullVector();
    const toVector3 = multiplyVector(vector, playerSpeed / maxSpeed);
    const animationDuration = 5;
    const onUpdateCallback = (coords) => {
        if (coords) {
            const distancePerFrame = playerSpeed / 5;
            player.position.x += coords.x * distancePerFrame;
            player.position.y += coords.y * distancePerFrame;
            player.position.z += coords.z * distancePerFrame;
            player.rotation.x += Math.cos(coords.x);
            player.rotation.z += Math.sin(coords.z);
        }
        movementVector = handleDriftCollision(player, vector, sfxAudio);
        handleCameraMovement(0, 0, cameraPosition, camera, player);
    };
    const onCompleteCallback = () => {
        isAnimationRunning = false;
        decreasePlayerSpeed();
        if (playerSpeed && !isNullVector(movementVector)) {
            animatePlayerDrift(movementVector, player, camera, cameraPosition, sfxAudio);
        }
        if (!playerSpeed) {
            handleMissionModeEvents(clickMoveCount, player);
        }
    };
    animate(preAnimationCallback, fromVector3, toVector3, animationDuration, onUpdateCallback, onCompleteCallback)
}

function decreasePlayerSpeed() { 
    playerSpeed = decreaseForceValue(playerSpeed, 0.2);
}

function isPlayerMoving(pressedKeys) {
    let playerMoving = false;
    for (let [_key, value] of Object.entries(keysEnum)) {
        if (pressedKeys[value]) {
            playerMoving = true;
        }
    }
    return playerMoving;
}

function getMovementVector(camera, player) {
    const vector = new Vector3(
        player.position.x - camera.position.x,
        player.position.y - camera.position.y,
        player.position.z - camera.position.z
    );

    const cDistance = getCameraDistance();
    vector.x /= cDistance / 5;
    vector.y /= cDistance / 5;
    vector.z /= cDistance / 5;

    return vector;
}

function initiatePlayerMouseMovementHelper(scene) {
    const arrowBody = new CylinderGeometry(0.2, 0.2, 1, 32);
    const arrowHead = new CylinderGeometry(0.01, 0.5, 1, 32);
    const arrowMaterial = new MeshBasicMaterial({ color: 0xff0000, opacity: 0, transparent: true });

    const bodyMesh = new Mesh(arrowBody, arrowMaterial);
    const headMesh = new Mesh(arrowHead, arrowMaterial);
    headMesh.position.y = 1;

    const arrow = new Group();
    arrow.add(bodyMesh);
    arrow.add(headMesh);

    arrow.rotation.z = -Math.PI / 2;

    scene.add(arrow);

    return arrow;
}

function updateMouseMoveArrow(distance, player, camera) {
    if (mouseHoldArrow) {
        mouseHoldArrow.position.x = player.position.x;
        mouseHoldArrow.position.y = player.position.y;
        mouseHoldArrow.position.z = player.position.z;
        const [bodyMesh, headMesh] = mouseHoldArrow.children;
        bodyMesh.scale.y = distance + 1;
        bodyMesh.position.y = (distance + 1) / 2;
        headMesh.position.y = distance + 1;
        bodyMesh.material.transparent = !isMouseHeldDown;

        const vector = getMovementVector(camera, player);
        const sign = vector.z / Math.abs(vector.z);
        mouseHoldArrow.rotation.y = (-sign * Math.PI) / 2 + Math.atan(vector.x / vector.z);

        if (!yAxisDisabledOnClick) {
            mouseHoldArrow.rotation.z = -Math.PI / 3 + Math.asin(vector.y / getCameraDistance());
        }
    }
}

function updateBackgroundPosition(player) {
    backgroundMesh.position.x = player.position.x;
    backgroundMesh.position.y = player.position.y;
    backgroundMesh.position.z = player.position.z;
}
