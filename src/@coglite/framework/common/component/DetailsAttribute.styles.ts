import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDetailsAttributeStyles {
    root?: IStyle;
    label?: IStyle;
    value?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDetailsAttributeStyles => {
    return {
        root: {
            selectors: {
                ".ms-Grid": {
                    paddingLeft: 0,
                    paddingRight: 0,
                    selectors: {
                        ".ms-Grid-row": {
                            margin: 0,
                            selectors: {
                                ".ms-Grid-col": {
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }
                            }
                        }
                    }
                }
            }
        },
        label: { fontWeight: FontWeights.semibold },
        value: {}
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDetailsAttributeStyles) : IDetailsAttributeStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
})

export { IDetailsAttributeStyles, defaultStyles, Defaults, getStyles }