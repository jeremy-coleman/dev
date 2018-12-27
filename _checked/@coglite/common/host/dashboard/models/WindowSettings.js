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
const WindowModel_1 = require("./WindowModel");
class WindowSettings {
    constructor(window) {
        this._data = {};
        this._window = window;
    }
    get data() {
        return Object.assign({}, this._data);
    }
    set data(value) {
        this.setData(value);
    }
    setData(data) {
        this._data = Object.assign({}, this._data, data);
    }
    get borderWidth() {
        let borderWidth = this._borderWidth;
        if (borderWidth === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if (mgr) {
                borderWidth = mgr.windowSettings.borderWidth;
            }
        }
        return borderWidth !== undefined ? borderWidth : 0;
    }
    set borderWidth(value) {
        this.setBorderWidth(value);
    }
    setBorderWidth(borderWidth) {
        if (borderWidth >= 0) {
            this._borderWidth = borderWidth;
        }
    }
    get headerHeight() {
        let headerHeight = this._headerHeight;
        if (headerHeight === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if (mgr) {
                headerHeight = mgr.windowSettings.headerHeight;
            }
        }
        return headerHeight !== undefined ? headerHeight : 0;
    }
    set headerHeight(value) {
        this.setHeaderHeight(value);
    }
    setHeaderHeight(headerHeight) {
        if (headerHeight >= 0) {
            this._headerHeight = headerHeight;
        }
    }
    get resizable() {
        let resizable = this._resizable;
        if (resizable === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if (mgr) {
                resizable = mgr.windowSettings.resizable;
            }
        }
        return resizable !== undefined ? resizable : false;
    }
    set resizable(value) {
        this.setResizable(value);
    }
    setResizable(resizable) {
        if (resizable !== undefined) {
            this._resizable = resizable;
        }
    }
    get draggable() {
        let draggable = this._draggable;
        if (draggable === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if (mgr) {
                draggable = mgr.windowSettings.draggable;
            }
        }
        return draggable !== undefined ? draggable : false;
    }
    set draggable(value) {
        this.setDraggable(value);
    }
    setDraggable(draggable) {
        if (draggable !== undefined) {
            this._draggable = draggable;
        }
    }
    get config() {
        return {
            borderWidth: this._borderWidth,
            headerHeight: this._headerHeight,
            resizable: this._resizable,
            draggable: this._draggable,
            data: this.data
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
        this.setBorderWidth(config ? config.borderWidth : undefined);
        this.setHeaderHeight(config ? config.headerHeight : undefined);
        this.setResizable(config ? config.resizable : undefined);
        this.setDraggable(config ? config.draggable : undefined);
        this.setData(config ? config.data : undefined);
    }
    toJSON() {
        return this.config;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", WindowModel_1.WindowModel)
], WindowSettings.prototype, "_window", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], WindowSettings.prototype, "_borderWidth", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], WindowSettings.prototype, "_headerHeight", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WindowSettings.prototype, "_data", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WindowSettings.prototype, "_resizable", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WindowSettings.prototype, "_draggable", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "data", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setData", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "borderWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setBorderWidth", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "headerHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setHeaderHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "resizable", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setResizable", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "draggable", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setDraggable", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowSettings.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowSettings.prototype, "setConfig", null);
exports.WindowSettings = WindowSettings;
