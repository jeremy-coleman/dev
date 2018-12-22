"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppRouter_1 = require("../AppRouter");
const host_1 = require("@coglite/common/host");
const dashboard_1 = require("@coglite/common/host/dashboard");
const storageKey = "coglite-dashboard-list";
const storageService = new host_1.LoggingStorageService({
    prefix: "cogliteDashboardStorage",
    target: new host_1.TransientStorageService()
});
exports.storageService = storageService;
const WorkspaceStorage = new dashboard_1.DashboardListModel();
exports.WorkspaceStorage = WorkspaceStorage;
WorkspaceStorage.setRouter(AppRouter_1.AppRouter);
WorkspaceStorage.loader = () => storageService.getItem(storageKey);
WorkspaceStorage.saver = (data) => storageService.setItem(storageKey, data);
WorkspaceStorage.addApp = { title: "Home", path: "/home" };
WorkspaceStorage.componentFactory = dashboard_1.ComponentFactory;
