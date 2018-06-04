import 'reflect-metadata'
import * as React from "react"
import { Provider as MobxProvider, observer } from 'mobx-react';
import { observable } from 'mobx';
import {ThemeProvider as JssThemeProvider} from 'theming'

import {ThemeProvider, injectGlobal} from 'styled-components'
import {theme} from './theme';


import { AppLayout } from './layout/AppLayout';
import AppRouter from './Router';
import {cogliteState, ICogliteState} from './stores'


export const CogliteAppRoot = observer((props: ICogliteState) => {
  const muiTheme = cogliteState.uiStore.muiTheme
    return(
      <MobxProvider {...cogliteState}>
        <JssThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <div style={{height: '100vh', width: '100vw'}}>
              <AppLayout>
                <AppRouter/>
              </AppLayout>
          </div>
          </ThemeProvider>
          </JssThemeProvider>
      </MobxProvider>
  )
})

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

