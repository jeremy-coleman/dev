import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import  {Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Monitor from './Monitor';
import Configure from './Configure';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

//@ts-ignore
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  about: {
    padding: theme.spacing.unit * 2
  },
});

class MainTabs extends React.Component<any, any> {
  

  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ currentTabId: value });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.currentTabId} onChange={this.handleChange}>
            <Tab label="Monitor" />
            <Tab label="Configure" />
            <Tab label="About" />
          </Tabs>
        </AppBar>

        {this.state.currentTabId === 0 &&
          <TabContainer>
            <Monitor launcher={this.props.launcher}/>
          </TabContainer>}

        {this.state.currentTabId === 1 &&
          <TabContainer>
            <Configure launcher={this.props.launcher}/>
          </TabContainer>}

        {this.state.currentTabId === 2 &&
          <Paper className={this.props.classes.about}>
            <Typography component="p">
              TODO: Write the about message...
            </Typography>
          </Paper>}
      </div>
    );
  }
}

export default withStyles(styles)(MainTabs);
