"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("@coglite/common/host/dashboard");
const state_1 = require("../../state");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const WorkspaceDropdown_1 = require("./WorkspaceDropdown");
const WorkspaceDropdownItem_1 = require("./WorkspaceDropdownItem");
let removeSingleDashboard = mobx_1.action((d) => state_1.WorkspaceStorage.remove(d));
let WorkspaceMenu = mobx_react_1.observer(() => {
    const dashboardList = state_1.WorkspaceStorage;
    const active = dashboardList.active;
    const dropdownHeading = active ? active.title : "Untitled";
    return (React.createElement(WorkspaceDropdown_1.WorkspaceDropdown, { dropdownHeading: dropdownHeading, dashboardListItems: dashboardList.dashboards.map(d => React.createElement(WorkspaceDropdownItem_1.WorkspaceDropdownItem, { key: d.id, name: d.title, canCheck: true, checked: d === active, dashboardList: dashboardList, dashboard: d, onSelectFromDropdown: () => dashboardList.setActive(d.dashboard), onDeleteSingle: () => removeSingleDashboard(d), onSelectTabLayout: () => dashboard_1.applyTabLayout(d) })), onRemoveAll: () => dashboard_1.clearDashboards(dashboardList), onClickNew: () => dashboard_1.addDashboard({ dashboardList: dashboardList }) }));
});
exports.WorkspaceMenu = WorkspaceMenu;
