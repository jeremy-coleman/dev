"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const palette_1 = require("../styles/palette");
const styles_1 = require("@material-ui/core/styles");
const mobx_1 = require("mobx");
class ToggleOpenValue {
    constructor() {
        this.open = false;
        this.openDrawer = (open) => {
            this.open = open;
        };
        this.closeDrawer = () => {
            this.open = false;
        };
    }
}
__decorate([
    mobx_1.observable
], ToggleOpenValue.prototype, "open", void 0);
__decorate([
    mobx_1.action
], ToggleOpenValue.prototype, "openDrawer", void 0);
__decorate([
    mobx_1.action
], ToggleOpenValue.prototype, "closeDrawer", void 0);
exports.ToggleOpenValue = ToggleOpenValue;
class TabValue {
    constructor() {
        this.tabValue = 0;
    }
    setTab(event, tabValue) {
        this.tabValue = tabValue;
    }
}
__decorate([
    mobx_1.observable
], TabValue.prototype, "tabValue", void 0);
__decorate([
    mobx_1.action
], TabValue.prototype, "setTab", null);
exports.TabValue = TabValue;
class UiStore {
    constructor() {
        this.title = "Coglite";
        this.themeId = "myriad";
        this.themeDialogToggle = new ToggleOpenValue();
        this.menuDrawerToggle = new ToggleOpenValue();
        this.nodeDrawerToggle = new ToggleOpenValue();
        this.nodeFormDrawerToggle = new ToggleOpenValue();
        this.appBarSettingsMenuToggle = new ToggleOpenValue();
        this.appTabs = new TabValue();
        this.isThemeDialogOpen = false;
        this.onError = (error) => { this.uiError = error; };
    }
    get muiTheme() {
        return styles_1.createMuiTheme({
            palette: {
                primary: {
                    main: palette_1.palette[this.themeId].primary,
                },
                secondary: {
                    main: palette_1.palette[this.themeId].secondary,
                },
            },
        });
    }
    get muiThemeVariables() {
        return palette_1.ThemeVariables[this.themeId];
    }
    updateTheme(themeId) {
        this.themeId = themeId;
    }
    openThemeDialog() {
        this.isThemeDialogOpen = true;
    }
    closeThemeDialog() {
        this.isThemeDialogOpen = false;
    }
}
__decorate([
    mobx_1.observable
], UiStore.prototype, "title", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "themeId", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "themeDialogToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "menuDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "nodeDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "nodeFormDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "appBarSettingsMenuToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "appTabs", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "isThemeDialogOpen", void 0);
__decorate([
    mobx_1.computed
], UiStore.prototype, "muiTheme", null);
__decorate([
    mobx_1.computed
], UiStore.prototype, "muiThemeVariables", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "updateTheme", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "openThemeDialog", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "closeThemeDialog", null);
__decorate([
    mobx_1.observable
], UiStore.prototype, "uiError", void 0);
__decorate([
    mobx_1.action
], UiStore.prototype, "onError", void 0);
exports.UiStore = UiStore;
