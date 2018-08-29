//import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, mergeStyles } from 'office-ui-fabric-react';

interface IErrorStyles {
    root?: IStyle;
    compact?: IStyle;
    message?: IStyle;
    item?: IStyle;
    itemTitle?: IStyle;
    itemValue?: IStyle;
}

const defaultStyles = (theme : ITheme) : IErrorStyles => {
    return  {
        root: {},
        compact: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        message: mergeStyles(theme.fonts.medium, {
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        }),
        item: {
            margin: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.redDark
        },
        itemTitle: mergeStyles(theme.fonts.small, {
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        }),
        itemValue: mergeStyles(theme.fonts.small, {
            padding: 8,
            overflow: "auto"
        })
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IErrorStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});


export { IErrorStyles, getStyles, Defaults, defaultStyles }