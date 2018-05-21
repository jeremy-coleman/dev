"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Canvas_1 = require("./Diagram/Canvas");
exports.CogliteNotebookRoutes = props => (React.createElement(react_router_dom_1.Switch, null,
    React.createElement(react_router_dom_1.Route, { path: "/", render: () => React.createElement(Canvas_1.default, { num: "2", someProp: 100 }) }),
    React.createElement(react_router_dom_1.Route, { path: "/second", render: () => React.createElement(Canvas_1.default, { num: "2", someProp: 100 }) })));
