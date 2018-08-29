import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewStyles } from "./ListingReview.styles";

interface IListingReviewClassNames {
    root?: string;
    text?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-review", className, styles.root],
        text: ["listing-review-text", styles.text]
    });
});

export { IListingReviewClassNames, getClassNames };
