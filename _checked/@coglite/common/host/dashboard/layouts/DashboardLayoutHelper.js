"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const getColumnCount = (dashboard) => {
    return dashboard && dashboard.component && dashboard.component.type === constants_1.ComponentTypes.hsplit ?
        dashboard.component.columnCount : 0;
};
exports.getColumnCount = getColumnCount;
const getRowCount = (dashboard) => {
    return dashboard && dashboard.component && dashboard.component.type === constants_1.ComponentTypes.vsplit ?
        dashboard.component.rowCount : 0;
};
exports.getRowCount = getRowCount;
const assignWindows = (windows, stacks) => {
    if (windows && windows.length > 0) {
        const stackQuota = Math.ceil(windows.length / stacks.length);
        let stackIdx = 0;
        let c;
        windows.forEach(w => {
            c = stacks[stackIdx];
            if (c.windowCount === stackQuota) {
                stackIdx++;
                c = stacks[stackIdx];
            }
            c.add(w, false);
        });
        stacks.forEach(c => {
            if (c.windowCount > 0) {
                c.setActiveIndex(0);
            }
            else {
                c.addNew();
            }
        });
    }
};
exports.assignWindows = assignWindows;
