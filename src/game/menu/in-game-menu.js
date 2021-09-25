export function handleInGameMenu(menuOpen, unPauseGame) {
    if (!menuOpen) {
        appendOverlay();
        appendButton("Continue", unPauseGame);
    } else {
        unPauseGame();
    }

    return !menuOpen;
}

function appendOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
}

function appendButton(text, callback) {
    const button = document.createElement("button");
    const overlay = document.getElementById("overlay");
    button.classList.add("continue");
    button.innerText = text;
    overlay.appendChild(button);
    button.onclick = callback;
}
