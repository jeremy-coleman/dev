"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Grid_1 = require("@material-ui/core/Grid");
const classNames = require("classnames");
const layout_styles_1 = require("./layout.styles");
const mobx_react_1 = require("mobx-react");
const react_jss_1 = require("react-jss");
const mobx_1 = require("mobx");
const NodeDrawer_1 = require("./Drawers/NodeDrawer");
const NotebookAppBar_1 = require("./NotebookAppBar");
const Input_1 = require("./Nodes/Input");
const Output_1 = require("./Nodes/Output");
let AppFrame = class AppFrame extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => {
            this.currentClickTarget = event.target;
        };
        this.handleThemeDialogClose = (selectedOption, action) => {
            const uiStore = this.props.uiStore;
            if (action === "ok") {
                uiStore.updateTheme(selectedOption);
            }
            uiStore.themeDialogToggle.openDrawer(false);
        };
    }
    renderDevTool() {
        if (process.env.NODE_ENV !== "production") {
            const DevTools = require("mobx-react-devtools").default;
            return React.createElement(DevTools, null);
        }
        return null;
    }
    render() {
        const { classes } = this.props;
        const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawer_1.NodeDrawer, null,
            React.createElement(Input_1.InputNode, null),
            React.createElement(Output_1.OutputNode, null)));
        return (React.createElement(Grid_1.default, { container: true, className: classes.root },
            React.createElement("div", { className: classes.root },
                React.createElement("div", { className: classes.appFrame },
                    React.createElement(NotebookAppBar_1.NotebookAppBar, null),
                    React.createElement("main", { className: classNames(classes.content, {
                            [classes.contentRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
                        }) }, this.props.children),
                    nodeDrawer))));
    }
};
__decorate([
    mobx_1.observable
], AppFrame.prototype, "currentClickTarget", void 0);
__decorate([
    mobx_1.action
], AppFrame.prototype, "setTarget", void 0);
AppFrame = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], AppFrame);
exports.AppFrame = AppFrame;
exports.default = react_jss_1.default(layout_styles_1.layoutStyles, { withTheme: true })(AppFrame);
