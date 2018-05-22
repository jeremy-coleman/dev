"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const electron_1 = require("electron");
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {
            webSecurity: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
            plugins: true
        }
    });
    mainWindow.loadURL(`file:///${electron_1.app.getAppPath()}/dist/app/index.html`);
    mainWindow.on("close", () => {
        mainWindow = null;
    });
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(MOBX_DEVTOOLS);
    installExtension(REDUX_DEVTOOLS);
    mainWindow.webContents.on("context-menu", (e, props) => {
        const { x, y } = props;
        electron_1.Menu.buildFromTemplate([{ label: "Inspect element", click: () => { mainWindow.webContents.inspectElement(x, y); } }])
            .popup(mainWindow);
    });
    return mainWindow;
}
electron_1.app.on("ready", async () => {
    createWindow();
});
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
