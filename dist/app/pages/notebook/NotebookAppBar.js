"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const classNames = require("classnames");
const AccountCircle_1 = require("@material-ui/icons/AccountCircle");
const BorderRight_1 = require("@material-ui/icons/BorderRight");
const FormatAlignRight_1 = require("@material-ui/icons/FormatAlignRight");
const Menu_1 = require("@material-ui/icons/Menu");
const core_1 = require("@material-ui/core");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const react_jss_1 = require("react-jss");
const layout_styles_1 = require("./layout.styles");
let _NotebookAppBar = class _NotebookAppBar extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => { this.currentClickTarget = event.target; };
    }
    render() {
        const { classes } = this.props;
        const { menuDrawerToggle, nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle, appBarSettingsMenuToggle, } = this.props.uiStore;
        const _notebookAppBar = (React.createElement(core_1.AppBar, { className: classNames(classes.appBar, menuDrawerToggle.open && classes.appBarLeftShift, {
                [classes.appBarRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
            }) },
            React.createElement(core_1.Toolbar, { disableGutters: !menuDrawerToggle.open },
                React.createElement(core_1.IconButton, { color: "inherit", "aria-label": "open drawer", onClick: e => { menuDrawerToggle.openDrawer(true); }, className: classNames(classes.menuButton, menuDrawerToggle.open && classes.hide) },
                    React.createElement(Menu_1.default, null)),
                React.createElement("div", null,
                    React.createElement(core_1.IconButton, { "aria-owns": "appbar-account-icon", "aria-haspopup": "true", onClick: e => {
                            this.setTarget(e);
                            appBarSettingsMenuToggle.openDrawer(true);
                        }, color: "inherit" },
                        React.createElement(AccountCircle_1.default, null)),
                    React.createElement(core_1.IconButton, { onClick: () => nodeFormDrawerToggle.openDrawer(true), color: "inherit" },
                        React.createElement(BorderRight_1.default, null)),
                    React.createElement(core_1.IconButton, { onClick: () => nodeDrawerToggle.openDrawer(true), color: "inherit" },
                        React.createElement(FormatAlignRight_1.default, null)),
                    React.createElement(core_1.Menu, { anchorEl: this.currentClickTarget, id: "appbar-account-icon", "aria-label": "appbar-account-icon", anchorOrigin: { vertical: "top", horizontal: "right" }, transformOrigin: { vertical: "top", horizontal: "right" }, open: appBarSettingsMenuToggle.open, onClose: () => {
                            appBarSettingsMenuToggle.openDrawer(false);
                        } },
                        React.createElement(core_1.MenuItem, { onClick: () => { appBarSettingsMenuToggle.openDrawer(false); } }, "Profile"),
                        React.createElement(core_1.MenuItem, { onClick: () => { themeDialogToggle.openDrawer(true), appBarSettingsMenuToggle.openDrawer(false); } }, "Theme Settings"))))));
        return _notebookAppBar;
    }
};
__decorate([
    mobx_1.observable
], _NotebookAppBar.prototype, "currentClickTarget", void 0);
__decorate([
    mobx_1.action
], _NotebookAppBar.prototype, "setTarget", void 0);
_NotebookAppBar = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], _NotebookAppBar);
exports.NotebookAppBar = react_jss_1.default(layout_styles_1.layoutStyles, { withTheme: true })(_NotebookAppBar);
