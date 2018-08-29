import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingActivityListStyles {
    root?: IStyle;
    activities?: IStyle;
    activity?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingActivityListStyles => {
    return {
        root: {
            
        },
        activities: {
            padding: 8
        },
        activity: {
           marginBottom: 12
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingActivityListStyles) : IListingActivityListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingActivityListStyles, getStyles }

