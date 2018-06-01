import "reflect-metadata"
import * as Electron from 'electron';
import { Menu } from 'electron';
import * as url from 'url';
import * as path from 'path';
import { WindowManager } from './windowManager';
import { MainProxy } from './mainProxy';
import MenuBuilder from "./config/menu";
import { listen } from "./ipcHandler";
import {bootstrap} from '../api/server'



(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});

export let mainWindow: Electron.BrowserWindow;
export let windowManager: WindowManager;

var openUrls = [];


 // the app is already running, send a message containing the url to the renderer process
//  otherwise, the app is not yet running, so store the url so the UI can request it later
var onOpenUrl = function (event, url) {
    event.preventDefault();
    if (process.platform === 'darwin') {
        if    ( mainWindow && mainWindow.webContents) {
                mainWindow.webContents.send('coglite', url);}
         else { openUrls.push(url); }
 }
};




Electron.app.on('will-finish-launching', (event, args) => {
    Electron.ipcMain.on('getUrls', (event, arg) => {
        openUrls.forEach(url => mainWindow.webContents.send('coglite', url));
        openUrls = [];
    });

    // On Mac, a protocol handler invocation sends urls via this event
    Electron.app.on('open-url', onOpenUrl);
});


const createMainWindow = () => {
    
    require('devtron').install()

    
    const windowTitle = "Coglite";
    
    //const settings = getSettings();

    mainWindow = new Electron.BrowserWindow({
        show: true,
        backgroundColor: '#f7f7f7',
        width: 1200,
        height: 800,
        autoHideMenuBar: false,
        frame: true,
        resizable: true,
        webPreferences: {   webSecurity: false,
                            experimentalFeatures: true,
                            experimentalCanvasFeatures: true}
 });
        
    mainWindow.setTitle(windowTitle);
    
    windowManager = new WindowManager();

    mainWindow.on('closed', function () {windowManager.closeAll();mainWindow = null;});
    
    mainWindow.on('restore', () => {});


 // exampe addon:  Electron.globalShortcut.register("CommandOrControl+=", () => {windowManager.hasMainWindow();});


    mainWindow.once('ready-to-show', () => mainWindow.show());

    let queryString = '';
    
    let page = url.format({ 
                        protocol: 'file',
                        slashes: true,
                        pathname: path.join(__dirname, '../client/index.html')});
                        
        if (queryString) {page = page + queryString;}
             mainWindow.loadURL(page);



       
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
installExtension(REACT_DEVELOPER_TOOLS);
installExtension(REDUX_DEVTOOLS);
}
// -------------end of createMainWindow-----------//

bootstrap()

// exampleServiceStartup()

Electron.app.on('ready', createMainWindow);

Electron.app.on('window-all-closed', function () {if (process.platform !== 'darwin') {Electron.app.quit();}});
    
Electron.app.on('activate', function () {if (mainWindow === null) {createMainWindow();}});

listen()

// ---------Do this last, otherwise startup bugs are harder to diagnose.------------//
require('electron-debug')();

