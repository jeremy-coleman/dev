"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../design");
const Container = styled_jss_1.default(core_1.Card)({
    position: 'relative',
    display: "flex",
    flex: '1 1 auto',
    width: "100%",
    margin: '5px'
});
exports.MiddlePanel = props => React.createElement(Container, null,
    React.createElement(design_1.FillFlex, null, props.children));
