import { IDashboard } from "../model/IDashboard";
import { IPredicateFunc } from "@coglite/framework/common/IPredicateFunc";

interface IDashboardLayout {
    doLayout: (dashboard : IDashboard) => Promise<any>;
    isLayoutApplied: IPredicateFunc<IDashboard>;
}

export { IDashboardLayout }