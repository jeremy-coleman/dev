import {AppRouter} from '../AppRouter'
import { DashboardModel, ComponentFactory, DashboardView } from '@coglite/common/host/dashboard';
import { observer } from 'mobx-react';
import * as React from 'react';
import { observable, computed } from 'mobx';

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


@observer
class DashboardsApp extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    @observable dashboard: DashboardModel = new DashboardModel();
    
    dashboardConfig = {
        //type: "stack",
        component: {
            type: "stack",
            closeDisabled: false,
            windows: [{type: "window",path: "/home"}]
            }
        };

    // @computed
    // get dashboard() {
    //     return this._dashboard;
    // }

    constructor(props : IDashboardWrapperProps) {
        super(props);
        this.dashboard.router = AppRouter
        this.dashboard.addApp = { path: "/home" }
        this.dashboard.componentFactory = props.componentFactory || ComponentFactory;
        this.dashboard.setConfig(this.dashboardConfig);
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

export { IDashboardWrapper, IDashboardWrapperProps }
export { DashboardsApp }
export default DashboardsApp