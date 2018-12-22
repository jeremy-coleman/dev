"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const typestyle_1 = require("typestyle");
self.document.body.style.setProperty('--cog-primary', 'orange');
const AppContainer_1 = require("./AppContainer");
ReactDOM.render(React.createElement(AppContainer_1.AppView, null), document.getElementById("root"));
typestyle_1.forceRenderStyles();
