"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const when_switch_1 = require("when-switch");
const HostRoot_1 = require("./HostRoot");
const pages_1 = require("./pages");
const SideNavRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, when_switch_1.default(props.nav.route)
    .is('workspace', () => React.createElement(HostRoot_1.AppHostRoot, null))
    .is('notebook', () => React.createElement(pages_1.NotebookPage, null))
    .is('datasets', () => React.createElement(pages_1.DatasetsPage, null))
    .is('charts', () => React.createElement(pages_1.ChartsPage, null))
    .is('dashboard', () => React.createElement(pages_1.DashboardPage, null))
    .is('cloud', () => React.createElement(pages_1.CloudPage, null))
    .is('catalog', () => React.createElement(pages_1.CatalogPage, null))
    .is('settings', () => React.createElement(pages_1.SettingsPage, null))
    .is('about', () => React.createElement(pages_1.AboutPage, null))
    .else(() => React.createElement(HostRoot_1.AppHostRoot, null))))));
exports.SideNavRouter = SideNavRouter;
exports.default = SideNavRouter;
