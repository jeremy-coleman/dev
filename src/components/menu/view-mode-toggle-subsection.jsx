import React from 'react';
import tasks from '../../actions/task-definitions';
import NotebookMenuItem from './notebook-menu-item';
import NotebookMenuSubsection from './notebook-menu-subsection';


export default class ViewModeToggleSubsection extends React.Component {
  render() {
    return (
      <NotebookMenuSubsection title="view ..." {...this.props}>
        <NotebookMenuItem task={tasks.toggleHistoryPane} />
        <NotebookMenuItem task={tasks.toggleDeclaredVariablesPane} />
      </NotebookMenuSubsection>
    )
  }
}
