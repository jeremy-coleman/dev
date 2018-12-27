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
const models_1 = require("../models");
const SequenceId_1 = require("./SequenceId");
const AppIconModel_1 = require("./AppIconModel");
const IdPrefix = "app-host-";
exports.nextId = () => {
    return SequenceId_1.generateSequentialId(IdPrefix);
};
class AppHostModel {
    constructor() {
        this._state = {};
        this._events = new models_1.EventEmitter();
        this.icon = new AppIconModel_1.AppIconModel();
        this.sync = new models_1.SyncModel();
        this._root = false;
        this._initialized = false;
        this._requestHistory = [];
        this._loadDone = (value) => {
            this.view = value;
            this.sync.syncEnd();
            return value;
        };
        this._loadError = (error) => {
            console.log("App Host Load Error");
            console.warn(error);
            this.sync.syncError(error);
        };
    }
    addEventListener(type, handler) {
        this._events.addEventListener(type, handler);
    }
    removeEventListener(type, handler) {
        this._events.addEventListener(type, handler);
    }
    emit(event) {
        this._events.emit(event);
    }
    get id() {
        if (!this._id) {
            this._id = exports.nextId();
        }
        return this._id;
    }
    set id(value) {
        this.setId(value);
    }
    setId(id) {
        this._id = id;
    }
    get root() {
        return this._root;
    }
    set root(value) {
        this.setRoot(value);
    }
    setRoot(root) {
        this._root = root;
    }
    get router() {
        return this._router;
    }
    set router(router) {
        this.setRouter(router);
    }
    setRouter(router) {
        if (router !== this._router) {
            this._router = router;
            if (this._initialized) {
                this._loadImpl();
            }
        }
    }
    get initialized() {
        return this._initialized;
    }
    set initialized(value) {
        this.setInitialized(value);
    }
    setInitialized(initialized) {
        this._initialized = initialized;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this.setTitle(value);
    }
    setTitle(title) {
        this._title = title;
        if (this._requestHistory.length > 0) {
            this._requestHistory[this._requestHistory.length - 1].title = title;
        }
    }
    get iconUrl() {
        return this._iconUrl;
    }
    set iconUrl(value) {
        this.setIconUrl(value);
    }
    setIconUrl(iconUrl) {
        this._iconUrl = iconUrl;
    }
    get url() {
        return this.getUrl(this.request);
    }
    getUrl(request) {
        const initPath = request && request.path ? request.path : this.path;
        var parsedSearchUrl = Array.from(new URLSearchParams(window.location.search).entries());
        var queryString = parsedSearchUrl.length > 1
            ? parsedSearchUrl
                .map(item => Object.assign({}, { [item[0]]: item[1] }))
                .reduce((acc, curr, {}) => Object.assign(acc, curr))
            : {};
        let url = initPath ? [initPath].join("/") : "";
        if (queryString) {
            url += "?" + queryString;
        }
        return url;
    }
    setView(view) {
        this.view = view;
    }
    _loadImpl() {
        this.sync.syncStart();
        if (this.router) {
            const req = Object.assign({}, this.request, { app: this, host: this });
            req.params = Object.assign({}, req.query, req.params);
            return Promise.resolve(this.router.handleRequest(req)).then(this._loadDone).catch(this._loadError);
        }
        else {
            this._loadError({ code: "ILLEGAL_STATE", message: "No Router configured" });
        }
    }
    _init(request) {
        this.setRequest(request || this.defaultRequest);
        this._updateRequestHistory();
        return this._loadImpl();
    }
    _updateUrlHistory(url) {
    }
    _updateRequestHistory() {
        const req = Object.assign({}, this.request, { replace: false });
        if (this.request.replace) {
            if (this._requestHistory.length > 0) {
                this._requestHistory[this._requestHistory.length - 1] = req;
            }
        }
        else {
            this._requestHistory.push(req);
        }
    }
    load(request) {
        if (!request && this.sync.syncing) {
            return models_1.toPromise(this.sync);
        }
        if (request && request.title) {
            this.setTitle(request.title);
        }
        if (!this._initialized) {
            this._initialized = true;
            return this._init(request);
        }
        const currentUrl = this.url;
        this.setRequest(request || this.defaultRequest);
        const url = this.getUrl(this.request);
        if (url !== currentUrl) {
            this._updateRequestHistory();
            this._updateUrlHistory(url);
        }
        return this._loadImpl();
    }
    open(request) {
        if (this.launcher) {
            return Promise.resolve(this.launcher(request));
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A launcher hasn't been configured" });
    }
    get defaultRequest() {
        return Object.assign({}, this._defaultRequest);
    }
    set defaultRequest(value) {
        this.setDefaultRequest(value);
    }
    setDefaultRequest(defaultRequest) {
        this._defaultRequest = defaultRequest;
    }
    close() {
    }
    get request() {
        return Object.assign({}, this._request);
    }
    set request(value) {
        this.setRequest(value);
    }
    setRequest(request) {
        if (request && request.replace) {
            this._request = Object.assign({}, request, { replaced: this._request });
        }
        else {
            this._request = request;
        }
    }
    clearRequest() {
        this._request = undefined;
    }
    get path() {
        const r = this.request;
        return r ? r.path : undefined;
    }
    get params() {
        const r = this.request;
        return Object.assign({}, r ? r.query : undefined, r ? r.params : undefined);
    }
    get query() {
        const r = this.request;
        return Object.assign({}, r ? r.query : undefined);
    }
    get requestHistory() {
        const h = [];
        this._requestHistory.forEach(r => h.push(r));
        return h;
    }
    get canGoBack() {
        return this._requestHistory.length > 1;
    }
    get backRequest() {
        return this._requestHistory.length > 1 ? this._requestHistory[this._requestHistory.length - 2] : undefined;
    }
    back() {
        if (this.canGoBack) {
            this._requestHistory.pop();
            const backRequest = Object.assign({}, this._requestHistory[this._requestHistory.length - 1], { isBackNav: true, backFrom: this.request });
            this.setRequest(backRequest);
            this._loadImpl();
        }
    }
    toJSON() {
        return { id: this.id };
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
    setIcon(icon) {
        this.icon.setComponent(icon ? icon.component : undefined);
        this.icon.setName(icon ? icon.name : undefined);
        this.icon.setText(icon ? icon.text : undefined);
        this.icon.setUrl(icon ? icon.url : undefined);
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AppHostModel.prototype, "_state", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AppHostModel.prototype, "_title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AppHostModel.prototype, "_iconUrl", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AppHostModel.prototype, "icon", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AppHostModel.prototype, "sync", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], AppHostModel.prototype, "view", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], AppHostModel.prototype, "_root", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], AppHostModel.prototype, "_request", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], AppHostModel.prototype, "_initialized", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AppHostModel.prototype, "_requestHistory", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppHostModel.prototype, "root", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setRoot", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setRouter", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppHostModel.prototype, "initialized", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setInitialized", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AppHostModel.prototype, "title", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setTitle", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppHostModel.prototype, "iconUrl", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setIconUrl", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setView", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], AppHostModel.prototype, "_loadDone", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], AppHostModel.prototype, "_loadError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppHostModel.prototype, "_loadImpl", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppHostModel.prototype, "load", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppHostModel.prototype, "request", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setRequest", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "clearRequest", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppHostModel.prototype, "requestHistory", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppHostModel.prototype, "canGoBack", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppHostModel.prototype, "backRequest", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "back", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppHostModel.prototype, "state", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "getState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppHostModel.prototype, "setIcon", null);
exports.AppHostModel = AppHostModel;
