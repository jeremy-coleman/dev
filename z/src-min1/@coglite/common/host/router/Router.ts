import { PathRegExp } from './fast-path-to-regexp';

import * as React from "react";



function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

function isString(value: any): value is string {
  return typeof value === 'string';
}


// this is from Choo router , it's here in my attemps to improve for electron use
// for now, i changed my application's default host path to window.location.hash from window.location.pathname and seems to be fine-ish
// with pathname (instead of hash), you'll get a full file system path to the location of the root index.html 
// for ex: C://User/..more/..folders/workingDir/dist/index.html

// var PATH_TEST_CONSTANTS = {
//  electron: '^(file:\/\/|\/)(.*\.html?\/?)?',
//  protocol: '^(http(s)?(:\/\/))?(www\.)?',
//  domain: '[a-zA-Z0-9-_\.]+(:[0-9]{1,5})?(\/{1})?',
//  qs: '[\?].*$'
// }

// var stripElectron = new RegExp(PATH_TEST_CONSTANTS.electron)
// var prefix = new RegExp(PATH_TEST_CONSTANTS.protocol + PATH_TEST_CONSTANTS.domain)
// var normalize = new RegExp('#')
// var suffix = new RegExp(PATH_TEST_CONSTANTS.qs)



const notFoundHandler : IRequestHandler = (req : IRequest) => {
    return Promise.reject({ code: "NOT_FOUND", request: req, message: `Unable to find handler for ${req.path}`});
};

const uselessRouter : IRouter = {
    handleRequest(req : IRequest, next?: IRequestHandler) {
        return Promise.resolve(next ? next(req) : notFoundHandler(req));
    }
};

class RequestHandlerRouter implements IRouter {
    private _requestHandler : IRequestHandler;
    constructor(requestHandler : IRequestHandler) {
        this._requestHandler = requestHandler;
    }
    handleRequest(req : IRequest, next?: IRequestHandler) {
        return Promise.resolve(this._requestHandler(req, next));
    }
}

const createRouter = (router : IRouter | IRequestHandler) : IRouter  => {
    if(isFunction(router)) {
        return new RequestHandlerRouter(router as IRequestHandler);
    }
    return router ? router as IRouter : uselessRouter;
};

class PathRouter implements IRouter {
    private _pathTemplate : PathRegExp;
    private _router : IRouter;
    constructor(path : string, router : IRouter | IRequestHandler) {
        this._pathTemplate = new PathRegExp(path);
        this._router = createRouter(router);
    }

    handleRequest(req : IRequest, next: IRequestHandler = notFoundHandler) {
        
        const testPath = req.basePath ? req.path.substring(req.basePath.length) : req.path;
        
        const testResult = this._pathTemplate.match(testPath);
        
        if(testResult) {
            const handlerReq = Object.assign({}, req);
            handlerReq.params = Object.assign({}, req.params, testResult.params);
            
            //const matchedPath = this._pathTemplate.toPath(handlerReq.params);
            
            //const matchedPath = createUrl(testResult.matched.out, handlerReq.params);

            handlerReq.basePath = req.basePath ? req.basePath + testResult.path : testResult.path;
            return this._router.handleRequest(handlerReq, next);
        }
        next();
    }
}


class Router implements IRouter, IRouterManager {
    
    private _routers : IRouter[] = [];
    
    defaultHandler : IRequestHandler;
    
    public use(pathOrRouter: string | IRouter | IRequestHandler, router?: IRouter | IRequestHandler) : void {
        let r : IRouter;
        if(isString(pathOrRouter)) {
            r = new PathRouter(pathOrRouter as string, router);
        } 
        else {
            r = createRouter(pathOrRouter as IRouter | IRequestHandler);
        }
        this._routers.push(r);
    }

    private _processRouter(router : IRouter, context : IRequestContext, next : IRequestHandler) : Promise<any> {
        return Promise.resolve(router.handleRequest(context.request, next)).then(value => {
            if(!context.next) {
                context.value = value;
            }
        });
    }

    private _nextRouterHandler(router : IRouter, context : IRequestContext, next : IRequestHandler) {
        return () => {
            if(context.next) {
                context.next = false;
                return this._processRouter(router, context, next);
            }
            return Promise.resolve();
        };
    }

    public handleRequest(req : IRequest, next: IRequestHandler = notFoundHandler) : Promise<any> {
        const fallThrough = (req) => {
            return this.defaultHandler ? this.defaultHandler(req, next) : next(req);
        };
        const context : IRequestContext = {
            request: req,
            next: false
        };
        const nextInternal = (request : IRequest) => {
            if(request) {
                context.request = request;
            }
            context.next = true;
        };
        
        let p: Promise<any>;
        
        this._routers.forEach(r => {
            if(!p) {
                p = this._processRouter(r, context, nextInternal);
            } else {
                p = p.then(this._nextRouterHandler(r, context, nextInternal));
            }
        });

        if(!p) {
            p = Promise.resolve(fallThrough(context.request));
        } 
        else {
            p = p.then(() => {
                if(context.next) {
                    return Promise.resolve(fallThrough(context.request));
                }
                return context.value;
            });
        }
        return p;
    }
}

export { Router }




