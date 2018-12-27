"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const settingsDropdownStyles = typestyle_1.stylesheet({
    root: {
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        top: 36,
        left: 'auto',
        right: 5,
        zIndex: 4
    }
});
const modalState = mobx_1.observable.object({ open: false });
let toggleModal = () => {
    modalState.open = !modalState.open;
};
let InfoDropdown = mobx_react_1.inject('theme', 'ui')(mobx_react_1.observer((props) => React.createElement("div", { className: settingsDropdownStyles.root })));
exports.InfoDropdown = InfoDropdown;
