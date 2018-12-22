"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@coglite/common/host/router");
const HomeRouter_1 = require("./home/HomeRouter");
const SamplesRouter_1 = require("./home/samples/SamplesRouter");
const r = new router_1.Router();
exports.default = r;
exports.AppRouter = r;
r.use("/blank", req => null);
const sampleRouter = SamplesRouter_1.createSampleRouter();
r.use(sampleRouter);
const homeRouter = HomeRouter_1.createHomeRouter();
r.use(homeRouter);
const dashboardRouter = router_1.reactRouter(() => Promise.resolve().then(() => require("./layout/LayoutManager")), { exact: false });
r.use("#/about", router_1.reactRouter(() => Promise.resolve().then(() => require("./pages/about"))));
r.use((req, next) => {
    if (req.path === "/" || req.path === "/index" || req.path === "/dashboard" || req.path === "") {
        return dashboardRouter(req, next);
    }
    return next(req);
});
