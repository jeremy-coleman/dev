"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composeMap = new WeakMap();
function compose(fn1, fn2) {
    const firstLevelCacheHit = composeMap.get(fn1);
    if (firstLevelCacheHit) {
        const secondLevelCacheHit = firstLevelCacheHit.get(fn2);
        if (secondLevelCacheHit) {
            return secondLevelCacheHit;
        }
        const composedFn = (arg) => fn2(fn1(arg));
        firstLevelCacheHit.set(fn2, composedFn);
        return composedFn;
    }
    const composedFn = (arg) => fn2(fn1(arg));
    const secondLevelCache = new WeakMap();
    secondLevelCache.set(fn2, composedFn);
    composeMap.set(fn1, secondLevelCache);
    return composedFn;
}
exports.compose = compose;
