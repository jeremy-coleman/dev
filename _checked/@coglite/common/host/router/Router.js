"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_path_to_regexp_1 = require("./fast-path-to-regexp");
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
const notFoundHandler = (req) => {
    return Promise.reject({ code: "NOT_FOUND", request: req, message: `Unable to find handler for ${req.path}` });
};
const uselessRouter = {
    handleRequest(req, next) {
        return Promise.resolve(next ? next(req) : notFoundHandler(req));
    }
};
class RequestHandlerRouter {
    constructor(requestHandler) {
        this._requestHandler = requestHandler;
    }
    handleRequest(req, next) {
        return Promise.resolve(this._requestHandler(req, next));
    }
}
const createRouter = (router) => {
    if (isFunction(router)) {
        return new RequestHandlerRouter(router);
    }
    return router ? router : uselessRouter;
};
class PathRouter {
    constructor(path, router) {
        this._pathTemplate = new fast_path_to_regexp_1.PathRegExp(path);
        this._router = createRouter(router);
    }
    handleRequest(req, next = notFoundHandler) {
        const testPath = req.basePath ? req.path.substring(req.basePath.length) : req.path;
        const testResult = this._pathTemplate.match(testPath);
        if (testResult) {
            const handlerReq = Object.assign({}, req);
            handlerReq.params = Object.assign({}, req.params, testResult.params);
            handlerReq.basePath = req.basePath ? req.basePath + testResult.path : testResult.path;
            return this._router.handleRequest(handlerReq, next);
        }
        next();
    }
}
class Router {
    constructor() {
        this._routers = [];
    }
    use(pathOrRouter, router) {
        let r;
        if (isString(pathOrRouter)) {
            r = new PathRouter(pathOrRouter, router);
        }
        else {
            r = createRouter(pathOrRouter);
        }
        this._routers.push(r);
    }
    _processRouter(router, context, next) {
        return Promise.resolve(router.handleRequest(context.request, next)).then(value => {
            if (!context.next) {
                context.value = value;
            }
        });
    }
    _nextRouterHandler(router, context, next) {
        return () => {
            if (context.next) {
                context.next = false;
                return this._processRouter(router, context, next);
            }
            return Promise.resolve();
        };
    }
    handleRequest(req, next = notFoundHandler) {
        const fallThrough = (req) => {
            return this.defaultHandler ? this.defaultHandler(req, next) : next(req);
        };
        const context = {
            request: req,
            next: false
        };
        const nextInternal = (request) => {
            if (request) {
                context.request = request;
            }
            context.next = true;
        };
        let p;
        this._routers.forEach(r => {
            if (!p) {
                p = this._processRouter(r, context, nextInternal);
            }
            else {
                p = p.then(this._nextRouterHandler(r, context, nextInternal));
            }
        });
        if (!p) {
            p = Promise.resolve(fallThrough(context.request));
        }
        else {
            p = p.then(() => {
                if (context.next) {
                    return Promise.resolve(fallThrough(context.request));
                }
                return context.value;
            });
        }
        return p;
    }
}
exports.Router = Router;
