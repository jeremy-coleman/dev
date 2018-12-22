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
const Dashboard_1 = require("./Dashboard");
const Stack_1 = require("./Stack");
class DashboardListModel extends Component_1.ComponentModel {
    constructor() {
        super();
        this.sync = new models_1.SyncModel();
        this._activeIndex = -1;
        this.dashboards = [];
        this._createDefaultDashboard = true;
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
            if (this.dashboardCount === 0) {
                this.addDefaultDashboard();
            }
            this.sync.syncEnd();
        };
        this._loadError = (error) => {
            console.error(error);
            this.setConfig(undefined);
            this.sync.syncError(error);
        };
        this._setDashboardViewports = () => {
            const active = this.active;
            this.dashboards.forEach(db => {
                db.setViewport(0, 0, db === active ? this.width : 0, db === active ? this.height : 0);
            });
        };
        this._setViewportDisposer = mobx_1.autorun(this._setDashboardViewports);
    }
    get type() {
        return constants_1.ComponentTypes.dashboardList;
    }
    get createDefaultDashboard() {
        return this._createDefaultDashboard;
    }
    set createDefaultDashboard(value) {
        this.setCreateDefaultDashboard(value);
    }
    setCreateDefaultDashboard(createDefaultDashboard) {
        this._createDefaultDashboard = createDefaultDashboard;
    }
    get dashboardCount() {
        return this.dashboards ? this.dashboards.length : 0;
    }
    get activeIndex() {
        return this._activeIndex || 0;
    }
    set activeIndex(value) {
        this.setActiveIndex(value);
    }
    setActiveIndex(value) {
        if (value !== this._activeIndex) {
            this._activeIndex = value;
        }
    }
    get active() {
        return this.activeIndex >= 0 && this.activeIndex < this.dashboards.length ? this.dashboards[this.activeIndex] : undefined;
    }
    set active(value) {
        this.setActive(value);
    }
    setActive(value) {
        this.activeIndex = this.dashboards.indexOf(value);
    }
    get config() {
        return {
            type: this.type,
            activeIndex: this.activeIndex,
            dashboards: this.dashboards.map(d => d.config),
            closeDisabled: this._closeDisabled
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(value) {
        this.dashboards = [];
        if (value && value.dashboards && value.dashboards.length > 0) {
            value.dashboards.forEach(dc => {
                const db = new Dashboard_1.DashboardModel();
                this.add(db);
                db.setConfig(dc);
            });
        }
        this.setActiveIndex(value && !isNaN(value.activeIndex) ? value.activeIndex : -1);
        this.setCloseDisabled(value ? value.removeItemsDisabled : undefined);
    }
    add(dashboard, makeActive = true) {
        if (dashboard.parent !== this) {
            dashboard.removeFromParent();
            dashboard.parent = this;
            this.dashboards.push(dashboard);
            if (!dashboard.component && this.addApp) {
                const s = new Stack_1.StackModel();
                dashboard.setComponent(s);
                s.addNew();
            }
            if (makeActive) {
                this.active = dashboard;
            }
        }
    }
    addDefaultDashboard() {
        if (this.dashboardCount === 0 && this.createDefaultDashboard && this.addApp) {
            const newDashboard = new Dashboard_1.DashboardModel();
            newDashboard.setTitle("Workspace 1");
            this.add(newDashboard, true);
        }
    }
    remove(node) {
        const idx = this.dashboards.indexOf(node);
        if (idx >= 0) {
            const dashboard = this.dashboards[idx];
            dashboard.parent = undefined;
            this.dashboards.splice(idx, 1);
            if (this.activeIndex >= this.dashboards.length) {
                this.setActiveIndex(this.dashboards.length - 1);
            }
            dashboard.close();
            if (this.dashboardCount === 0) {
                this.addDefaultDashboard();
            }
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
            return this.loader().then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    }
    _findFirstChild(predicate) {
        let r;
        this.dashboards.some(d => {
            r = d.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    }
    _findAllChildren(predicate) {
        let r = [];
        let dr;
        this.dashboards.forEach(d => {
            dr = d.findAll(predicate);
            if (dr && dr.length > 0) {
                r = r.concat(dr);
            }
        });
        return r;
    }
    close() {
        this.dashboards.forEach(db => db.close());
        this.dashboards = [];
        this.setActiveIndex(-1);
        this.addDefaultDashboard();
        if (this._portalManager) {
            this._portalManager.destroy();
        }
    }
    clear() {
        this.close();
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], DashboardListModel.prototype, "sync", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], DashboardListModel.prototype, "_activeIndex", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], DashboardListModel.prototype, "dashboards", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], DashboardListModel.prototype, "_createDefaultDashboard", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardListModel.prototype, "createDefaultDashboard", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "setCreateDefaultDashboard", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DashboardListModel.prototype, "dashboardCount", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardListModel.prototype, "activeIndex", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "setActiveIndex", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Dashboard_1.DashboardModel),
    __metadata("design:paramtypes", [Object])
], DashboardListModel.prototype, "active", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Dashboard_1.DashboardModel]),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "setActive", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DashboardListModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "setConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Dashboard_1.DashboardModel, Boolean]),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "add", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DashboardListModel.prototype, "_loadDone", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DashboardListModel.prototype, "_loadError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardListModel.prototype, "load", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "close", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardListModel.prototype, "clear", null);
exports.DashboardListModel = DashboardListModel;
