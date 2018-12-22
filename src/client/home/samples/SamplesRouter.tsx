import { exactPath, Router } from '@coglite/common/host/router';
import * as React from 'react';

import { sampleRoutes, ISampleRoute } from './SampleRoutes';
import { sampleRouteHandler } from './SamplesHost';


const registerSampleRouter = (sampleRoute: ISampleRoute, router : IRouterManager) => {
    if(sampleRoute.path && sampleRoute.moduleLoader) {
        console.log("-- Registering Sample: " + sampleRoute.key);
        router.use(sampleRoute.path, exactPath(sampleRouteHandler(sampleRoute)));
    }

    if(sampleRoute.items) {
        sampleRoute.items.forEach(item => {
            registerSampleRouter(item, router);
        });
    }  
};


const createSampleRouter = (): Router => {
    const r = new Router();
    
    r.use("/samples", exactPath(req => {
        return import("./Sample").then(m => {
            return <m.Sample host={req.app} />;
        });
    }));

    sampleRoutes.forEach(sampleRoute => {
        registerSampleRouter(sampleRoute, r);
    });
    

    return r;
};


export { createSampleRouter }