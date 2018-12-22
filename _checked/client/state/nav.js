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
class NavState {
    constructor() {
        this.goTo = (inputRoute) => this.route = inputRoute;
        this.goToChartDrawer = (inputRoute) => this.chartDrawerRoute = inputRoute;
        this.goToMlDrawer = (inputRoute) => this.mlDrawerRoute = inputRoute;
        this.route = 'home';
    }
    ;
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavState.prototype, "route", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavState.prototype, "chartDrawerRoute", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavState.prototype, "mlDrawerRoute", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavState.prototype, "goTo", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavState.prototype, "goToChartDrawer", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavState.prototype, "goToMlDrawer", void 0);
exports.NavState = NavState;
