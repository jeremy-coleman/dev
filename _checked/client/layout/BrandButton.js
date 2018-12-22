"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const brandStyles = {
    root: {},
    logo: {
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    title: {
        color: 'orange',
        fontSize: '14px'
    }
};
exports.BrandButton = mobx_react_1.observer((props) => React.createElement(ux_1.Button, null,
    React.createElement("p", { style: brandStyles.title }, "Coglite")));
