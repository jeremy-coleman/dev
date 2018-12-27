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
const models_1 = require("../../models");
const constants_1 = require("../constants");
const Component_1 = require("./Component");
const WindowModel_1 = require("./WindowModel");
class DashboardModel extends Component_1.ComponentModel {
    constructor() {
        super();
        this.sync = new models_1.SyncModel();
        this._saveDelay = 1000;
        this._saveConfig = (config) => {
            this.saver(config);
        };
        this._loadDone = (config) => {
            this.setConfig(config);
            if (this.saver) {
                this._configSaveDisposer = mobx_1.reaction(() => {
                    return this.config;
                }, this._saveConfig, { delay: this.saveDelay });
            }
            this.sync.syncEnd();
        };
        this._loadError = (error) => {
            console.error(error);
            this.setConfig(undefined);
            this.sync.syncError(error);
        };
        this._setComponentViewport = () => {
            if (this.portalManager && this._component) {
                this._component.setViewport(0, 0, this.width, this.height);
            }
        };
        this._setViewportDisposer = mobx_1.autorun(this._setComponentViewport);
    }
    get type() {
        return constants_1.ComponentTypes.dashboard;
    }
    get dashboardList() {
        return this.parent;
    }
    get component() {
        return this._component;
    }
    set component(value) {
        this.setComponent(value);
    }
    setComponent(component) {
        if (component !== this._component) {
            if (component && component.parent !== this) {
                component.removeFromParent();
            }
            this._component = component;
            if (this._component) {
                this._component.parent = this;
            }
            this._setComponentViewport();
        }
    }
    get windows() {
        return this.findAll(c => c.type === constants_1.ComponentTypes.window);
    }
    get drag() {
        return this._drag;
    }
    dragStart(drag) {
        this._drag = drag;
    }
    dragEnd() {
        this._drag = undefined;
    }
    get blockSource() {
        return this._blockSource;
    }
    set blockSource(value) {
        this.setBlockSource(value);
    }
    setBlockSource(blockSource) {
        this._blockSource = blockSource;
    }
    clearBlockSource() {
        this._blockSource = undefined;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this.setTitle(value);
    }
    setTitle(title) {
        this._title = title;
    }
    get dashboard() {
        return this;
    }
    get componentConfig() {
        return this._component ? this._component.config : undefined;
    }
    set componentConfig(config) {
        this.setComponentConfig(config);
    }
    setComponentConfig(config) {
        if (config) {
            const c = this.componentFactory(config.type);
            this.setComponent(c);
            c.setConfig(config);
        }
        else {
            this.setComponent(undefined);
        }
    }
    get config() {
        return {
            type: this.type,
            title: this.title,
            closeDisabled: this._closeDisabled,
            component: this.componentConfig
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(value) {
        this.sync.syncStart();
        this.setTitle(value ? value.title : undefined);
        this.setCloseDisabled(value ? value.closeDisabled : undefined);
        this.setComponentConfig(value ? value.component : undefined);
        this.sync.syncEnd();
    }
    remove(comp) {
        if (comp && this._component && comp === this._component) {
            this.setComponent(undefined);
            this.removeFromParent();
        }
    }
    replace(newComp, oldComp) {
        if (oldComp === this._component) {
            this.setComponent(newComp);
        }
    }
    get saveDelay() {
        return this._saveDelay;
    }
    set saveDelay(value) {
        if (!isNaN(value) && value >= 0) {
            this._saveDelay = value;
        }
    }
    load() {
        if (this._configSaveDisposer) {
            this._configSaveDisposer();
            delete this._configSaveDisposer;
        }
        if (this.loader) {
            this.sync.syncStart();
            return Promise.resolve(this.loader()).then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    }
    clear() {
        this.setComponent(undefined);
    }
    _visitChildren(callback) {
        if (this._component) {
            this._component.visit(callback);
        }
    }
    _findFirstChild(predicate) {
        if (this._component) {
            return this._component.findFirst(predicate);
        }
    }
    _findAllChildren(predicate) {
        if (this._component) {
            return this._component.findAll(predicate);
        }
    }
    close() {
        if (this._component) {
            this._component.close();
            if (this._portalManager) {
                this._portalManager.destroy();
            }
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], DashboardModel.prototype, "sync", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], DashboardModel.prototype, "_title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], DashboardModel.prototype, "_component", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", WindowModel_1.WindowModel)
], DashboardModel.prototype, "_drag", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], DashboardModel.prototype, "_blockSource", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DashboardModel.prototype, "dashboardList", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardModel.prototype, "component", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "setComponent", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], DashboardModel.prototype, "windows", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DashboardModel.prototype, "drag", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "dragStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "dragEnd", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardModel.prototype, "blockSource", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "setBlockSource", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "clearBlockSource", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardModel.prototype, "title", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "setTitle", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DashboardModel.prototype, "dashboard", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardModel.prototype, "componentConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "setComponentConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "setConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "remove", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "replace", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DashboardModel.prototype, "_loadDone", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DashboardModel.prototype, "_loadError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardModel.prototype, "load", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "clear", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardModel.prototype, "close", null);
exports.DashboardModel = DashboardModel;
