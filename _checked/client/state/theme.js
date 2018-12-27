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
const ux_1 = require("@coglite/common/ux");
let createMuiTheme = (input) => Object.assign({}, { ...ux_1.defaultTheme }, { ...input });
class ThemeState {
    constructor() {
        this.brandOptions = {
            red: {
                primary: "#F44336",
                secondary: "#FFD740",
                background: "#FFFFFF",
            },
            blue: {
                primary: "#2196F3",
                secondary: "#FFE57F",
                background: "#FFFFFF",
            },
            coglite: {
                primary: "#424242",
                secondary: "#607D8B",
                background: "#FFFFFF",
            },
        };
        this.themeId = "coglite";
        this.SettingsModalToggle = new values_1.ToggleValue();
        this.fabricTheme = {
            palette: {
                themePrimary: this.brandOptions[this.themeId].primary,
                themeDarker: "#004578",
                themeDark: "#005a9e",
                themeDarkAlt: "#106ebe",
                themeSecondary: "#2b88d8",
                themeTertiary: "#71afe5",
                themeLight: "#c7e0f4",
                themeLighter: "#deecf9",
                themeLighterAlt: "#eff6fc",
                black: "#000000",
                blackTranslucent40: "rgba(0,0,0,.4)",
                neutralDark: "#212121",
                neutralPrimary: "#333333",
                neutralPrimaryAlt: "#3c3c3c",
                neutralSecondary: "#666666",
                neutralSecondaryAlt: "#767676",
                neutralTertiary: "#a6a6a6",
                neutralTertiaryAlt: "#c8c8c8",
                neutralQuaternary: "#d0d0d0",
                neutralQuaternaryAlt: "#dadada",
                neutralLight: "#eaeaea",
                neutralLighter: "#f4f4f4",
                neutralLighterAlt: "#f8f8f8",
                accent: "#F44336",
                white: "#ffffff",
                whiteTranslucent40: "rgba(255,255,255,.4)",
                orange: "#d83b01",
                redDark: "#a80000"
            }
        };
    }
    get muiTheme() {
        const basicTheme = createMuiTheme({
            palette: {
                primary: {
                    main: this.brandOptions[this.themeId].primary,
                },
                secondary: {
                    main: this.brandOptions[this.themeId].secondary,
                }
            },
            typography: {
                useNextVariants: true,
            },
        });
        basicTheme["shape"] = {
            borderRadius: 4
        };
        return basicTheme;
    }
    get combinedTheme() {
        return ({ ...this.muiTheme, ...this.fabricTheme.palette });
    }
    ;
    get palette() {
        return this.combinedTheme.palette;
    }
    updateTheme(themeId) {
        this.themeId = themeId;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], ThemeState.prototype, "themeId", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], ThemeState.prototype, "SettingsModalToggle", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ThemeState.prototype, "muiTheme", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ThemeState.prototype, "combinedTheme", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ThemeState.prototype, "palette", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThemeState.prototype, "updateTheme", null);
exports.ThemeState = ThemeState;
