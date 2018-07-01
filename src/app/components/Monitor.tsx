import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {Grid,Paper , Typography }from '@material-ui/core';


import MonitorButtons from './MonitorButtons';
import Console from './Console';

const styles: any = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

class Monitor extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      message: "No Jupyter instance running.",
      message2: "",
      url: "",
      error: ""
    }
  }

  componentDidMount() {

    document.addEventListener('jupyterStarting', (event) => {
       this.setState({message: "Jupyter is starting. Mode is " + this.props.launcher.currentMode,
                      message2: "",
                      url: "",
                      error: ""});
    });

    document.addEventListener('jupyterStarted', (event) => {
       this.setState({message: "Jupyter is running. Mode is " + this.props.launcher.currentMode,
                      message2: "Launch your session at ",
                      //@ts-ignore
                      url: event.detail.url,
                      error: ""});
    });

    document.addEventListener('jupyterStop', (event) => {
       this.setState({message: "No Jupyter instance running.",
                      message2: "",
                      url: ""});
    });

    document.addEventListener('jupyterError', (event) => {
       this.setState({message: "No Jupyter instance running.",
                      message2: "",
                      url: "",
                      //@ts-ignore
                      error: event.detail.error});
    });

    if(this.props.launcher.process !== null) {
      this.setState({message: "Jupyter is running. Mode is " + this.props.launcher.currentMode,
                      message2: "Launch your session at ",
                      url: this.props.launcher.url});
    }
  }

  render() {

    return (
        <div>
          <Grid container spacing={24}>

            <Grid item xs={12}>
              <Paper className={this.props.classes.root} >
                <Typography component="p">
                  {this.state.message}
                </Typography>
                <Typography component="p">
                  {this.state.message2}
                  {this.state.url}
                </Typography>
                <Typography component="p">
                  {this.state.error}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Console launcher={this.props.launcher} />
            </Grid>

            <Grid item xs={12}>
              <MonitorButtons launcher={this.props.launcher} />
            </Grid>

          </Grid>
        </div>
      );
  }
}

export default withStyles(styles)(Monitor);