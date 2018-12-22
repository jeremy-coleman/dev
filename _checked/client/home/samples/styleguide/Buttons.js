"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const host_1 = require("@coglite/common/host");
exports.DetailsSample = mobx_react_1.observer((props) => React.createElement("div", null,
    React.createElement("div", null, "File Field"),
    React.createElement(host_1.FileField, null)));
exports.default = exports.DetailsSample;
