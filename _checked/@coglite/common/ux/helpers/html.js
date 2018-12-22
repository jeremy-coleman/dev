"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClientRectWithMargin(element) {
    if (!element) {
        return;
    }
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element, null);
    const clone = {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
    };
    clone.width += convertStylePropertyPixelsToNumber(style, "margin-left");
    clone.width += convertStylePropertyPixelsToNumber(style, "margin-right");
    clone.height += convertStylePropertyPixelsToNumber(style, "margin-top");
    clone.height += convertStylePropertyPixelsToNumber(style, "margin-bottom");
    return clone;
}
exports.getClientRectWithMargin = getClientRectWithMargin;
function convertStylePropertyPixelsToNumber(computedStyle, property) {
    if (!computedStyle || !property) {
        return;
    }
    return parseInt(computedStyle.getPropertyValue(property).substring(0, computedStyle.getPropertyValue(property).length - 2), 10);
}
exports.convertStylePropertyPixelsToNumber = convertStylePropertyPixelsToNumber;
