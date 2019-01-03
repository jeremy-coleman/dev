import { action, computed, observable } from 'mobx';

import { ComponentIdSequence } from './ComponentIdSequence';

const NotConfiguredComponentFactory : IComponentFactory = (type : string) => {
    throw { code: "ILLEGAL_STATE", message: "A component factory has not been configured" };
};

//export abstract class ComponentModel implements IComponent {

export class ComponentModel {
    private _id : string;

    @observable.ref parent;
    
    @observable.ref protected _portalManager : IPortalManager;
    @observable.ref protected _componentFactory : IComponentFactory;
    @observable.ref protected _addApp : IRequest | ISupplierFunc<IRequest>;
    @observable protected _router : IRouter;
    @observable closeDisabled : boolean = false
    @observable protected _needsOverflow : boolean;
    @observable private _x : number = 0;
    @observable private _y : number = 0;
    @observable private _width : number = 0;
    @observable private _height : number = 0;
    type : string;

    get id() {
        if(!this._id) {
            this._id = ComponentIdSequence.next();
        }
        return this._id;
    }

    get isWindowManager() {
        return false;
    }

    @computed
    get isOverflow() {
        return false;
    }

    @action
    resetViewport() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
    }

    @computed
    get root() {
        return this.parent ? this.parent.root : this;
    }

    @computed
    get x() {
        return this._x;
    }

    @computed
    get rx() {
        return this.x - (this.parent ? this.parent.x : 0);
    }

    @computed
    get y() {
        return this._y;
    }

    @computed
    get ry() {
        return this.y - (this.parent ? this.parent.y : 0);
    }

    @computed
    get width() {
        return this._width;
    }

    @computed
    get height() {
        return this._height;
    }

    @action
    resize(width : number, height : number) {
        if((width >= 0 && width !== this._width) || (height >= 0 && height !== this._height)) {
            this._width = width;
            this._height = height;
        }
    }

    @action
    position(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    @action
    setViewport(x : number, y : number, width : number, height : number) {
        this.position(x, y);
        this.resize(width, height);
    }

    @computed
    get addApp() {
        if(this._addApp !== undefined) {
            return this._addApp;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.addApp : undefined;
    }

    set addApp(addApp : IRequest | ISupplierFunc<IRequest>) {
        this.setAddApp(addApp);
    }

    @computed
    get portalManager()  {
        if(this._portalManager !== undefined) {
            return this._portalManager;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.portalManager : undefined;
    }

    set portalManager(value) {
        this.setPortalManager(value);
    }

    @action
    setPortalManager(portalManager) {
        this._portalManager = portalManager;
    }

    @computed
    get componentFactory() {
        if(this._componentFactory !== undefined) {
            return this._componentFactory;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.componentFactory : NotConfiguredComponentFactory;
    }
    set componentFactory(value) {
        this.setComponentFactory(value);
    }
    @action
    setComponentFactory(componentFactory) {
        this._componentFactory = componentFactory;
    }


    @action
    setCloseDisabled(closeDisabled : boolean) {
        this.closeDisabled = closeDisabled;
    }

    @action
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) {
        this._addApp = addApp;
    }
    
    @computed
    get router() {
        if(this._router !== undefined) {
            return this._router;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.router : undefined;
    }

    set router(value) {
        this.setRouter(value);
    }
    
    @action
    setRouter(router : IRouter) {
        this._router = router;
    }

    @computed
    get dashboard()  {
        const p = this.parent;
        if(p === this) {
            console.warn("-- Dashboard Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.dashboard : undefined;
    }


    removeFromParent() {
        if(this.parent) {
            this.parent.remove(this);
            this.parent = undefined;
        }
    }


    visit(callback) : void {
        callback(this);
    }

    protected _findFirstChild(predicate )  {
        return undefined;
    }

    findFirst(predicate ) {
        if(predicate(this)) {
            return this;
        }
        return this._findFirstChild(predicate);
    }

    protected _findAllChildren(predicate ){
        return [];
    }

    findAll(predicate )  {
        let r = [];
        if(predicate(this)) {
            r.push(this);
        }
        const tr = this._findAllChildren(predicate);
        if(tr && tr.length > 0) {
            r = r.concat(tr);
        }
        return r;
    }

}

