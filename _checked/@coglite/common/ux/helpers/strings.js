"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(formatSpecifier, ...parameters) {
    return formatSpecifier.replace(/{(\d+)}/g, function (match, index) {
        if (index >= parameters.length) {
            return match;
        }
        const value = parameters[index];
        if ((typeof value !== "number") && !value) {
            return "";
        }
        return value;
    });
}
exports.format = format;
function startsWith(stringToSearch, searchFor, position = 0) {
    if (!stringToSearch || !searchFor) {
        return false;
    }
    return stringToSearch.substr(position, searchFor.length) === searchFor;
}
exports.startsWith = startsWith;
function isNullOrWhiteSpace(value) {
    return !value || !value.trim();
}
exports.isNullOrWhiteSpace = isNullOrWhiteSpace;
