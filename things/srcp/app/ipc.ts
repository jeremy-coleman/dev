import {Event, ipcRenderer} from "electron";
import { subscription } from "../shared/util";


export const subscribe = (key: string, callBack: (event: Event, arg: any) => void) => {
    ipcRenderer.on(key, callBack);
    ipcRenderer.send(key);
    return subscription(() => ipcRenderer.removeListener(key, callBack));
};

export const send = (key: string, ...args: any[]) => ipcRenderer.send(key, args);
