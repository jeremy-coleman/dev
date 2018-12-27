"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defined = (...args) => {
    for (let arg of args) {
        if (arg !== undefined)
            return arg;
    }
};
