"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const csx_1 = require("csx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const LinkStyle = typestyle_1.style(csstips_1.horizontallyCenterSelf, {
    color: 'inherit',
    textDecoration: 'none',
    $nest: {
        '&:hover': {
            transitionDuration: '0.1s',
            color: 'var(--cog-primary)'
        }
    }
});
const leftNavStyles = theme => typestyle_1.style({
    maxWidth: 48,
    minWidth: 48,
    width: 48,
    minHeight: "100%",
    flex: "1",
    display: "flex",
    position: 'relative',
    flexDirection: "column",
    alignItems: 'stretch',
    alignContent: 'center',
    alignmentBaseline: "central",
    overflow: "hidden",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
    backgroundColor: theme.palette.primary.main
});
let iconStyle = typestyle_1.style(csstips_1.centerCenter, csstips_1.margin(0), csstips_1.padding(0), {
    width: 48,
    height: 48,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignmentBaseline: "central",
    overflow: "hidden",
    backgroundColor: 'inherit'
});
let labelStyle = typestyle_1.style(csstips_1.margin(0), csstips_1.padding(0), {
    textAlign: 'center',
    fontSize: '11px'
});
let materialIcons = typestyle_1.style({
    fontFamily: 'Material Icons',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 24,
    display: 'inline-block',
    lineHeight: 1,
    textTransform: 'none',
    letterSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'nowrap',
    direction: 'ltr',
    "-webkit-font-feature-settings": 'antialiased',
    textRendering: 'optimizeLegibility',
    "-moz-font-feature-settings": 'grayscale',
    fontFeatureSettings: 'liga',
});
const MuiFontIcon = ({ iconName, label }) => React.createElement("div", { className: iconStyle },
    React.createElement("i", { className: materialIcons }, iconName),
    React.createElement("p", { className: labelStyle }, label));
const IconBarLink = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("a", { href: '#', className: LinkStyle, onClick: () => props.nav.goTo(props.route) },
    React.createElement(MuiFontIcon, { iconName: props.iconName, label: props.label })))));
exports.IconNavBar = mobx_react_1.inject('theme')(mobx_react_1.observer(({ theme }) => (React.createElement("div", { className: leftNavStyles(theme) },
    React.createElement("div", null,
        React.createElement(IconBarLink, { route: "workspace", iconName: "dashboard" }),
        React.createElement(IconBarLink, { route: "dashboard", iconName: "dashboard" }),
        React.createElement(IconBarLink, { route: "notebook", iconName: "device_hub" }),
        React.createElement(IconBarLink, { route: "charts", iconName: "insert_chart" }),
        React.createElement(IconBarLink, { route: "datasets", iconName: "grid_on" }),
        React.createElement(IconBarLink, { route: "cloud", iconName: "cloud" }),
        React.createElement(IconBarLink, { route: "catalog", iconName: "dashboard" }),
        React.createElement("div", { style: { position: 'absolute', bottom: 0 } },
            React.createElement(IconBarLink, { route: "settings", iconName: "settings" }),
            React.createElement(IconBarLink, { route: "about", iconName: "help_outline" })))))));
const SendIcon = () => React.createElement(MuiFontIcon, { iconName: 'send', label: 'send' });
const bg = csx_1.color('black');
const textColor = csx_1.color('white');
const prettyBox = typestyle_1.style(csstips_1.padding(10), csstips_1.inlineBlock, {
    color: textColor.darken(.2).toHexString(),
    cursor: 'pointer',
    backgroundColor: bg.toHexString(),
    transition: 'color .2s, background-color .2s',
    $nest: {
        '&:hover': {
            color: textColor.toHexString(),
            backgroundColor: bg.lighten(.2).toHexString(),
        }
    }
});
