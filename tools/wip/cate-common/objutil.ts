
import {isDefined, isUndefined} from "./types";

export function updateObject(target, ...sources) {
    return Object.assign({}, target, ...sources);
}

export function updatePropertyObject(target, propertyName: string, newValue) {
    const oldValue = target[propertyName];
    return updateObject(target, {[propertyName]: updateObject(oldValue, newValue)});
}

export function updateConditionally(target, ...sources) {
    target = {...target};
    for (let source of sources) {
        if (isDefined(source)) {
            for (let name of Object.keys(source)) {
                if (isUndefined(target[name])) {
                    target[name] = source[name];
                }
            }
        }
    }
    return target;
}

// TODO (nf): test & find better name
export function updateConditionally2(target, ...sources) {
    target = {...target};
    for (let source of sources) {
        if (isDefined(source)) {
            for (let name of Object.keys(source)) {
                if (isDefined(source[name])) {
                    target[name] = source[name];
                }
            }
        }
    }
    return target;
}
