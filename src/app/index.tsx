import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import 'typeface-roboto'

import App from './App';

import {CssBaseline} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffa852',
      main: '#ff7720',
      dark: '#c54700',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c3fdff',
      main: '#90caf9',
      dark: '#5d99c6',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
	<div>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </div>,
  document.getElementById('root')
);