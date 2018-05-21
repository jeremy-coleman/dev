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
const Input_1 = require("@material-ui/icons/Input");
const mobx_react_1 = require("mobx-react");
let InputNode = class InputNode extends React.Component {
    render() {
        const { classes } = this.props;
        const inputNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(Input_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Input" })));
        return inputNode;
    }
};
InputNode = __decorate([
    mobx_react_1.observer
], InputNode);
exports.InputNode = InputNode;
