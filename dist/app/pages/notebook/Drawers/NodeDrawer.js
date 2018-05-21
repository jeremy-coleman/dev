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
const ArrowForward_1 = require("@material-ui/icons/ArrowForward");
const mobx_react_1 = require("mobx-react");
const layout_styles_1 = require("../layout.styles");
const react_jss_1 = require("react-jss");
let _NodeDrawer = class _NodeDrawer extends React.Component {
    render() {
        const { classes } = this.props;
        const { nodeDrawerToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(core_1.Drawer, { variant: "persistent", anchor: "right", open: nodeDrawerToggle.open ? true : false, classes: {
                paper: classes.nodeDrawerPaper,
                paperAnchorRight: classes.nodeDrawerPaperAnchorRight,
            } },
            React.createElement("div", { className: classes.nodeDrawerHeader },
                React.createElement(core_1.IconButton, { onClick: () => nodeDrawerToggle.openDrawer(false) },
                    React.createElement(ArrowForward_1.default, null))),
            React.createElement(core_1.Divider, null),
            React.createElement(core_1.List, null,
                React.createElement("div", null, this.props.children))));
        return nodeDrawer;
    }
};
_NodeDrawer = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], _NodeDrawer);
exports.NodeDrawer = react_jss_1.default(layout_styles_1.layoutStyles, { withTheme: true })(_NodeDrawer);
