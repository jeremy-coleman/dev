"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Input_1 = require("@material-ui/icons/Input");
const LabelOutline_1 = require("@material-ui/icons/LabelOutline");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const react_jss_1 = require("react-jss");
exports.styles = theme => ({
    cardBasic: {
        display: "flex",
        position: "relative",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        minWidth: 180,
    },
    content: {
        flex: "1 0 auto",
        backgroundColor: "white",
    },
    controls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing.unit,
        backgroundColor: theme.palette.background.default,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    headerText: {
        paddingRight: 10,
    },
    name: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    leftTop: {
        position: "absolute",
        zIndex: 10,
        left: -5,
        top: `calc(100% / 4 - 1px)`,
    },
    leftBottom: {
        position: "absolute",
        zIndex: 10,
        left: -5,
        bottom: `calc(100% / 4 - 1px)`,
    },
    rightTop: {
        position: "absolute",
        zIndex: 10,
        left: `calc(100% - 5px)`,
        top: `calc(100% / 4 - 1px)`,
    },
    rightBottom: {
        position: "absolute",
        zIndex: 10,
        left: `calc(100% - 5px)`,
        bottom: `calc(100% / 4 - 1px)`,
    },
});
//Patch for props resolution
class CogliteNodeWidget extends storm_react_diagrams_1.BaseWidget {
    constructor(props) {
        super("srd-coglite-node", props);
        this.state = {};
    }
    render() {
        const { classes, theme, node } = this.props;
        //To be used in props with styles
        node.color = node.color || theme.palette.common.white;
        return (React.createElement("div", { className: classes.cardBasic },
            React.createElement(core_1.Card, { className: classes.details },
                React.createElement("div", null,
                    React.createElement("div", { className: classes.controls },
                        React.createElement(core_1.IconButton, { "aria-label": "Previous", className: classes.playIcon }, node.cogType === "cogliteIn" ? React.createElement(Input_1.default, null) : React.createElement(LabelOutline_1.default, null)),
                        React.createElement(core_1.Typography, { variant: "subheading", className: classes.headerText }, node.cogType === "cogliteIn" ? `Input Node` : `Output Node`))),
                React.createElement(core_1.Divider, null),
                React.createElement("div", null,
                    React.createElement(core_1.CardContent, { className: classes.content },
                        React.createElement(core_1.Typography, { component: "p", className: classes.name }, node.name)))),
            React.createElement("div", { className: classes.leftTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftTop", node: node })),
            React.createElement("div", { className: classes.leftBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftBottom", node: node })),
            React.createElement("div", { className: classes.rightTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightTop", node: node })),
            React.createElement("div", { className: classes.rightBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightBottom", node: node }))));
    }
}
CogliteNodeWidget.defaultProps = {
    node: null,
    classes: {},
};
exports.CogliteNodeWidget = CogliteNodeWidget;
exports.default = react_jss_1.default(exports.styles, { withTheme: true })(CogliteNodeWidget);
