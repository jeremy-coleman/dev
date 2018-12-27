"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const models_1 = require("../models");
const applyTabLayout = (dashboard) => {
    const windows = dashboard.windows;
    const active = windows.find(w => w.active);
    const stack = new models_1.StackModel();
    dashboard.setComponent(stack);
    windows.forEach(w => {
        stack.add(w);
    });
    if (active) {
        stack.setActive(active);
    }
    else {
        stack.setActiveIndex(0);
    }
};
exports.applyTabLayout = applyTabLayout;
const isLayoutApplied = (dashboard) => {
    return dashboard.component && dashboard.component.type === constants_1.ComponentTypes.stack;
};
const TabDashboardLayout = {
    key: "tabs",
    name: "Tabs",
    iconProps: { iconName: "BrowserTab" },
    applyLayout: applyTabLayout,
    isLayoutApplied: isLayoutApplied
};
exports.TabDashboardLayout = TabDashboardLayout;
