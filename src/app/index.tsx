import * as ReactDOM from 'react-dom'
import * as React from 'react'
import {CogliteAppRoot} from './App'
import { initializeIcons } from "@uifabric/icons";
initializeIcons()

import './base.css'

import { webFrame } from 'electron';
webFrame.setZoomLevel(1);
webFrame.setZoomFactor(1);
webFrame.registerURLSchemeAsPrivileged('coglite');


(process as NodeJS.EventEmitter).on('uncaughtException', (error) => {console.error('[err-client]', error.message, error.stack);});
window.onerror = (  message: string, filename?: string, lineno?: number,colno?: number, error?:Error ) => 
   {console.error('[err-client]', message, filename, lineno, colno, error); return true;} // prevent default handler
                        

window.onload = function(){
    ReactDOM.render(<CogliteAppRoot />, document.getElementById("coglite-app-root"));
}

