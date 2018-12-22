"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant = (value) => () => value;
exports.constant = constant;
const alwaysTrue = constant(true);
exports.alwaysTrue = alwaysTrue;
const alwaysFalse = constant(false);
exports.alwaysFalse = alwaysFalse;
const cachingFinder = (opts) => {
    const cache = {};
    const eopts = Object.assign({}, opts);
    return (key) => {
        if (!eopts.cacheForMillis || eopts.cacheForMillis <= 0) {
            return opts.finder(key);
        }
        const skey = String(key);
        let entry = cache[skey];
        if (!entry) {
            entry = { supplier: eopts.finder(key) };
            cache[skey] = entry;
            entry.timeout = setTimeout(() => {
                delete cache[skey];
            }, eopts.cacheForMillis);
        }
        if (!eopts.noLoad) {
            entry.supplier.load();
        }
        return entry.supplier;
    };
};
