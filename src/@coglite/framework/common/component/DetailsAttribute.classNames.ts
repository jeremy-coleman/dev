import { memoizeFunction } from "@uifabric/utilities";
import { IDetailsAttributeStyles } from "./DetailsAttribute.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface IDetailsAttributeClassNames {
    root?: string;
    label?: string;
    value?: string;
}

const getClassNames = memoizeFunction((styles : IDetailsAttributeStyles, className?: string) : IDetailsAttributeClassNames => {
    return mergeStyleSets({
        root: ["details-attribute", className, styles.root],
        label: ["details-attribute-label", styles.label],
        value: ["details-attribute-value", styles.value]
    })
});

export { IDetailsAttributeClassNames, getClassNames }