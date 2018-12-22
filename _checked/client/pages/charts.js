"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const ux_1 = require("@coglite/common/ux");
const mobx_1 = require("mobx");
let backgroundStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: `rgba(0, 0, 0, 0.6)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
let dialogBoxStyle = {
    maxWidth: '70%',
    borderRadius: '5px',
    padding: '20px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column'
};
const modalState = mobx_1.observable.object({ open: false });
let toggleModal = () => {
    modalState.open = !modalState.open;
};
let safeClose = () => modalState.open ? toggleModal() : void 0;
exports.ChartsPage = mobx_react_1.observer((props) => React.createElement(React.Fragment, null,
    React.createElement("div", null, "Charts"),
    React.createElement("button", { onClick: toggleModal }, "open the modal"),
    React.createElement(ux_1.Modal, { showModal: modalState.open, showCloseButton: true, closeOnBackgroundClick: true, moveCloseButtonToRight: true, handleClose: toggleModal, backgroundStyle: backgroundStyle, dialogBoxStyle: dialogBoxStyle },
        React.createElement("div", null, "hiiiiiii"))));
