"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaPrefixDefaults = {
    metaPrefix: "_"
};
exports.MetaPrefixDefaults = MetaPrefixDefaults;
const removeMeta = (value, metaPrefix = MetaPrefixDefaults.metaPrefix) => {
    if (value) {
        const metaKeys = Object.keys(value).filter(key => key.startsWith(metaPrefix));
        metaKeys.forEach(metaKey => {
            delete value[metaKey];
        });
    }
    return value;
};
exports.removeMeta = removeMeta;
