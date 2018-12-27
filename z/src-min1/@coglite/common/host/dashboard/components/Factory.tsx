import { observer } from 'mobx-react';
import * as React from 'react';

import { HSplitViewFactory } from './HSplit';
import { StackViewFactory } from './Stack';
import { VSplitViewFactory } from './VSplit';


class MappedViewFactory {
    private _map : { [key : string]: IViewFactory } = {};
    
    setFactory(type : string, factory : IViewFactory) {
        if(type && factory) {
            this._map[type] = factory;
        }
    }
    
    createView(comp : IComponent) : React.ReactNode {
        const factory = this._map[comp.type];
        return factory ? factory.createView(comp) : null;
    }
    
}



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



let ComponentView = observer(({component}) => 
            <ViewFactoryContext.Consumer>
                {value =>  value.createView(component)}
            </ViewFactoryContext.Consumer>
);


export { MappedViewFactory }
export { ViewFactoryContext, ViewFactoryDefaults }
export { ComponentView }

