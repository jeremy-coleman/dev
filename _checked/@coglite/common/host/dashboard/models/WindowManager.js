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
const datakit_1 = require("@coglite/common/datakit");
const mobx_1 = require("mobx");
const WindowResizeType_1 = require("../constants/WindowResizeType");
const Component_1 = require("./Component");
const WindowModel_1 = require("./WindowModel");
const WindowSettings_1 = require("./WindowSettings");
class WindowManager extends Component_1.ComponentModel {
    constructor() {
        super(...arguments);
        this.windows = [];
        this._windowSettings = new WindowSettings_1.WindowSettings();
    }
    get type() {
        return null;
    }
    get isRequiresOverflow() {
        return false;
    }
    get windowSettings() {
        return this._windowSettings;
    }
    get first() {
        return this.windowCount > 0 ? this.windows[0] : undefined;
    }
    get last() {
        return this.windowCount > 0 ? this.windows[this.windows.length - 1] : undefined;
    }
    get windowCount() {
        return this.windows ? this.windows.length : 0;
    }
    get isWindowManager() {
        return true;
    }
    add(win, opts) {
        if (win) {
            if (win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            }
            else {
                const itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
        }
    }
    addNew(opts) {
        if (this.addApp) {
            let addApp = datakit_1.isFunction(this.addApp) ? (this.addApp)() : this.addApp;
            if (opts) {
                addApp = Object.assign({}, addApp, opts);
            }
            return this.open(addApp);
        }
        return Promise.resolve();
    }
    insertAt(item, index) {
        if (item && index >= 0 && index < this.windows.length) {
            let refStackItem = this.windows[index];
            let insertIdx = -1;
            if (item.parent !== this) {
                item.removeFromParent();
                item.parent = this;
                insertIdx = index;
            }
            else {
                const itemIdx = this.windows.indexOf(item);
                if (itemIdx >= 0 && itemIdx !== index) {
                    this.windows.splice(itemIdx, 1);
                    insertIdx = this.windows.indexOf(refStackItem);
                }
            }
            if (insertIdx >= 0) {
                this.windows.splice(insertIdx, 0, item);
            }
        }
        else {
            this.add(item);
        }
    }
    insertBefore(item, refItem) {
        if (!refItem) {
            this.add(item);
        }
        else if (item) {
            this.insertAt(item, this.windows.indexOf(refItem));
        }
    }
    replace(newItem, oldItem) {
        if (newItem && oldItem && oldItem.parent === this) {
            this.insertBefore(newItem, oldItem);
            oldItem.removeFromParent();
        }
    }
    open(request) {
        let win;
        if (request && request.replace && request.name) {
            const db = this.dashboard;
            win = db.findFirst(w => {
                return w.type === "window" ? w.name === request.name : false;
            });
        }
        if (!win) {
            win = new WindowModel_1.WindowModel();
            if (request) {
                win.name = request.name;
                win.setPath(request.path);
                win.setParams(request.params);
                win.setQuery(request.query);
                if (request.title) {
                    win.setTitle(request.title);
                }
                if (request.transient !== undefined) {
                    win.setTransient(request.transient);
                }
            }
            this.add(win, request);
        }
        else {
            win.load(request);
        }
        return Promise.resolve(win);
    }
    _visitChildren(callback) {
        this.windows.forEach(w => w.visit(callback));
    }
    _findFirstChild(predicate) {
        let r;
        this.windows.some(w => {
            r = w.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    }
    _findAllChildren(predicate) {
        let r = [];
        let wr;
        this.windows.forEach(w => {
            wr = w.findAll(predicate);
            if (wr && wr.length > 0) {
                r = r.concat(wr);
            }
        });
        return r;
    }
    remove(node) {
        const idx = this.windows.indexOf(node);
        if (idx >= 0) {
            const w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);
            if (this.windows.length === 0) {
                this.removeFromParent();
            }
        }
    }
    close() {
        if (!this.closeDisabled) {
            while (this.windowCount > 0) {
                this.windows[0].close();
            }
            this.removeFromParent();
        }
    }
    _onDragStart(drag) {
    }
    _onDragEnd() {
    }
    get drag() {
        return this._drag;
    }
    dragStart(drag) {
        if (this.dashboard) {
            this.dashboard.dragStart(drag);
        }
        this._drag = drag;
        this._onDragStart(drag);
    }
    dragEnd() {
        if (this.dashboard) {
            this.dashboard.dragEnd();
        }
        this._drag = undefined;
        this._onDragEnd();
    }
    get resizing() {
        return this._resizing;
    }
    get resizeType() {
        return this._resizeType;
    }
    _onResizeStart(win) {
    }
    _onResizeEnd() {
    }
    resizeStart(win, type) {
        this._resizing = win;
        this._resizeType = type;
        this._onResizeStart(win);
    }
    resizeEnd() {
        this._resizing = undefined;
        this._resizeType = undefined;
        this._onResizeEnd();
    }
    get maximizedIndex() {
        return this._maximizedIndex;
    }
    set maximizedIndex(value) {
        this.setMaximizedIndex(value);
    }
    setMaximizedIndex(maximizedIndex) {
        if (maximizedIndex !== this._maximizedIndex) {
            this._maximizedIndex = maximizedIndex;
        }
    }
    get maximized() {
        const maximizedIndex = this.maximizedIndex;
        return maximizedIndex !== undefined && maximizedIndex >= 0 && maximizedIndex < this.windows.length ? this.windows[maximizedIndex] : undefined;
    }
    set maximized(value) {
        this.setMaximized(value);
    }
    setMaximized(maximized) {
        this.setMaximizedIndex(maximized ? this.windows.indexOf(maximized) : undefined);
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WindowManager.prototype, "windows", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WindowManager.prototype, "_windowSettings", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", WindowModel_1.WindowModel)
], WindowManager.prototype, "_resizing", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WindowManager.prototype, "_resizeType", void 0);
__decorate([
    mobx_1.observable.ref,
    __metadata("design:type", WindowModel_1.WindowModel)
], WindowManager.prototype, "_drag", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], WindowManager.prototype, "_maximizedIndex", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "isRequiresOverflow", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "windowSettings", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "first", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "last", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "windowCount", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel, Object]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "add", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "addNew", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel, Number]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "insertAt", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel, WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "insertBefore", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "replace", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WindowManager.prototype, "open", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "remove", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "close", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "drag", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "dragStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "dragEnd", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "resizing", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], WindowManager.prototype, "resizeType", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel, String]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "resizeStart", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "resizeEnd", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WindowManager.prototype, "maximizedIndex", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "setMaximizedIndex", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", WindowModel_1.WindowModel),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel])
], WindowManager.prototype, "maximized", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WindowModel_1.WindowModel]),
    __metadata("design:returntype", void 0)
], WindowManager.prototype, "setMaximized", null);
exports.WindowManager = WindowManager;
