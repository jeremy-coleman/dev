"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const state_1 = require("./state");
const AppShellLayout_1 = require("./layout/AppShellLayout");
const SideNavRouter_1 = require("./SideNavRouter");
mobx_1.configure({ enforceActions: "never" });
exports.AppView = mobx_react_1.observer((props) => React.createElement(mobx_react_1.Provider, Object.assign({ store: state_1.state, theme: state_1.state.theme }, state_1.state),
    React.createElement("div", { style: { height: '100vh', width: '100vw', overflow: 'hidden' } },
        React.createElement(AppShellLayout_1.AppShellLayout, Object.assign({}, props),
            React.createElement(SideNavRouter_1.SideNavRouter, null)))));
