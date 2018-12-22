"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const components_1 = require("../../components");
const stores_1 = require("../stores");
const Dashboard_1 = require("./Dashboard");
const DashboardAddModal_1 = require("./DashboardAddModal");
const DashboardListClearDialog_1 = require("./DashboardListClearDialog");
var dashboardListStyles = {
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden"
    }
};
let DashboardListMapper = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.dashboardList.dashboards.map(db => React.createElement(Dashboard_1.DashboardView, { key: db.id, hidden: db !== props.dashboardList.active, dashboard: db, host: props.host, className: props.dashboardStyles }))));
let DashboardList = mobx_react_1.observer((props) => React.createElement("div", { style: dashboardListStyles.root },
    React.createElement(DashboardAddModal_1.DashboardAddModal, { add: stores_1.DashboardAddStore }),
    React.createElement(DashboardListClearDialog_1.DashboardListClearDialog, { supplier: stores_1.DashboardListClearStore }),
    React.createElement(DashboardListMapper, { dashboardList: props.dashboardList })));
exports.DashboardList = DashboardList;
let DashboardListContainer = mobx_react_1.observer((props) => React.createElement(components_1.SyncComponent, { sync: props.dashboardList.sync, syncLabel: "Loading Dashboards...", onRenderDone: () => React.createElement(DashboardList, Object.assign({}, props)) }));
exports.DashboardListContainer = DashboardListContainer;
