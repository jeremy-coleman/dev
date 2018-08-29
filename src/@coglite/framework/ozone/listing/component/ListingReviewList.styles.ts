import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingReviewListStyles {
    root?: IStyle;
    items?: IStyle;
    addContainer?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingReviewListStyles => {
    return {
        root: {},
        items: {
            padding: 8
        },
        addContainer: {
            margin: "16px 8px"
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewListStyles | undefined) : IListingReviewListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingReviewListStyles, getStyles, defaultStyles, Defaults }

