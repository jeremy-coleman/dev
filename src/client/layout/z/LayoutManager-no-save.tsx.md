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

// const WorkspaceStorage = new DashboardModel();


// //WorkspaceStorage.setRouter(PortalRouter);
// WorkspaceStorage.setRouter(AppRouter);


// //WorkspaceStorage.loader = () => storageService.getItem(storageKey);
// //WorkspaceStorage.saver = (data) => storageService.setItem(storageKey, data);

// WorkspaceStorage.addApp = { title: "Home", path: "/home" };

// WorkspaceStorage.componentFactory = ComponentFactory

// export { WorkspaceStorage, storageService }



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
    
    dashboardConfig = {
        type: "window",
        component: {
            type: "stack",
            closeDisabled: false,
            windows: [{type: "window",path: "/home"}]
            }
        };

    @computed
    get dashboard() {
        return this._dashboard;
    }

    constructor(props : IDashboardWrapperProps) {
        super(props);
        this.dashboard.router = props.router;
        this.dashboard.addApp = props.addApp;
        this.dashboard.componentFactory = props.componentFactory || ComponentFactory;
        this.dashboard.setConfig(props.config);
        //this._setFromProps(this.props);
    }

    render() {
        return (
            //@ts-ignore
            <DashboardView
                className={this.props.className}
                dashboard={this.dashboard}
                host={this.props.host}
                config={this.dashboardConfig}
                router={AppRouter}
                addApp={{ path: "/home" }}
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