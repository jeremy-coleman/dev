import 'reflect-metadata'
import * as React from "react"
import { Provider, observer } from 'mobx-react';
import { observable } from 'mobx';
import {ThemeProvider as JssThemeProvider} from 'theming'


import { injectGlobal} from 'styled-components'

import { AppLayout } from './layout/AppLayout';
import AppRouter from './Router';
import {cogliteState, ICogliteState} from './stores'


export const CogliteAppRoot = observer((props: ICogliteState) => {
  const theme = cogliteState.uiStore.muiTheme
    return(
      <Provider {...cogliteState}>
        <JssThemeProvider theme={theme}>
          <div style={{height: '100vh', width: '100vw'}}>
              <AppLayout>
                <AppRouter/>
              </AppLayout>
          </div>
          </JssThemeProvider>
      </Provider>
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