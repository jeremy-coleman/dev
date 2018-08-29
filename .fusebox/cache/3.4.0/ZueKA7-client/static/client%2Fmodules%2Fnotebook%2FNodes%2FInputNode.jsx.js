module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst Input_1 = require(\"@material-ui/icons/Input\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nlet InputNode = class InputNode extends React.Component {\r\n    render() {\r\n        const { classes } = this.props;\r\n        const inputNode = (React.createElement(core_1.ListItem, { classes: classes, component: \"div\", draggable: true, onDragStart: event => {\r\n                event.dataTransfer.setData(\"storm-diagram-node\", JSON.stringify({ type: \"cogliteInput\" }));\r\n            } },\r\n            React.createElement(core_1.ListItemIcon, null,\r\n                React.createElement(Input_1.default, null)),\r\n            React.createElement(core_1.ListItemText, { primary: \"Input\" })));\r\n        return inputNode;\r\n    }\r\n};\r\nInputNode = tslib_1.__decorate([\r\n    mobx_react_1.observer\r\n], InputNode);\r\nexports.InputNode = InputNode;\r\n",
dependencies: ["tslib","react","@material-ui/core","@material-ui/icons/Input","mobx-react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689275,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
