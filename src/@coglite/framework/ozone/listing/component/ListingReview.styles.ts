import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingReviewStyles {
    root?: IStyle;
    text?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingReviewStyles => {
    return {
        root: {
            marginBottom: 12
        },
        text: {
            paddingTop: 4,
            paddingBottom: 4
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewStyles | undefined) : IListingReviewStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingReviewStyles, getStyles, defaultStyles, Defaults }

