import { observer } from 'mobx-react';
import * as React from 'react';

import { HostAppView, IHostAppViewProps } from '../../core';
import { DashboardListContainer } from './DashboardList';


interface IDashboardListAppViewProps extends IHostAppViewProps {
    dashboardList: IDashboardList;
    children?: React.ReactChildren
}

let DashboardListAppView = observer((props: IDashboardListAppViewProps) => 
            <HostAppView {...props} {...props.dashboardList.load()}>
                <DashboardListContainer dashboardList={props.dashboardList} host={props.host} />
                {props.children}
            </HostAppView>
)


export { IDashboardListAppViewProps, DashboardListAppView }
