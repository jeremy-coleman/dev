import { IStyle, ITheme, getTheme, FontSizes, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { concatStyleSets } from "@uifabric/merge-styles";

interface ISearchResultStyles {
    root?: IStyle;
    value?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchResultStyles => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            lineHeight: FontSizes.medium
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles : ISearchResultStyles) : ISearchResultStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchResultStyles, getStyles, Defaults, defaultStyles }