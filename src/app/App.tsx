//import './css.config'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import {CogliteAppContainer} from './AppContainer'

//import './assets/scss/main.scss'
//require('@blueprintjs/icons/lib/css/blueprint-icons.css');
//require('@blueprintjs/core/lib/css/blueprint.css');

import './main.css'



import { store } from './stores';
import { Provider } from 'mobx-react';




ReactDOM.render(
  <Provider store={store}>
    <CogliteAppContainer/>
  </Provider>,
document.querySelector('#coglite-app-root'));

