"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
let ComponentRemoveDialog = class ComponentRemoveDialog extends React.Component {
    constructor() {
        super(...arguments);
        this._onClickCancel = () => {
            this.props.remove.cancel();
        };
        this._onClickSave = () => {
            this.props.remove.save();
        };
        this._onDismissed = () => {
            this.props.remove.cancel();
        };
    }
    render() {
        const c = this.props.remove.component;
        let title;
        if (c) {
            if (c.type === "stack" || c.type === "list") {
                title = "all Tabs";
            }
        }
        if (!title) {
            title = "the Tab";
        }
        return (React.createElement(ux_1.Modal, { showModal: !this.props.remove.active ? false : true, handleClose: this._onDismissed },
            React.createElement("h1", null, `Close ${title}`),
            React.createElement("div", null, `Are you sure you want to close ${title}?`),
            React.createElement("div", null,
                React.createElement("button", { onClick: this._onClickCancel }, "Cancel"),
                React.createElement("button", { onClick: this._onClickSave }, "OK"))));
    }
};
ComponentRemoveDialog = __decorate([
    mobx_react_1.observer
], ComponentRemoveDialog);
exports.ComponentRemoveDialog = ComponentRemoveDialog;
