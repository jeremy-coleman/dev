module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst _ = require(\"lodash\");\r\nconst React = require(\"react\");\r\nconst react_1 = require(\"../../react\");\r\nconst renderChildren = (elements, schema, path) => elements.map((child, index) => (React.createElement(core_1.Grid, { item: true, key: `${path}-${index}`, xs: true },\r\n    React.createElement(react_1.JsonForms, { uischema: child, schema: schema, path: path }))));\r\nexports.MaterialLayoutRenderer = ({ visible, elements, schema, path, direction }) => {\r\n    if (_.isEmpty(elements)) {\r\n        return null;\r\n    }\r\n    else {\r\n        return (React.createElement(core_1.Grid, { container: true, direction: direction }, renderChildren(elements, schema, path)));\r\n    }\r\n};\r\n",
dependencies: ["@material-ui/core","lodash","react","../../react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689681,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
