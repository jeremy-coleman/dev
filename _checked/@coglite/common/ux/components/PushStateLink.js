"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const pushState = (url) => (e) => {
    e.preventDefault();
    history.pushState(null, "", url);
};
const Link = ({ href, ...rest }) => React.createElement("a", Object.assign({ href: href, onClick: pushState(href) }, rest));
exports.default = Link;
exports.Link = Link;
