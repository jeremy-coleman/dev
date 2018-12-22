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
const datakit_1 = require("@coglite/common/datakit");
const mobx_1 = require("mobx");
const Dashboard_1 = require("./Dashboard");
const DashboardList_1 = require("./DashboardList");
class DashboardAddModel {
    constructor() {
        this.active = false;
        this.makeActive = true;
    }
    init(opts) {
        this.dashboardList = opts.dashboardList;
        this.dashboard = new Dashboard_1.DashboardModel();
        this.existing = opts.existing;
        let dashboardNumber = 1;
        let suggestedTitle;
        while (true) {
            suggestedTitle = `Workspace ${dashboardNumber}`;
            if (!this.dashboardList.dashboards.some(db => db.title === suggestedTitle)) {
                break;
            }
            else {
                dashboardNumber++;
            }
        }
        this.dashboard.setTitle(suggestedTitle);
        this.active = true;
    }
    setExisting(existing) {
        this.existing = existing;
    }
    setMakeActive(makeActive) {
        this.makeActive = makeActive;
    }
    _close() {
        this.existing = undefined;
        this.dashboardList = undefined;
        this.active = false;
    }
    get saveEnabled() {
        return datakit_1.StringUtils.isNotBlank(this.dashboard.title) ? true : false;
    }
    save() {
        if (this.existing) {
            this.dashboard.setComponentConfig(this.existing.componentConfig);
        }
        this.dashboardList.add(this.dashboard, this.makeActive);
        this._close();
    }
    cancel() {
        this._close();
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], DashboardAddModel.prototype, "active", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", DashboardList_1.DashboardListModel)
], DashboardAddModel.prototype, "dashboardList", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Dashboard_1.DashboardModel)
], DashboardAddModel.prototype, "existing", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Dashboard_1.DashboardModel)
], DashboardAddModel.prototype, "dashboard", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], DashboardAddModel.prototype, "makeActive", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "init", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Dashboard_1.DashboardModel]),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "setExisting", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "setMakeActive", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "_close", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DashboardAddModel.prototype, "saveEnabled", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "save", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardAddModel.prototype, "cancel", null);
exports.DashboardAddModel = DashboardAddModel;
