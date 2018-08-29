import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchFormStyles {
    root?: IStyle;
    content?: IStyle;
    textSearch?: IStyle;
    textSearchContainer?: IStyle;
    inputContainer?: IStyle;
    fieldsContainer?: IStyle;
    fieldContainer?: IStyle;
    fieldSelectContainer?: IStyle;
    fieldValueContainer?: IStyle;
    fieldRemoveContainer?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchFormStyles => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            backgroundColor: theme.palette.neutralLighter
        },
        content: {
            width: "60%"
        },
        inputContainer: {
            marginTop: 8,
            marginBottom: 8
        },
        textSearch: {
            flexGrow: 2
        },
        textSearchContainer: {
            display: "flex",
            alignItems: "center",
            width: "100%"
        },
        fieldsContainer: {

        },
        fieldContainer: {
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 8,
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        },
        fieldSelectContainer: {
            minWidth: 200,
            width: "30%",
            selectors: {
                ".ms-Dropdown-container": {
                    marginBottom: 0
                }
            }
        },
        fieldValueContainer: {
            minWidth: 300,
            flexGrow: 2,
            marginLeft: 8
        },
        fieldRemoveContainer: {}
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchFormStyles) : ISearchFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchFormStyles, defaultStyles, Defaults, getStyles }