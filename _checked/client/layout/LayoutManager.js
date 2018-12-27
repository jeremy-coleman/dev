"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("@coglite/common/host/dashboard");
const state_1 = require("../state");
const mobx_react_1 = require("mobx-react");
const React = require("react");
let DashboardsApp = mobx_react_1.observer((props) => React.createElement(dashboard_1.DashboardListAppView, { dashboardList: state_1.WorkspaceStorage, host: props.match.host }));
exports.DashboardsApp = DashboardsApp;
exports.default = DashboardsApp;
