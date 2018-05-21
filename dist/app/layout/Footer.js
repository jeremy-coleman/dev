"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const core_1 = require("@material-ui/core");
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
const FooterDimensions = styled_jss_1.default(core_1.AppBar)({
    border: "1px solid orange",
    display: "flex",
    flexDirection: 'row',
    width: "100%",
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0
});
const polished_1 = require("polished");
exports.default = (theme) => {
    return {
        root: {
            display: 'block',
            position: 'relative',
            backgroundColor: polished_1.rgba(theme.background.primary.level0, theme.alpha),
            '&$exiting, &$exited': {
                backgroundColor: 'transparent',
                '& $separator': {
                    width: 0,
                },
            },
        },
        separator: {
            position: 'absolute',
            top: 'auto',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'block',
            width: '100%',
            borderStyle: 'solid',
            borderColor: theme.color.primary.dark,
            borderWidth: '0 0 1px',
            transition: `all ${theme.animTime}ms ease-in`,
        },
        children: {
            display: 'block',
        },
        entering: {},
        entered: {},
        exiting: {},
        exited: {},
    };
};
exports.Footer = mobx_react_1.observer((P) => (React.createElement(FooterDimensions, null,
    React.createElement("span", null, copyrightString),
    React.createElement("div", { style: { flex: 'auto' } }),
    React.createElement("span", null, `Version: ${version || 'pre-release'}`))));
