import {ipcRenderer} from 'electron'
import { subscription } from "../shared/util";



 // Hook callback on key and return unsubscribing callback function wrapped into a common interface,
export const subscribe = (key: string, callBack: (event: Electron.Event, arg: any) => void) => {
    ipcRenderer.on(key, callBack);
    ipcRenderer.send(key);
    return subscription(() => ipcRenderer.removeListener(key, callBack));
};

export const send = (key: string, ...args: any[]) => ipcRenderer.send(key, args);
