"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');
const INDEX_URL = 'http:localhost:8080/';
let createMainWindow = async () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            webSecurity: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
        }
    });
    if (dev) {
        mainWindow.loadURL(INDEX_URL);
    }
    else {
        mainWindow.loadURL(url.format({
            pathname: path.join(electron_1.app.getAppPath(), 'dist', 'client', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    mainWindow.on('close', function () {
        mainWindow = null;
    });
    mainWindow.webContents.on("context-menu", (e, props) => {
        electron_1.Menu.buildFromTemplate([{
                label: "Inspect element",
                click() { mainWindow.webContents.inspectElement(props.x, props.y); }
            }])
            .popup(mainWindow);
    });
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(MOBX_DEVTOOLS);
    installExtension(REDUX_DEVTOOLS);
    return mainWindow;
};
electron_1.app.on("ready", async () => {
    await createMainWindow();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
