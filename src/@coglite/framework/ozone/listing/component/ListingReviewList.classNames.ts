import { mergeStyles, mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewListStyles } from "./ListingReviewList.styles";

interface IListingReviewListClassNames {
    root?: string;
    items?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewListStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-review-list", className, styles.root],
        items: ["listing-review-list-items", styles.items],
        addContainer: ["listing-review-list-add-container", styles.addContainer]
    });
});

export { IListingReviewListClassNames, getClassNames }