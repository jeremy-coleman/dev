import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EditorModeControls from './editor-mode-controls';
import EditorModeTitle from './editor-mode-title';
import ViewControls from './view-controls';



export class EditorModeToolbarUnconnected extends React.Component<any, any> {
  static propTypes = {
    viewMode: PropTypes.string,
  }
  render() {
    return (
      <div
        className="notebook-toolbar-container"
        style={{ display: this.props.viewMode === 'editor' ? 'block' : 'none' }}
      >
        <Toolbar classes={{ root: 'notebook-toolbar' }}>
          <EditorModeControls isFirstChild />
          <EditorModeTitle />
          <ViewControls />
        </Toolbar>
      </div>

    )
  }
}

export function mapStateToProps(state) {
  return { viewMode: state.viewMode }
}

const EditorModeToolbar = connect(mapStateToProps)(EditorModeToolbarUnconnected)
export default EditorModeToolbar
