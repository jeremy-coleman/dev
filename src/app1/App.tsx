import { Provider, observer } from 'mobx-react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {AppLayout} from './layout/AppLayout';
import {theme} from './theme';
import {HashRouter} from 'react-router-dom'

//import stores from './stores';


const App = () => (
  <ThemeProvider theme={theme}>
    <Provider>
      <HashRouter>
      <AppLayout/>
      </HashRouter>
    </Provider>
  </ThemeProvider>
);

export default observer(App);
