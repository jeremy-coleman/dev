module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst Functions_1 = require(\"@material-ui/icons/Functions\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst theming_1 = require(\"theming\");\r\nlet _FunctionNode = class _FunctionNode extends React.Component {\r\n    render() {\r\n        const { classes } = this.props;\r\n        return (React.createElement(core_1.ListItem, { classes: classes, component: \"div\", draggable: true, onDragStart: event => {\r\n                event.dataTransfer.setData(\"storm-diagram-node\", JSON.stringify({ type: \"cogliteFunctionMath\" }));\r\n            } },\r\n            React.createElement(core_1.ListItemIcon, null,\r\n                React.createElement(Functions_1.default, null)),\r\n            React.createElement(core_1.ListItemText, { primary: \"Function\" })));\r\n    }\r\n};\r\n_FunctionNode = tslib_1.__decorate([\r\n    mobx_react_1.inject('store'),\r\n    mobx_react_1.observer\r\n], _FunctionNode);\r\nexports.FunctionNode = theming_1.withTheme(_FunctionNode);\r\n",
dependencies: ["tslib","react","@material-ui/core","@material-ui/icons/Functions","mobx-react","theming"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689269,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
