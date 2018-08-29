import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingListStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    wrappingRoot?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingListStyles => {
    return {
        root: {
            
        },
        compactRoot: {
            display: "flex",
            alignItems: "center"
        },
        wrappingRoot: {
            flexWrap: "wrap"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingListStyles | undefined) : IListingListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingListStyles, getStyles }