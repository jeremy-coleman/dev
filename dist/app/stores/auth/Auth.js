"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const mobx_persist_1 = require("mobx-persist");
class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.login = (_args) => {
            this.isLoggedIn = true;
            this.profile = { username: "user" };
        };
        this.logout = () => {
            this.isLoggedIn = false;
            this.profile = {};
        };
        this.profile = {};
    }
}
Auth.persistenceKey = "coglite:auth";
__decorate([
    mobx_persist_1.persist, mobx_1.observable
], Auth.prototype, "isLoggedIn", void 0);
__decorate([
    mobx_1.action
], Auth.prototype, "login", void 0);
__decorate([
    mobx_1.action
], Auth.prototype, "logout", void 0);
__decorate([
    mobx_1.observable
], Auth.prototype, "profile", void 0);
exports.Auth = Auth;
