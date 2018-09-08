/* global IODIDE_BUILD_MODE */
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
// import { ToolbarGroup } from '@material-ui/core/Toolbar'
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import tasks from '../../actions/task-definitions';
import AppInfoPane from '../panes/app-info-pane';
import DeclaredVariablesPane from '../panes/declared-variables-pane';
import HistoryPane from '../panes/history-pane';
import LastSavedText from './last-saved-text';
import NotebookTaskButton from './notebook-task-button';
import UserButton from './user-button';
import ViewModeToggleButton from './view-mode-toggle-button';




export class ViewControlsUnconnected extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className="view-controls">
        <LastSavedText />

        <NotebookTaskButton task={tasks.toggleDeclaredVariablesPane}>
          <ArrowDropDown />
        </NotebookTaskButton>

        <NotebookTaskButton task={tasks.toggleHistoryPane}>
          <HistoryIcon />
        </NotebookTaskButton>

        <NotebookTaskButton task={tasks.toggleAppInfoPane}>
          <InfoIcon />
        </NotebookTaskButton>


        <DeclaredVariablesPane />
        <HistoryPane />
        <AppInfoPane />

        {IODIDE_BUILD_MODE === 'server' && (
          <UserButton
            isAuthenticated={this.props.isAuthenticated}
            avatar={this.props.avatar}
          />
        )}

        <ViewModeToggleButton />

      </div>
    )
  }
}

export function mapStateToProps(state) {
  const isAuthenticated = Boolean(state.userData.accessToken)
  return {
    isAuthenticated,
    name: state.userData.name,
    avatar: state.userData.avatar,
  }
}

export default connect(mapStateToProps)(ViewControlsUnconnected)
