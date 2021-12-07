let endlessMode = false;
let maxDistance = 0;
let maxGeneratedWorldDistance = 0;

export function initiateEndlessMode() {
    console.log("endless");
    endlessMode = true;
}

export function updateEndlessWorld(player) {
    if (endlessMode) {
        const distance = getPlayerDistanceFromCenter(player);
        maxDistance = distance > maxDistance ? distance : maxDistance;
        // TODO: generate world based on how far the player is from the center
    }
}

function getPlayerDistanceFromCenter(player) {
    const position = player.position;
    const angle = Math.atan(position.x / position.z);
    const hypotenuse = position.x / Math.sin(angle);
    const yAngle = Math.atan(hypotenuse / position.y);
    return Math.abs(hypotenuse / Math.sin(yAngle));
}

function generateGalaxy() {

}
