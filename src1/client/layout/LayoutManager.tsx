import { DashboardListAppView } from '@coglite/common/host/dashboard';
import { WorkspaceStorage } from '../state';
import { observer } from 'mobx-react';
import * as React from 'react';

let DashboardsApp = observer((props:IAppProps) => 
    <DashboardListAppView dashboardList={WorkspaceStorage} host={props.match.host}/>
);

export { DashboardsApp }
export default DashboardsApp
