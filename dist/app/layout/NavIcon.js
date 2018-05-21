"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
function NavListIcon({ icon, label, route }) {
    return (React.createElement(core_1.MenuItem, { button: true, component: props => React.createElement(react_router_dom_1.NavLink, Object.assign({}, props, { exact: true, to: route })) },
        React.createElement(core_1.ListItemIcon, null, icon),
        React.createElement(core_1.ListItemText, { primary: label })));
}
exports.NavListIcon = NavListIcon;
