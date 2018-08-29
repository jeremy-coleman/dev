import * as React from "react";
import { Router } from "@coglite/framework/common/Router";
import { exactPath } from "@coglite/framework/common/Routers";
import { IRouterManager } from "@coglite/framework/common/IRouterManager";
import { homeAppHandler } from "./Home/HomeHostAppView";
import { homeApps } from "./homeRoutes";
import { IHomeApp } from "./IHomeApp";

import {HelpRouter} from './dev-sample-apps/help/HelpRouter'


const registerHomeApp = (homeApp : IHomeApp, router : IRouterManager) => {
    if(homeApp.path && homeApp.moduleLoader) {
        console.log("-- Registering homeApp: " + homeApp.key);
        router.use(homeApp.path, exactPath(homeAppHandler(homeApp)));
    }

    if(homeApp.items) {
        homeApp.items.forEach(item => {
            registerHomeApp(item, router);
        });
    }  
};


const createHomeRouter = (): Router => {
    const r = new Router();
    r.use("/home", exactPath(req => {
        return import("./Home/Home").then(m => {
            return <m.Home host={req.app} />;
        });
    }));

    homeApps.forEach(homeApp => {
        registerHomeApp(homeApp, r);
    });
    
    r.use(HelpRouter);

    return r;
};


export { createHomeRouter }