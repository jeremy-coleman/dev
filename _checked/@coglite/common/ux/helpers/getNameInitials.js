"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNameInitials(input) {
    let initials = input.match(/\b\w/g) || [];
    ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
}
exports.getNameInitials = getNameInitials;
