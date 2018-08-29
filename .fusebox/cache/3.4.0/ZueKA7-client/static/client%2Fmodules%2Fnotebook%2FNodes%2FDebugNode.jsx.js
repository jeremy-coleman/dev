module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst Pageview_1 = require(\"@material-ui/icons/Pageview\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nlet DebugNode = class DebugNode extends React.Component {\r\n    render() {\r\n        const { classes } = this.props;\r\n        const debugNode = (React.createElement(core_1.ListItem, { classes: classes, component: \"div\", draggable: true, onDragStart: event => {\r\n                event.dataTransfer.setData(\"storm-diagram-node\", JSON.stringify({ type: \"cogliteDebug\" }));\r\n            } },\r\n            React.createElement(core_1.ListItemIcon, null,\r\n                React.createElement(Pageview_1.default, null)),\r\n            React.createElement(core_1.ListItemText, { primary: \"Debug\" })));\r\n        return debugNode;\r\n    }\r\n};\r\nDebugNode = tslib_1.__decorate([\r\n    mobx_react_1.observer\r\n], DebugNode);\r\nexports.DebugNode = DebugNode;\r\n",
dependencies: ["tslib","react","@material-ui/core","@material-ui/icons/Pageview","mobx-react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689262,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
