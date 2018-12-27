import { observer } from 'mobx-react';
import * as React from 'react';

import { ViewFactoryContext } from './ViewFactoryContext';


interface IComponentViewProps {
    component: IComponent;
}


let ComponentView = observer((props: IComponentViewProps) => 
            <ViewFactoryContext.Consumer>
                {value =>  value.createView(props.component)}
            </ViewFactoryContext.Consumer>
);


export { IComponentViewProps, ComponentView }


// class ComponentView1 extends React.Component<IComponentViewProps, any> {
//     render() {
//         return (
//             <ViewFactoryContext.Consumer>
//                 {value =>  value.createView(this.props.component)}
//             </ViewFactoryContext.Consumer>
//         );
//     }
// }