import { ListModel } from "@coglite/framework/common/model/ListModel";
import { IDashboardLayout } from "./IDashboardLayout";
import { TabDashboardLayout } from "./TabDashboardLayout";
import { TwoColumnSplitDashboardLayout } from "./TwoColumnSplitDashboardLayout";
import { ThreeColumnSplitDashboardLayout } from "./ThreeColumnSplitDashboardLayout";
import { GridDashboardLayout } from "./GridDashboardLayout";

// the dashboard layout register - initialized with defaults
const DashboardLayoutRegistry = new ListModel<IDashboardLayout>([
    TabDashboardLayout,
    TwoColumnSplitDashboardLayout,
    ThreeColumnSplitDashboardLayout,
    GridDashboardLayout
]);

export { DashboardLayoutRegistry }