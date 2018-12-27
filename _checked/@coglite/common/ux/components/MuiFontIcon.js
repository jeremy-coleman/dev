"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const csx_1 = require("csx");
const React = require("react");
const typestyle_1 = require("typestyle");
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
    userSelect: 'none',
    whiteSpace: 'nowrap',
    direction: 'ltr',
    "-webkit-font-feature-settings": 'antialiased',
    textRendering: 'optimizeLegibility',
    "-moz-font-feature-settings": 'grayscale',
    fontFeatureSettings: 'liga',
});
exports.MuiFontIcon = ({ iconName, label }) => React.createElement("div", { className: iconStyle },
    React.createElement("i", { className: materialIcons }, iconName),
    React.createElement("p", { className: labelStyle }, label));
exports.MDFontIconOnly = ({ icon, ...props }) => React.createElement("i", { className: materialIcons }, icon);
exports.MDFontIconBox = ({ icon }) => React.createElement("div", { className: iconStyle },
    React.createElement("i", { className: materialIcons }, icon));
const SendIcon = () => React.createElement(exports.MuiFontIcon, { iconName: 'send', label: 'send' });
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
