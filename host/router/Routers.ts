import * as React from "react";



const exactPath = (handler : IRequestHandler, opts?: {allowTrailingSlash?: boolean}) : IRequestHandler => {
    return (req, next) => {
        if(req.basePath === req.path || (opts && opts.allowTrailingSlash && req.path === `${req.basePath}/`)) {
            return handler(req, next);
        }
        next();
    };
};


const DefaultReactRouterOptions = {
    exact: true,
    allowTrailingSlash: false,
    requestPropKey: "match"
};


const reactRouter = (importer: () => Promise<any> | any, opts?: IReactRouterOptions) => {
    const mergedOpts = Object.assign({}, DefaultReactRouterOptions, opts);
    const handler = (request : IRequest) => {
        return Promise.resolve(importer()).then(m => {
            const type = mergedOpts.exportKey ? m[mergedOpts.exportKey] : m.default;
            if(!type) {
                throw { code: "ILLEGAL_ARGUMENT", message: "Unable to resolve React Component Type"};
            }
            const props = {};
            props[mergedOpts.requestPropKey] = request;
            return React.createElement(type, props);
        });
    };
    return mergedOpts.exact ? exactPath(handler, mergedOpts) : handler;
};


const rootAppConfigInterceptor : IRequestHandler = (req, next) => {
    if(!req.host.state.appModeConfigured && req.params && req.params._root !== undefined) {
        const rootParam = String(req.params.root);
        const isRoot = rootParam === "true" || rootParam === "1" || rootParam === "y";
        req.host.root = isRoot;
        req.host.setState({ appModeConfigured: true });
    }
    return next();
};

const injectParametersInterceptor = (params : any, handler?: IRequestHandler) : IRequestHandler => {
    return (req, next) => {
        const nextReq = Object.assign({}, req);
        nextReq.params = Object.assign({}, nextReq.params, params);
        if(handler) {
            return handler(nextReq, next);
        }
        return next(nextReq);
    };
};

const injectQueryInterceptor = (query : any, handler?: IRequestHandler) : IRequestHandler => {
    return (req, next) => {
        const nextReq = Object.assign({}, req);
        nextReq.query = Object.assign({}, nextReq.query, query);
        if(handler) {
            return handler(nextReq, next);
        }
        return next(nextReq);
    };
};


export {
    reactRouter,
    injectParametersInterceptor,
    injectQueryInterceptor,
    rootAppConfigInterceptor,
    exactPath
}

export default reactRouter