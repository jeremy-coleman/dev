"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
exports.default = exports.numberWithCommas;
