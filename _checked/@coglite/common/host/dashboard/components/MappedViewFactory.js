"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MappedViewFactory {
    constructor() {
        this._map = {};
    }
    setFactory(type, factory) {
        if (type && factory) {
            this._map[type] = factory;
        }
    }
    createView(comp) {
        const factory = this._map[comp.type];
        return factory ? factory.createView(comp) : null;
    }
}
exports.MappedViewFactory = MappedViewFactory;
