import 'reflect-metadata'
import * as React from "react"
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from 'material-ui';
import {ThemeProvider, injectGlobal} from 'styled-components'
import {theme} from './theme';
import { AppLayout } from './components/layout/AppLayout';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {DashboardPage} from './components/pages'
import { AppRoutes } from './components/AppRoutes';



const stores = {};


class _CogliteRoot extends React.Component {
    public render(): JSX.Element {
        return (
        <ThemeProvider theme={theme}>
          <Provider {...stores}>
          <div style={{height: '100vh', width: '100vw'}}>
                <HashRouter>
                <AppLayout>          
                    <AppRoutes/>
                </AppLayout>
                </HashRouter>
            </div>
          </Provider>
          </ThemeProvider>
        );
    }
}


export let CogliteRoot = hot(module)(_CogliteRoot)


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