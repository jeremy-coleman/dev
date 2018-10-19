require('dotenv').config()
import {BrowserWindow, app, Menu} from 'electron'

import * as path from 'path';
import * as url from 'url';



let mainWindow: BrowserWindow;

// Get environment type (dev / prod)
const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');

const INDEX_URL = 'http:localhost:8080/'

let createMainWindow = async () => {   
	mainWindow = new BrowserWindow({ 
		width: 1024,
		height: 720,
		webPreferences: {   
			webSecurity: false,
			experimentalFeatures: true,
			experimentalCanvasFeatures: true,
			//plugins: true
	}
	});

	if (!dev) {
		// and load the index.html of the app.
		mainWindow.loadURL(url.format({
			pathname: path.join(app.getAppPath(), 'dist', 'client', 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
	} 
	else {
		mainWindow.loadURL(INDEX_URL);
	}
	
//	mainWindow.loadFile(path.join(app.getAppPath(), 'dist/index.html'));
//mainWindow.loadURL('http://localhost:8080')

	mainWindow.on('close', function() {
		mainWindow = null;
	})

	mainWindow.webContents.on("context-menu", (e: any, props: any) => {
		Menu.buildFromTemplate([{
				label: "Inspect element",
				click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
		.popup(mainWindow as any);
	});


	const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
			installExtension(REACT_DEVELOPER_TOOLS);
			installExtension(MOBX_DEVTOOLS);
			installExtension(REDUX_DEVTOOLS);


return mainWindow

}

app.on("ready", async () => {
	await createMainWindow()
});


app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/*
app.on('activate', function() {
	if (mainWindow === null) {
		createMainWindow();
	}

});
*/