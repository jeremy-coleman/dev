import { IStyle, ITheme, getTheme, FontSizes, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { concatStyleSets } from "@uifabric/merge-styles";

interface ISearchableValueStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchableValueStyles => {
    return {
        root: {
            background: theme.palette.neutralLight,
            color: theme.palette.themeDark,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            paddingBottom: 2,
            //marginLeft: 8,
            marginRight: 8,
            marginTop: 2,
            marginBottom: 2,
            borderRadius: 4,
            fontSize: FontSizes.small,
            fontWeight: FontWeights.regular,
            selectors: {
                "&.clickable": {
                    selectors: {
                        ":hover": {
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

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchableValueStyles) : ISearchableValueStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchableValueStyles, getStyles, defaultStyles, Defaults }