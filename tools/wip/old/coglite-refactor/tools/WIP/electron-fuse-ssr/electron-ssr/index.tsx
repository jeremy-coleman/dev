// tslint:disable-next-line:no-unused-variable
import { Request, Response } from 'express';
import { Provider, useStaticRendering } from 'mobx-react';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Routes } from '../router';
import { Store } from '../stores';
import { RouterStore, IRouterState} from '../stores/router.store';
import { initStyles } from '../app-components';
import { AppContainer } from '../app-components/app-container';
import { ServerHTML } from './electron-ssr-html';

// Configure mobx for rendering on the server
useStaticRendering(true);

export async function appMiddleware(req: Request, res: Response) {
    initStyles();

    const store = new Store();

    const routeConfig: IRouterState = {
        routes: Routes(store.domains),
        config: {type: 'mem'},
    };

    const router = new RouterStore(routeConfig);
    store.useStores({router});
    await store.domains.router.init(req.path);

    const app = renderToString(
        <Provider {...store.domains}>
            <AppContainer />
        </Provider>,
    );

    const html = renderToStaticMarkup(
        <ServerHTML
            initialState={store.serialize()}
            appString={app} />,
    );

    res.status(store.domains.router.status || 200).send(`<!DOCTYPE html>${html}`);
}
