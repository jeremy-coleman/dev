"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
const dbDropdownStyles = typestyle_1.stylesheet({
    root: {
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        top: 36,
        right: 'auto',
        left: 0,
        zIndex: 4
    }
});
const modalState = mobx_1.observable.object({ open: false });
let toggleModal = () => {
    modalState.open = !modalState.open;
};
let safeClose = () => modalState.open ? toggleModal() : void 0;
let WorkspaceDropdown = mobx_react_1.inject('theme', 'ui')(mobx_react_1.observer((props) => React.createElement("div", { className: dbDropdownStyles.root },
    React.createElement("div", null,
        React.createElement(ux_1.Button, { style: { color: 'var(--cog-primary)' }, onClick: () => toggleModal() },
            props.dropdownHeading || 'Workspace',
            React.createElement(ux_1.MDFontIconOnly, { icon: 'expand_more' }))))));
exports.WorkspaceDropdown = WorkspaceDropdown;
exports.default = WorkspaceDropdown;
