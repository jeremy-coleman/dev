module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst ErrorOutline_1 = require(\"@material-ui/icons/ErrorOutline\");\r\nconst React = require(\"react\");\r\nexports.ValidationIcon = ({ id, errorMessages }) => (React.createElement(core_1.Tooltip, { id: id, title: errorMessages.map((e, idx) => React.createElement(\"div\", { key: `${id}_${idx}` }, e)) },\r\n    React.createElement(core_1.Badge, { badgeContent: errorMessages.length },\r\n        React.createElement(ErrorOutline_1.default, { color: 'error' }))));\r\n",
dependencies: ["@material-ui/core","@material-ui/icons/ErrorOutline","react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689526,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
