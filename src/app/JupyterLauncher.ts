import {remote} from 'electron'

var child_process = remote.require('child_process');
var electron = require('electron');
var app = electron.remote.app

var Store = require('electron-store');

//var npmPath = remote.require('npm-path');
//var fs = remote.require('fs');
//var path = remote.require('path');


var shell = require('shelljs')
var jupyterCheck = shell.which('jupyter')
var jupyterExecPath = jupyterCheck.stdout





class JupyterLauncher {
	defaultConfig: { jupyterPath: string; debug: boolean; noBrowser: boolean; configPath: any; port: number; notebookDir: any; browser: any; noToken: boolean; additionalParameters: string; };
	config: any;
	process: any;
	currentMode: any;
	url: any;
	log: any;

	constructor() {

		this.defaultConfig = {jupyterPath: "",
						              debug: false,
						              noBrowser: true,
						              configPath: null,
						              port: 8888,
						              notebookDir: app.getPath("home"),
						              browser: null,
						              noToken: false,
						              additionalParameters: ""}

		this.config = new Store();

		if(!this.config.get("jupyterConfig")) {
			this.config.set("jupyterConfig", Object.assign({}, this.defaultConfig));
      this.autodetectJupyter();
		}
		
		this.process = null;
		this.currentMode = null;
		this.url = null;
		this.log = null;
	}

	startJupyter(mode) {

		this.stop();

		this.currentMode = mode;

		// Set settings
		var settings = [];
		settings.push(mode);

		if(this.config.get("jupyterConfig.debug")) {
			settings.push("--debug");
		}
		if(this.config.get("jupyterConfig.noBrowser")) {
			settings.push("--no-browser");
		}
		if(this.config.get("jupyterConfig.configPath")) {
			settings.push("--config=" + this.config.get("jupyterConfig.configPath"));
		}
		if(this.config.get("jupyterConfig.browser")) {
			settings.push("--browser=" + this.config.get("jupyterConfig.browser"));
		}
		if(this.config.get("jupyterConfig.noToken")) {
			settings.push("--NotebookApp.token=''");
		}

		settings.push("--port=" + this.config.get("jupyterConfig.port"));
		settings.push("--notebook-dir=" + this.config.get("jupyterConfig.notebookDir"));
		settings.push(...this.config.get("jupyterConfig.additionalParameters").split(" "));

		// Launch Jupyter
		settings = settings.filter(entry => entry.trim() !== '');
		this.process = child_process.spawn(this.config.get("jupyterConfig.jupyterPath"), settings);

		document.dispatchEvent(new CustomEvent('jupyterStarting', {detail: {mode: mode}}));

		this.process.stderr.on('data', (data) => {
			var message = "" + data;
			if(message.includes("http")) {
				this.url = message.match(/\bhttps?:\/\/\S+/gi)[0];
				document.dispatchEvent(new CustomEvent('jupyterStarted', {detail: {mode: mode, url: this.url}}));
			}
			this.log += message;
			document.dispatchEvent(new CustomEvent('jupyterStderrLog', {detail: {message: message}}));
		});

		this.process.stdout.on('data', (data) => {
			var message = "" + data;
			this.log += message;
			document.dispatchEvent(new CustomEvent('jupyterStdoutLog', {detail: {message: message}}));
		});

		this.process.on('error', (error) => {
		  this.stop();
		  var message = error.stack + "\n" + error.name + "\n" + error.message;
		  console.log(error);
		  document.dispatchEvent(new CustomEvent('jupyterError', {detail: {error: message}}));
		});
	}

	restart() {
		if(this.process !== null) {
			document.dispatchEvent(new CustomEvent('jupyterRestart'));
			this.stop();
			this.startJupyter(this.currentMode);
		}
	}

	stop() {
		if(this.process !== null) {
			document.dispatchEvent(new CustomEvent('jupyterStop'));
			this.process.kill();
			this.process = null;
			this.url = null;
			this.log = null;
		}
	}

  autodetectJupyter() {
		return jupyterExecPath
		/*
    const candidates = [];

    let jupyterExecutableName = "jupyter";
    if(process.platform === "win32") {
      jupyterExecutableName = "jupyter.exe";
    }

    var paths = npmPath();
    paths = paths.split(npmPath.SEPARATOR);
    
    paths.forEach(folder => {
      if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach(file => {
          if(file.trim() === jupyterExecutableName) {
            candidates.push(path.join(folder, file));
          }
        })
      }
    })

    // TODO: for now select the first candidate but a smarter way
    // to select the "correct" binary would be nice.
    if(candidates.length > 0) {
      this.config.set("jupyterConfig.jupyterPath", candidates[0])
      return true
    } else {
      return false
    }
  }
*/
}
}

export default JupyterLauncher;
