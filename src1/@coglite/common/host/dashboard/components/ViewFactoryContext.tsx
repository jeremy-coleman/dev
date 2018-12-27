import * as React from 'react';

import { HSplitViewFactory } from './HSplit';
import { MappedViewFactory } from './MappedViewFactory';
import { StackViewFactory } from './Stack';
import { VSplitViewFactory } from './VSplit';


const ViewFactoryDefaults = {
    createViewFactory: () => {
        const factory = new MappedViewFactory();
        factory.setFactory("stack", new StackViewFactory());
        factory.setFactory("hsplit", new HSplitViewFactory());
        factory.setFactory("vsplit", new VSplitViewFactory());
        return factory;
    }
};

// NOTE that this is a react context (not app context)

const ViewFactoryContext = React.createContext<IViewFactory>(ViewFactoryDefaults.createViewFactory());

export { ViewFactoryContext, ViewFactoryDefaults }