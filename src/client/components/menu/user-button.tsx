import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import tasks from '../../actions/task-definitions';
import NotebookTaskButton from './notebook-task-button';



export default class UserButton extends React.Component<any, any> {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <NotebookTaskButton task={tasks.logoutGithub}>
          <img src={this.props.avatar} alt="" className="user-avatar" />
        </NotebookTaskButton>
      )
    }

    // not authenticated, just return a button inviting them to log in
    return (
      <Tooltip classes={{ tooltip: 'iodide-tooltip' }} title="Login Via Github">
        <Button
          onClick={tasks.loginGithub.callback}
        >
          Login
        </Button>
      </Tooltip>
    )
  }
}
