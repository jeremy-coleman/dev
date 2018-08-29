import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDashboardListStyles } from "./DashboardList.styles";

interface IDashboardListClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardListStyles, className?: string) => {
    return mergeStyleSets({
        root: ["dashboard-list", className, styles.root]
    });
});

export { IDashboardListClassNames, getClassNames }