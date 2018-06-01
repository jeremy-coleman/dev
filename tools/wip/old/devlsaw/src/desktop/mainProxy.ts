var http = require('http');
var https = require('https');
var ElectronProxyAgent = require('electron-proxy-agent');
import * as Electron from 'electron';
import { windowManager, mainWindow } from './main';


interface IQueuedMessage {
    channel: any,
    args: any[]
}

export class MainProxy {
    proxyAgent: any;
    static queuedMessages: IQueuedMessage[] = [];

    constructor() {
        Electron.ipcMain.on('clientStarted', () => {
            const session = Electron.session.defaultSession;
            this.proxyAgent = new ElectronProxyAgent(session);
            http.globalAgent = this.proxyAgent;
            https.globalAgent = this.proxyAgent;
            windowManager.addMainWindow(mainWindow);
            MainProxy.queuedMessages.forEach((msg) => {
                MainProxy.send(msg.channel, ...msg.args);
            });
            MainProxy.queuedMessages = [];

        });
        

    }



    static send(channel: string, ...args: any[]) {
        if   ( windowManager && windowManager.hasMainWindow()) {
               windowManager.getMainWindow().webContents.send(channel, ...args);} 
        else { MainProxy.queuedMessages.push({ channel, args})}
    }
}

export let mainProxy: MainProxy;
