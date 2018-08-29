import { IStyle, ITheme, FontSizes, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDetailsItemStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDetailsItemStyles => {
    return {
        root: {
            fontSize: FontSizes.small,
            marginTop: 8,
            marginBottom: 8,
            padding: 0,
            display: "flex",
            flexFlow: "column wrap"
        }
    };
}

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDetailsItemStyles) : IDetailsItemStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IDetailsItemStyles, getStyles, defaultStyles, Defaults }