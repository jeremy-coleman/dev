"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../design");
const Footer_1 = require("./Footer");
const WidgetToolbar_1 = require("./WidgetToolbar");
const IconNavigation_1 = require("./IconNavigation");
const Workspace_1 = require("./Workspace");
const MainWorkSpace = styled_jss_1.default('div')({
    display: "flex",
    height: "100%",
    width: "100%",
});
let AppLayout = class AppLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.hasError = false;
        this.displayError = () => this.hasError = true;
    }
    componentDidCatch(error, errorInfo) {
        this.displayError();
    }
    render() {
        const { navigation } = this.props;
        const { children } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(design_1.FillFlex, null,
                React.createElement(design_1.Row, null,
                    React.createElement(design_1.VerticalStretch, null,
                        React.createElement(WidgetToolbar_1.WidgetToolbar, null),
                        React.createElement(design_1.Row, null,
                            React.createElement(IconNavigation_1.IconNavBar, null),
                            React.createElement(design_1.Row, null,
                                React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)))),
                        React.createElement(Footer_1.Footer, null))))));
    }
};
__decorate([
    mobx_1.observable
], AppLayout.prototype, "hasError", void 0);
__decorate([
    mobx_1.action
], AppLayout.prototype, "displayError", void 0);
AppLayout = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], AppLayout);
exports.AppLayout = AppLayout;
const ErrorDisplay = props => React.createElement("div", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },
    React.createElement("h1", null, "An unknown error occurred"));
