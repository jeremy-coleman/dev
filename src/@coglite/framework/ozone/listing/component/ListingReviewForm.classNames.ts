import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewFormStyles } from "./ListingReviewForm.styles";

interface IListingReviewFormClassNames {
    root?: string;
    items?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewFormStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-review-form", className, styles.root],
        editor: ["listing-review-form-editor", styles.editor],
        actions: ["listing-review-form-actions", styles.actions]
    });
});

export { IListingReviewFormClassNames, getClassNames }