require('dotenv').config()
import { app, BrowserWindow, Menu } from "electron";
import * as path from 'path';
import {format} from 'url';
import { resolve } from 'app-root-path';

let mainWindow: BrowserWindow;

var isProd = process.env.NODE_ENV === 'production' ? true : false;

(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});


  const devPath = format({pathname: '//localhost:8881/',protocol: 'http:', slashes: true});
  const prodPath = format({pathname: resolve('dist/app/index.html'), protocol: 'file:', slashes: true });

  var url = isProd ? prodPath : devPath;


//dont open devtools in this function or u'll get error spam on startup

let createMainWindow = async () => {   
    mainWindow = new BrowserWindow({
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

    mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([{
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
      .popup(mainWindow as any);
    });


    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS);
        installExtension(MOBX_DEVTOOLS);
        installExtension(REDUX_DEVTOOLS);

    mainWindow.on('closed', () => {mainWindow = null, process.kill(process.pid)});
    //mainWindow.on("close", () => {mainWindow = null}); not sure which is better to use here?

    return mainWindow

};


app.on("ready", async () => {createMainWindow()});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
