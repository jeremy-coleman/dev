import { memoizeFunction } from "@uifabric/utilities";
import { ISelectableDetailsListStyles } from "./SelectableDetailsList.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface ISelectableDetailsListClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : ISelectableDetailsListStyles, className?: string) : ISelectableDetailsListClassNames => {
    return mergeStyleSets({
        root: ["selectable-details-list", styles.root, className]
    })
});

export { ISelectableDetailsListClassNames, getClassNames }