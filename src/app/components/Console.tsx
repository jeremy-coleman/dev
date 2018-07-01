import * as React from 'react';

import {TextField} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

class Console extends React.Component<any, any> {
	textAreaRef: any;

  constructor(props) {
  	super(props);

		if(this.props.launcher.process !== null) {
	  	this.state = {
		    value: this.props.launcher.log,
		  };
		} else {
	  	this.state = {
		    value: "",
		  };
		}
  }

  scrollDown() {
  	if(this.textAreaRef) {
  		// TODO: this auto scrolling feature works but raise an error with React. 
  		//this.textAreaRef.scrollTop = this.textAreaRef.scrollHeight;
  	}
  }

  componentDidMount() {

		document.addEventListener('jupyterStarted', (event) => {
			this.setState({message: "Jupyter is running. Mode is " + this.props.launcher.currentMode});
		});

		document.addEventListener('jupyterStderrLog', (event) => {
			//@ts-ignore
	    this.setState({value: this.state.value + event.detail.message});
			this.scrollDown();
	  });

	  document.addEventListener('jupyterStdoutLog', (event) => {
			//@ts-ignore
	    this.setState({value: this.state.value + event.detail.message});
			this.scrollDown();
	  });

	  document.addEventListener('jupyterStop', (event) => {
	    this.setState({value: ""});
	  });

  }

  componentWillUnmount() {
  }

  render() {
    return (
    	<div>

    		<Paper className={this.props.classes.root}>
					<TextField
		  			value={this.state.value || ''}
			      multiline
			      rowsMax={25}
			      rows={25}
			      fullWidth={true}
			      disabled={true}
			      // TODO: this auto scrolling feature works but raise an error with React. 
			      //ref={(ref) => { this.textAreaRef = ref; }}
						/>
				</Paper>
    		
    	</div>
    	)
  }
}

export default withStyles(styles)(Console);