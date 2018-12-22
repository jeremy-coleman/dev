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
const ComponentIdSequence_1 = require("./ComponentIdSequence");
const NotConfiguredComponentFactory = (type) => {
    throw { code: "ILLEGAL_STATE", message: "A component factory has not been configured" };
};
class ComponentModel {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
    }
    get id() {
        if (!this._id) {
            this._id = ComponentIdSequence_1.ComponentIdSequence.next();
        }
        return this._id;
    }
    get isWindowManager() {
        return false;
    }
    get isOverflow() {
        return false;
    }
    resetViewport() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
    }
    get root() {
        return this.parent ? this.parent.root : this;
    }
    get x() {
        return this._x;
    }
    get rx() {
        return this.x - (this.parent ? this.parent.x : 0);
    }
    get y() {
        return this._y;
    }
    get ry() {
        return this.y - (this.parent ? this.parent.y : 0);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    resize(width, height) {
        if ((width >= 0 && width !== this._width) || (height >= 0 && height !== this._height)) {
            this._width = width;
            this._height = height;
        }
    }
    position(x, y) {
        this._x = x;
        this._y = y;
    }
    setViewport(x, y, width, height) {
        this.position(x, y);
        this.resize(width, height);
    }
    get addApp() {
        if (this._addApp !== undefined) {
            return this._addApp;
        }
        const p = this.parent;
        if (p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.addApp : undefined;
    }
    set addApp(addApp) {
        this.setAddApp(addApp);
    }
    get portalManager() {
        if (this._portalManager !== undefined) {
            return this._portalManager;
        }
        const p = this.parent;
        if (p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.portalManager : undefined;
    }
    set portalManager(value) {
        this.setPortalManager(value);
    }
    setPortalManager(portalManager) {
        this._portalManager = portalManager;
    }
    get componentFactory() {
        if (this._componentFactory !== undefined) {
            return this._componentFactory;
        }
        const p = this.parent;
        if (p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.componentFactory : NotConfiguredComponentFactory;
    }
    set componentFactory(value) {
        this.setComponentFactory(value);
    }
    setComponentFactory(componentFactory) {
        this._componentFactory = componentFactory;
    }
    get closeDisabled() {
        if (this._closeDisabled !== undefined) {
            return this._closeDisabled;
        }
        const p = this.parent;
        if (p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.closeDisabled : false;
    }
    set closeDisabled(value) {
        this.setCloseDisabled(value);
    }
    setCloseDisabled(closeDisabled) {
        this._closeDisabled = closeDisabled;
    }
    setAddApp(addApp) {
        this._addApp = addApp;
    }
    get router() {
        if (this._router !== undefined) {
            return this._router;
        }
        const p = this.parent;
        if (p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.router : undefined;
    }
    set router(value) {
        this.setRouter(value);
    }
    setRouter(router) {
        this._router = router;
    }
    get dashboard() {
        const p = this.parent;
        if (p === this) {
            console.warn("-- Dashboard Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.dashboard : undefined;
    }
    remove(comp) {
    }
    removeFromParent() {
        if (this.parent) {
            this.parent.remove(this);
            this.parent = undefined;
        }
    }
    replace(newItem, oldItem) {
    }
    get config() {
        return undefined;
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
    }
    _visitChildren(callback) {
    }
    visit(callback) {
        callback(this);
    }
    _findFirstChild(predicate) {
        return undefined;
    }
    findFirst(predicate) {
        if (predicate(this)) {
            return this;
        }
        return this._findFirstChild(predicate);
    }
    _findAllChildren(predicate) {
        return [];
    }
    findAll(predicate) {
        let r = [];
        if (predicate(this)) {
            r.push(this);
        }
        const tr = this._findAllChildren(predicate);
        if (tr && tr.length > 0) {
            r = r.concat(tr);
        }
        return r;
    }
    close() {
    }
    toJSON() {
        return this.config;
    }
}
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], ComponentModel.prototype, "parent", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], ComponentModel.prototype, "_portalManager", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Function)
], ComponentModel.prototype, "_componentFactory", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], ComponentModel.prototype, "_addApp", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], ComponentModel.prototype, "_router", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], ComponentModel.prototype, "_closeDisabled", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], ComponentModel.prototype, "_needsOverflow", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ComponentModel.prototype, "_x", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ComponentModel.prototype, "_y", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ComponentModel.prototype, "_width", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ComponentModel.prototype, "_height", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "isOverflow", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "resetViewport", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "root", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "x", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "rx", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "y", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "ry", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "width", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "height", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "resize", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "position", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setViewport", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ComponentModel.prototype, "addApp", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ComponentModel.prototype, "portalManager", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setPortalManager", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object])
], ComponentModel.prototype, "componentFactory", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setComponentFactory", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], ComponentModel.prototype, "closeDisabled", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setCloseDisabled", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setAddApp", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ComponentModel.prototype, "router", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setRouter", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ComponentModel.prototype, "dashboard", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "setConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComponentModel.prototype, "close", null);
exports.ComponentModel = ComponentModel;
