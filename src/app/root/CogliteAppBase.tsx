
import { Dialog, Button,withStyles,  Typography, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});


class CogliteAppBase extends React.Component<any, any> {
  state = {open: false};

  handleClose = () => {this.setState({open: false})};
  handleClick = () => {this.setState({open: true})};

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          example project
        </Typography>
        <Button variant="raised" color="secondary" onClick={this.handleClick}>
          Super Secret Password
        </Button>
      </div>
    );
  }
}


export let CogliteApp = withRoot(withStyles(styles as any)(CogliteAppBase));
