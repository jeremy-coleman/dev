import 'reflect-metadata'
import * as React from "react"
import { Provider, observer } from 'mobx-react';
import {ThemeProvider, injectGlobal} from 'styled-components'
import {theme} from './theme';

import { AppLayout } from './layout/AppLayout';
import { AppRoutes } from './AppRoutes';
import { HashRouter } from 'react-router-dom';


//import {NavigationStore} from './stores'
//export const stores = {navigation: new NavigationStore()};


const App = () => (
  <ThemeProvider theme={theme}>
      <AppLayout>
        <AppRoutes/>
      </AppLayout>
  </ThemeProvider>
);

export default observer(App);



injectGlobal`
* {
  box-sizing: border-box;
  font-weight: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-appearance: none;
  -moz-appearance: none;
  user-select: none
  font: caption;
}

html,
body, #coglite-app-root {
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
}

body {
  padding: 0;
  margin: 0;
  font-size: ${theme.fontSizes[1]}px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  position: relative;
  height: 100%;
  max-height: 100%;
  width: 100vw;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

a {
  color: currentColor;
  text-decoration: none;
}

textarea {
  resize: none;
},
#coglite-app-root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`


document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())
