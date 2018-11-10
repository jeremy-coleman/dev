import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import {App} from './components/App';

import {Provider} from 'mobx-react'
import {actionStore} from './components/store'

import './glob.css'

let ello = document.getElementById('root')

ReactDOM.render(
    <Provider actionStore={actionStore}>
        <AppContainer>
            <App/>
        </AppContainer>
    </Provider>, ello
);

//@ts-ignore
if(module.hot){module.hot.accept()}