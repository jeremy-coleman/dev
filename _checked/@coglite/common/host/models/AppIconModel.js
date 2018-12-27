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
class AppIconModel {
    get url() {
        return this._url;
    }
    set url(value) {
        this.setUrl(value);
    }
    setUrl(url) {
        this._url = url;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this.setText(value);
    }
    setText(text) {
        this._text = text;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    setName(name) {
        this._name = name;
    }
    get component() {
        return this._component;
    }
    set component(value) {
        this.setComponent(value);
    }
    setComponent(component) {
        this._component = component;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AppIconModel.prototype, "_url", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AppIconModel.prototype, "_text", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AppIconModel.prototype, "_name", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", Object)
], AppIconModel.prototype, "_component", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppIconModel.prototype, "url", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppIconModel.prototype, "setUrl", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppIconModel.prototype, "text", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppIconModel.prototype, "setText", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppIconModel.prototype, "name", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppIconModel.prototype, "setName", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppIconModel.prototype, "component", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppIconModel.prototype, "setComponent", null);
exports.AppIconModel = AppIconModel;
