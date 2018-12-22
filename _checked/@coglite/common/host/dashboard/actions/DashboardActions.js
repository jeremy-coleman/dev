"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const Split_1 = require("../models/Split");
const stores_1 = require("../stores");
const splitHorizontal = mobx_1.action((replace, left, right) => {
    const split = new Split_1.HSplitModel();
    if (replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setLeft(left);
    split.setRight(right);
});
exports.splitHorizontal = splitHorizontal;
const splitVertical = mobx_1.action((replace, top, bottom) => {
    const split = new Split_1.VSplitModel();
    if (replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setTop(top);
    split.setBottom(bottom);
});
exports.splitVertical = splitVertical;
const removeComponent = mobx_1.action((opts) => stores_1.ComponentRemoveStore.init(opts));
exports.removeComponent = removeComponent;
const addDashboard = mobx_1.action((opts) => stores_1.DashboardAddStore.init(opts));
exports.addDashboard = addDashboard;
const removeDashboard = mobx_1.action((dashboard) => stores_1.DashboardRemoveStore.value = dashboard);
exports.removeDashboard = removeDashboard;
const clearDashboards = mobx_1.action((dashboardList) => stores_1.DashboardListClearStore.value = dashboardList);
exports.clearDashboards = clearDashboards;
