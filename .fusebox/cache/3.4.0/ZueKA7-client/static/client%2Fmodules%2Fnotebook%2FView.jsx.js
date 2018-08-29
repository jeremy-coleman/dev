module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst layout_1 = require(\"./layout\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst Canvas_1 = require(\"./Diagram/Canvas\");\r\nexports.NotebookView = mobx_react_1.observer((props) => {\r\n    return (React.createElement(React.Fragment, null,\r\n        React.createElement(layout_1.NotebookLayout, null,\r\n            React.createElement(Canvas_1.Canvas, { num: \"2\", someProp: 100 }))));\r\n});\r\n",
dependencies: ["react","./layout","mobx-react","./Diagram/Canvas"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689285,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
