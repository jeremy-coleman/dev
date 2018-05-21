"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const styled_jss_1 = require("styled-jss");
const core_1 = require("@material-ui/core");
const Menu_1 = require("@material-ui/icons/Menu");
const routes_1 = require("./routes");
exports.Drawer = styled_jss_1.default('div')({
    width: props => { props.width || '360px'; },
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    right: 0
});
exports.IconNavBar = mobx_react_1.observer(props => (React.createElement(core_1.Toolbar, null,
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)),
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)),
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)))));
const _WorkDrawer = props => (React.createElement(exports.Drawer, { width: props.width },
    React.createElement(exports.IconNavBar, null),
    React.createElement(WorkDrawerRoutes, null)));
exports.WorkDrawer = mobx_react_1.observer(_WorkDrawer);
let WorkDrawerRoutes = class WorkDrawerRoutes extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/dashboard', render: () => routes_1.DashboardPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/notebook', component: routes_1.NotebookPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/datasets', component: routes_1.DatasetsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/charts', component: routes_1.ChartsPage }))));
    }
};
WorkDrawerRoutes = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], WorkDrawerRoutes);
exports.WorkDrawerRoutes = WorkDrawerRoutes;
//const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
//export {LeftNav as default, LeftNav}
// add "label" if you want to use text ie: <NavIcon label="Portfolio" route="/" icon={<Dashboard />} />
