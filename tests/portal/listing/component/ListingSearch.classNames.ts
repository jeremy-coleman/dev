import { memoizeFunction } from "@uifabric/utilities";
import { IListingSearchStyles } from "./ListingSearch.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface IListingSearchClassNames {
    root?: string;
    input?: string;
    results?: string;
}

const getClassNames = memoizeFunction((styles : IListingSearchStyles, className?: string) : IListingSearchClassNames => {
    return mergeStyleSets({
        root: ["listing-search", className, styles.root],
        input: ["listing-search-input", styles.input],
        results: ["listing-search-results", styles.results]
    });
});

export { IListingSearchClassNames, getClassNames }