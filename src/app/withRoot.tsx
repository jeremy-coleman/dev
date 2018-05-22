import { create } from 'jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { jssPreset, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

import { theme } from './style/theme';



const jss = create(jssPreset());

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithRoot;
}

export {withRoot as default, withRoot};