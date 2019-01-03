import { reactRouter, Router } from '@coglite/common/host/router';

import { createHomeRouter } from './home/HomeRouter';
//import { createSampleRouter } from './home/samples/SamplesRouter';

const r = new Router();


r.use("/blank", req => null);


//const sampleRouter = createSampleRouter()
//r.use(sampleRouter)


const homeRouter = createHomeRouter()
r.use(homeRouter)


const dashboardRouter = reactRouter(() => import("./layout/DashboardApp"), { exact: false });

r.use("#/about", reactRouter(() => import("./pages/about")))


r.use((req, next) => {
    if (req.path === "/" || req.path === "/index" || req.path === "/dashboard" || req.path === "") {
        return dashboardRouter(req, next);
    }
    return next(req);
});


export { r as default, r as AppRouter }