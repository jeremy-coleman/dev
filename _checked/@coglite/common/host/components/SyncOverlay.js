"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const syncSpinnerOverlayStyle = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30000
};
const DefaultSpinnerOverlay = mobx_react_1.observer((props) => React.createElement("div", { style: syncSpinnerOverlayStyle },
    React.createElement("div", null, props.syncLabel || "Loading...")));
let SyncOverlay = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.sync.syncing || (props.onRenderError && props.sync.error) &&
    React.createElement("div", { style: { display: 'grid', height: '100vh' } },
        React.createElement("span", { style: { margin: 'auto' } },
            props.sync.error && props.onRenderError(props),
            props.sync.syncing && (props.onRenderSync(props) || React.createElement(DefaultSpinnerOverlay, Object.assign({}, props)))))));
exports.SyncOverlay = SyncOverlay;
