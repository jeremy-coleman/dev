import { webFrame } from 'electron';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppView } from './app';


import "./index.styl";

(process as NodeJS.EventEmitter).on('uncaughtException', (error) => {console.error('[err-client]', error.message, error.stack);});
window.onerror = (  message: string, filename?: string, lineno?: number,colno?: number, error?:Error ) => 
  {console.error('[err-client]', message, filename, lineno, colno, error); return true;} // prevent default handler

  
webFrame.registerURLSchemeAsPrivileged('coglite');

webFrame.setZoomLevel(1);
webFrame.setZoomFactor(1);
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

ReactDOM.render(<AppView />, document.getElementById("coglite-app-root"))
