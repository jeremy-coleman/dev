import {app, BrowserWindow} from 'electron'
import * as path from 'path'
var budo = require('budo');
var babelify = require('babelify');

babelify.configure({
    babelrc: './.babelrc'
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    var server = budo(path.resolve(__dirname, 'src/app/app.tsx'), {
        live: true,
        stream: process.stdout,
        dir: "./public",
        serve: "build/js/app.js",
        browserify: {
            transform: babelify
        }
    }).on('connect', function (ev) {

        mainWindow = new BrowserWindow({width: 900, height: 600});

        // and load the index.html of the app.
        // mainWindow.loadURL('file://' + __dirname + '/public/index.html');
        mainWindow.loadURL(ev.uri);

        mainWindow.once('close', function () {
            server.close()
        });

        mainWindow.on('closed', function() {
            mainWindow = null;
        });

  console.log('LiveReload running on port %s', ev.livePort)
    }).on('update', function (buffer) {
      console.log('bundle - %d bytes', buffer.length)
        mainWindow.reload()
    })
});