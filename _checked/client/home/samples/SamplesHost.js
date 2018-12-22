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
const SampleRoutes_1 = require("./SampleRoutes");
let SamplesHost = class SamplesHost extends React.Component {
    constructor() {
        super(...arguments);
        this._onClickItem = (e, item) => {
            this.props.host.load({ path: item.path, replace: true });
        };
    }
    _updateHostTitle(props) {
        props.host.setTitle(props.title || "");
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this._updateHostTitle(nextProps);
    }
    render() {
        const sampleGroups = SampleRoutes_1.sampleRoutes.map(sampleGroup => {
            const sampleItems = sampleGroup.items.map(item => {
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
                key: sampleGroup.key,
                name: sampleGroup.title,
                subMenuProps: {
                    items: sampleItems
                }
            };
            return groupItem;
        });
        return (React.createElement(host_1.HostAppView, { host: this.props.host }, this.props.children));
    }
};
SamplesHost = __decorate([
    mobx_react_1.observer
], SamplesHost);
exports.SamplesHost = SamplesHost;
const sampleRouteHandler = (sampleApp) => {
    return (req => {
        return sampleApp.moduleLoader().then(m => {
            const componentType = m[sampleApp.moduleComponent || "default"];
            if (!componentType) {
                throw { code: "NOT_FOUND", message: "Unable to resolve component type [Sample]" };
            }
            return (React.createElement(SamplesHost, { host: req.app, title: sampleApp.title }, React.createElement(componentType, Object.assign({}, req, { host: req.host }))));
        });
    });
};
exports.sampleRouteHandler = sampleRouteHandler;
