//import { grid, hsplit, stack, vsplit, window } from '../constants';
import { ComponentTypes } from '../constants';
import { HSplitModel, VSplitModel } from './Split';
import { StackModel } from './Stack';
import { WindowModel } from './WindowModel';


const ComponentFactoryMap : IComponentFactoryMap = {};
ComponentFactoryMap[ComponentTypes.window] = () => {
    return new WindowModel();
};
ComponentFactoryMap[ComponentTypes.stack] = () => {
    return new StackModel();
};
ComponentFactoryMap[ComponentTypes.hsplit] = () => {
    return new HSplitModel();
};
ComponentFactoryMap[ComponentTypes.vsplit] = () => {
    return new VSplitModel();
};


const ComponentFactory : IComponentFactory = (type : string) => {
    const s = ComponentFactoryMap[type];
    if(s) {
        return s();
    }
    throw { code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered`};
};

export {
    ComponentFactory,
    ComponentFactoryMap
}