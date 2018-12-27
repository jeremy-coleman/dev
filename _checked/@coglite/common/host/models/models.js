"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const joinErrorStrings = (items, textMap, separator) => {
    const elems = [];
    if (items && items.length > 0) {
        let it;
        items.forEach((item, idx) => {
            it = textMap(item, idx);
            if (it) {
                elems.push(it);
            }
        });
    }
    return elems.length > 0 ? elems.join(separator) : "";
};
const getKeyErrors = (key, errors) => {
    return errors ? errors.filter(e => e.key === key) : [];
};
exports.getKeyErrors = getKeyErrors;
const getKeyErrorMessage = (key, errors) => {
    const errorArray = getKeyErrors(key, errors);
    return errorArray.length > 0 ? joinErrorStrings(errorArray, e => e.message) : "";
};
exports.getKeyErrorMessage = getKeyErrorMessage;
function isFunction(value) {
    return typeof value === 'function';
}
const getRequestSupplier = (host) => {
    return host.getState("panelAppRequestSupplier", () => {
        return new SupplierModel();
    });
};
exports.getRequestSupplier = getRequestSupplier;
const toPromise = (sync) => {
    return new Promise((resolve, reject) => {
        const disposer = mobx_1.autorun(() => {
            if (!sync.syncing && sync.hasSynced) {
                disposer();
                if (sync.error) {
                    reject(sync.error);
                }
                else {
                    resolve();
                }
            }
        });
    });
};
exports.toPromise = toPromise;
const setBoundValue = (props, value) => {
    const binding = props.binding;
    if (binding) {
        if (binding.setter) {
            if (isFunction(binding.setter)) {
                binding.setter(value);
            }
            else {
                const s = binding.target[binding.setter];
                s.call(binding.target, value);
            }
        }
        else {
            binding.target[binding.key] = value;
        }
    }
};
exports.setBoundValue = setBoundValue;
const getBoundValue = (props) => {
    const binding = props.binding;
    if (binding) {
        if (binding.getter) {
            if (isFunction(binding.getter)) {
                return binding.getter();
            }
            const s = binding.target[binding.getter];
            return s.call(binding.target);
        }
        return binding.target[binding.key];
    }
};
exports.getBoundValue = getBoundValue;
const getErrorMessage = (props, errorMessages) => {
    const binding = props.binding;
    if (binding && binding.key) {
        return getKeyErrorMessage(binding.key, errorMessages);
    }
};
exports.getErrorMessage = getErrorMessage;
class SupplierModel {
    get value() {
        return this._value;
    }
    set value(value) {
        this.setValue(value);
    }
    setValue(value) {
        this._value = value;
    }
    clearValue() {
        this._value = undefined;
    }
}
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], SupplierModel.prototype, "_value", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SupplierModel.prototype, "value", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupplierModel.prototype, "setValue", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupplierModel.prototype, "clearValue", null);
exports.SupplierModel = SupplierModel;
class SyncModel {
    constructor() {
        this.hasSynced = false;
    }
    syncStart(opts) {
        this.type = opts ? opts.type : undefined;
        this.id = opts ? opts.id : undefined;
        this.startDate = new Date();
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = true;
    }
    syncEnd() {
        this.hasSynced = true;
        this.endDate = new Date();
        if (!this.startDate) {
            this.startDate = this.endDate;
        }
        this.syncing = false;
    }
    syncError(error) {
        this.hasSynced = true;
        this.error = error;
        this.syncEnd();
    }
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
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SyncModel.prototype, "id", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SyncModel.prototype, "type", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Date)
], SyncModel.prototype, "startDate", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Date)
], SyncModel.prototype, "endDate", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], SyncModel.prototype, "error", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], SyncModel.prototype, "syncing", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], SyncModel.prototype, "hasSynced", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SyncModel.prototype, "syncStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SyncModel.prototype, "syncEnd", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SyncModel.prototype, "syncError", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SyncModel.prototype, "clear", null);
exports.SyncModel = SyncModel;
class SyncSupplier {
    constructor() {
        this.sync = new SyncModel();
        this._onLoadDone = (data) => {
            this._loadDone(data);
            this.sync.syncEnd();
            return data;
        };
        this._onLoadError = (error) => {
            this._loadError(error);
            this.sync.syncError(error);
        };
    }
    _loadImpl() {
        if (this.loader) {
            return this.loader();
        }
        else
            return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented in target object" });
    }
    get ref() {
        return this._ref;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.setValue(value);
    }
    setValue(value) {
        this._ref = value;
        this._value = value;
    }
    clearValue() {
        this._value = undefined;
    }
    _loadDone(data) {
        this.setValue(data);
    }
    _loadError(error) {
        this.clearValue();
    }
    refresh() {
        if (this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return this._loadImpl().then(this._onLoadDone).catch(this._onLoadError);
    }
    load() {
        if (this.sync.syncing) {
            return toPromise(this.sync);
        }
        if (!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve(this.value);
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SyncSupplier.prototype, "sync", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], SyncSupplier.prototype, "_ref", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SyncSupplier.prototype, "_value", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SyncSupplier.prototype, "ref", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SyncSupplier.prototype, "value", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SyncSupplier.prototype, "setValue", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SyncSupplier.prototype, "clearValue", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SyncSupplier.prototype, "_loadDone", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], SyncSupplier.prototype, "_onLoadDone", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SyncSupplier.prototype, "_loadError", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], SyncSupplier.prototype, "_onLoadError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncSupplier.prototype, "refresh", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncSupplier.prototype, "load", null);
exports.SyncSupplier = SyncSupplier;
class ListModel {
    constructor(items) {
        this.sync = new SyncModel();
        this.items = [];
        this._onLoadDone = (r) => {
            this._loadDone(r);
            this.sync.syncEnd();
        };
        this._onLoadError = (error) => {
            return this._loadError(error);
        };
        this.setItems(items);
    }
    get total() {
        return this._total !== undefined ? this._total : this.items ? this.items.length : 0;
    }
    set total(value) {
        this.setTotal(value);
    }
    setTotal(total) {
        this._total = total;
    }
    setItems(items) {
        this.items = [];
        if (items) {
            items.forEach(item => this.items.push(item));
        }
    }
    setValue(value) {
        this.setItems(value);
    }
    clearItems() {
        this.setItems([]);
    }
    clearValue() {
        this.clearItems();
    }
    _addItemInternal(item, atIndex) {
        if (atIndex !== undefined && (atIndex >= 0 || atIndex < this.items.length - 1)) {
            this.items.splice(atIndex, 0, item);
        }
        else {
            this.items.push(item);
        }
    }
    addItem(item, atIndex) {
        if (atIndex >= 0 || atIndex < this.items.length - 1) {
            this.items.splice(atIndex, 0, item);
        }
        else {
            this.items.push(item);
        }
    }
    addItems(items, atIndex) {
        if (items) {
            items.forEach((item, idx) => {
                this.addItem(item, atIndex >= 0 ? atIndex + idx : undefined);
            });
        }
    }
    get itemsView() {
        return this.items.slice(0);
    }
    get value() {
        return this.itemsView;
    }
    clear() {
        this.setItems([]);
        this.sync.clear();
    }
    _loadDone(r) {
        this.setItems(r);
    }
    _loadError(error) {
        this.clearItems();
        this.sync.syncError(error);
    }
    _loadImpl() {
        if (this.loader) {
            return this.loader();
        }
        return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented" });
    }
    refresh() {
        if (this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return this._loadImpl().then(this._onLoadDone).catch(this._onLoadError);
    }
    load() {
        if (this.sync.syncing) {
            return toPromise(this.sync);
        }
        if (!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], ListModel.prototype, "sync", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ListModel.prototype, "_total", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], ListModel.prototype, "items", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], ListModel.prototype, "total", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "setTotal", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "setItems", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "setValue", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "clearItems", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "clearValue", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "_addItemInternal", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "addItem", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "addItems", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ListModel.prototype, "itemsView", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ListModel.prototype, "value", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "clear", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "_loadDone", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ListModel.prototype, "_onLoadDone", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListModel.prototype, "_loadError", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ListModel.prototype, "_onLoadError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListModel.prototype, "refresh", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListModel.prototype, "load", null);
exports.ListModel = ListModel;
class EventEmitter {
    _getTypeListeners(type) {
        if (!this._listeners) {
            this._listeners = {};
        }
        let tl = this._listeners[type];
        if (!tl) {
            tl = [];
            this._listeners[type] = tl;
        }
        return tl;
    }
    _hasTypeListener(type) {
        return this._listeners && this._listeners[type] ? true : false;
    }
    hasListenerOfType(type) {
        return this._hasTypeListener(type);
    }
    containsListener(type, listener) {
        if (this._hasTypeListener(type)) {
            const tl = this._listeners[type];
            return tl.some(reg => {
                return reg.o === listener;
            });
        }
        return false;
    }
    addEventListener(type, listener) {
        if (type && listener && !this.containsListener(type, listener)) {
            let tl = this._getTypeListeners(type);
            if (isFunction(listener)) {
                tl.push({ o: listener, f: listener });
            }
            else {
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
        if (this._hasTypeListener(type)) {
            const tl = this._listeners[type];
            const idx = tl.findIndex(reg => {
                return reg.o === listener;
            });
            if (idx >= 0) {
                tl.splice(idx, 1);
                if (tl.length === 0) {
                    delete this._listeners[type];
                }
            }
        }
    }
    off(type, listener) {
        this.removeEventListener(type, listener);
    }
    emit(event) {
        if (event && event.type && this._hasTypeListener(event.type)) {
            let tl = this._listeners[event.type];
            tl.forEach(reg => {
                reg.f(event);
            });
        }
    }
}
exports.EventEmitter = EventEmitter;
class StateManager {
    constructor() {
        this._state = {};
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this.setState(value);
    }
    setState(state) {
        this._state = Object.assign({}, this._state, state);
    }
    getState(key, factory, shouldUpdate) {
        let r = this._state[key];
        if ((r === undefined || (shouldUpdate && shouldUpdate(r))) && factory) {
            r = factory();
            this._state[key] = r;
        }
        return r;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], StateManager.prototype, "_state", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StateManager.prototype, "state", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StateManager.prototype, "setState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", void 0)
], StateManager.prototype, "getState", null);
exports.StateManager = StateManager;
