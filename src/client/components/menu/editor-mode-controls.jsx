import AddButton from '@material-ui/icons/Add';
import DownArrow from '@material-ui/icons/ArrowDownward';
import UpArrow from '@material-ui/icons/ArrowUpward';
import FastForward from '@material-ui/icons/FastForward';
import PlayButton from '@material-ui/icons/PlayArrow';
import React from 'react';
import tasks from '../../actions/task-definitions';
import EditorToolbarMenu from './editor-toolbar-menu';
import NotebookTaskButton from './notebook-task-button';




export default class EditorModeControls extends React.Component {
  render() {
    return (
      <div className="editor-mode-controls" >
        <EditorToolbarMenu />
        <NotebookTaskButton task={tasks.addCellBelow}>
          <AddButton />
        </NotebookTaskButton>
        <NotebookTaskButton task={tasks.moveCellUp}>
          <UpArrow />
        </NotebookTaskButton>
        <NotebookTaskButton task={tasks.moveCellDown}>
          <DownArrow />
        </NotebookTaskButton>
        <NotebookTaskButton task={tasks.evaluateCell}>
          <PlayButton />
        </NotebookTaskButton>
        <NotebookTaskButton task={tasks.evaluateAllCells}>
          <FastForward />
        </NotebookTaskButton>
      </div>
    )
  }
}
