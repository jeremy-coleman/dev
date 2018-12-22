"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@coglite/common/host/router");
const React = require("react");
const SampleRoutes_1 = require("./SampleRoutes");
const SamplesHost_1 = require("./SamplesHost");
const registerSampleRouter = (sampleRoute, router) => {
    if (sampleRoute.path && sampleRoute.moduleLoader) {
        console.log("-- Registering Sample: " + sampleRoute.key);
        router.use(sampleRoute.path, router_1.exactPath(SamplesHost_1.sampleRouteHandler(sampleRoute)));
    }
    if (sampleRoute.items) {
        sampleRoute.items.forEach(item => {
            registerSampleRouter(item, router);
        });
    }
};
const createSampleRouter = () => {
    const r = new router_1.Router();
    r.use("/samples", router_1.exactPath(req => {
        return Promise.resolve().then(() => require("./Sample")).then(m => {
            return React.createElement(m.Sample, { host: req.app });
        });
    }));
    SampleRoutes_1.sampleRoutes.forEach(sampleRoute => {
        registerSampleRouter(sampleRoute, r);
    });
    return r;
};
exports.createSampleRouter = createSampleRouter;
