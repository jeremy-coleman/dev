"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const DashboardList_1 = require("./DashboardList");
let DashboardListAppView = mobx_react_1.observer((props) => React.createElement(core_1.HostAppView, Object.assign({}, props, props.dashboardList.load()),
    React.createElement(DashboardList_1.DashboardListContainer, { dashboardList: props.dashboardList, host: props.host }),
    props.children));
exports.DashboardListAppView = DashboardListAppView;
