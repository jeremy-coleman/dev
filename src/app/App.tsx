import 'reflect-metadata'
import * as React from "react"
import { Provider, observer } from 'mobx-react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {ThemeProvider} from 'theming'
import {injectGlobal} from 'styled-components'
//import {theme} from './theme';
import { AppLayout } from './layout/AppLayout';
import { AppRoutes } from './AppRoutes';
import {NavigationStore} from './stores'
import { Router, withRouter } from 'react-router-dom';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import { observable } from 'mobx';
import { UiStore } from './stores/UiStore';


var theme = createMuiTheme()

export const stores = {
  navigation: new NavigationStore(),
  uiStore: new UiStore()
};


@observer
export class CogliteAppRoot extends React.Component<any, any, any> {
  render(){
  const {navigation} = this.props
        return (
        <ThemeProvider theme={theme}>
          <Provider {...stores}>
          <Router history={stores.navigation.history}>
          <div style={{height: '100vh', width: '100vw'}}>
              <AppLayout><AppRoutes/></AppLayout>
          </div>
          </Router>
          </Provider>
          </ThemeProvider>
        );
    }
}


// body > font-size: ${theme.fontSizes[1]}px;

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
body {
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
}

body {
  padding: 0;
  margin: 0;
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
#root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`


document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

/*
css.global("html, body, root", {
  userSelect: "none",  // turn off text highlighting
  cursor: "default",  // reset the cursor pointer
  font: "caption",
  WebkitFontSmoothing: "subpixel-antialiased",
  textRendering: "optimizeLegibility",
  height:  '100%',
  margin:  '0px auto',
  padding: '0px auto',
  overflow: 'hidden'
})

*/