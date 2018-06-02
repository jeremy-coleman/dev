//import { isNullOrUndefined as isNull } from "util";
//import * as appConfig from "./storage/app-config";
import { app, ipcMain } from "electron";

import { COGLITE } from "../models/app-event-api";

import { getWindow } from "./main-window";


app.once("ready", async () => {

      require('devtron').install()
    
    // subscribe to app config changed
    ipcMain.on(COGLITE.CONFIG.CHANGED, (config: any) => {console.log(config)});

    // getWindow returns the same window until is closed then returns a new one
    const win = getWindow();
    
    ipcMain.on(COGLITE.WINDOW.CLOSE, () => {
     
        win.close();
    });

    win.once("ready-to-show", () => {

        win.show();
    });
});

app.on("window-all-closed", () => {
        app.quit();
        return;
});

