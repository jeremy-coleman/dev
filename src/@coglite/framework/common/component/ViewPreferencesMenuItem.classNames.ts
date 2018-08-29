import { memoizeFunction } from "@uifabric/utilities";
import { mergeStyleSets } from "@uifabric/styling";
import { IViewPreferencesMenuItemStyles } from "./ViewPreferencesMenuItem.styles";

interface IViewPreferencesMenuItemClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IViewPreferencesMenuItemStyles, className?: string) : IViewPreferencesMenuItemClassNames => {
    return mergeStyleSets({
        root: ["view-preferences-menu-item", className, styles.root],
    });
});

export { IViewPreferencesMenuItemClassNames, getClassNames }