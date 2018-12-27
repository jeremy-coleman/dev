"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
let HostAppIcon = class HostAppIcon extends React.Component {
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if (icon.url || icon.text) {
            return null;
        }
        if (icon.name) {
            return React.createElement(icon.name, null);
        }
        if (icon.component) {
            return icon.component;
        }
        return null;
    }
};
HostAppIcon = __decorate([
    mobx_react_1.observer
], HostAppIcon);
exports.HostAppIcon = HostAppIcon;
let HostAppIconContainer = class HostAppIconContainer extends React.Component {
    constructor() {
        super(...arguments);
        this._onRenderIcon = () => {
            return React.createElement(HostAppIcon, Object.assign({}, this.props));
        };
    }
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if (icon.url || icon.text || icon.name || icon.component) {
            return this._onRenderIcon;
        }
        return null;
    }
};
HostAppIconContainer = __decorate([
    mobx_react_1.observer
], HostAppIconContainer);
const appIconItem = (props, key = "appIcon") => {
    return {
        key: key,
        onRender(action) {
            return React.createElement(HostAppIconContainer, Object.assign({ key: action.key }, props));
        }
    };
};
exports.appIconItem = appIconItem;
