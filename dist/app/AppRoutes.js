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
const View_1 = require("./pages/notebook/View");
const pages_1 = require("./pages");
let AppRoutes = class AppRoutes extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: '/pages/dashboard', component: pages_1.DashboardPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/notebook', component: pages_1.NotebookPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/datasets', component: pages_1.DatasetsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/charts', component: pages_1.ChartsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/cloud', component: pages_1.CloudPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/settings', component: pages_1.SettingsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/workflowgraph', component: View_1.NotebookView }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/about', component: pages_1.AboutPage }),
                React.createElement(react_router_dom_1.Route, { path: '*', component: pages_1.DashboardPage }))));
    }
};
AppRoutes = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], AppRoutes);
exports.AppRoutes = AppRoutes;
//export let AppRoutes = withRouter(_AppRoutes)
