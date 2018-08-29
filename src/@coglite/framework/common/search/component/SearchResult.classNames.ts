import { memoizeFunction } from "@uifabric/utilities";
import { ISearchResultStyles } from "./SearchResult.styles";
import { mergeStyleSets } from "@uifabric/merge-styles";

interface ISearchResultClassNames {
    root?: string;
    value?: string;
}

const getClassNames = memoizeFunction((styles : ISearchResultStyles, className?: string) : ISearchResultClassNames => {
    return mergeStyleSets({
        root: [styles.root, "search-result", className],
        value: [styles.value, "search-result-value"],
    })
});

export { ISearchResultClassNames, getClassNames }