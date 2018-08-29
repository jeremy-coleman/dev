import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingActivityListStyles } from "./ListingActivityList.styles";

interface IListingActivityListClassNames {
    root?: string;
    activities?: string;
    activity?: string;
}

const getClassNames = memoizeFunction((styles : IListingActivityListStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-activity-list", className, styles.root],
        activities: ["listing-activity-list-activities", styles.activities],
        activity: ["listing-activity-list-activity", styles.activity]
    });
});

export { IListingActivityListClassNames, getClassNames };
