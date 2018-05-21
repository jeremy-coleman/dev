"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const NotebookFrame_1 = require("./NotebookFrame");
const routes_1 = require("./routes");
const mobx_react_1 = require("mobx-react");
exports.NotebookView = mobx_react_1.observer(props => {
    return (React.createElement(React.Fragment, null,
        React.createElement(NotebookFrame_1.default, null,
            React.createElement(routes_1.CogliteNotebookRoutes, null))));
});
