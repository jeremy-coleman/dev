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
const components_1 = require("../components");
const models_1 = require("../models");
let AppHostError = mobx_react_1.observer((props) => React.createElement(components_1.Error, { className: "app-host-error", error: this.props.host.sync.error }));
let AppHostContainerView = mobx_react_1.observer((props) => React.createElement(React.Fragment, null,
    props.host.sync.error && props.onRenderError && props.onRenderError(props),
    props.host.sync.error && React.createElement(AppHostError, Object.assign({}, props)),
    !props.host.sync.error && props.host.view));
let AppHostContainer = class AppHostContainer extends React.Component {
    constructor() {
        super(...arguments);
        this._onRenderSync = () => {
            return this.props.onRenderSync(this.props);
        };
    }
    componentWillMount() {
        if (!this.props.noLoadOnMount) {
            this.props.host.load();
        }
    }
    _renderContainerBase() {
        return [
            React.createElement(components_1.SyncOverlay, { key: "overlay", sync: this.props.host.sync, onRenderSync: this.props.onRenderSync ? this._onRenderSync : undefined }),
            React.createElement(AppHostContainerView, Object.assign({ key: "view" }, this.props))
        ];
    }
    render() {
        return (React.createElement("div", Object.assign({}, this.props), this._renderContainerBase()));
    }
};
AppHostContainer = __decorate([
    mobx_react_1.observer
], AppHostContainer);
exports.AppHostContainer = AppHostContainer;
class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this._host = new models_1.AppHostModel();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(props);
    }
    get host() {
        return this._host;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.router !== this.props.router) {
            this._host.setRoot(this.props.root ? true : false);
            this._host.router = nextProps.router;
            this._host.launcher = nextProps.launcher;
        }
        this._host.load(Object.assign({}, nextProps, { replace: true }));
    }
    render() {
        return (React.createElement(AppHostContainer, { host: this._host, onRenderSync: this.props.onRenderSync, onRenderError: this.props.onRenderError }));
    }
}
exports.AppContainer = AppContainer;
