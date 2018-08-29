import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IUserProfileStyles {
    root?: IStyle;
    userInfo?: IStyle;
    photo?: IStyle;
    photoIconContainer?: IStyle;
    details?: IStyle;
    name?: IStyle;
    email?: IStyle;
    username?: IStyle;
    body?: IStyle;
    groups?: IStyle;
    groupsTitle?: IStyle;
    groupList?: IStyle;
    group?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IUserProfileStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IUserProfileStyles = {
        root: {
            minWidth: 300
        },
        userInfo: {
            display: "flex"
        },
        photo: {
            width: 64,
            minWidth: 64,
            height: 64,
            minHeight: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        photoIconContainer: {
            borderRadius: "100%",
            width: 48,
            height: 48,
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        details: {
            padding: 8
        },
        name: {
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.semibold,
            lineHeight: FontSizes.medium
        },
        email: {
            marginTop: 8,
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.light,
            lineHeight: FontSizes.medium
        },
        username: {
            marginTop: 8,
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.light,
            lineHeight: FontSizes.medium
        },
        body: {
            borderTop: `1px solid ${theme.palette.neutralLight}`
        },
        groups: {
            padding: 8,
            lineHeight: FontSizes.medium
        },
        groupsTitle: {
            fontSize: FontSizes.medium,
            fontWeight: FontWeights.semibold,
            margin: 0,
            paddingTop: 4,
            paddingBottom: 8
        },
        groupList: {
        
        },
        group: {
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white,
            fontSize: FontSizes.medium,
            lineHeight: FontSizes.medium,
            fontWeight: FontWeights.semilight,
            padding: 4,
            borderRadius: 4,
            margin: 4,
            textAlign: "center",
            verticalAlign: "middle"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});


export { IUserProfileStyles, getStyles }