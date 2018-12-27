import { action } from 'mobx';

import { DashboardListModel, DashboardModel, IDashboardAddOptions } from '../models';
import { HSplitModel, VSplitModel } from '../models/Split';
import { ComponentRemoveStore, DashboardAddStore, DashboardListClearStore, DashboardRemoveStore } from '../stores';


//--------------layout split actions----------------------//

const splitHorizontal = action((replace : IComponent, left : IComponent, right : IComponent) => {
    const split = new HSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setLeft(left);
    split.setRight(right);
});

const splitVertical = action((replace : IComponent, top : IComponent, bottom: IComponent) => {
    const split = new VSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setTop(top);
    split.setBottom(bottom);
});


//--------component actions----------------------//

const removeComponent = action((opts : IComponentRemoveOptions) => ComponentRemoveStore.init(opts))


//--------dashboard actions----------------------//

const addDashboard = action((opts : IDashboardAddOptions) => DashboardAddStore.init(opts))

const removeDashboard = action((dashboard : DashboardModel) => DashboardRemoveStore.value = dashboard)

const clearDashboards = action((dashboardList : DashboardListModel) => DashboardListClearStore.value = dashboardList);

//const remove = (d) => WorkspaceStorage.remove(d)

export {
    addDashboard,
    removeDashboard,
    clearDashboards,
    removeComponent,
    splitHorizontal,
    splitVertical
} 