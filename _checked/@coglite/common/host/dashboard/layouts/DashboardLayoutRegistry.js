"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const TabDashboardLayout_1 = require("./TabDashboardLayout");
const DashboardLayoutRegistry = new models_1.ListModel([
    TabDashboardLayout_1.TabDashboardLayout
]);
exports.DashboardLayoutRegistry = DashboardLayoutRegistry;
