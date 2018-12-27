"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
exports.WorkspaceDropdownItem = mobx_react_1.observer((props) => React.createElement("span", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
    React.createElement("button", { onClick: props.onSelectFromDropdown },
        React.createElement("input", { type: "checkbox", checked: props.checked, tabIndex: -1, readOnly: true }),
        React.createElement("span", null, `${props.name}`)),
    React.createElement("button", null,
        React.createElement(ux_1.MDFontIconOnly, { icon: 'delete', onClick: props.onDeleteSingle }))));
