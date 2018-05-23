"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const electron_1 = require("electron");
const url_1 = require("url");
const app_root_path_1 = require("app-root-path");
let mainWindow;
var isProd = process.env.NODE_ENV === 'production' ? true : false;
process.on('uncaughtException', (error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});
const devPath = url_1.format({ pathname: '//localhost:8881/', protocol: 'http:', slashes: true });
const prodPath = url_1.format({ pathname: app_root_path_1.resolve('dist/app/index.html'), protocol: 'file:', slashes: true });
var url = isProd ? prodPath : devPath;
//dont open devtools in this function or u'll get error spam on startup
let createMainWindow = async () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {
            webSecurity: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            plugins: true
        }
    });
    mainWindow.loadURL(url);
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
    mainWindow.on('closed', () => { mainWindow = null, process.kill(process.pid); });
    //mainWindow.on("close", () => {mainWindow = null}); not sure which is better to use here?
    return mainWindow;
};
electron_1.app.on("ready", async () => { createMainWindow(); });
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
