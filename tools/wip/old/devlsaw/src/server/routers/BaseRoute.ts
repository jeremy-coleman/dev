import * as express from 'express';
import {Router} from 'express';

export abstract class BaseRoute {

    private readonly _registeredMethodEnding = 'Action';
    router: Router;
    winston: any;

    constructor() {
        this.onInit();
        this.router = express.Router();
        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router
    }

    getRouterMethodNames(obj): Set<string> {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => {
                if(k.toString().indexOf(this._registeredMethodEnding,
                        (k.toString().length - this._registeredMethodEnding.length)) !== -1) {
                    methods.add(k);
                }
            });
        }
        return methods;
    }

    protected onInit(): void {}

    private initRoutes(): void {
        const methods = this.getRouterMethodNames(this);
        [...methods].map((method) => {
            this[method](this.router);
        });
    }
}

