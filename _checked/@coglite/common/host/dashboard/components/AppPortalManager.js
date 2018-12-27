"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const React = require("react");
const ReactDOM = require("react-dom");
const Window_1 = require("./Window");
class AppPortal {
    constructor(root, window, onDestroy) {
        this._onTransitionEnd = () => {
            this._notifyResize();
        };
        this._root = root;
        const doc = root.ownerDocument;
        this._el = doc.createElement("div");
        const s = this._el.style;
        s.position = "absolute";
        s.zIndex = "1";
        root.appendChild(this._el);
        this._el.addEventListener("transitionend", this._onTransitionEnd);
        this._window = window;
        this._onDestroy = onDestroy;
        ReactDOM.render(React.createElement(Window_1.Window, { window: this._window },
            React.createElement(core_1.AppHostContainer, { host: this._window.appHost })), this._el);
    }
    get el() {
        return this._el;
    }
    _notifyResize() {
        this._window.appHost.emit({ type: "resize" });
    }
    setViewport(left, top, width, height) {
        const clientBounds = this._el.getBoundingClientRect();
        const sizeChanged = width !== clientBounds.width || height !== clientBounds.height;
        const visible = width > 0 && height > 0;
        const s = this._el.style;
        s.top = `${visible ? top : -1}px`;
        s.left = `${visible ? left : -1}px`;
        s.bottom = "";
        s.right = "";
        s.width = `${width}px`;
        s.height = `${height}px`;
        s.overflow = "hidden";
        if (sizeChanged) {
            setTimeout(() => {
                this._notifyResize();
            }, 1);
        }
    }
    setZIndex(zIndex) {
        this._el.style.zIndex = `${zIndex}`;
    }
    scrollIntoView() {
        try {
            this._el.scrollIntoView();
        }
        catch (e) { }
    }
    bringToFront() {
        this.setZIndex(2);
    }
    bringToBase() {
        this.setZIndex(1);
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this._el);
        this._root.removeChild(this._el);
        if (this._onDestroy) {
            this._onDestroy(this._window);
        }
    }
}
exports.AppPortal = AppPortal;
class AppPortalManager {
    constructor(root) {
        this._portalMap = {};
        this._onPortalDestroyed = (window) => {
            delete this._portalMap[window.id];
        };
        this._root = root;
    }
    get root() {
        return this._root;
    }
    getPortal(window) {
        let portal = this._portalMap[window.id];
        if (!portal) {
            portal = new AppPortal(this._root, window, this._onPortalDestroyed);
            this._portalMap[window.id] = portal;
        }
        return portal;
    }
    destroyPortal(window) {
        const portal = this._portalMap[window.id];
        if (portal) {
            portal.destroy();
        }
    }
    destroy() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].destroy();
        });
    }
}
exports.AppPortalManager = AppPortalManager;
