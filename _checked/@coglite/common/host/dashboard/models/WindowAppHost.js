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
class WindowAppHost extends models_1.AppHostModel {
    constructor(window) {
        super();
        this._events = new models_1.EventEmitter();
        this._window = window;
    }
    get defaultRequest() {
        return {
            path: this._window.path,
            params: this._window.params,
            query: this._window.query
        };
    }
    get router() {
        return this._window.router;
    }
    set router(value) {
        this.setRouter(value);
    }
    setRouter(router) {
        this._window.setRouter(router);
    }
    open(request) {
        return this._window.open(request).then(w => w.appHost);
    }
    setRequest(request) {
        super.setRequest(request);
        if (request && request.replace && !request.noUpdate) {
            this._window.setPath(request.path);
            this._window.setParams(request.params);
            this._window.setQuery(request.query);
        }
    }
    close() {
        this._window.close();
    }
    addEventListener(type, handler) {
        this._events.addEventListener(type, handler);
    }
    removeEventListener(type, handler) {
        this._events.addEventListener(type, handler);
    }
    emit(event) {
        this._events.emit(event);
    }
}
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowAppHost.prototype, "setRouter", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowAppHost.prototype, "setRequest", null);
exports.WindowAppHost = WindowAppHost;
exports.default = WindowAppHost;
