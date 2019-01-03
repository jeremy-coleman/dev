import { exactPath, Router } from '@coglite/common/host/router';
import * as React from 'react';

import { homeAppHandler } from './HomeHostAppView';
import { homeRoutes, IHomeRoute } from './HomeRoutes';


const registerHomeRouter = (homeRoute : IHomeRoute, router : IRouterManager) => {
    if(homeRoute.path && homeRoute.moduleLoader) {
        console.log("-- Registering homeApp: " + homeRoute.key);
        router.use(homeRoute.path, exactPath(homeAppHandler(homeRoute)));
    }

    if(homeRoute.items) {
        homeRoute.items.forEach(item => {
            registerHomeRouter(item, router);
        });
    }  
};


const createHomeRouter = (): Router => {
    const r = new Router();
    r.use("/home", exactPath(req => import("./Home").then(m => <m.Home host={req.app} />)));
    homeRoutes.forEach(homeRoute => registerHomeRouter(homeRoute, r));
    return r;
};


export { createHomeRouter }