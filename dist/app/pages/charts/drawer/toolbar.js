"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const NavIcon_1 = require("../../../layout/NavIcon");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../../../design");
const ToolbarDimensions = styled_jss_1.default(core_1.Toolbar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
let WidgetToolbar = class WidgetToolbar extends React.Component {
    render() {
        return (React.createElement(ToolbarDimensions, null,
            React.createElement(design_1.Row, null,
                React.createElement(ChartDrawerToolbar, null))));
    }
};
WidgetToolbar = __decorate([
    mobx_react_1.observer
], WidgetToolbar);
exports.WidgetToolbar = WidgetToolbar;
const RowContainer = styled_jss_1.default('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});
let ChartDrawerToolbar = class ChartDrawerToolbar extends React.Component {
    render() {
        return (React.createElement(RowContainer, Object.assign({}, this.props),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/dashboard', icon: React.createElement(icons_1.Dashboard, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/notebook', icon: React.createElement(icons_1.Cloud, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/charts', icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/datasets', icon: React.createElement(icons_1.AccountBalanceWallet, null) })));
    }
};
ChartDrawerToolbar = __decorate([
    mobx_react_1.observer
], ChartDrawerToolbar);
exports.ChartDrawerToolbar = ChartDrawerToolbar;
