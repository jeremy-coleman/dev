"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
let closeButtonStyle = {
    paddingBottom: '8px',
    float: 'right',
    top: 0,
    right: 0,
    cursor: 'pointer',
    verticalAlign: 'top',
};
let defaultBackgroundStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: `rgba(0, 0, 0, 0.6)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4
};
let defaultDialogBoxStyle = {
    maxWidth: '70%',
    borderRadius: '5px',
    padding: '20px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 5
};
let stopEventPropagation = (event) => event.stopPropagation();
let Modal = mobx_react_1.observer((props) => React.createElement(React.Fragment, null, props.showModal &&
    React.createElement("div", { style: props.backgroundStyle || defaultBackgroundStyle, onClick: props.handleClose },
        React.createElement("div", { style: props.dialogBoxStyle || defaultDialogBoxStyle, onClick: stopEventPropagation },
            props.showCloseButton ? (React.createElement("div", { onClick: props.handleClose, style: closeButtonStyle }, "X")) : null,
            React.createElement("div", null, props.children)))));
exports.Modal = Modal;
exports.default = Modal;
