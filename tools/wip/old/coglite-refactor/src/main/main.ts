const env = process.env.NODE_ENV || 'production';
const dev = env === 'development';


const path = require('path');
const url = require('url');
const isDevElectron = require('electron-is-dev');
import {ipcMain, app, BrowserWindow, } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { isNullOrUndefined as isNull } from "util";
import {MAIN_CONFIG} from './constants'
import { COGLITE } from "../models/app-event-api";

  //require('devtron').install() use after app.once('ready ..)

let mainWindow: Electron.BrowserWindow;


    // return same window until disposed
export const getWindow: () => Electron.BrowserWindow = () => {
    if (!isNull(mainWindow)) return mainWindow;

    mainWindow = new BrowserWindow({
        show: false,
        icon: MAIN_CONFIG.iconPath,
        width: 1200,
        height: 900,
        autoHideMenuBar: false,
        frame: true,
        resizable: true,
        webPreferences: {   webSecurity: false,
                            experimentalFeatures: true,
                            experimentalCanvasFeatures: true}

    });






mainWindow.loadURL(`file:///${__dirname}/../index.html`);


    installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  

    mainWindow.on("close", () => {
        mainWindow.removeAllListeners();
        mainWindow = null;
    });

     return mainWindow;
};




app.on('ready', getWindow);

app.on('window-all-closed', function() {if (process.platform !== 'darwin') {app.quit();}});

app.on('activate', getWindow)

app.once("ready", async () => {
    
    // subscribe to app config changed
    ipcMain.on(COGLITE.CONFIG.CHANGED, (config: any) => {console.log(config)});
    const win = getWindow();
    
    ipcMain.on(COGLITE.WINDOW.CLOSE, () => {win.close(); });

    win.once("ready-to-show", () => win.show());
});

app.on("window-all-closed", () => {
        app.quit();
        return;
});
