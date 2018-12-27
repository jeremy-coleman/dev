import { ListModel } from '../../models';



import { TabDashboardLayout } from './TabDashboardLayout';


// the dashboard layout register - initialized with defaults
const DashboardLayoutRegistry = new ListModel<IDashboardLayout>([
    TabDashboardLayout
]);

export { DashboardLayoutRegistry }