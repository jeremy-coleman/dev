// import { DashboardListAppView } from '@coglite/common/host/dashboard';
// import { WorkspaceStorage } from '../state';
// import { observer } from 'mobx-react';
// import * as React from 'react';






// let DashboardsApp = observer((props:IAppProps) => 
//     <DashboardListAppView dashboardList={WorkspaceStorage}  host={props.match.host}/>
// );

// export { DashboardsApp }
// export default DashboardsApp


import {AppRouter} from '../AppRouter'
import { TransientStorageService, LoggingStorageService } from '@coglite/common/host';
import { DashboardModel, ComponentFactory, DashboardView } from '@coglite/common/host/dashboard';
import { observer } from 'mobx-react';
import * as React from 'react';
import { observable, computed } from 'mobx';

const storageKey = "coglite-dashboard-list";

const storageService = new LoggingStorageService({
    prefix: "cogliteDashboardStorage",
    target: new TransientStorageService()
})

const WorkspaceStorage = new DashboardModel();


//WorkspaceStorage.setRouter(PortalRouter);
WorkspaceStorage.setRouter(AppRouter);


WorkspaceStorage.loader = () => storageService.getItem(storageKey);

WorkspaceStorage.saver = (data) => storageService.setItem(storageKey, data);

WorkspaceStorage.addApp = { title: "Home", path: "/home" };

WorkspaceStorage.componentFactory = ComponentFactory

export { WorkspaceStorage, storageService }



interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    afterConfig?: (dashboard : DashboardModel) => void;
    //styles?: any
}

interface IDashboardWrapper {
    dashboard : DashboardModel;
}

class DashboardWrapper extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    @observable.ref private _dashboard : DashboardModel = new DashboardModel();
    
    @computed
    get dashboard() {
        return this._dashboard;
    }
    constructor(props : IDashboardWrapperProps) {
        super(props);
        this._setFromProps(this.props);
    }
    private _setFromProps(props : IDashboardWrapperProps) {
        this.dashboard.router = props.router;
        this.dashboard.addApp = props.addApp;
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
        this.dashboard.componentFactory = props.componentFactory || ComponentFactory;
    }
    private _load(props : IDashboardWrapperProps) {
        if(props.loader) {
            this.dashboard.load();
        } else if(props.config) {
            this.dashboard.setConfig(props.config);
            if(props.afterConfig) {
                props.afterConfig(this.dashboard);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.dashboard.close();
        this._setFromProps(nextProps);
        this._load(nextProps);
    }
    componentWillMount() {
        this._load(this.props);
    }
    componentWillUnmount() {
        this.dashboard.close();
    }
    render() {
        return (
            <DashboardView
                className={this.props.className}
                dashboard={this.dashboard}
                host={this.props.host}
            />
        )
    }
}






@observer
class DashboardsApp extends React.Component<any, any> {
    render() {
        const dashboardConfig = {
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
            <DashboardWrapper host={this.props.host} config={dashboardConfig} router={AppRouter} addApp={{ path: "/home" }} />
        );
    }
}




// let DashboardsApp1 = observer((props:IAppProps) => 
//     <DashboardWrapper dashboard={WorkspaceStorage}  host={props.match.host}/>
// );


export { IDashboardWrapper, IDashboardWrapperProps, DashboardWrapper }
export { DashboardsApp }
export default DashboardsApp