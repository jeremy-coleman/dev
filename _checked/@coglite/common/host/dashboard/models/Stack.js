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
const actions_1 = require("../actions");
const constants_1 = require("../constants");
const WindowManager_1 = require("./WindowManager");
const WindowModel_1 = require("./WindowModel");
class StackModel extends WindowManager_1.WindowManager {
    constructor() {
        super();
        this.Defaults = {
            headerHeight: 32
        };
        this._setWindowViewports = () => {
            if (this.portalManager) {
                const childY = this.y + this.headerHeight;
                const childHeight = this.height - this.headerHeight;
                const active = this.active;
                this.windows.forEach(w => {
                    w.setViewport(this.x, childY, w === active ? this.width : 0, w === active ? childHeight : 0);
                });
            }
        };
        this._setViewportDisposer = mobx_1.autorun(this._setWindowViewports);
    }
    get type() {
        return constants_1.ComponentTypes.stack;
    }
    get headerHeight() {
        return this._headerHeight !== undefined ? this._headerHeight : this.Defaults.headerHeight;
    }
    set headerHeight(value) {
        this.setHeaderHeight(value);
    }
    setHeaderHeight(headerHeight) {
        if (headerHeight >= 0) {
            this._headerHeight = headerHeight;
        }
    }
    get activeIndex() {
        return this._activeIndex || 0;
    }
    set activeIndex(value) {
        this.setActiveIndex(value);
    }
    setActiveIndex(activeIndex) {
        if (activeIndex !== this._activeIndex) {
            this._activeIndex = activeIndex;
        }
    }
    get active() {
        const activeIndex = this.activeIndex;
        return activeIndex >= 0 && activeIndex < this.windows.length ? this.windows[activeIndex] : undefined;
    }
    set active(value) {
        this.setActive(value);
    }
    setActive(active) {
        this.setActiveIndex(this.windows.indexOf(active));
    }
    add(win, opts) {
        super.add(win, opts);
        if ((opts && opts.makeActive) || this.windows.length === 1) {
            this.setActive(win);
        }
    }
    _windowDropped(win) {
        this.setActive(win);
    }
    splitLeft(newComp) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if (newComp) {
            newStack.add(newComp);
        }
        else {
            newStack.addNew();
        }
        actions_1.splitHorizontal(this, newStack, this);
    }
    splitRight(newComp) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if (newComp) {
            newStack.add(newComp);
        }
        else {
            newStack.addNew();
        }
        actions_1.splitHorizontal(this, this, newStack);
    }
    splitTop(newComp) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if (newComp) {
            newStack.add(newComp);
        }
        else {
            newStack.addNew();
        }
        actions_1.splitVertical(this, newStack, this);
    }
    splitBottom(newComp) {
        const newStack = new StackModel();
        newStack.setCloseDisabled(this.closeDisabled);
        if (newComp) {
            newStack.add(newComp);
        }
        else {
            newStack.addNew();
        }
        actions_1.splitVertical(this, this, newStack);
    }
    dropWindow(refWindow) {
        const drag = this.dashboard ? this.dashboard.drag : undefined;
        if (drag) {
            const win = drag;
            if (refWindow) {
                if (drag.parent === this) {
                    const dragIdx = this.windows.indexOf(win);
                    const refIdx = this.windows.indexOf(refWindow);
                    this.insertAt(win, dragIdx > refIdx ? refIdx : refIdx + 1);
                }
                else {
                    this.insertBefore(win, refWindow);
                }
            }
            else {
                this.add(win);
            }
            this._windowDropped(win);
            this.dragEnd();
        }
    }
    get config() {
        return {
            type: this.type,
            activeIndex: this._activeIndex,
            windows: this.windows.filter(w => !w.transient).map(w => w.config),
            closeDisabled: this._closeDisabled
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
        this.windows = [];
        if (config && config.windows && config.windows.length > 0) {
            config.windows.forEach(wc => {
                const w = new WindowModel_1.WindowModel();
                this.add(w);
                w.setConfig(wc);
            });
        }
        this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
    }
    remove(node) {
        super.remove(node);
        if (this.windows.length > 0) {
            if (this.activeIndex >= this.windows.length) {
                this.setActiveIndex(this.windows.length - 1);
            }
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], StackModel.prototype, "Defaults", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], StackModel.prototype, "_activeIndex", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], StackModel.prototype, "_headerHeight", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StackModel.prototype, "headerHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "setHeaderHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StackModel.prototype, "activeIndex", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "setActiveIndex", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", WindowModel_1.WindowModel),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel])
], StackModel.prototype, "active", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "setActive", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel, Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "add", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "splitLeft", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "splitRight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "splitTop", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "splitBottom", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "dropWindow", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StackModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "setConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StackModel.prototype, "remove", null);
exports.StackModel = StackModel;
