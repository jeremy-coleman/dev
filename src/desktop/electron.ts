require('dotenv').config()
import electron = require('electron');
const app = electron.app;
import path = require('path');
import url = require('url');


const BrowserWindow = electron.BrowserWindow;
let mainWindow: electron.BrowserWindow;


const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');

//mainWindow.loadURL('http://127.0.0.1:4200');

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


		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		}));

	mainWindow.on('closed', function() {
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
	createMainWindow()
});


app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (mainWindow === null) {
		createMainWindow();
	}
});
