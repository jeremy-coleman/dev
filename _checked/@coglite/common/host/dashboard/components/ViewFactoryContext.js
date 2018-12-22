"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const HSplit_1 = require("./HSplit");
const MappedViewFactory_1 = require("./MappedViewFactory");
const Stack_1 = require("./Stack");
const VSplit_1 = require("./VSplit");
const ViewFactoryDefaults = {
    createViewFactory: () => {
        const factory = new MappedViewFactory_1.MappedViewFactory();
        factory.setFactory("stack", new Stack_1.StackViewFactory());
        factory.setFactory("hsplit", new HSplit_1.HSplitViewFactory());
        factory.setFactory("vsplit", new VSplit_1.VSplitViewFactory());
        return factory;
    }
};
exports.ViewFactoryDefaults = ViewFactoryDefaults;
const ViewFactoryContext = React.createContext(ViewFactoryDefaults.createViewFactory());
exports.ViewFactoryContext = ViewFactoryContext;
