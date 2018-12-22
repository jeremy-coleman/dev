import { observer } from 'mobx-react';
import * as React from 'react';

import { SyncComponent } from '../../components';
import { DashboardAddStore, DashboardListClearStore } from '../stores';
import { DashboardView } from './Dashboard';
import { DashboardAddModal } from './DashboardAddModal';
import { DashboardListClearDialog } from './DashboardListClearDialog';


var dashboardListStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        } as React.CSSProperties
}

interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
    className?: string;
    dashboardStyles?: any;
}

let DashboardListMapper = observer((props: IDashboardListProps) => 
    <React.Fragment>
        { 
            props.dashboardList.dashboards.map(db => 
                <DashboardView 
                    key={db.id}
                    hidden={db !== props.dashboardList.active}
                    dashboard={db}
                    host={props.host}
                    className={props.dashboardStyles}
                />
            )
        }
    </React.Fragment>
)

let DashboardList = observer((props: IDashboardListProps) => 
            <div style={dashboardListStyles.root}>
                <DashboardAddModal add={DashboardAddStore} />
                <DashboardListClearDialog supplier={DashboardListClearStore} />
                <DashboardListMapper dashboardList={props.dashboardList}/>
            </div>
);


let DashboardListContainer = observer((props: IDashboardListProps) => 
        <SyncComponent 
            sync={props.dashboardList.sync}
            syncLabel="Loading Dashboards..."
            onRenderDone={() => <DashboardList {...props} />}
        />
)

export { IDashboardListProps, DashboardListContainer, DashboardList }