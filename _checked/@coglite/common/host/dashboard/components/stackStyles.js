"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = require("typestyle");
const ux_1 = require("@coglite/common/ux");
exports.stackStyles = typestyle_1.stylesheet({
    root: {},
    header: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: ux_1.defaultTheme.palette.neutralLight,
        color: ux_1.defaultTheme.palette.common.white,
        overflow: "hidden"
    },
    tabBar: {
        background: "transparent",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: "auto",
        borderBottom: `1px solid ${ux_1.defaultTheme.palette.themeDark}`
    },
    tab: {
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: ux_1.defaultTheme.palette.neutralTertiary,
        color: ux_1.defaultTheme.palette.neutralSecondary,
        borderRight: 'black solid 1px',
        cursor: "pointer",
        height: "100%",
        transition: "background-color 0.1s ease",
        zIndex: 0,
        $nest: {
            ".close-action": {
                visibility: "hidden"
            },
            "&.active": {
                backgroundColor: ux_1.defaultTheme.palette.neutralLighter,
                color: ux_1.defaultTheme.palette.neutralPrimary,
                boxShadow: `3px 0px 3px -2px ${ux_1.defaultTheme.palette.neutralSecondary}, -3px 0px 3px -2px ${ux_1.defaultTheme.palette.neutralSecondary}`,
                zIndex: 1,
                $nest: {
                    ".close-action": {
                        visibility: "visible"
                    },
                    "&:hover": {
                        backgroundColor: ux_1.defaultTheme.palette.neutralLighter
                    }
                }
            },
            "&:hover": {
                $nest: {
                    ".close-action": {
                        visibility: "visible"
                    }
                },
                backgroundColor: ux_1.defaultTheme.palette.neutralQuaternaryAlt,
                background: ux_1.defaultTheme.palette.neutralQuaternaryAlt
            }
        }
    },
    addAction: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ux_1.defaultTheme.palette.neutralTertiary,
        color: ux_1.defaultTheme.palette.neutralPrimary,
        outline: "none",
        border: "none",
        height: "100%",
        width: 28,
        cursor: "pointer",
        transition: "background-color 0.1s ease",
        $nest: {
            "&:hover": {
                backgroundColor: ux_1.defaultTheme.palette.neutralQuaternaryAlt,
                background: ux_1.defaultTheme.palette.neutralQuaternaryAlt
            },
            "&.stack-add-action-icon": {
                color: ux_1.defaultTheme.palette.neutralPrimary,
                fontSize: ux_1.defaultTheme.fontSizes.medium
            }
        }
    },
    tabTitleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: 130,
        overflow: "hidden",
        paddingLeft: 8,
        paddingRight: 8
    },
    tabTitle: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: ux_1.defaultTheme.fontSizes.medium
    },
    tabAction: {
        color: ux_1.defaultTheme.palette.black,
        marginLeft: 8,
        marginRight: 8,
        height: 16,
        width: 16,
        lineHeight: 16,
        padding: "0px",
        outline: "none",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        $nest: {
            "&.active": {
                color: ux_1.defaultTheme.palette.neutralPrimary
            },
            "&.close-action:hover": {
                color: ux_1.defaultTheme.palette.white,
                backgroundColor: ux_1.defaultTheme.palette.redDark
            }
        }
    },
    tabActionBar: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    tabPanel: {},
    tabIconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        maxHeight: 20,
        maxWidth: 20,
        overflow: "hidden",
        marginLeft: 4
    },
    tabActionIcon: {
        lineHeight: ux_1.defaultTheme.fontSizes.mini,
        fontSize: ux_1.defaultTheme.fontSizes.mini,
        fontWeight: ux_1.defaultTheme.fontWeights.regular,
        margin: 0,
        padding: 0,
        height: ux_1.defaultTheme.fontSizes.mini,
        width: ux_1.defaultTheme.fontSizes.mini
    },
    action: {
        color: ux_1.defaultTheme.palette.neutralPrimary,
        width: 20,
        height: 20,
        maxHeight: 20,
        maxWidth: 20,
        margin: '4px !important',
        background: "transparent",
        border: "none",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        $nest: {
            "&.close-action": {
                $nest: {
                    ":hover": {
                        color: ux_1.defaultTheme.palette.white,
                        backgroundColor: ux_1.defaultTheme.palette.redDark
                    }
                }
            },
            "&.close-action-bar": {
                $nest: {
                    ":hover": {
                        color: ux_1.defaultTheme.palette.white,
                        background: ux_1.defaultTheme.palette.redDark
                    }
                }
            }
        }
    },
    actionIcon: {
        fontSize: '12px',
        fontWeight: 400
    },
    actionBar: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'transparent',
        height: "auto"
    },
    body: {
        position: "absolute",
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: ux_1.defaultTheme.palette.common.white,
        boxShadow: "none"
    },
    dragOverlay: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        background: ux_1.defaultTheme.palette.common.white,
        opacity: 0.2,
        zIndex: 3
    },
    dragFeedbackContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        background: "transparent",
        zIndex: 2
    },
    dragFeedback: {
        position: "absolute",
        transition: "all 100ms ease",
        backgroundColor: ux_1.defaultTheme.palette.neutralTertiary,
        opacity: 0.5
    }
});
