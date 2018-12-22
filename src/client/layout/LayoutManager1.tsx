// import { StackListAppView } from '@coglite/common/host/Stack';
// import { WorkspaceStorage } from '../state';
// import { observer } from 'mobx-react';
// import * as React from 'react';






// let StacksApp = observer((props:IAppProps) => 
//     <StackListAppView StackList={WorkspaceStorage}  host={props.match.host}/>
// );

// export { StacksApp }
// export default StacksApp


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


//Workspace.loader = () => storageService.getItem(storageKey);
//Workspace.saver = (data) => storageService.setItem(storageKey, data);

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
        this._setFromProps(this.props);
    }

    private _setFromProps(props : IStackWrapperProps) {
        this.stack.router = props.router;
        this.stack.addApp = props.addApp;
        //this.stack.componentFactory = props.componentFactory || ComponentFactory;
    }
    
    private _load(props : IStackWrapperProps) {
        if(props.config) {
            this.stack.setConfig(props.config);
            if(props.afterConfig) {
                props.afterConfig(this.stack);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.stack.close();
        this._setFromProps(nextProps);
        this._load(nextProps);
    }

    componentWillMount() {
        this._load(this.props);
    }

    componentWillUnmount() {
        this.stack.close();
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
    //host = new WindowAppHost(new WindowModel())
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