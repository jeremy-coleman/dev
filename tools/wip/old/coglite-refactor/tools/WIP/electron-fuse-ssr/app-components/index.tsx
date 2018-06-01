// tslint:disable-next-line:no-unused-variable
import { Provider } from 'mobx-react';
import '../fuse-hmr';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Routes } from '../router';
import { getStore, IRenderedStates, Store, useStore } from '../stores';
import { setStylesTarget,  cssRule, fontFace } from 'typestyle';
import { percent, rem } from 'csx';

import { AppContainer } from './app-container';




export function initStyles() {
    // Set base rem size to 1rem = 10px
    cssRule('html', {
        fontSize: percent(62.5),
    });

    // Standardize body properties
    cssRule('body', {
        'fontFamily': 'Helvetica Neue',
        'fontSize': rem(1.6),
        'lineHeight': 1.825,
        '-webkit-font-smoothing': 'antialiased',
        'textRendering': 'auto',
    });
}





function initStores() {
    // These are the vars we stashed on the window
    // Use Fusebox to pull them in dynamically
    const states: IRenderedStates = require('~/rendered/state.js');

    if (states.stores.router) {
        states.stores.router.client = true;
    }

    const routerState = states.stores.router;

    if (routerState) {
        routerState.finishedFirstLoad = false;
        routerState.routes = Routes();
        routerState.config = { type: 'browser' };
        routerState.config.disableInitialRoute = true;
    }

    const store = new Store(states.stores);
    useStore(store);

    store.domains.router.init();

    return store;
}

let store = getStore();

if (!store) {
    store = initStores();
}

initStyles();

async function renderApp() {
    await store.domains.bundles.preloadBundlesFromServer();

    const app = (
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>
    );

    ReactDOM.render(app, document.getElementById('app'));

    const el = document.getElementById('styles-target');
    if (el) {
        setStylesTarget(el);
    }

}

renderApp();

// Custom HMR, will forcefully reload if you edit a store file or
// one listed under fullPaths - Keeps state in sync
import { setStatefulModules } from 'fuse-box/modules/fuse-hmr';

setStatefulModules((name) => {
    return /stores/.test(name) || /client\/index/.test(name) || /rendered\/state/.test(name);
});
