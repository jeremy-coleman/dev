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
const typestyle_1 = require("typestyle");
const components_1 = require("../../components");
const stores_1 = require("../stores");
const AppPortalManager_1 = require("./AppPortalManager");
const ComponentRemoveDialog_1 = require("./ComponentRemoveDialog");
const ComponentView_1 = require("./ComponentView");
exports.dashboardStyles = typestyle_1.stylesheet({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "transparent",
        overflow: "hidden",
        "&.hidden": {
            top: -1,
            left: -1,
            width: 0,
            height: 0,
            overflow: "hidden"
        }
    },
    content: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden",
        background: "transparent",
        "&.overflow": {
            overflow: "auto"
        }
    },
    overlay: {
        backgroundColor: 'white',
        opacity: 0.1,
        "&.hsplit": {
            cursor: "ew-resize"
        },
        "&.vsplit": {
            cursor: "ns-resize"
        }
    }
});
let DashboardBlockOverlay = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.dashboard.blockSource &&
    React.createElement("div", { className: ux_1.css(props.className, props.dashboard.blockSource.type), style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 } })));
class DashboardPortals extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
    }
    componentDidMount() {
        this.props.dashboard.setPortalManager(new AppPortalManager_1.AppPortalManager(this.ref.current));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dashboard !== this.props.dashboard) {
            const currentPortalManager = this.props.dashboard.portalManager;
            if (currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.dashboard.setPortalManager(new AppPortalManager_1.AppPortalManager(this.ref.current));
        }
    }
    render() {
        return (React.createElement("div", { ref: this.ref }));
    }
}
let DashboardViewTemplate = class DashboardViewTemplate extends React.Component {
    constructor() {
        super(...arguments);
        this.ref = React.createRef();
        this._onHostResize = () => {
            this._resizeToViewport();
        };
    }
    _resizeToViewport() {
        if (this.ref) {
            const bounds = this.ref.current.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
        }
    }
    _addHostListener(host) {
        if (host) {
            host.addEventListener("resize", this._onHostResize);
        }
    }
    _removeHostListener(host) {
        if (host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    }
    componentDidMount() {
        this._addHostListener(this.props.host);
        this._resizeToViewport();
    }
    componentWillUnmount() {
        this._removeHostListener(this.props.host);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }
    render() {
        const { dashboard } = this.props;
        const component = dashboard.component;
        return (React.createElement("div", { id: this.props.dashboard.id, className: ux_1.css(exports.dashboardStyles.root, { hidden: this.props.hidden }), ref: this.ref },
            React.createElement(DashboardBlockOverlay, { dashboard: this.props.dashboard, className: exports.dashboardStyles.overlay }),
            React.createElement(ComponentRemoveDialog_1.ComponentRemoveDialog, { remove: stores_1.ComponentRemoveStore }),
            React.createElement("div", { className: ux_1.css(exports.dashboardStyles.content, { "overflow": component && component.isWindowManager && component.isRequiresOverflow ? true : false }) },
                React.createElement(DashboardPortals, Object.assign({}, this.props)),
                React.createElement(ComponentView_1.ComponentView, { component: component }))));
    }
    componentDidUpdate() {
        this._resizeToViewport();
    }
};
DashboardViewTemplate = __decorate([
    mobx_react_1.observer
], DashboardViewTemplate);
let DashboardView = DashboardViewTemplate;
exports.DashboardView = DashboardView;
let renderDashboardView = mobx_react_1.observer((props) => React.createElement(DashboardView, Object.assign({}, props)));
let DashboardContainer = mobx_react_1.observer((props) => React.createElement(components_1.SyncComponent, { sync: props.dashboard.sync, syncLabel: "Loading Dashboard...", onRenderDone: renderDashboardView }));
exports.DashboardContainer = DashboardContainer;
