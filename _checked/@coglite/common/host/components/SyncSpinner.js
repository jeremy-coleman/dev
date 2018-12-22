"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const Error_1 = require("./Error");
let spinnerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
};
let SyncSpinner = mobx_react_1.observer((props) => React.createElement("span", { style: spinnerStyles }, props.syncLabel || "Loading..."));
exports.SyncSpinner = SyncSpinner;
let SyncComponent = mobx_react_1.observer((props) => React.createElement(React.Fragment, null,
    props.sync.syncing && React.createElement(SyncSpinner, Object.assign({}, props)),
    props.sync.error && React.createElement(Error_1.Error, { className: "sync-error-message", error: props.sync.error }),
    props.sync.hasSynced && props.onRenderDone(props),
    props.onRenderDefault && props.onRenderDefault(props)));
exports.SyncComponent = SyncComponent;
