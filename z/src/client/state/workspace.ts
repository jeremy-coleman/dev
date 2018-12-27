import {AppRouter} from '../AppRouter'
import { TransientStorageService, LoggingStorageService } from '@coglite/common/host';
import { DashboardListModel, ComponentFactory } from '@coglite/common/host/dashboard';


const storageKey = "coglite-dashboard-list";

const storageService = new LoggingStorageService({
    prefix: "cogliteDashboardStorage",
    target: new TransientStorageService()
})

const WorkspaceStorage = new DashboardListModel();

//WorkspaceStorage.setRouter(PortalRouter);
WorkspaceStorage.setRouter(AppRouter);


WorkspaceStorage.loader = () => storageService.getItem(storageKey);

WorkspaceStorage.saver = (data) => storageService.setItem(storageKey, data);

WorkspaceStorage.addApp = { title: "Home", path: "/home" };

WorkspaceStorage.componentFactory = ComponentFactory;

export { WorkspaceStorage, storageService }