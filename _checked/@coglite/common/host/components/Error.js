"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datakit_1 = require("@coglite/common/datakit");
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
let E = typestyle_1.stylesheet({
    ErrorMsg: {
        fontSize: '12px',
        backgroundColor: 'red',
        color: 'white',
        padding: "4px 8px"
    },
    ErrorItemStyle: {
        margin: 8,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: 'red',
    },
    ErrorItemTitle: {
        fontSize: '12px',
        backgroundColor: 'red',
        color: 'white',
        padding: "4px 8px"
    },
    ErrorItemValue: {
        fontSize: '12px',
        padding: 8,
        overflow: "auto"
    }
});
exports.ErrorItem = mobx_react_1.observer((props) => React.createElement("div", { className: E.ErrorItemStyle },
    React.createElement("div", { className: E.ErrorItemTitle }, props.title),
    React.createElement("div", { className: E.ErrorItemValue }, props.children)));
let getErrorMessage = (error) => datakit_1.isString(error) ? error : (error.message || "An error has occurred");
let ErrorMessage = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.error &&
    React.createElement("div", { className: E.ErrorMsg, key: "message" }, getErrorMessage(props.error))));
class ErrorStack extends React.Component {
    render() {
        const error = this.props.error;
        if (error) {
            let stack = error ? error.stack : null;
            if (stack) {
                return React.createElement(exports.ErrorItem, { className: "stack-item", title: "Stack" },
                    React.createElement("pre", null, stack));
            }
        }
        return null;
    }
}
let tryGetErrorValue = (value) => {
    let valueContent;
    if (datakit_1.isObject(value)) {
        try {
            valueContent = React.createElement("pre", null, JSON.stringify(value, null, "\t"));
        }
        catch (err) { }
    }
    else {
        valueContent = String(value);
    }
    return valueContent;
};
let createErrorMessage = (error) => {
    let errorMessages = [];
    error && datakit_1.isObject(error) && Object.keys(error).forEach((key) => {
        key !== "message"
            && key !== "stack"
            && errorMessages.push(React.createElement(exports.ErrorItem, { key: key, title: key },
                React.createElement("pre", null, tryGetErrorValue(error[key]))));
    });
    return errorMessages;
};
let ErrorDetail = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.error && createErrorMessage(props.error)));
let Error = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.error &&
    React.createElement("div", { role: "error" },
        React.createElement(ErrorMessage, Object.assign({}, props)),
        React.createElement(ErrorStack, Object.assign({}, props)),
        React.createElement(ErrorDetail, Object.assign({}, props)))));
exports.Error = Error;
let CompactError = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.error &&
    React.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" } },
        React.createElement(ux_1.MDFontIconOnly, { icon: 'error' }))));
exports.CompactError = CompactError;
