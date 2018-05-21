"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = function (value) {
    return typeof value === "undefined";
};
exports.isFunction = function (value) {
    return typeof value === "function";
};
exports.isString = function (value) {
    return typeof value === "string";
};
exports.isArray = function (val) {
    return Object.prototype.toString.call(val) === "[object Array]";
};
exports.isObject = function (val) {
    return !exports.isArray(val) && typeof val === "object";
};
exports.isReactClass = function (componentClass) {
    return (exports.isFunction(componentClass) &&
        (componentClass.prototype &&
            !!componentClass.prototype.render &&
            !!componentClass.prototype.setState &&
            !!componentClass.prototype.forceUpdate));
};
exports.isHTMLElement = function (node) {
    return typeof node === "object" && node !== null && node.nodeType && node.nodeName;
};
exports.deepCopy = function (object) {
    let newObject = null;
    if (exports.isArray(object)) {
        newObject = [];
        for (let i = 0; i < object.length; i++) {
            newObject.push(exports.deepCopy(object[i]));
        }
    }
    else if (exports.isObject(object)) {
        newObject = {};
        for (let k in object) {
            newObject[k] = exports.deepCopy(object[k]);
        }
    }
    else {
        newObject = object;
    }
    return newObject;
};
exports.Enumerable = function (target, propertyName, value) {
    Object.defineProperty(target, propertyName, {
        enumerable: false,
        value: value,
        writable: false,
        configurable: false,
    });
};
