"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const typestyle_1 = require("typestyle");
var appViewStyles = typestyle_1.stylesheet({
    main: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: "auto",
        "&.hasCmdMenu": { top: 35 }
    }
});
let AppViewTemplate = mobx_react_1.observer((props) => React.createElement("div", { className: appViewStyles.main }, props.children));
let HostAppView = AppViewTemplate;
exports.HostAppView = HostAppView;
const spacing = '5px';
const niceVerticalLayout = typestyle_1.style({
    $nest: {
        '&>*': {
            marginBottom: spacing,
        },
        '&>*:last-child': {
            marginBottom: '0px',
        }
    }
});
