import {AppRouter} from '../AppRouter'
import { TransientStorageService, LoggingStorageService, WindowAppHost, WindowModel } from '@coglite/common/host';
import { StackModel, ComponentFactory } from '@coglite/common/host';
import { observer } from 'mobx-react';
import * as React from 'react';
import { observable, computed } from 'mobx';
import { StackView } from './StackView';

const storageKey = "coglite-Stack-list";

const storageService = new LoggingStorageService({
    prefix: "cogliteStackStorage",
    target: new TransientStorageService()
})

const Workspace = new StackModel();

//Workspace.setRouter(PortalRouter);
Workspace.setRouter(AppRouter);


Workspace.addApp = { title: "Home", path: "/home" };

Workspace.componentFactory = ComponentFactory

export { Workspace, storageService }


interface IStackWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    afterConfig?: (stack : StackModel) => void;
    //styles?: any
}

interface IStackWrapper {
    stack : StackModel;
}

class StackWrapper extends React.Component<IStackWrapperProps, any>  {
    @observable.ref private _stack : StackModel = new StackModel();
    
    @computed
    get stack(): StackModel {
        return this._stack;
    }
    constructor(props : IStackWrapperProps) {
        super(props);
        this.stack.router = props.router;
        this.stack.addApp = props.addApp;
        this.stack.componentFactory = props.componentFactory || ComponentFactory;
        this.stack.setConfig(props.config);
    }

    render() {
        return (
            <StackView
                className={this.props.className}
                stack={this.stack}
                host={this.props.host}
            />
        )
    }
}



@observer
class DashboardsApp extends React.Component<any, any> {
    render() {
        const StackConfig = {
            type: "window",
            component: {
                type: "stack",
                closeDisabled: false,
                windows: [
                    {
                        type: "window",
                        path: "/home"
                    }
                ]
            }
        };
        return (
            <StackWrapper host={this.props.host} config={StackConfig} router={AppRouter} addApp={{ path: "/home" }} />
        );
    }
}




// let StacksApp1 = observer((props:IAppProps) => 
//     <StackWrapper Stack={WorkspaceStorage}  host={props.match.host}/>
// );


export { IStackWrapper, IStackWrapperProps, StackWrapper }
export { DashboardsApp }
export default DashboardsApp