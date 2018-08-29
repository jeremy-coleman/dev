import { DashboardList } from "@coglite/framework/dashboard/model/DashboardList";
import { ComponentFactory } from "@coglite/framework/dashboard/model/ComponentFactory";
import { TransientStorageService } from "@coglite/framework/common/service/TransientStorageService";
import { LoggingStorageService } from "@coglite/framework/common/service/LoggingStorageService";

import { PortalRouter } from "./PortalRouter";

import {HostRouter} from '../HostRouter'


const storageKey = "coglite-dashboard-list";

const storageService = new LoggingStorageService({
    prefix: "cogliteDashboardStorage",
    target: new TransientStorageService()
})

const DashboardListStore = new DashboardList();

//DashboardListStore.setRouter(PortalRouter);
DashboardListStore.setRouter(HostRouter);

DashboardListStore.loader = () => {
    return storageService.getItem(storageKey);
};

DashboardListStore.saver = (data) => {
    return storageService.setItem(storageKey, data);
};

DashboardListStore.addApp = { title: "Home", path: "/home" };

DashboardListStore.componentFactory = ComponentFactory;

export { DashboardListStore }