import { app, ipcMain } from 'electron';

import { COGLITE } from '../shared/models/app-event-api';
import { getWindow } from './main-window';



app.once("ready", async () => {
    //ipcMain.on(COGLITE.CONFIG.CHANGED, (config: any) => {console.log(config)});
    
    const win = getWindow();
    
    ipcMain.on(COGLITE.WINDOW.CLOSE, () => win.close());
    
    win.once("ready-to-show", () => win.show())
    
});

app.on("window-all-closed", () => app.quit());
