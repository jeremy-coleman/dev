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
class ToggleValue {
    constructor(value) {
        this.value = false;
        this.setExplicit = (value) => this.value = value;
        this.setFalse = () => { this.value = false; };
        this.setTrue = () => this.value = true;
        this.toggle = () => this.value = !this.value;
        value && value === true ? this.value == true : this.value == false;
    }
    get open() { return this.value; }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], ToggleValue.prototype, "value", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ToggleValue.prototype, "setExplicit", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ToggleValue.prototype, "setFalse", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], ToggleValue.prototype, "setTrue", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ToggleValue.prototype, "toggle", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ToggleValue.prototype, "open", null);
exports.ToggleValue = ToggleValue;
class OpenValue {
    constructor() {
        this.open = Boolean(false);
        this.toggle = () => this.open = !this.open;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], OpenValue.prototype, "open", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], OpenValue.prototype, "toggle", void 0);
exports.OpenValue = OpenValue;
class SimpleToggleValue {
    constructor() {
        this.open = Boolean(false);
        this.toggle = () => {
            this.open = !this.open;
        };
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SimpleToggleValue.prototype, "open", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], SimpleToggleValue.prototype, "toggle", void 0);
exports.SimpleToggleValue = SimpleToggleValue;
class StringToggleValue {
    constructor() {
        this.value = 'on';
        this.setExplicit = (value) => this.value = value;
        this.turnOff = () => this.value = 'off';
        this.turnOn = () => this.value = 'on';
        this.toggle = () => this.value == 'on' ? this.value = 'off' : this.value = 'on';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], StringToggleValue.prototype, "value", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], StringToggleValue.prototype, "setExplicit", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], StringToggleValue.prototype, "turnOff", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], StringToggleValue.prototype, "turnOn", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], StringToggleValue.prototype, "toggle", void 0);
exports.StringToggleValue = StringToggleValue;
