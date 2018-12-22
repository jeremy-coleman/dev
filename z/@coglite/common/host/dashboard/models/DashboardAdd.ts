import { action, computed, observable } from 'mobx';

import { DashboardModel } from './Dashboard';
import { DashboardListModel } from './DashboardList';



export type IDashboardAddOptions = {
    dashboardList: DashboardListModel;
    existing?: DashboardModel;
}

export class DashboardAddModel  {
    @observable active : boolean = false;
    @observable dashboardList : DashboardListModel;
    @observable existing : DashboardModel;
    @observable dashboard : DashboardModel;
    @observable makeActive : boolean = true;
    
    @action
    init(opts : IDashboardAddOptions) {
        this.dashboardList = opts.dashboardList;
        this.dashboard = new DashboardModel();
        this.existing = opts.existing;
        let dashboardNumber = 1;
        let suggestedTitle;
        while(true) {
            suggestedTitle = `Workspace ${dashboardNumber}`;
            if(!this.dashboardList.dashboards.some(db => db.title === suggestedTitle)) {
                break;
            } else {
                dashboardNumber ++;
            }
        }
        this.dashboard.setTitle(suggestedTitle);
        this.active = true;
    }

    @action
    setExisting(existing : DashboardModel) {
        this.existing = existing;
    }

    @action
    setMakeActive(makeActive : boolean) {
        this.makeActive = makeActive;
    }

    @action
    private _close() {
        this.existing = undefined;
        this.dashboardList = undefined;
        this.active = false;
    }

    @computed
    get saveEnabled() {
        //return StringUtils.isNotBlank(this.dashboard.title) ? true : false;

        return this.dashboard.title.length > 1 ? true : false;
    }

    @action
    save() {
        if(this.existing) {
            this.dashboard.setComponentConfig(this.existing.componentConfig);
        }

        this.dashboardList.add(this.dashboard, this.makeActive);
        this._close();
    }

    @action
    cancel() {
        this._close();
    }
}

