import 'reflect-metadata'
import 'core-js'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react";
import {CogliteAppRoot} from './App'


initializeIcons(AppConfig.env.fabricIconBasePath);
//initializeIcons();

import { webFrame } from 'electron';
webFrame.setZoomLevel(1);
webFrame.setZoomFactor(1);
webFrame.registerURLSchemeAsPrivileged('coglite');


(process as NodeJS.EventEmitter).on('uncaughtException', (error) => {console.error('[err-client]', error.message, error.stack);});
window.onerror = (  message: string, filename?: string, lineno?: number,colno?: number, error?:Error ) => 
  {console.error('[err-client]', message, filename, lineno, colno, error); return true;} // prevent default handler
                        


ReactDOM.render(
  <Fabric>
    <CogliteAppRoot />
  </Fabric>, 
document.getElementById("coglite-app-root"));


