"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const ViewFactoryContext_1 = require("./ViewFactoryContext");
let ComponentView = mobx_react_1.observer((props) => React.createElement(ViewFactoryContext_1.ViewFactoryContext.Consumer, null, value => value.createView(props.component)));
exports.ComponentView = ComponentView;
