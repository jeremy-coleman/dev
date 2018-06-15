require('dotenv').config()
import {format} from 'url'
import {join} from 'path'
import { app, BrowserWindow, Menu } from "electron";



app.disableDomainBlockingFor3DAPIs();


var DESKTOP_ICON_URL = 'static/resources/icon.ico';


let basePath = app.getAppPath()
let mainWindow: BrowserWindow;



function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        icon: DESKTOP_ICON_URL,
        webPreferences: {   
            webSecurity: false,
            backgroundThrottling: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
            nodeIntegrationInWorker: true,
            plugins: true
        }
});
    //mainWindow.loadURL(`file:///${app.getAppPath()}/dist/app/index.html`);

    mainWindow.on("close", () => {
        mainWindow = null;
    });

    let queryString = '';
    
    let page = format({ 
                        protocol: 'file',
                        slashes: true,
                        pathname: join(basePath, 'dist/app/index.html')});
                        
        if (queryString) {page = page + queryString;}
             mainWindow.loadURL(page);

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

