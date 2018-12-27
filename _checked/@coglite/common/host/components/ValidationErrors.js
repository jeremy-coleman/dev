"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const errorLabelStyle = {
    fontWeight: 600
};
let ValidationErrors = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.errors && props.errors.length > 0 && props.errors.map((error, idx) => React.createElement("span", { key: idx },
    error.keyTitle ? React.createElement("label", { style: errorLabelStyle },
        error.keyTitle,
        ": ") : undefined,
    error.message))));
exports.ValidationErrors = ValidationErrors;
