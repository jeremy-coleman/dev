"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const isDev = true;
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            webSecurity: false
        },
        height: 600,
        width: 800
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'client', "index.html"),
        protocol: "file:",
        slashes: true
    }));
    mainWindow.webContents.openDevTools();
    if (isDev) {
        const { default: installExtension, REDUX_DEVTOOLS } = require("electron-devtools-installer");
        installExtension(REDUX_DEVTOOLS);
    }
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
