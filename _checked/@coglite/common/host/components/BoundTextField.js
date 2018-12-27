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
const models_1 = require("../models");
let BoundTextField = class BoundTextField extends React.Component {
    constructor() {
        super(...arguments);
        this._onChange = (e) => {
            models_1.setBoundValue(this.props, e.currentTarget.value);
            if (this.props.onChange) {
                this.props.onChange(e.currentTarget.value);
            }
        };
    }
    render() {
        const value = models_1.getBoundValue(this.props);
        return (React.createElement("input", Object.assign({}, this.props, { type: 'text', onChange: this._onChange, value: this.props.errors && this.props.errors.length ? models_1.getErrorMessage(this.props, this.props.errors) : (value || ""), style: { margin: '5px', width: '100%' } })));
    }
};
BoundTextField = __decorate([
    mobx_react_1.observer
], BoundTextField);
exports.BoundTextField = BoundTextField;
