"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const actions_1 = require("../actions");
const stackStyles_1 = require("./stackStyles");
let StackCloseAction = class StackCloseAction extends React.Component {
    constructor() {
        super(...arguments);
        this._onRemoveConfirm = () => {
            this.props.stack.close();
        };
        this._onClick = () => {
            if (this.props.stack.windowCount > 1) {
                actions_1.removeComponent({ component: this.props.stack, saveHandler: this._onRemoveConfirm });
            }
            else {
                this.props.stack.close();
            }
        };
    }
    render() {
        const { stack } = this.props;
        if (!stack.closeDisabled) {
            return (React.createElement("i", { style: { width: stack.headerHeight }, className: ux_1.css(stackStyles_1.stackStyles.action, "close-action"), title: "Close all Tabs", onClick: this._onClick },
                React.createElement(ux_1.MDFontIconOnly, { icon: 'close' })));
        }
        return null;
    }
};
StackCloseAction = __decorate([
    mobx_react_1.observer
], StackCloseAction);
let StackActionBar = mobx_react_1.observer((props) => React.createElement("div", { className: stackStyles_1.stackStyles.actionBar },
    React.createElement(StackCloseAction, Object.assign({}, props))));
let StackTabTitle = mobx_react_1.observer((props) => React.createElement("div", { className: stackStyles_1.stackStyles.tabTitleContainer },
    React.createElement("div", { className: stackStyles_1.stackStyles.tabTitle }, props.window.title)));
let StackTabCloseAction = class StackTabCloseAction extends React.Component {
    constructor() {
        super(...arguments);
        this._onMouseDown = (e) => {
            e.stopPropagation();
        };
        this._onClick = (e) => {
            e.stopPropagation();
            this.props.window.close();
        };
    }
    render() {
        const { stack } = this.props;
        if (this.props.window && !this.props.window.closeDisabled) {
            return (React.createElement("span", { style: { width: stack.headerHeight }, className: ux_1.css(stackStyles_1.stackStyles.action, stackStyles_1.stackStyles.tabAction, "close-action", this.props.window.active ? 'active' : ''), title: `Close ${this.props.window.title || "Tab"}`, onMouseDown: this._onMouseDown, onClick: this._onClick },
                React.createElement(ux_1.MDFontIconOnly, { icon: 'close' })));
        }
        return null;
    }
};
StackTabCloseAction = __decorate([
    mobx_react_1.observer
], StackTabCloseAction);
let StackTabActionBar = mobx_react_1.observer((props) => React.createElement("div", { className: stackStyles_1.stackStyles.tabActionBar },
    React.createElement(StackTabCloseAction, Object.assign({}, props))));
let StackTabIcon = class StackTabIcon extends React.Component {
    render() {
        const host = this.props.window.appHost;
        const icon = host.icon;
        if (icon.name || icon.text || icon.url || icon.component) {
            return (React.createElement("div", { className: stackStyles_1.stackStyles.tabIconContainer },
                React.createElement(core_1.HostAppIcon, { host: host })));
        }
        return null;
    }
};
StackTabIcon = __decorate([
    mobx_react_1.observer
], StackTabIcon);
let StackTab = class StackTab extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
        this._onClick = () => {
            this.props.stack.setActive(this.props.window);
        };
        this._onDragStart = (e) => {
            e.stopPropagation();
            const transferText = String(JSON.stringify(this.props.window.config));
            e.dataTransfer.setData("text", transferText);
            window.setTimeout(() => {
                this.props.window.dragStart();
            }, 1);
        };
        this._onDragEnd = (e) => {
            delete this._dragOverStart;
            this.props.window.dragEnd();
        };
        this._onDragOver = (e) => {
            const db = this.props.stack.dashboard;
            const drag = db ? db.drag : undefined;
            if (drag) {
                e.stopPropagation();
                if (drag !== this.props.window) {
                    e.preventDefault();
                    try {
                        e.dataTransfer.dropEffect = "move";
                    }
                    catch (ex) { }
                }
            }
            else {
                if (!this.props.window.active) {
                    if (!this._dragOverStart) {
                        this._dragOverStart = new Date().getTime();
                    }
                    else {
                        const diff = new Date().getTime() - this._dragOverStart;
                        if (diff >= 600) {
                            this.props.window.activate();
                            delete this._dragOverStart;
                        }
                    }
                }
            }
        };
        this._onDragLeave = (e) => {
            if (e.relatedTarget !== this.ref.current && !this.ref.current.contains(e.relatedTarget)) {
                delete this._dragOverStart;
            }
        };
        this._onDrop = (e) => {
            delete this._dragOverStart;
            e.stopPropagation();
            e.preventDefault();
            this.props.stack.dropWindow(this.props.window);
        };
    }
    render() {
        return (React.createElement("div", { className: ux_1.css(stackStyles_1.stackStyles.tab, { active: this.props.window.active, first: this.props.first, last: this.props.last }), role: "tab", id: `${this.props.window.id}-tab`, "aria-controls": this.props.window.id, title: this.props.window.title, ref: this.ref, onClick: this._onClick, draggable: true, onDragStart: this._onDragStart, onDragEnd: this._onDragEnd, onDragOver: this._onDragOver, onDrop: this._onDrop, onDragLeave: this._onDragLeave },
            React.createElement(StackTabIcon, Object.assign({}, this.props)),
            React.createElement(StackTabTitle, Object.assign({}, this.props)),
            React.createElement(StackTabActionBar, Object.assign({}, this.props))));
    }
};
StackTab = __decorate([
    mobx_react_1.observer
], StackTab);
let StackAddAction = class StackAddAction extends React.Component {
    constructor() {
        super(...arguments);
        this._onClick = () => {
            this.props.stack.addNew({ makeActive: true });
        };
    }
    render() {
        const { stack, className } = this.props;
        if (stack.addApp) {
            return (React.createElement("button", { type: "button", title: "Add Tab", className: stackStyles_1.stackStyles.addAction, onClick: this._onClick, style: { width: stack.headerHeight } },
                React.createElement(ux_1.MDFontIconOnly, { icon: 'add' })));
        }
        return null;
    }
};
StackAddAction = __decorate([
    mobx_react_1.observer
], StackAddAction);
let StackTabBar = class StackTabBar extends React.Component {
    constructor() {
        super(...arguments);
        this._onDragOver = (e) => {
            const stack = this.props.stack;
            const db = stack.dashboard;
            const drag = db ? db.drag : undefined;
            if (drag && (drag.parent !== stack || (stack.windowCount > 1 && drag !== stack.last))) {
                e.stopPropagation();
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                }
                catch (ex) { }
            }
        };
        this._onDrop = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.stack.dropWindow();
        };
    }
    render() {
        const tabs = this.props.stack.windows.map((w, idx) => {
            return React.createElement(StackTab, Object.assign({ key: w.id }, this.props, { window: w, first: idx === 0, last: idx === this.props.stack.windowCount - 1 }));
        });
        return (React.createElement("div", { className: stackStyles_1.stackStyles.tabBar, role: "tablist", onDragOver: this._onDragOver, onDrop: this._onDrop },
            tabs,
            React.createElement(StackAddAction, Object.assign({}, this.props))));
    }
};
StackTabBar = __decorate([
    mobx_react_1.observer
], StackTabBar);
let StackHeader = mobx_react_1.observer((props) => React.createElement("div", { className: stackStyles_1.stackStyles.header, style: { height: props.stack.headerHeight } },
    React.createElement(StackTabBar, Object.assign({}, props)),
    React.createElement(StackActionBar, Object.assign({}, props))));
const uselessDropHandler = () => { };
let StackDragOverlay = class StackDragOverlay extends React.Component {
    constructor() {
        super(...arguments);
        this.overlayRef = React.createRef();
        this._onDragLeave = (e) => {
            const { stack } = this.props;
            const drag = stack.dashboard.drag;
            if (drag) {
                drag.setDragState({ pos: null, over: null });
            }
            this._dropHandler = uselessDropHandler;
        };
        this._onDrop = (e) => {
            e.preventDefault();
            this._dropHandler();
            this.props.stack.dragEnd();
        };
        this._dropHandler = uselessDropHandler;
        this._dropLeft = () => {
            this.props.stack.splitLeft(this.props.stack.dashboard.drag);
        };
        this._dropRight = () => {
            this.props.stack.splitRight(this.props.stack.dashboard.drag);
        };
        this._dropTop = () => {
            this.props.stack.splitTop(this.props.stack.dashboard.drag);
        };
        this._dropBottom = () => {
            this.props.stack.splitBottom(this.props.stack.dashboard.drag);
        };
        this._dropAdd = () => {
            this.props.stack.add(this.props.stack.dashboard.drag, { makeActive: true });
        };
        this._onDragOver = (e) => {
            const stack = this.props.stack;
            const db = stack.dashboard;
            const drag = db ? db.drag : undefined;
            if (drag) {
                e.stopPropagation();
                if ((drag.parent !== stack && stack.windowCount > 0) || stack.windowCount > 1) {
                    e.preventDefault();
                    const bounds = this.overlayRef.current.getBoundingClientRect();
                    const zoneWidth = Math.floor(bounds.width / 2);
                    const leftRightZoneWidth = Math.floor(bounds.width / 6);
                    const topBottomZoneHeight = Math.floor(bounds.height / 2);
                    if (e.clientX >= bounds.left && e.clientX <= bounds.left + leftRightZoneWidth) {
                        this._setDropZoneLeft(bounds.width, bounds.height);
                    }
                    else if (e.clientX >= bounds.left + bounds.width - leftRightZoneWidth && e.clientX <= bounds.left + bounds.width) {
                        this._setDropZoneRight(bounds.width, bounds.height);
                    }
                    else if (e.clientY >= bounds.top && e.clientY <= bounds.top + topBottomZoneHeight) {
                        this._setDropZoneTop(bounds.width, bounds.height);
                    }
                    else {
                        this._setDropZoneBottom(bounds.width, bounds.height);
                    }
                }
                else if (stack.windowCount === 0) {
                    e.preventDefault();
                    this._setDropZoneAdd();
                }
            }
        };
    }
    _setDropZoneLeft(width, height) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropLeft;
        const styles = {
            top: 0,
            left: 0,
            width: Math.floor(width / 2),
            height: height
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    _setDropZoneRight(width, height) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropRight;
        const left = Math.floor(width / 2);
        const styles = {
            top: 0,
            left: left,
            width: width - left,
            height: height
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    _setDropZoneTop(width, height) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropTop;
        const styles = {
            top: 0,
            left: 0,
            width: width,
            height: Math.floor(height / 2)
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    _setDropZoneBottom(width, height) {
        const { stack } = this.props;
        const drag = stack.dashboard.drag;
        this._dropHandler = this._dropBottom;
        const top = Math.floor(height / 2);
        const styles = {
            top: top,
            left: 0,
            width: width,
            height: height - top
        };
        drag.setDragState({ feedbackStyles: styles, over: stack });
    }
    _setDropZoneAdd() {
        this._dropHandler = this._dropAdd;
    }
    render() {
        const { stack } = this.props;
        const headerHeight = { top: stack.headerHeight };
        const drag = stack.dashboard ? stack.dashboard.drag : undefined;
        if (drag) {
            const feedbackStyles = drag.dragState.over === stack ? drag.dragState.feedbackStyles : {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
            return [
                React.createElement("div", { key: "overlay", className: stackStyles_1.stackStyles.dragOverlay, onDragOver: this._onDragOver, onDrop: this._onDrop, onDragLeave: this._onDragLeave, ref: this.overlayRef, style: { ...headerHeight } }),
                React.createElement("div", { key: "feedbackContainer", className: stackStyles_1.stackStyles.dragFeedbackContainer, style: { top: stack.headerHeight } },
                    React.createElement("div", { className: ux_1.css(stackStyles_1.stackStyles.dragFeedback, drag.dragState.pos), style: { ...feedbackStyles } }))
            ];
        }
        return null;
    }
};
StackDragOverlay = __decorate([
    mobx_react_1.observer
], StackDragOverlay);
let Stack = mobx_react_1.observer((props) => React.createElement("div", { id: props.stack.id, className: stackStyles_1.stackStyles.root },
    React.createElement(StackDragOverlay, Object.assign({}, props)),
    React.createElement(StackHeader, Object.assign({}, props))));
exports.Stack = Stack;
class StackViewFactory {
    constructor() {
        this.className = undefined;
    }
    createView(comp) {
        return React.createElement(Stack, { stack: comp, className: this.className });
    }
}
exports.StackViewFactory = StackViewFactory;
let StackViewFactory1 = {
    createView: (comp) => React.createElement(Stack, { stack: comp })
};
