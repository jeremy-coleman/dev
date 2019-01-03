import { action, autorun, computed, observable } from 'mobx';


const joinErrorStrings = <T = any>(items: T[], textMap, separator?: string) : string => {
    const elems : string[] = [];
    if(items && items.length > 0) {
        let it;
        items.forEach((item, idx) => {
            it = textMap(item, idx);
            
            if(it) {
                elems.push(it);
            }

        });
    }
    return elems.length > 0 ? elems.join(separator) : "";
};

const getKeyErrors = (key : string, errors : IError[]) : IError[] => {
    return errors ? errors.filter(e => e.key === key) : [];
};

const getKeyErrorMessage = (key : string, errors : IError[]) : string => {
    const errorArray = getKeyErrors(key, errors);
    return errorArray.length > 0 ? joinErrorStrings(errorArray, e => e.message) : "";
};



function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

//import { StorageServiceContext} from '../ctx'
//lul COME AT ME CIRCULAR IMPORTS

//------------------------ helpers / actions ---------------------------------//

const getRequestSupplier = (host : IAppHostModel) => {
    return host.getState("panelAppRequestSupplier", () => {
        return new SupplierModel<IRequest>();
    });
};

const toPromise = (sync: SyncModel) : Promise<any> => {
    return new Promise((resolve, reject) => {
        const disposer = autorun(() => {
            if(!sync.syncing && sync.hasSynced) {
                disposer();
                if(sync.error) {
                    reject(sync.error);
                } else {
                    resolve();
                }
            }
        });
    });
};


const setBoundValue = <V = any>(props : IBoundProps<any, V>, value : V) => {
    const binding = props.binding;
    if(binding) {
        if(binding.setter) {
            if(isFunction(binding.setter)) {
                (binding.setter as IConsumerFunc<V>)(value);
            } else {
                const s = binding.target[binding.setter as string];
                s.call(binding.target, value);
            }
        } else {
            binding.target[binding.key] = value;
        }
    }
};

const getBoundValue = <V = any>(props : IBoundProps<any, V>) : V => {
    const binding = props.binding;
    if(binding) {
        if(binding.getter) {
            if(isFunction(binding.getter)) {
                return (binding.getter as ISupplierFunc<V>)();
            }
            const s = binding.target[binding.getter as string];
            return s.call(binding.target);
        }
        return binding.target[binding.key];
    }
};

const getErrorMessage = <V = any>(props : IBoundProps<any, V>, errorMessages : IError[]) : string => {
    const binding = props.binding;
    if(binding && binding.key) {
        return getKeyErrorMessage(binding.key, errorMessages);
    }
};

//-------------------------------------sync models -------------------------------------------------//

class SupplierModel<T = any> {
    @observable.ref protected _value : T;

    @computed
    get value() {
        return this._value;
    }
    set value(value : T) {
        this.setValue(value);
    }

    @action
    setValue(value : T) {
        this._value = value;
    }

    @action
    clearValue() {
        this._value = undefined;
    }
}

export class SyncModel<I = any> {
    @observable id: I;
    @observable type: any;
    @observable startDate: Date;
    @observable endDate: Date;
    @observable.ref error: any;
    @observable syncing: boolean;
    @observable hasSynced: boolean = false;

    @action
    syncStart(opts?: ISyncOptions) : void {
        this.type = opts ? opts.type : undefined;
        this.id = opts ? opts.id : undefined;
        this.startDate = new Date();
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = true;
    }
    @action
    syncEnd() : void {
        this.hasSynced = true;
        this.endDate = new Date();
        if(!this.startDate) {
            this.startDate = this.endDate;
        }
        this.syncing = false;
    }
    @action
    syncError(error : any) : void {
        this.hasSynced = true;
        this.error = error;
        this.syncEnd();
    }

    @action
    clear() {
        this.type = undefined;
        this.id = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = false;
        this.hasSynced = false;
    }
}


class SyncSupplier<T = any> {
    @observable sync = new SyncModel();
    @observable.ref protected _ref : T; 
    @observable protected _value : T;
    loader : () => Promise<T>;

    protected _loadImpl() : Promise<T> {
        if(this.loader) {
            return this.loader();
        }
        else return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented in target object" });
    }

    @computed
    get ref() {
        return this._ref;
    }

    @computed
    get value() {
        return this._value;
    }
    set value(value : T) {
        this.setValue(value);
    }

    @action
    setValue(value : T) {
        this._ref = value;
        this._value = value;
    }

    @action
    clearValue() {
        this._value = undefined;
    }

    @action
    protected _loadDone(data : T) {
        this.setValue(data);
    }

    @action
    protected _onLoadDone = (data : T) => {
        this._loadDone(data);
        this.sync.syncEnd();
        return data;
    }

    @action
    protected _loadError(error : any) {
        this.clearValue();
    }

    @action
    protected _onLoadError = (error : any) => {
        this._loadError(error);
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return this._loadImpl().then(this._onLoadDone).catch(this._onLoadError);
    }

    @action
    load() : Promise<any> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        if(!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve(this.value);
    }
}

class ListModel<T = any> {
    @observable sync = new SyncModel();
    @observable private _total : number;
    @observable items: T[] = [];
    loader : () => Promise<any>;

    constructor(items?: T[]) {
        this.setItems(items);
    }

    @computed
    get total() : number {
        return this._total !== undefined ? this._total : this.items ? this.items.length : 0;
    }
    set total(value) {
        this.setTotal(value);
    }
    @action
    setTotal(total : number) {
        this._total = total;
    }

    @action
    setItems(items: T[]) : void {
        this.items = [];
        if(items) {
            items.forEach(item => this.items.push(item));
        }
    }

    @action
    setValue(value) {
        this.setItems(value);
    }

    @action
    clearItems() : void {
        this.setItems([]);
    }

    @action
    clearValue() {
        this.clearItems();
    }

    @action
    protected _addItemInternal(item : T, atIndex?: number) {
        if(atIndex !== undefined && (atIndex >= 0 || atIndex < this.items.length - 1)) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItem(item : T, atIndex?: number) : void {
        if(atIndex >= 0 || atIndex < this.items.length - 1) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItems(items : T[], atIndex?: number) : void {
        if(items) {
            items.forEach((item, idx) => {
                this.addItem(item, atIndex >= 0 ? atIndex + idx : undefined);
            });
        }
    }

    @computed
    get itemsView() {
        return this.items.slice(0);
    }

    @computed
    get value() {
        return this.itemsView;
    }

    @action
    clear() {
        this.setItems([]);
        this.sync.clear();
    }

    @action
    protected _loadDone(r : any) {
        // by default it assumes the result from load is an array
        this.setItems(r as T[]);
    }

    @action
    protected _onLoadDone = (r) => {
        this._loadDone(r);
        this.sync.syncEnd();
    }

    @action
    protected _loadError(error : any) {
        this.clearItems();
        this.sync.syncError(error);
    }

    @action
    protected _onLoadError = (error : any) => {
        return this._loadError(error);
    }

    protected _loadImpl() : Promise<any> {
        if(this.loader) {
            return this.loader();
        }
        return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented"});
    }

    @action
    refresh() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return this._loadImpl().then(this._onLoadDone).catch(this._onLoadError);
    }

    @action
    load() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        if(!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}

class EventEmitter {
    private _listeners : any;
    
    private _getTypeListeners(type : string) {
        if(!this._listeners) {
            this._listeners = {};
        }
        let tl = this._listeners[type];
        if(!tl) {
            tl = [];
            this._listeners[type] = tl;
        }
        return tl;
    }
    
    protected _hasTypeListener(type : string) {
        return this._listeners && this._listeners[type] ? true : false;
    }
    
    hasListenerOfType(type : string) {
        return this._hasTypeListener(type);
    }
    
    containsListener(type : string, listener : any) {
        if(this._hasTypeListener(type)) {
            const tl = this._listeners[type];
            return tl.some(reg => {
                return reg.o === listener;
            });
        }
        return false;
    }
    addEventListener(type, listener) {
       if(type && listener && !this.containsListener(type, listener)) {
            let tl = this._getTypeListeners(type);
            if(isFunction(listener)) {
                tl.push({ o: listener, f: listener });
            } else {
                tl.push({
                    o: listener,
                    f: (event) => {
                        listener.handleEvent(event);
                    }
                });
            }
        }
    }
    
    on(type, listener) {
        this.addEventListener(type, listener);
    }
    
    removeEventListener(type, listener) {
        if(this._hasTypeListener(type)) {
            const tl = this._listeners[type];
            const idx = tl.findIndex(reg => {
                return reg.o === listener;
            });
            if(idx >= 0) {
                tl.splice(idx, 1);
                if(tl.length === 0) {
                    delete this._listeners[type];
                }
            }
        }
    }
    
    off(type, listener) {
        this.removeEventListener(type, listener);
    }
    
    emit(event : IEvent) : void {
        if(event && event.type && this._hasTypeListener(event.type)) {
            let tl = this._listeners[event.type];
            tl.forEach(reg => {
                reg.f(event);
            });
        }
    }
}

class StateManager {
    @observable protected _state = {};

    @computed
    get state() {
        return this._state;
    }
    set state(value : any) {
        this.setState(value);
    }

    @action
    setState(state : any) {
        this._state = Object.assign({}, this._state, state);
    }

    @action
    getState<T = any>(key : string, factory?: ISupplierFunc<T>, shouldUpdate?: IPredicateFunc<T>) {
        let r = this._state[key];
        if((r === undefined || (shouldUpdate && shouldUpdate(r))) && factory) {
            r = factory();
            this._state[key] = r;
        }
        return r;
    }
}



export { getKeyErrors, getKeyErrorMessage }
export { StateManager }
export { toPromise }
export { SyncSupplier }
export { SupplierModel };

export { ListModel };
export { EventEmitter }

export {getRequestSupplier}
export { getBoundValue, setBoundValue, getErrorMessage }
