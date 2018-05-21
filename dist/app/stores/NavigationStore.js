"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const history_1 = require("history");
class NavigationStore {
    constructor() {
        this.location = window.location;
        this.history = history_1.createHashHistory();
        this.history.listen((location) => { console.log(location); });
    }
    isActive(path) {
        return location.pathname === path;
    }
    goTo(event, { name }) {
        this.history.push(String(name));
    }
    push(location) {
        this.history.push(location);
    }
    replace(location) {
        this.history.replace(location);
    }
    go(n) {
        this.history.go(n);
    }
    goBack() {
        this.history.goBack();
    }
    goForward() {
        this.history.goForward();
    }
}
__decorate([
    mobx_1.observable
], NavigationStore.prototype, "location", void 0);
__decorate([
    mobx_1.action.bound
], NavigationStore.prototype, "isActive", null);
__decorate([
    mobx_1.action.bound
], NavigationStore.prototype, "goTo", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "push", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "replace", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "go", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "goBack", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "goForward", null);
exports.NavigationStore = NavigationStore;
/*
import {observable, action} from 'mobx';
import Navigation from './Navigation';

export class Counter {
  @observable count: number = 0;

  @action
  navigateToAbout(): void {
    Navigation.push('/about');
  }

  @action
  increment(): void {
    this.count += 1;
  }

  @action
  decrement(): void {
    this.count -= 1;
  }
}

export default new Counter();
*/ 
