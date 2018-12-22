"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CURRENT_ID_PROPERTY = '__currentId__';
const DEFAULT_ID_STRING = 'id__';
let _global = (typeof window !== 'undefined' && window) || process;
if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0;
}
function checkProperties(a, b) {
    for (let propName in a) {
        if (a.hasOwnProperty(propName)) {
            if (!b.hasOwnProperty(propName) || b[propName] !== a[propName]) {
                return false;
            }
        }
    }
    return true;
}
function shallowCompare(a, b) {
    return checkProperties(a, b) && checkProperties(b, a);
}
exports.shallowCompare = shallowCompare;
function assign(target, ...args) {
    return filteredAssign.apply(this, [null, target].concat(args));
}
exports.assign = assign;
function filteredAssign(isAllowed, target, ...args) {
    target = target || {};
    for (let sourceObject of args) {
        if (sourceObject) {
            for (let propName in sourceObject) {
                if (sourceObject.hasOwnProperty(propName) && (!isAllowed || isAllowed(propName))) {
                    target[propName] = sourceObject[propName];
                }
            }
        }
    }
    return target;
}
exports.filteredAssign = filteredAssign;
function getId(prefix) {
    let index = _global[CURRENT_ID_PROPERTY]++;
    return (prefix || DEFAULT_ID_STRING) + index;
}
exports.getId = getId;
function resetIds(counter = 0) {
    _global[CURRENT_ID_PROPERTY] = counter;
}
exports.resetIds = resetIds;
function mapEnumByName(theEnum, callback) {
    return Object.keys(theEnum)
        .map((p) => {
        if (String(Number(p)) !== p) {
            return callback(p, theEnum[p]);
        }
    })
        .filter((v) => !!v);
}
exports.mapEnumByName = mapEnumByName;
function values(obj) {
    return Object.keys(obj).reduce((arr, key) => {
        arr.push(obj[key]);
        return arr;
    }, []);
}
exports.values = values;
