"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const host_1 = require("@coglite/common/host");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const HomeRoutes_1 = require("./HomeRoutes");
const ux_1 = require("@coglite/common/ux");
let HomeHostAppView = class HomeHostAppView extends React.Component {
    constructor() {
        super(...arguments);
        this._onClickItem = (e, item) => {
            this.props.host.load({ path: item.path, replace: true });
        };
    }
    _updateHostTitle(props) {
        props.host.setTitle(props.title || "");
    }
    _updateHostTabIcon(props) {
        props.host.icon.component = React.createElement(ux_1.MDFontIconOnly, { icon: 'home' });
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
        this._updateHostTabIcon(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this._updateHostTitle(nextProps);
        this._updateHostTabIcon(this.props);
    }
    render() {
        const homeAppGroups = HomeRoutes_1.homeRoutes.map(homeAppGroup => {
            const homeAppItems = homeAppGroup.items.map(item => {
                return {
                    key: item.path,
                    path: item.path,
                    name: item.title,
                    canCheck: true,
                    checked: this.props.host.path === item.path,
                    onClick: this._onClickItem
                };
            });
            const groupItem = {
                key: homeAppGroup.key,
                name: homeAppGroup.title,
                subMenuProps: {
                    items: homeAppItems
                }
            };
            return groupItem;
        });
        return (React.createElement(host_1.HostAppView, { host: this.props.host }, this.props.children));
    }
};
HomeHostAppView = __decorate([
    mobx_react_1.observer
], HomeHostAppView);
exports.HomeHostAppView = HomeHostAppView;
const homeAppHandler = (homeRouteKeys) => {
    return (req => {
        return homeRouteKeys.moduleLoader().then(m => {
            const componentType = m[homeRouteKeys.moduleComponent || "default"];
            if (!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type [HomeHostAppView]" };
            }
            return (React.createElement(HomeHostAppView, { host: req.app, title: homeRouteKeys.title, tabIcon: homeRouteKeys.tabIcon }, React.createElement(componentType, Object.assign({}, req, { host: req.host }))));
        });
    });
};
exports.homeAppHandler = homeAppHandler;
