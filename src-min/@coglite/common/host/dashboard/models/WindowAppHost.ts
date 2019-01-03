import { action } from 'mobx';

import { AppHostModel, EventEmitter } from '../../models';
import { WindowModel } from './WindowModel';

export class WindowAppHost extends AppHostModel {
    private _window : WindowModel;
    protected _events = new EventEmitter();
    
    constructor(window : WindowModel) {
        super();
        this._window = window;
    }

    get defaultRequest() {
        return { 
            path: this._window.path,
            params: this._window.params,
            query: this._window.query 
        };
    }
    
    get router() : IRouter {
        return this._window.router;
    }
    set router(value : IRouter) {
        this.setRouter(value);
    }
    
    @action
    setRouter(router : IRouter) {
        this._window.setRouter(router);
    }

    open(request: IRequest) : Promise<IAppHostModel> {
        return this._window.open(request).then(w => w.appHost);
    }

    @action
    setRequest(request : IRequest) {
        super.setRequest(request);
        if(request && request.replace && !request.noUpdate) {
            this._window.setPath(request.path);
            this._window.setParams(request.params);
            this._window.setQuery(request.query);
        }
    }

    close() {
        this._window.close();
    }

    addEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    emit(event) : void {
        this._events.emit(event);
    }
}

export default WindowAppHost