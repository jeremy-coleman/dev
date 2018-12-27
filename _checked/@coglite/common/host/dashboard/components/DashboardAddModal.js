"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const components_1 = require("../../components");
let dashboardAddStyles = typestyle_1.stylesheet({
    root: {},
    editor: {
        padding: 8
    },
    actions: {},
    action: {
        marginRight: 8
    }
});
let DashboardAddModal = mobx_react_1.observer((props) => React.createElement(ux_1.Modal, { className: dashboardAddStyles.root, showModal: props.add.active, handleClose: () => props.add.cancel() }, props.add.active &&
    React.createElement("div", null,
        React.createElement("div", null, "Add Dashboard"),
        React.createElement("div", null,
            React.createElement("label", null, "New Dashboard Name:"),
            React.createElement("div", { className: "dashboard-property-editor" },
                React.createElement(components_1.BoundTextField, { placeholder: "Title", binding: { target: props.add.dashboard, key: "title", setter: "setTitle" } })),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: 'dashboard-add-dropdown-select' }, "Copy Existing Dashboard"),
                React.createElement("ul", null, props.add.dashboardList.dashboards.map(dashboard => (React.createElement("li", { key: dashboard.id, role: undefined, onClick: this._onChange },
                    React.createElement("input", { type: "checkbox", onChange: () => void 0, checked: props.add.makeActive }),
                    React.createElement("div", null, `${dashboard.title}`))))))),
        React.createElement("button", { onClick: () => props.add.cancel() }, "Cancel"),
        React.createElement("button", { onClick: () => props.add.save(), disabled: !props.add.saveEnabled }, "OK"))));
exports.DashboardAddModal = DashboardAddModal;
