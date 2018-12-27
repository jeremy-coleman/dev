"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@coglite/common/host/router");
const React = require("react");
const HomeHostAppView_1 = require("./HomeHostAppView");
const HomeRoutes_1 = require("./HomeRoutes");
const registerHomeRouter = (homeRoute, router) => {
    if (homeRoute.path && homeRoute.moduleLoader) {
        console.log("-- Registering homeApp: " + homeRoute.key);
        router.use(homeRoute.path, router_1.exactPath(HomeHostAppView_1.homeAppHandler(homeRoute)));
    }
    if (homeRoute.items) {
        homeRoute.items.forEach(item => {
            registerHomeRouter(item, router);
        });
    }
};
const createHomeRouter = () => {
    const r = new router_1.Router();
    r.use("/home", router_1.exactPath(req => Promise.resolve().then(() => require("./Home")).then(m => React.createElement(m.Home, { host: req.app }))));
    HomeRoutes_1.homeRoutes.forEach(homeRoute => registerHomeRouter(homeRoute, r));
    return r;
};
exports.createHomeRouter = createHomeRouter;
