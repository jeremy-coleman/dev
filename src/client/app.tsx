import { observer, Provider } from "mobx-react";
import * as React from "react";
//import injectSheet from 'react-jss'
import {injectGlobal} from 'react-emotion'
import { ThemeProvider } from 'theming';
import { AppLayout } from './modules/layout/AppLayout';
import { setupStore } from "./modules/notebook/Forms/FormConfig";
import {AppRouter} from './Router';
import { cogStore } from "./stores";
import { NavStore } from "./stores/NavStore";



const navStore = new NavStore()

const stores = {
    nav: navStore,
    store: cogStore,
    jsonFormsStore: setupStore()
  }


@observer
class AppViewBase extends React.Component<any, any> {
render(){
  return (
    <Provider store={stores}{...stores}>
      <ThemeProvider theme={stores.store.uiStore.combinedTheme}>
      <div style={{height: '100vh', width: '100vw'}}>
            <AppLayout>
              <AppRouter/>
            </AppLayout>
        </div>
      </ThemeProvider>
    </Provider>

  )
}}

export let AppView = AppViewBase;

// const styles = theme => ({
//     '@global': {
//         html: {
//             height: '100%',
//             boxSizing: 'border-box'
//         },
//         '*, *:before, *:after': {
//             boxSizing: 'inherit'
//         },
//         body: {
//             height: '100%',
//             margin: 0,
//             background: theme.palette.background.default,
//             fontFamily: theme.typography.fontFamily,
//             fontSize: theme.typography.fontSize,
//             color: theme.palette.text.primary,

//             // Helps fonts on OSX look more consistent with other systems
//             WebkitFontSmoothing: 'antialiased',
//             MozOsxFontSmoothing: 'grayscale',

//             // Use momentum-based scrolling on iOS devices
//             WebkitOverflowScrolling: 'touch'
//         },
//         a: {
//             color: theme.palette.primary.main,
//             textDecoration: 'none',
//             fontWeight: theme.typography.fontWeightMedium,
//             '&:hover': {
//                 color: theme.palette.primary.dark
//             }
//         },
//         '#root': {
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column'
//         }
//     },
//     root: {
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column'
//     }
// });

// export let AppView = injectSheet(styles)(AppViewBase)



// body > font-size: ${theme.fontSizes[1]}px;

// export let globalStyles = {
// "@global": {
// * {
//   boxSizing: 'border-box',
//   fontWeight: 'inherit',
//   textRendering: 'optimizeLegibility',
//   WebkitFontSmoothing: 'subpixel-antialiased',
//   WebkitAppearance: 'none',
//   MozAppearance: 'none',
//   user-select: none
//   font: 'caption',
// }

// html,
// body {
//   minHeight: '100%',
//   minWidth: '100%',
//   overflow: 'hidden',
// }

// body {
//   padding: '0',
//   margin: '0',
//   fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   lineHeight: '1.5',
//   position: 'relative',
//   height: '100%',
//   maxHeight: '100%',
//   width: '100vw',
//   WebkitFontSmoothing: 'antialiased',
//   overflowX: 'hidden',
//   WebkitOverflowScrolling: 'touch',
// }

// a {
//   color: 'currentColor',
//   textDecoration: 'none',
// }

// textarea {
//   resize: 'none',
// },
// #root {
//         height: 100%;
//         display: flex;
//         flexDirection: 'column',
//     }
// }


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