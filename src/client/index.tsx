import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'


// external styles
import 'font-awesome/css/font-awesome.css'
import 'opensans-npm-webfont/style.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'react-table/react-table.css'
import 'katex/dist/katex.min.css'

// iodide styles
import './style/page.css'
import './style/side-panes.css'
import './style/menu-styles.css'
import './style/cell-styles.css'
import './style/default-presentation.css'

import Page from './components/page'
import { store } from './store'
import handleUrlQuery from './tools/handle-url-query'

import { iodide } from './iodide-api/api'

//@ts-ignore
window.iodide = iodide
//@ts-ignore
console.log(EXAMPLE_DIRECTORY_BASE_URL)

function Notebook(){
  return(
    <Provider store={store}>
      <Page />
    </Provider>
  )
}

render(<Notebook/>,document.getElementById('page'))

// render(
//   <Provider store={store}>
//     <Page />
//   </Provider>,
//   document.getElementById('page'),
// )

handleUrlQuery()
