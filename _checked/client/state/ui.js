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
const values_1 = require("./values");
class CommandBarStore {
    constructor(items, farItems) {
        this.items = [];
        this.farItems = [];
        this.addItem = (item) => this.items.push(item);
        this.addFarItem = (farItem) => this.farItems.push(farItem);
        this.items = items;
        this.farItems = farItems;
    }
    ;
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], CommandBarStore.prototype, "items", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], CommandBarStore.prototype, "farItems", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], CommandBarStore.prototype, "addItem", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], CommandBarStore.prototype, "addFarItem", void 0);
class UiState {
    constructor() {
        this.title = "Demo";
        this.commandBar = new CommandBarStore();
        this.themeDialogToggle = new values_1.ToggleValue();
        this.menuDrawerToggle = new values_1.ToggleValue();
        this.DrawerToggle = new values_1.ToggleValue();
        this.FormDrawerToggle = new values_1.ToggleValue();
        this.appBarSettingsMenuToggle = new values_1.ToggleValue();
        this.isThemeDialogOpen = false;
        this.onError = (error) => {
            this.uiError = error;
        };
    }
    openThemeDialog() {
        this.isThemeDialogOpen = true;
    }
    closeThemeDialog() {
        this.isThemeDialogOpen = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "commandBar", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "themeDialogToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "menuDrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "DrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "FormDrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "appBarSettingsMenuToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiState.prototype, "isThemeDialogOpen", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UiState.prototype, "openThemeDialog", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UiState.prototype, "closeThemeDialog", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Error)
], UiState.prototype, "uiError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], UiState.prototype, "onError", void 0);
exports.UiState = UiState;
