import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import EditorModeToolbar from './editor-mode-toolbar';
import PresentationModeToolbar from './presentation-mode-toolbar';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export default class NotebookHeader extends React.Component {
  render() {
    return (
      <div className="notebook-header">
        <a id="export-anchor" style={{ display: 'none' }} />
        <MuiThemeProvider theme={theme}>
          <EditorModeToolbar />
        </MuiThemeProvider>
        <PresentationModeToolbar />

      </div>
    )
  }
}
