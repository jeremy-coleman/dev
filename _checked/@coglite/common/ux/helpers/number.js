"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapInBounds(min, max, value) {
    if (value < min) {
        return max;
    }
    else if (value > max) {
        return min;
    }
    return value;
}
exports.wrapInBounds = wrapInBounds;
function limit(min, max, value) {
    return Math.min(Math.max(value, min), max);
}
exports.limit = limit;
