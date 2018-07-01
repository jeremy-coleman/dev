import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormControlLabel, Paper, Checkbox,  Button} from '@material-ui/core';


const styles: any = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formHorizontal: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'horizontal',
  },
  transparentButton: {
    backgroundColor: "#fff",
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Configure extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			jupyterPath: this.props.launcher.config.get("jupyterConfig.jupyterPath"),
			debug: this.props.launcher.config.get("jupyterConfig.debug"),
			noBrowser: this.props.launcher.config.get("jupyterConfig.noBrowser"),
			configPath: this.props.launcher.config.get("jupyterConfig.configPath"),
			port: this.props.launcher.config.get("jupyterConfig.port"),
			notebookDir: this.props.launcher.config.get("jupyterConfig.notebookDir"),
			browser: this.props.launcher.config.get("jupyterConfig.browser"),
			noToken: this.props.launcher.config.get("jupyterConfig.noToken"),
			additionalParameters: this.props.launcher.config.get("jupyterConfig.additionalParameters"),
		}

		this.handleChange = this.handleChange.bind(this);
    this.autodetectJupyter = this.autodetectJupyter.bind(this);
	}

	handleChange(event) {
    event.preventDefault();

    if(event.target.name === "jupyterPath") {
    	this.setState({jupyterPath: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.jupyterPath", event.target.value);
    }
    else if(event.target.name === "debug") {
    	this.setState({debug: event.target.checked});
    	this.props.launcher.config.set("jupyterConfig.debug", event.target.checked);
    }
    else if(event.target.name === "noBrowser") {
    	this.setState({noBrowser: event.target.checked});
    	this.props.launcher.config.set("jupyterConfig.noBrowser", event.target.checked);
    }
    else if(event.target.name === "configPath") {
    	this.setState({configPath: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.configPath", event.target.value);
    }
    else if(event.target.name === "port") {
    	this.setState({port: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.port", event.target.value);
    }
    else if(event.target.name === "notebookDir") {
    	this.setState({notebookDir: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.notebookDir", event.target.value);
    }
    else if(event.target.name === "browser") {
    	this.setState({browser: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.browser", event.target.value);
    }
    else if(event.target.name === "noToken") {
    	this.setState({noToken: event.target.checked});
    	this.props.launcher.config.set("jupyterConfig.noToken", event.target.checked);
    }
    else if(event.target.name === "additionalParameters") {
    	this.setState({additionalParameters: event.target.value});
    	this.props.launcher.config.set("jupyterConfig.additionalParameters", event.target.value);
    }
  }

  autodetectJupyter() {
    if(this.props.launcher.autodetectJupyter()) {
      this.setState({jupyterPath: this.props.launcher.config.get("jupyterConfig.jupyterPath")});
    }
    
  }

  render() {

    return (

    	<div>

    		<Paper className={this.props.classes.container}>

	        <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Jupyter Binary Path</InputLabel>
	          <Input value={this.state.jupyterPath || ''}
	          			 onChange={this.handleChange}
	          			 name="jupyterPath"
	          			 />
	        </FormControl>

          <Button variant="raised"
                  color="primary"
                  size="medium"
                  onClick={this.autodetectJupyter}
                  className={this.props.classes.button}>
            Auto-Detect Jupyter
          </Button>

          <div className={this.props.classes.formHorizontal}>

  	        <FormControlLabel
  	        	className={this.props.classes.formControl}
              control={
                <Checkbox
                  checked={this.state.debug}
                  onChange={this.handleChange}
                  name="debug"
                />
              }
              label="Debug"
            />

            <FormControlLabel
  	        	className={this.props.classes.formControl}
              control={
                <Checkbox
                  checked={this.state.noBrowser}
                  onChange={this.handleChange}
                  name="noBrowser"
                />
              }
              label="No browser"
            />

            <FormControlLabel
              className={this.props.classes.formControl}
              control={
                <Checkbox
                  checked={this.state.noToken}
                  onChange={this.handleChange}
                  name="noToken"
                />
              }
              label="No Token"
            />
          </div>

          <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Config Path</InputLabel>
	          <Input value={this.state.configPath || ''}
	          			 onChange={this.handleChange}
	          			 name="configPath"
	          			 />
	        </FormControl>

	        <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Port</InputLabel>
	          <Input value={this.state.port || ''}
	          			 onChange={this.handleChange}
	          			 name="port"
	          			 />
	        </FormControl>

	        <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Notebook Dir</InputLabel>
	          <Input value={this.state.notebookDir || ''}
	          			 onChange={this.handleChange}
	          			 name="notebookDir"
	          			 />
	        </FormControl>

	        <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Browser</InputLabel>
	          <Input value={this.state.browser || ''}
	          			 onChange={this.handleChange}
	          			 name="browser"
	          			 />
	        </FormControl>

          <FormControl className={this.props.classes.formControl}>
	          <InputLabel>Additional Parameters</InputLabel>
	          <Input value={this.state.additionalParameters || ''}
	          			 onChange={this.handleChange}
	          			 name="additionalParameters"
	          			 />
	        </FormControl>

        </Paper>

      </div>

    	)
  }
}

export default withStyles(styles)(Configure);