import * as React from 'react';

import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Stop from '@material-ui/icons/Stop';
import Replay from '@material-ui/icons/Replay';
import PlayArrow from '@material-ui/icons/PlayArrow';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class MonitorButtons extends React.Component<any, any> {

  constructor(props) {
    super(props);

    if(this.props.launcher.process !== null) {
      this.state = {
        disableStartButton: true,
        disableRestartButton: false,
        disableStopButton: false
      }
    } else {
      this.state = {
        disableStartButton: false,
        disableRestartButton: true,
        disableStopButton: true
      }
    }
    
  }
  
  componentDidMount() {
    document.addEventListener('jupyterStop', (event) => {
      this.setState({disableStartButton: false,
                     disableRestartButton: true,
                     disableStopButton: true
                   });
    });

    document.addEventListener('jupyterStarted', (event) => {
       this.setState({disableStartButton: true,
                     disableRestartButton: false,
                     disableStopButton: false
                   });
    });
  }

  startLab() {
    this.startJupyter("lab");
  }

  startNotebook() {
    this.startJupyter("notebook");
  }

  startJupyter(mode) {
    this.props.launcher.startJupyter(mode);
  }

  restart() {
    this.props.launcher.restart();
  }

  stop() {
    this.props.launcher.stop();
  }

  render() {

    return (
      <div>

        <Button className={this.props.classes.button}
                variant="raised"
                color="primary"
                disabled={this.state.disableStartButton}
                onClick={this.startNotebook.bind(this)}>
          Start Notebook
          <PlayArrow className={this.props.classes.rightIcon} />
        </Button>

        <Button className={this.props.classes.button}
                variant="raised"
                color="primary"
                disabled={this.state.disableStartButton}
                onClick={this.startLab.bind(this)}>
          Start Lab
          <PlayArrow className={this.props.classes.rightIcon} />
        </Button>

        <Button className={this.props.classes.button}
                variant="raised"
                color="primary"
                disabled={this.state.disableRestartButton}
                onClick={this.restart.bind(this)}>
          Restart Current
          <Replay className={this.props.classes.rightIcon} />
        </Button>

        <Button className={this.props.classes.button}
                variant="raised"
                color="primary"
                disabled={this.state.disableStopButton}
                onClick={this.stop.bind(this)}>
          Stop
          <Stop className={this.props.classes.rightIcon} />
        </Button>

      </div>
      );
  }
}


export default withStyles(styles)(MonitorButtons);