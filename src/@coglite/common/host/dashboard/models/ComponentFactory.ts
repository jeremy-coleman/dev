import { HSplitModel, VSplitModel } from './Split';
import { StackModel } from './Stack';
import { WindowModel } from './WindowModel';

const ComponentFactoryMap = {
    "window": () => new WindowModel(),
    "stack": () => new StackModel(),
    "hsplit": () => new HSplitModel(),
    "vsplit": () => new VSplitModel()
};

const ComponentFactory = (type) => {
    const s = ComponentFactoryMap[type];
    if(s) {
        return s();
    }
    throw { code: "NOT_FOUND", type: type, message: `Component Type ${type} is not registered`};
};

export {ComponentFactory,ComponentFactoryMap}


// const ComponentFactoryMap : IComponentFactoryMap = {};
// ComponentFactoryMap[ComponentTypes.window] = () => {
//     return new WindowModel();
// };
// ComponentFactoryMap[ComponentTypes.stack] = () => {
//     return new StackModel();
// };
// ComponentFactoryMap[ComponentTypes.hsplit] = () => {
//     return new HSplitModel();
// };
// ComponentFactoryMap[ComponentTypes.vsplit] = () => {
//     return new VSplitModel();
// };


// import when from 'when-switch'

// let ComponentFactoryMap1 = (type) => (
//     when(type)
//     .is("window", () =>  new WindowModel())
//     .is("stack", () => new StackModel())
//     .is("hsplit", () => new HSplitModel())
//     .is( "vsplit", () => new VSplitModel())
// )
