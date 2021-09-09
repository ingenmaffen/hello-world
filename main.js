const { app, BrowserWindow } = require("electron");

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
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
