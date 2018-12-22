"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const css_1 = require("./css");
function cloneElementWithClassName(child, className) {
    return React.cloneElement(child, {
        className: css_1.css(child.props.className, className)
    });
}
exports.cloneElementWithClassName = cloneElementWithClassName;
function cloneChildrenWithClassName(children, className) {
    return React.Children.map(children, child => {
        return React.isValidElement(child) && cloneElementWithClassName(child, className);
    });
}
exports.cloneChildrenWithClassName = cloneChildrenWithClassName;
function isMuiElement(element, muiNames) {
    return React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
exports.isMuiElement = isMuiElement;
exports.setRef = (ref, value) => void typeof ref === 'function' ? ref(value) : ref.current = value;
