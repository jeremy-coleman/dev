import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IViewPreferencesMenuItemStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : IViewPreferencesMenuItemStyles => {
    return {
        root: {
            selectors: {
                "&.has-prefs": {
                    selectors: {
                        ".ms-Button-icon": {
                            color: theme.palette.orange
                        }
                    }
                }
            }
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles : IViewPreferencesMenuItemStyles) : IViewPreferencesMenuItemStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IViewPreferencesMenuItemStyles, getStyles, defaultStyles, Defaults }