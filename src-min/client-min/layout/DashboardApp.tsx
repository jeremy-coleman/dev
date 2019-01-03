import {AppRouter} from '../AppRouter'
import { DashboardModel, ComponentFactory, DashboardView } from '@coglite/common/host/dashboard';
import { observer } from 'mobx-react';
import * as React from 'react';
import { observable, computed } from 'mobx';


interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    host?: IEventEmitter;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    dashboard : DashboardModel;

}


let dashboard: DashboardModel = new DashboardModel();

dashboard.router = AppRouter
dashboard.addApp = { path: "/home" }
dashboard.componentFactory = ComponentFactory;
dashboard.config = {
        type: "dashboard",
        component: {
            type: "stack",
            closeDisabled: false,
            windows: [{type: "window",path: "/home"}]
            }
} as any;

let DashboardsApp = observer((props: IDashboardWrapperProps) =>
<DashboardView dashboard={dashboard} host={props.host}/>
)


export { IDashboardWrapperProps }
export { DashboardsApp }
export default DashboardsApp