import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISelectableDetailsListStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISelectableDetailsListStyles => {
    return {
        root: {}
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISelectableDetailsListStyles) : ISelectableDetailsListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISelectableDetailsListStyles, defaultStyles, Defaults, getStyles }