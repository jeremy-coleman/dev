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
const constants_1 = require("../constants");
const Component_1 = require("./Component");
const Defaults = {
    offset: 0.5,
    minItemHeight: 28,
    minItemWidth: 28,
    splitterHeight: 2,
    splitterWidth: 2
};
class SplitModel extends Component_1.ComponentModel {
    constructor() {
        super(...arguments);
        this._splitActive = false;
    }
    get splitActive() {
        return this._splitActive;
    }
    set splitActive(value) {
        this.setSplitActive(value);
    }
    setSplitActive(splitActive) {
        this._splitActive = splitActive;
        const db = this.dashboard;
        if (splitActive) {
            db.setBlockSource(this);
        }
        else if (db.blockSource === this) {
            db.clearBlockSource();
        }
    }
    get first() {
        return this._first;
    }
    set first(value) {
        this.setFirst(value);
    }
    setFirst(first) {
        if (first !== this._first) {
            if (first && first.parent !== this) {
                first.removeFromParent();
            }
            this._first = first;
            if (this._first) {
                this._first.parent = this;
            }
        }
    }
    get firstConfig() {
        return this._first ? { component: this._first.config } : undefined;
    }
    setFirstConfig(config) {
        let first;
        if (config && config.component) {
            first = this.componentFactory(config.component.type);
        }
        this.setFirst(first);
        if (first) {
            first.setConfig(config.component);
        }
    }
    get second() {
        return this._second;
    }
    set second(value) {
        this.setSecond(value);
    }
    get secondConfig() {
        return this._second ? { component: this._second.config } : undefined;
    }
    setSecond(second) {
        if (second !== this._second) {
            if (second && second.parent !== this) {
                second.removeFromParent();
            }
            this._second = second;
            if (this._second) {
                this._second.parent = this;
            }
        }
    }
    setSecondConfig(config) {
        let second;
        if (config && config.component) {
            second = this.componentFactory(config.component.type);
        }
        this.setSecond(second);
        if (second) {
            second.setConfig(config.component);
        }
    }
    get offset() {
        return this._offset !== undefined ? this._offset : Defaults.offset;
    }
    set offset(value) {
        this.setOffset(value);
    }
    setOffset(offset) {
        if (offset >= 0) {
            this._offset = offset;
        }
    }
    replace(newComp, oldComp) {
        if (oldComp === this._first || oldComp === this._second) {
            if (oldComp === this._first) {
                this.setFirst(newComp);
            }
            else if (oldComp === this._second) {
                this.setSecond(newComp);
            }
        }
    }
    remove(comp) {
        if (comp === this._first || comp === this._second) {
            const replacement = comp === this._first ? this._second : this._first;
            if (this._first) {
                this._first.parent = undefined;
            }
            if (this._second) {
                this._second.parent = undefined;
            }
            if (this.parent) {
                this.parent.replace(replacement, this);
            }
        }
    }
    _visitChildren(callback) {
        if (this._first) {
            this._first.visit(callback);
        }
        if (this._second) {
            this._second.visit(callback);
        }
    }
    _findFirstChild(predicate) {
        let r;
        if (this._first) {
            r = this._first.findFirst(predicate);
        }
        if (!r) {
            r = this._second.findFirst(predicate);
        }
        return r;
    }
    _findAllChildren(predicate) {
        let r = [];
        const lr = this._first ? this._first.findAll(predicate) : undefined;
        const rr = this._second ? this._second.findAll(predicate) : undefined;
        if (lr) {
            r = r.concat(lr);
        }
        if (rr) {
            r = r.concat(rr);
        }
        return r;
    }
    close() {
        if (this.first) {
            this.first.close();
        }
        if (this.second) {
            this.second.close();
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], SplitModel.prototype, "_offset", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SplitModel.prototype, "_first", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], SplitModel.prototype, "_second", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], SplitModel.prototype, "_splitActive", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitModel.prototype, "splitActive", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setSplitActive", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitModel.prototype, "first", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setFirst", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SplitModel.prototype, "firstConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setFirstConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitModel.prototype, "second", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SplitModel.prototype, "secondConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setSecond", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setSecondConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitModel.prototype, "offset", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "setOffset", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "replace", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "remove", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SplitModel.prototype, "close", null);
exports.SplitModel = SplitModel;
class HSplitModel extends SplitModel {
    constructor() {
        super();
        this._setPaneViewports = () => {
            if (this.portalManager) {
                if (this.left) {
                    this.left.setViewport(this.x, this.y, this.leftWidth, this.height);
                }
                if (this.right) {
                    this.right.setViewport(this.x + this.leftWidth + this.splitterWidth, this.y, this.rightWidth, this.height);
                }
            }
        };
        this._setViewportDisposer = mobx_1.autorun(this._setPaneViewports);
    }
    get type() {
        return constants_1.ComponentTypes.hsplit;
    }
    get minItemWidth() {
        return this._minItemWidth !== undefined ? this._minItemWidth : Defaults.minItemWidth;
    }
    set minItemWidth(value) {
        this.setMinItemWidth(value);
    }
    setMinItemWidth(minItemWidth) {
        if (minItemWidth >= 0) {
            this._minItemWidth = minItemWidth;
        }
    }
    get maxItemWidth() {
        return this.width - this.minItemWidth - this.splitterWidth;
    }
    get splitterWidth() {
        return this._splitterWidth !== undefined ? this._splitterWidth : Defaults.splitterWidth;
    }
    set splitterWidth(value) {
        this.setSplitterWidth(value);
    }
    setSplitterWidth(splitterWidth) {
        if (splitterWidth > 0) {
            this._splitterWidth = splitterWidth;
        }
    }
    get left() {
        return this.first;
    }
    set left(value) {
        this.setLeft(value);
    }
    setLeft(left) {
        this.setFirst(left);
    }
    get leftWidth() {
        if (this._offset === undefined) {
            if (this._leftWidth !== undefined) {
                return this._leftWidth;
            }
        }
        let r = Math.floor(this.offset * this.width);
        if (r < this.minItemWidth) {
            r = this.minItemWidth;
        }
        return r;
    }
    set leftWidth(value) {
        this.setLeftWidth(value);
    }
    setLeftWidth(leftWidth) {
        if (leftWidth < this.minItemWidth) {
            leftWidth = this.minItemWidth;
        }
        else if (this.maxItemWidth > 0 && leftWidth > this.maxItemWidth) {
            leftWidth = this.maxItemWidth;
        }
        if (this._offset === undefined) {
            this._leftWidth = leftWidth;
        }
        else {
            this.setOffset(leftWidth / this.width);
        }
    }
    setOffset(offset) {
        super.setOffset(offset);
        if (this._offset !== undefined) {
            this._leftWidth = undefined;
        }
    }
    get leftConfig() {
        return this.firstConfig;
    }
    set leftConfig(value) {
        this.setLeftConfig(value);
    }
    setLeftConfig(config) {
        this.setFirstConfig(config);
    }
    get right() {
        return this.second;
    }
    set right(value) {
        this.setRight(value);
    }
    setRight(right) {
        this.setSecond(right);
    }
    get rightWidth() {
        return this.width - this.leftWidth - this.splitterWidth;
    }
    set rightWidth(value) {
        this.setRightWidth(value);
    }
    setRightWidth(rightWidth) {
        if (rightWidth < this.minItemWidth) {
            rightWidth = this.minItemWidth;
        }
        else if (rightWidth > this.maxItemWidth) {
            rightWidth = this.maxItemWidth;
        }
        this.setLeftWidth(this.width - rightWidth - this.splitterWidth);
    }
    get rightConfig() {
        return this.secondConfig;
    }
    set rightConfig(value) {
        this.setRightConfig(value);
    }
    setRightConfig(config) {
        this.setSecondConfig(config);
    }
    get config() {
        return {
            type: this.type,
            offset: this._offset,
            left: this.leftConfig,
            right: this.rightConfig,
            leftWidth: this._leftWidth,
            minItemWidth: this._minItemWidth
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
        this.setLeftConfig(config ? config.left : undefined);
        this.setRightConfig(config ? config.right : undefined);
        this.setOffset(config ? config.offset : undefined);
        this.setLeftWidth(config ? config.leftWidth : undefined);
        this.setMinItemWidth(config ? config.minItemWidth : undefined);
    }
    get columnCount() {
        const left = this.left;
        const right = this.right;
        const leftCount = left && left.type === constants_1.ComponentTypes.hsplit ? left.columnCount : 1;
        const rightCount = right && right.type === constants_1.ComponentTypes.hsplit ? right.columnCount : 1;
        return leftCount + rightCount;
    }
    close() {
        super.close();
        if (this._setViewportDisposer) {
            this._setViewportDisposer();
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], HSplitModel.prototype, "_leftWidth", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], HSplitModel.prototype, "_minItemWidth", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], HSplitModel.prototype, "_splitterWidth", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "minItemWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setMinItemWidth", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], HSplitModel.prototype, "maxItemWidth", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "splitterWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setSplitterWidth", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "left", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setLeft", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "leftWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setLeftWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setOffset", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "leftConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setLeftConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "right", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setRight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "rightWidth", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setRightWidth", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "rightConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setRightConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HSplitModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "setConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], HSplitModel.prototype, "columnCount", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HSplitModel.prototype, "close", null);
exports.HSplitModel = HSplitModel;
class VSplitModel extends SplitModel {
    constructor() {
        super();
        this._setPaneViewports = () => {
            if (this.portalManager) {
                if (this.top) {
                    this.top.setViewport(this.x, this.y, this.width, this.topHeight);
                }
                if (this.bottom) {
                    this.bottom.setViewport(this.x, this.y + this.topHeight + this.splitterHeight, this.width, this.bottomHeight);
                }
            }
        };
        this._setViewportDisposer = mobx_1.autorun(this._setPaneViewports);
    }
    get type() {
        return constants_1.ComponentTypes.vsplit;
    }
    get minItemHeight() {
        return this._minItemHeight !== undefined ? this._minItemHeight : Defaults.minItemHeight;
    }
    set minItemHeight(value) {
        this.setMinItemHeight(value);
    }
    setMinItemHeight(minItemHeight) {
        if (minItemHeight >= 0) {
            this._minItemHeight = minItemHeight;
        }
    }
    get maxItemHeight() {
        return this.height - this.minItemHeight - this.splitterHeight;
    }
    get splitterHeight() {
        return this._splitterHeight !== undefined ? this._splitterHeight : Defaults.splitterHeight;
    }
    set splitterHeight(value) {
        this.setSplitterHeight(value);
    }
    setSplitterHeight(splitterHeight) {
        if (splitterHeight > 0) {
            this._splitterHeight = splitterHeight;
        }
    }
    get topHeight() {
        if (this._offset === undefined) {
            if (this._topHeight !== undefined) {
                return this._topHeight;
            }
        }
        let r = Math.floor(this.height * this.offset);
        if (r < this.minItemHeight) {
            r = this.minItemHeight;
        }
        return r;
    }
    set topHeight(value) {
        this.setTopHeight(value);
    }
    setTopHeight(topHeight) {
        if (topHeight < this.minItemHeight) {
            topHeight = this.minItemHeight;
        }
        else if (this.maxItemHeight > 0 && topHeight > this.maxItemHeight) {
            topHeight = this.maxItemHeight;
        }
        if (this._offset === undefined) {
            this._topHeight = topHeight;
        }
        else {
            this.setOffset(topHeight / this.height);
        }
    }
    setOffset(offset) {
        super.setOffset(offset);
        if (this._offset !== undefined) {
            this._topHeight = undefined;
        }
    }
    get top() {
        return this.first;
    }
    set top(value) {
        this.setTop(value);
    }
    setTop(top) {
        this.setFirst(top);
    }
    get topConfig() {
        return this.firstConfig;
    }
    setTopConfig(config) {
        return this.setFirstConfig(config);
    }
    get bottom() {
        return this.second;
    }
    set bottom(value) {
        this.setBottom(value);
    }
    setBottom(bottom) {
        this.setSecond(bottom);
    }
    get bottomConfig() {
        return this.secondConfig;
    }
    set bottomConfig(value) {
        this.setBottomConfig(value);
    }
    setBottomConfig(config) {
        return this.setSecondConfig(config);
    }
    get bottomHeight() {
        return this.height - this.topHeight - this.splitterHeight;
    }
    set bottomHeight(value) {
        this.setBottomHeight(value);
    }
    setBottomHeight(bottomHeight) {
        if (bottomHeight >= this.minItemHeight && bottomHeight <= this.maxItemHeight) {
            this.setTopHeight(this.height - bottomHeight - this.splitterHeight);
        }
    }
    get config() {
        return {
            type: this.type,
            offset: this._offset,
            top: this.topConfig,
            bottom: this.bottomConfig,
            topHeight: this._topHeight,
            minItemHeight: this._minItemHeight
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    setConfig(config) {
        this.setTopConfig(config ? config.top : undefined),
            this.setBottomConfig(config ? config.bottom : undefined);
        this.setOffset(config ? config.offset : undefined);
        this.setTopHeight(config ? config.topHeight : undefined);
        this.setMinItemHeight(config ? config.minItemHeight : undefined);
    }
    get rowCount() {
        const top = this.top;
        const bottom = this.bottom;
        const topCount = top && top.type === constants_1.ComponentTypes.vsplit ? top.rowCount : 1;
        const bottomCount = bottom && bottom.type === constants_1.ComponentTypes.vsplit ? bottom.rowCount : 1;
        return topCount + bottomCount;
    }
    close() {
        super.close();
        if (this._setViewportDisposer) {
            this._setViewportDisposer();
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], VSplitModel.prototype, "_topHeight", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], VSplitModel.prototype, "_minItemHeight", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], VSplitModel.prototype, "_splitterHeight", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "minItemHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setMinItemHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], VSplitModel.prototype, "maxItemHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "splitterHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setSplitterHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "topHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setTopHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setOffset", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "top", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setTop", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], VSplitModel.prototype, "topConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setTopConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "bottom", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setBottom", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "bottomConfig", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setBottomConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "bottomHeight", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setBottomHeight", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], VSplitModel.prototype, "config", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "setConfig", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], VSplitModel.prototype, "rowCount", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VSplitModel.prototype, "close", null);
exports.VSplitModel = VSplitModel;
