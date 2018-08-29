import { memoizeFunction } from "@uifabric/utilities";
import { IDetailsItemStyles } from "./DetailsItem.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface IDetailsItemClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IDetailsItemStyles, className?: string) : IDetailsItemClassNames => {
    return mergeStyleSets({
        root: ["details-item", className, styles.root]
    })
});

export { IDetailsItemClassNames, getClassNames }