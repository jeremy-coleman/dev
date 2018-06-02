import * as Electron from 'electron';
import * as URL from 'url';
import * as path from 'path';


export class WindowManager {
    
    private mainWindow: Electron.BrowserWindow;
    
    private windows: Electron.BrowserWindow[];

    constructor() { this.windows = []; }

    public addMainWindow(window: Electron.BrowserWindow) {this.mainWindow = window;}

    public hasMainWindow(): boolean {return this.mainWindow !== undefined;}

    public getMainWindow(): Electron.BrowserWindow {return this.mainWindow;}

    public add(window: Electron.BrowserWindow) {this.windows.push(window);}

    public remove(window: Electron.BrowserWindow) {
        let idx = this.windows.indexOf(window);
        if (idx !== -1) {this.windows.splice(idx, 1);}
    }

    public closeAll() {
        let openWindows = [];
        this.windows.forEach(win => openWindows.push(win));
        openWindows.forEach(win => win.close());
        this.windows = [];
        this.mainWindow = undefined;
    }
}


/*
* you can add stuff like this inside the constructor

        Electron.ipcMain.on('getExampleState', (event, args) => {
            let state = event.sender['exampleState'];
            event.returnValue = state;
        });
        
        */