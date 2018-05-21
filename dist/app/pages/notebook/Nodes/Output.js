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
const LabelOutline_1 = require("@material-ui/icons/LabelOutline");
const mobx_react_1 = require("mobx-react");
let OutputNode = class OutputNode extends React.Component {
    render() {
        const { classes } = this.props;
        const outputNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteOut" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(LabelOutline_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Output" })));
        return outputNode;
    }
};
OutputNode = __decorate([
    mobx_react_1.observer
], OutputNode);
exports.OutputNode = OutputNode;
