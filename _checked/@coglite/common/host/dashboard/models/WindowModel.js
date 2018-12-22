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
const constants_1 = require("../constants");
const WindowResizeType_1 = require("../constants/WindowResizeType");
const Component_1 = require("./Component");
const WindowAppHost_1 = require("./WindowAppHost");
const WindowSettings_1 = require("./WindowSettings");
class WindowModel extends Component_1.ComponentModel {
    constructor() {
        super();
        this._transient = false;
        this._settings = new WindowSettings_1.WindowSettings(this);
        this._dragState = {};
        this._updateViewport = () => {
            const portalManager = this.portalManager;
            if (portalManager) {
                let { x, y, width, height } = this;
                const portal = portalManager.getPortal(this);
                portal.setViewport(x, y, width, height);
                if (this.maximized) {
                    portal.bringToFront();
                }
                else {
                    portal.bringToBase();
                }
            }
        };
        this._appHost = new WindowAppHost_1.WindowAppHost(this);
        this._updateViewportDisposer = mobx_1.autorun(this._updateViewport);
    }
    get settings() {
        return this._settings;
    }
    get appHost() {
        return this._appHost;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this.setPath(value);
    }
    setPath(path) {
        this._path = path;
    }
    get params() {
        return Object.assign({}, this._params, this._query);
    }
    set params(value) {
        this.setParams(value);
    }
    setParams(params) {
        this._params = params;
    }
    get query() {
        return Object.assign({}, this._query);
    }
    set query(value) {
        this.setQuery(value);
    }
    setQuery(query) {
        this._query = query;
    }
    get title() {
        return this._appHost.title;
    }
    set title(value) {
        this.setTitle(value);
    }
    setTitle(title) {
        this._appHost.setTitle(title);
    }
    get contentHidden() {
        return this._contentHidden ? true : false;
    }
    set contentHidden(value) {
        this.setContentHidden(value);
    }
    setContentHidden(contentHidden) {
        this._contentHidden = contentHidden;
    }
    toggleContent() {
        this.setContentHidden(!this.contentHidden);
    }
    get transient() {
        return this._transient;
    }
    set transient(value) {
        this.setTransient(value);
    }
    setTransient(transient) {
        this._transient = transient;
    }
    get manager() {
        const parent = this.parent;
        return parent && parent.isWindowManager ? parent : undefined;
    }
    get type() {
        return constants_1.ComponentTypes.window;
    }
    get active() {
        const manager = this.manager;
        if (manager && manager.type === constants_1.ComponentTypes.stack) {
            return manager.active === this;
        }
        return false;
    }
    activate() {
        const manager = this.manager;
        if (manager && manager.type === constants_1.ComponentTypes.stack) {
            manager.setActive(this);
        }
    }
    get dragState() {
        return this._dragState;
    }
    set dragState(value) {
        this.setDragState(value);
    }
    setDragState(dragState) {
        this._dragState = Object.assign({}, this._dragState, dragState);
    }
    clearDragState() {
        this._dragState = {};
    }
    get dragging() {
        const mgr = this.manager;
        return mgr ? mgr.drag === this : false;
    }
    dragStart(dragState) {
        this.setDragState(dragState);
        const mgr = this.manager;
        if (mgr) {
            mgr.dragStart(this);
        }
    }
    dragEnd() {
        this.clearDragState();
        const mgr = this.manager;
        if (mgr) {
            mgr.dragEnd();
        }
    }
    get resizing() {
        const mgr = this.manager;
        return mgr ? mgr.resizing === this : false;
    }
    resizeStart(type) {
        const mgr = this.manager;
        if (mgr) {
            mgr.resizeStart(this, type);
        }
    }
    resizeEnd() {
        const mgr = this.manager;
        if (mgr) {
            mgr.resizeEnd();
        }
    }
    maximize() {
        this.setMaximized(true);
    }
    restoreSize() {
        this.setMaximized(false);
    }
    get maximized() {
        const mgr = this.manager;
        return mgr ? mgr.maximized === this : false;
    }
    set maximized(value) {
        this.setMaximized(value);
    }
    setMaximized(maximized) {
        const mgr = this.manager;
        if (maximized) {
            mgr.setMaximized(this);
        }
        else if (mgr.maximized === this) {
            mgr.setMaximized(undefined);
        }
    }
    get config() {
        return {
            type: this.type,
            path: this._path,
            query: this._query,
            closeDisabled: this._closeDisabled,
            contentHidden: this._contentHidden,
            settings: this._settings.config
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
        this.setTitle(config ? config.title : undefined);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
        this.setPath(config ? config.path : undefined);
        this.setQuery(config ? config.query : undefined);
        this.setParams(config ? config.params : undefined);
        this.setContentHidden(config ? config.contentHidden : undefined);
        this._settings.setConfig(config ? config.settings : undefined);
    }
    open(request) {
        const manager = this.manager;
        if (manager) {
            return manager.open(request);
        }
        return Promise.reject({ code: "INVALID_STATE", message: "No Window Manager Set" });
    }
    load(request) {
        return this.appHost.load(request);
    }
    close() {
        this._appHost.emit({ type: "beforeunload" });
        this._appHost.emit({ type: "beforeclose" });
        if (this.onClose) {
            this.onClose(this);
        }
        const portalManager = this.portalManager;
        if (portalManager) {
            portalManager.destroyPortal(this);
        }
        this.removeFromParent();
        this._appHost.emit({ type: "unload" });
        this._appHost.emit({ type: "close" });
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WindowModel.prototype, "_path", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WindowModel.prototype, "_params", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WindowModel.prototype, "_query", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", WindowAppHost_1.WindowAppHost)
], WindowModel.prototype, "_appHost", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WindowModel.prototype, "_contentHidden", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WindowModel.prototype, "_transient", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", WindowSettings_1.WindowSettings)
], WindowModel.prototype, "_settings", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WindowModel.prototype, "_dragState", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "settings", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "appHost", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "path", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setPath", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "params", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setParams", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "query", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setQuery", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "title", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setTitle", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "contentHidden", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setContentHidden", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "toggleContent", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "transient", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setTransient", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "manager", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "active", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "activate", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "dragState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setDragState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "clearDragState", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "dragging", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "dragStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "dragEnd", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowModel.prototype, "resizing", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "resizeStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "resizeEnd", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "maximize", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "restoreSize", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "maximized", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setMaximized", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "setConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "load", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowModel.prototype, "close", null);
exports.WindowModel = WindowModel;
