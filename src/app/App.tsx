import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { store } from './stores';
import { CogliteAppContainer } from './root/CogliteAppContainer';



ReactDOM.render(
  <Provider store={store}>
    <CogliteAppContainer/>
  </Provider>,
document.querySelector('#coglite-app-root'));
