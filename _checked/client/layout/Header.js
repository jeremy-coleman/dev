"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const ux_1 = require("@coglite/common/ux");
const InfoDropdown_1 = require("./settings/InfoDropdown");
const WorkspaceMenu_1 = require("./workspace/WorkspaceMenu");
const headerStylesheet = theme => typestyle_1.stylesheet({
    root: {
        top: 0,
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
    headerLeft: {
        position: 'absolute',
        left: '10px'
    },
    headerRight: {
        position: 'absolute',
        right: '10px'
    }
});
exports.Header = mobx_react_1.inject('theme')(mobx_react_1.observer(({ theme }) => {
    var styles = headerStylesheet(theme);
    return (React.createElement("header", { className: styles.root },
        React.createElement("span", { className: ux_1.css(styles.headerLeft, typestyle_1.style(csstips_1.verticallySpaced(5))) },
            React.createElement(WorkspaceMenu_1.WorkspaceMenu, null)),
        React.createElement("span", { className: ux_1.css(styles.headerRight, typestyle_1.style(csstips_1.verticallySpaced(5))) },
            React.createElement(InfoDropdown_1.InfoDropdown, null))));
}));
exports.default = exports.Header;
