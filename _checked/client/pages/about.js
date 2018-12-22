"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
const bg = (color) => ({ backgroundColor: color });
exports.AboutPage = mobx_react_1.observer((props) => React.createElement("div", { className: typestyle_1.style(csstips_1.fillParent, csstips_1.vertical) },
    React.createElement("div", { className: typestyle_1.style(csstips_1.content, csstips_1.height(50), bg('lightskyblue')) }, "Header"),
    React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.horizontal) },
        React.createElement("div", { className: typestyle_1.style(csstips_1.content, csstips_1.width(100), bg('lightpink')) }, "Sidebar"),
        React.createElement("div", { className: typestyle_1.style(csstips_1.flex, bg('darkorange')) }, "Body"),
        React.createElement("div", { className: typestyle_1.style(csstips_1.content, csstips_1.width(100), bg('limegreen')) }, "Sidebar")),
    React.createElement("div", { className: typestyle_1.style(csstips_1.content, csstips_1.height(50), bg('lightskyblue')) }, "Footer")));
exports.default = exports.AboutPage;
