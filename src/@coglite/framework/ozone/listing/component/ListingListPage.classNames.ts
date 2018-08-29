import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingListPageStyles } from "./ListingListPage.styles";

interface IListingListPageClassNames {
    root?: string;
    input?: string;
    results?: string;
}

const getClassNames = memoizeFunction((styles : IListingListPageStyles, className : string) => {
    return mergeStyleSets({
        root: ["listing-list-page", className, styles.root],
        input: ["listing-list-page-input", styles.input],
        results: ["listing-list-page-results", styles.results]
    });
});

export { IListingListPageClassNames, getClassNames }