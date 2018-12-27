"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SequenceId {
    constructor(prefix = "") {
        this._prefix = prefix;
    }
    next() {
        if (this._id === undefined) {
            this._id = 0;
        }
        else {
            this._id++;
        }
        return this._prefix + this._id;
    }
    reset() {
        this._id === undefined;
    }
}
exports.SequenceId = SequenceId;
const instances = {};
const getSequenceId = (name) => {
    if (name !== undefined) {
        let instance = instances[name];
        if (!instance) {
            instance = new SequenceId(name);
            instances[name] = instance;
        }
        return instance;
    }
    return new SequenceId();
};
exports.getSequenceId = getSequenceId;
const generateSequentialId = function (name) {
    return getSequenceId(name).next();
};
exports.generateSequentialId = generateSequentialId;
