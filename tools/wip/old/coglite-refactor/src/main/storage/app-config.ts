import { BrowserWindow, ipcMain } from "electron";
import { AppConfig } from "../../models/app-model";
import { COGLITE } from "../../models/app-event-api";
import { isNullOrUndefined as isNull } from "util";
import { AppStorage } from "./app-storage";


// Storage
const store = new AppStorage("config");


/*
    INTERNAL
 */

const state: AppConfig = {} as any;

const isValid = (s: AppConfig) => {
    return !isNull(s)
        && !isNull(s.dontQuit);
};

const validate = async (): Promise<void> => {
    if (!isValid(state)) {
        const value = await store.getItem().catch(e => {
            throw {e};

        });
        Object.assign(state, value);
    }
};

/**
 * Update current state ,update store and notify changed
 */
const update = async (u: Partial<AppConfig>): Promise<void> => {
    Object.assign(state, u);
    if (!isValid(state)) { throw new Error("Invalid State"); }
    await store.setItem(state);
    notifyChanged();
};

/**
 * Notify who requested the update or notify all if anonymous
 */
const notifyChanged = (wc?: Electron.WebContents) => {

    if (wc) {
        wc.send(COGLITE.CONFIG.CHANGED, state);
        return;
    }
    // OR notify all
    for (const win of BrowserWindow.getAllWindows()) {
        const w = win.webContents;
        if (w) {
            w.send(COGLITE.CONFIG.CHANGED, state);
        }
    }
    ipcMain.emit(COGLITE.CONFIG.CHANGED, state);
};

/**
 * Events API subscription
 */
ipcMain.on(COGLITE.CONFIG.GET, async (e: Electron.Event, args: any[]) => {
    notifyChanged(e.sender);
});

ipcMain.on(COGLITE.CONFIG.SET, async (_event: Electron.Event, args: any[]) => {
    const partial: Partial<AppConfig> = args[0];
    await update(partial);
});

/**
 * Export get config
 */
export const get = async (): Promise<AppConfig> => {
    await validate();
    return state;
};

/**
 * Export set config, accept partial
 */
export const set = async (x: Partial<AppConfig>) => {
    await validate();
    return update(x);
};
