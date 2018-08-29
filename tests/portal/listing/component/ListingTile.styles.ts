import { concatStyleSets, FontSizes, FontWeights, getTheme, IStyle, ITheme } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingTileStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    clickableRoot?: IStyle;
    top?: IStyle;
    banner?: IStyle;
    content?: IStyle;
    title?: IStyle;
    shortDescription?: IStyle;
    footer?: IStyle;
}

const defaultStyles = (theme : ITheme) : IListingTileStyles => {
    return {
        root: {
            position: "relative",
            width: 240,
            minWidth: 240,
            height: 300,
            minHeight: 300,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            backgroundColor: theme.palette.white,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.5s, border 0.5s",
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            selectors: {
                "&:hover": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)",
                    selectors: {
                        ".opacity-hover": {
                            opacity: 0.4
                        }
                    }
                },
                "&:focus": {
                    boxShadow: "0 5px 30px rgba(0, 0, 0, 0.15)"
                }
            }
        },
        clickableRoot: {
            cursor: "pointer"
        },
        top: {
            height: 157,
            width: "100%",
            opacity: 0.1,
            transition: "opacity 0.25s",
            overflow: "hidden",
            backgroundColor: theme.palette.themeDark
        },
        banner: {
            position: "absolute",
            left: 10,
            top: 10,
            width: 220,
            height: 137,
            zIndex: 2,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            selectors: {
                "&.is-icon": {
                    backgroundColor: theme.palette.neutralLight,
                    color: theme.palette.orange
                },
                ".banner-icon": {
                    fontSize: FontSizes.xxLarge
                }
            }
        },
        content: {
            position: "absolute",
            top: 157,
            left: 0,
            right: 0,
            bottom: 44,
            color: theme.palette.neutralPrimary,
            fontSize: FontSizes.small
        },
        title: {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.icon,
            paddingTop: 12,
            paddingRight: 10,
            paddingBottom: 6,
            paddingLeft: 10,
            marginTop: 0,
            marginBottom: 0
        },
        shortDescription: {
            fontWeight: FontWeights.light,
            overflow: "hidden",
            textOverflow: "clip",
            maxHeight: 60,
            paddingTop: 0,
            paddingRight: 10,
            paddingBottom: 2,
            paddingLeft: 10,
            marginTop: 0,
            marginBottom: 0
        },
        footer: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 44,
            borderTop: `1px solid ${theme.palette.neutralLighter}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"
        }
    };
}

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingTileStyles | undefined) : IListingTileStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IListingTileStyles, getStyles, defaultStyles, Defaults };
