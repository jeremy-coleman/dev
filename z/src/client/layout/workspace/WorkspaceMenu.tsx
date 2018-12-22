//import Button from '@material-ui/core/Button';
import { addDashboard, applyTabLayout, clearDashboards } from '@coglite/common/host/dashboard';
import { WorkspaceStorage } from '../../state';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { WorkspaceDropdown } from './WorkspaceDropdown';
import { WorkspaceDropdownItem } from './WorkspaceDropdownItem';


let removeSingleDashboard = action((d: IComponent) => WorkspaceStorage.remove(d))

let WorkspaceMenu = observer(() => {
    const dashboardList = WorkspaceStorage
    //const sync = dashboardList.sync; -- todo - delete this shit from the model or move it into a cloud only model
    const active = dashboardList.active;
    const dropdownHeading = active ? active.title : "Untitled";
    //const items : any[] = [];
        
        return (
            <WorkspaceDropdown
                dropdownHeading={dropdownHeading}
                dashboardListItems={dashboardList.dashboards.map(d =>
                    <WorkspaceDropdownItem
                        key={d.id}
                        name={d.title}
                        canCheck={true}
                        checked={d === active}
                        dashboardList={dashboardList}
                        dashboard={d}
                        onSelectFromDropdown={() => dashboardList.setActive(d.dashboard)}
                        onDeleteSingle={() => removeSingleDashboard(d)}
                        onSelectTabLayout={() => applyTabLayout(d)}
                    />
                )}
                onRemoveAll={() => clearDashboards(dashboardList)}
                onClickNew={() => addDashboard({dashboardList: dashboardList})}
             />
        )
})

export {WorkspaceMenu}