"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const Split_1 = require("./Split");
const Stack_1 = require("./Stack");
const WindowModel_1 = require("./WindowModel");
const ComponentFactoryMap = {};
exports.ComponentFactoryMap = ComponentFactoryMap;
ComponentFactoryMap[constants_1.ComponentTypes.window] = () => {
    return new WindowModel_1.WindowModel();
};
ComponentFactoryMap[constants_1.ComponentTypes.stack] = () => {
    return new Stack_1.StackModel();
};
ComponentFactoryMap[constants_1.ComponentTypes.hsplit] = () => {
    return new Split_1.HSplitModel();
};
ComponentFactoryMap[constants_1.ComponentTypes.vsplit] = () => {
    return new Split_1.VSplitModel();
};
const ComponentFactory = (type) => {
    const s = ComponentFactoryMap[type];
    if (s) {
        return s();
    }
    throw { code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered` };
};
exports.ComponentFactory = ComponentFactory;
