"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const Footer_1 = require("./Footer");
const Header_1 = require("./Header");
const IconNavigation_1 = require("./IconNavigation");
const ThemeChangeModal_1 = require("./ThemeChangeModal");
let AppShellLayout = mobx_react_1.observer((props) => React.createElement("div", { className: ux_1.DIMENSIONS.FillFlex },
    React.createElement("div", { className: ux_1.DIMENSIONS.Row },
        React.createElement("div", { className: ux_1.DIMENSIONS.VerticalStretch },
            React.createElement(Header_1.Header, null),
            React.createElement("div", { className: ux_1.DIMENSIONS.VerticalStretch },
                React.createElement("div", { className: ux_1.DIMENSIONS.Row },
                    React.createElement(IconNavigation_1.IconNavBar, null),
                    React.createElement("div", { className: ux_1.DIMENSIONS.Row },
                        React.createElement("div", { className: ux_1.DIMENSIONS.CardContainer }, props.children),
                        React.createElement("div", { style: { width: '0px' } }, "same as above. set width to 100px or something to see")))),
            React.createElement(Footer_1.Footer, null)),
        React.createElement("div", { style: { width: '0px' } }, "same as above, but outside footer set width to 100px or something to see")),
    React.createElement(ThemeChangeModal_1.ThemeChangeModal, null)));
exports.AppShellLayout = AppShellLayout;
exports.default = AppShellLayout;
