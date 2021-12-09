const { app, BrowserWindow } = require("electron");

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.webContents.openDevTools();

    mainWindow.on("close", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);
