require('dotenv').config()
import { app, BrowserWindow, Menu } from "electron";

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {   
            webSecurity: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
            plugins: true
        }
});
    mainWindow.loadURL(`file:///${app.getAppPath()}/dist/app/index.html`);

    mainWindow.on("close", () => {
        mainWindow = null;
    });

    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(MOBX_DEVTOOLS);
    installExtension(REDUX_DEVTOOLS);


    mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      const { x, y } = props;
      Menu.buildFromTemplate
        ([{label: "Inspect element",click: () => {mainWindow.webContents.inspectElement(x, y)}}])
        .popup(mainWindow as any);
    });


    return mainWindow
}

app.on("ready", async () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
