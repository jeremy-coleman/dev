import { ISearchRequestSummaryStyles } from "./SearchRequestSummary.styles";
import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchRequestSummaryClassNames {
    root?: string;
    value?: string;
}

const getClassNames = memoizeFunction((styles : ISearchRequestSummaryStyles, className?: string) : ISearchRequestSummaryClassNames => {
    return mergeStyleSets({
        root: ["search-request-summary", styles.root, className],
        value: ["search-request-summary-value", styles.value]
    });
});

export { ISearchRequestSummaryClassNames, getClassNames }