"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const ux_1 = require("@coglite/common/ux");
const footerStylesheet = theme => typestyle_1.stylesheet({
    root: {
        bottom: 0,
        width: '100%',
        position: 'relative',
        display: 'flex',
        maxHeight: '25px',
        minHeight: '25px',
        flexDirection: "row",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerLeft: {
        position: 'absolute',
        left: '10px'
    },
    footerRight: {
        position: 'absolute',
        right: '10px'
    }
});
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
exports.Footer = mobx_react_1.inject('theme')(mobx_react_1.observer(({ theme }) => {
    var styles = footerStylesheet(theme);
    return (React.createElement("footer", { className: styles.root },
        React.createElement("span", { className: ux_1.css(styles.footerLeft, typestyle_1.style(csstips_1.verticallySpaced(5))) },
            React.createElement(DropupButton, null)),
        React.createElement("span", { className: ux_1.css(styles.footerRight, typestyle_1.style(csstips_1.verticallySpaced(5))) }, `Version: ${version || 'pre-release'}`)));
}));
exports.default = exports.Footer;
let dropUpStyle = typestyle_1.stylesheet({
    dropbtn: {
        backgroundColor: 'inherit',
        color: 'white',
        fontSize: 16,
        border: 'none',
        $nest: {
            '&:hover': {
                backgroundColor: '#2980B9'
            }
        }
    },
    dropup: {
        position: 'relative',
        display: 'inline-block',
    },
    dropupContent: {
        display: 'none',
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        minWidth: 160,
        bottom: 50,
        zIndex: 999999,
        $nest: {
            '& :hover': { display: 'block important!' },
            '&>*': {
                color: 'black',
                padding: '12px 16px',
                textDecoration: 'none',
                display: 'block',
                $nest: {
                    '&:hover': { backgroundColor: '#ccc' }
                }
            },
        }
    }
});
let DropupButton = mobx_react_1.observer(() => React.createElement("div", { className: dropUpStyle.dropup },
    React.createElement("button", { className: dropUpStyle.dropbtn }, "Dropup"),
    React.createElement("div", { className: dropUpStyle.dropupContent },
        React.createElement("a", { href: "#" }, "Link 1"),
        React.createElement("a", { href: "#" }, "Link 2"),
        React.createElement("a", { href: "#" }, "Link 3"))));
var ButtonStyle;
(function (ButtonStyle) {
    const baseButton = {
        border: 'solid thin lightgray',
        borderRadius: 2,
        color: 'white',
        padding: '4px 10px'
    };
    ButtonStyle.component = typestyle_1.style({
        $debugName: 'component',
        display: 'flex'
    }, baseButton);
    ButtonStyle.primaryButton = typestyle_1.style({
        $debugName: 'primaryButton',
        backgroundColor: 'darkblue',
    }, baseButton);
    ButtonStyle.secondaryButton = typestyle_1.style({
        $debugName: 'secondaryButton',
        backgroundColor: 'teal',
    }, baseButton);
})(ButtonStyle || (ButtonStyle = {}));
React.createElement("div", { className: ButtonStyle.component },
    React.createElement("button", { className: ButtonStyle.primaryButton }, "Primary"),
    React.createElement("button", { className: ButtonStyle.secondaryButton }, "Secondary"));
