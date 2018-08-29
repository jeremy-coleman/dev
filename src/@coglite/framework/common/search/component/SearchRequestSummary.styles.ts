import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchRequestSummaryStyles {
    root?: IStyle;
    value?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchRequestSummaryStyles => {
    return {
        root: {
            display: "flex"
        },
        value: {
            paddingLeft: 8
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchRequestSummaryStyles) : ISearchRequestSummaryStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export {
    ISearchRequestSummaryStyles,
    defaultStyles,
    Defaults,
    getStyles
}