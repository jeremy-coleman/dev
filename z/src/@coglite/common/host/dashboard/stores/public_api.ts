import { SupplierModel } from '../../models';

import { ComponentRemoveModel, DashboardAddModel } from '../models';


const DashboardRemoveStore = new SupplierModel<IDashboard>();
const DashboardListClearStore = new SupplierModel<IDashboardList>();
const DashboardAddStore = new DashboardAddModel();
const ComponentRemoveStore = new ComponentRemoveModel();

export { ComponentRemoveStore }
export { DashboardAddStore }
export { DashboardListClearStore }
export { DashboardRemoveStore }