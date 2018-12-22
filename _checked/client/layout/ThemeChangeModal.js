"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const csstips_1 = require("csstips");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const ux_1 = require("@coglite/common/ux");
let ThemeChangeModal = class ThemeChangeModal extends React.Component {
    constructor() {
        super(...arguments);
        this.userChoiceHistory = mobx_1.observable.array([this.props.theme.themeId]);
        this.handleCancel = () => {
            mobx_1.runInAction(() => {
                this.props.theme.themeId = this.userChoiceHistory[0],
                    this.props.ui.themeDialogToggle.toggle();
            });
        };
        this.handleOk = () => {
            this.props.ui.themeDialogToggle.toggle();
            this.userChoiceHistory.splice(0, this.userChoiceHistory.length - 1);
        };
        this.handleChange = (event, selectedOption) => {
            this.props.theme.themeId = selectedOption;
            this.userChoiceHistory.push(event.target.value);
        };
    }
    render() {
        return (React.createElement(ux_1.Modal, { showModal: this.props.ui.themeDialogToggle.open, handleClose: this.props.ui.themeDialogToggle.open ? this.handleCancel : void 0 },
            React.createElement("span", { style: { margin: 'auto' }, className: typestyle_1.style(csstips_1.padding(25)) },
                React.createElement("h5", null, "Choose Theme"),
                Object.keys(this.props.theme.brandOptions).map(option => (React.createElement("input", { checked: option === this.props.theme.themeId, value: option, key: option, type: "radio" },
                    React.createElement("label", null, option)))),
                React.createElement("button", { onClick: this.handleCancel }, "Cancel"),
                React.createElement("button", { onClick: this.handleOk }, "Save"))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ThemeChangeModal.prototype, "handleCancel", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ThemeChangeModal.prototype, "handleOk", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ThemeChangeModal.prototype, "handleChange", void 0);
ThemeChangeModal = __decorate([
    mobx_react_1.inject('theme', 'ui'),
    mobx_react_1.observer
], ThemeChangeModal);
exports.ThemeChangeModal = ThemeChangeModal;
const modalState = mobx_1.observable.object({ open: false });
let toggleModal = () => {
    modalState.open = !modalState.open;
};
