require('dotenv').config()
import electron = require('electron');
const app = electron.app;
import path = require('path');
import url = require('url');


const BrowserWindow = electron.BrowserWindow;
let mainWindow: electron.BrowserWindow;


let createMainWindow = async () => {   
	mainWindow = new BrowserWindow({ 
		width: 1024,
		height: 720,
		webPreferences: {   
			webSecurity: false,
			experimentalFeatures: true,
			experimentalCanvasFeatures: true,
			plugins: true
	}
	});

	

  mainWindow.loadURL("http://localhost:8080");



	mainWindow.on('close', function() {
		mainWindow = null;
	})

	mainWindow.webContents.on("context-menu", (e: any, props: any) => {
		electron.Menu.buildFromTemplate([{
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