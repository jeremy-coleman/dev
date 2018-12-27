"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const ux_1 = require("@coglite/common/ux");
exports.DatasetsPage = mobx_react_1.observer((props) => React.createElement(React.Fragment, null,
    React.createElement("div", null, "datasets"),
    React.createElement(ux_1.AdpatingRenderProps, null),
    React.createElement(ux_1.Button, null, "hi")));
