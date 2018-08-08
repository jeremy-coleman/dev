"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
//import * as util from 'util'
const isDev = true;
/*
// Live reload
if (isDev) {
  const { createServer } = require("livereload");

  const livereload = createServer({
    exts: ["ts", "tsx", "html", "css"],
    delay: 5000
  });

  livereload.watch(path.join(__dirname, '..', '..', "src"));
}
*/
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            webSecurity: false
        },
        height: 600,
        width: 800
    });
    /*
      if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:4474");
      } else {
        mainWindow.loadURL("file:///" + path.join(__dirname, "./index.html"));
      }
      */
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'app', "index.html"),
        protocol: "file:",
        slashes: true
    }));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    if (isDev) {
        //require("devtron").install();
        const { default: installExtension, REDUX_DEVTOOLS } = require("electron-devtools-installer");
        installExtension(REDUX_DEVTOOLS);
    }
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
